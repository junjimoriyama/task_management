<script setup lang='ts'>
// import { Sort } from '../components/Sort';
// import { useTaskPeriod } from '../composables/taskList'
import { Cipher } from 'crypto';
import dayjs, { type Dayjs } from 'dayjs'
import { changeIsSearch } from '../composables/search'

// tasksheetの項目定義
const { taskTitle, taskDescription, taskPIC, taskPeriodStart, taskPeriodEnd, taskPeriod, taskStatus, taskPriority, adjustEndDateStr, adjustStartDateStr } = taskDefinition()
// taskList
const { taskList } = taskDefinition()

// sort.tsで定義
const { sortPriority, sortDay, sortChanged } = getSortValue()

// 検索ボックス非表示
changeIsSearch(false)

// タスク項目の要素
const taskHeading = ref<HTMLElement>()
// タスク項目の高さ
const taskHeadingHeight = ref(0)
// 各タスク
const taskItem = ref<HTMLElement[]>()
// 各タスク自体の高さ
const taskItemHeight = ref(0)

// 各タスク間のマージン
const taskItemDistance = 5

// コンポーネントがDOMにマウントされたら
onMounted(() => {
  // 初めにlocalStorageからtaskListに入れる
  taskListPushLocalStorage()
  
  // HTMLが全て更新されてから実行
  nextTick(() => {
    // チャートを本日の日付に移動させる関数
    moveChartToday()

    // taskHeadingがありタグにulがあれば
    if(taskHeading.value && taskHeading.value.tagName === 'UL') {
      // タスクの高さ
      taskHeadingHeight.value = taskHeading.value.clientHeight
    }
    // taskItemがあり、一番目のタスクのタグにulがあれば
    if(taskItem.value && taskItem.value[0].tagName === 'UL') {
      // タスクの高さ
      taskItemHeight.value = taskItem.value[0].clientHeight
    }
  })
})

// taskListに変化があればlocalStorageに反映させる
watch(taskList.value, () => {
  localStorage.setItem(STORAGE_TASKLIST.value, JSON.stringify
    (taskList.value));
});

// 状態並べ替えの配列
const statusOrder = ['Todo', '進行中', '完了']
// 状態並べ替えの配列処理
const statusSortData = computed(() => {
  return taskList.value.sort((x, y) => {
    return statusOrder.indexOf(x.status) - statusOrder.indexOf(y.status)
  })
})

// ガントチャートの表示 =======================================
// 各月の1日ごとの情報の型
interface eachDay {
  day: number, /* 日付 */
  dayOfWeek: string,/* 曜日 */
  blockNumber: number /* ブロック数 */
}

// カレンダーの型(各月の情報)
interface calendar {
  date: string, /* ****年**月という文字列 */
  year: number, /* 年 */
  month: number, /* 月 */
  calendar: number, /* カレンダーの日数 */
  days: eachDay[]; /* (各月の1日ごとの情報) */
}

// 2年前の年と月を取得
let twoYearsAgo = dayjs().subtract(2, 'year').format('YYYY-MM')

const dayState = reactive({
  startMonth: twoYearsAgo,/* 2年前の月 */
  endMonth: '2024-1',/* 終わりの月 */
  today: dayjs().format('YYYY-MM-DD'),/* 今日の日付 */
  blockNumber: 0,/* ブロック数 */
  calendars: [] as calendar[], /* 各月の情報が入る */
})

// 1つのblockあたりのpx
const BLOCK_SIZE = 30;

// 日付を取得する関数
const getday = (year: number, month: number, blockNumber: number) => {
  /* 曜日の配列 */
  const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土']
  /* dateを取得 */
  let date = dayjs(`${year}/${month + 1}/01`)
  let num = date.daysInMonth()/* 月の中の日付数 */
  /* 一時的に月の情報を格納する配列（これがないと各月のdaysが追加状態になる） */
  const monthlyDayList = [];
  /* 日付分情報を取得する */
  for (let i = 0; i < num; i++) {
    /* 空の配列に入れる */
    monthlyDayList.push({
      day: date.date(),/* 日付 */
      dayOfWeek: dayOfWeek[date.day()],/* 曜日 */
      blockNumber /* プロック数 */
    })
    date = date.add(1, 'day')/* 日付を更新 */
    blockNumber++/* ブロック数更新 */
  }
  return monthlyDayList
}


// 指定した数ヶ月分の日付と曜日を取得
const getCalendar = () => {
  let blockNumber = 0
  /* 初め月の各日付情報 */
  let startDate = dayjs(dayState.startMonth)
  /* 終わり月の各日付情報 */
  let endDate = dayjs(dayState.endMonth)
  /* 初め月と終わり月の間 */
  let betweenMonth = endDate.diff(startDate, 'month') + 1
  /* 各月の一日ごとの情報が入る（一時的に保存） */
  let currentMonthDay

  for (let i = 0; i < betweenMonth; i++) {
    // 一時的に日付、曜日、ブロック数の情報を入れる
    currentMonthDay = getday(startDate.year(), startDate.month(), blockNumber)

    dayState.calendars.push({
      /* 表のYYYY年MM月 */
      date: startDate.format('YYYY年MM月'),
      year: startDate.year(), /* 年 */
      month: startDate.month() + 1,/* 月 */
      /* 日付の数 */
      calendar: currentMonthDay.length,
      /* 日付の情報 */
      days: currentMonthDay,
    })
    /* 一月ずつ更新 */
    startDate = startDate.add(1, 'month')
    /* ブロック数を連番に */
    // 最後の日のブロック番号を取得し、それに1を加えることで、次の月の初めのブロック番号を設定
    blockNumber = currentMonthDay[currentMonthDay.length - 1].blockNumber
    blockNumber++
  }
}
// 実行
getCalendar()

// 今日の日付を出す関数
const isToday = (date: string) => {
  const today = dayjs().format('YYYY/MM/DD')
  return dayjs(date).format('YYYY/MM/DD') === today
}

// スタートのブロック
let startBlock: number
// 終わりのブロック
let endBlock: number
 // チャートスタートの日時
let chartStartDay = new Date(`${dayState.startMonth}/1`)

// 関数化
const getTaskPeriod = (index: number) => {
  
  //  ミリ秒で時間を取得
  const chartStartMillis = chartStartDay.getTime()

  const [start, end] = statusSortData.value[index].period.split('〜')

  // task初めの日(UTC)
  const startDate = new Date(start)
  // task終わりの日(UTC)
  const endDate = new Date(end)
  // ミリ秒で初めの時間を取得
  const startDateMillis = startDate.getTime()
  // ミリ秒で終わりの時間を取得
  const endDateMillis = endDate.getTime()

  // task初めの日 - チャート初めの日を差し引いた日数 +1 = スタートのブロックの位置
  startBlock = (startDateMillis - chartStartMillis) / (1000 * 3600 * 24)
  endBlock = (endDateMillis - chartStartMillis) / (1000 * 3600 * 24)
  return {
    width: `${(endBlock - startBlock + 1) * BLOCK_SIZE}px`,
    left: `${startBlock * BLOCK_SIZE }px`,
    // それぞれのタスクの高さとマージンにindexをかける。それにタスクの半分の高さとタスクの項目の高さとそのマージンを加える
    top: `${ (taskItemHeight.value + taskItemDistance) * index + taskItemHeight.value / 2 + taskHeadingHeight.value + taskItemDistance}px`
  }
}

// カレンダーゾーンの要素
const calendarZorn = ref<HTMLElement>()

// チャートを本日の日付に移動させる関数
const moveChartToday = () => {
  // 本日の日付からカレンダー初めの日付の日数
  const daysSinceStart = Math.round((new Date(dayState.today).getTime() - chartStartDay.getTime()) / (1000 * 3600 * 24))
  // 日付間の横幅
  const moveScroll = daysSinceStart * BLOCK_SIZE
  if(calendarZorn.value) {
    // カレンダーゾーンの要素を日付間の横幅分、右にスクロールされる
    calendarZorn.value.scrollLeft = moveScroll
  }
}

// taskの色を変える ======================================
const getTaskColor = (status: string) => {
  switch (status) {
    case 'Todo':
      return '#7ca5f6';
    case '進行中':
      return '#32cd92';
    case '完了':
      return '#dc632b';
    default:
      return 'grey';
  }
}

// ========================================================


const mousedown = (e: MouseEvent, index: number,) => {
  // クリックした座標
  const clientX = e.clientX
  // チャートbar
  const adjustEl = e.target as HTMLElement
  // チャートbar右端の要素
  const adjustElRectRight = adjustEl.getBoundingClientRect().right
  // チャートbar左端の要素
  const adjustElRectLeft = adjustEl.getBoundingClientRect().left
  // 始まりの日付のみ
  const startDateStr = taskList.value[index].period.split(' 〜 ')[0]
  // 終わりの日付のみ
  const endDateStr = taskList.value[index].period.split(' 〜 ')[1]

  // 右側20px以内
  const isRight = adjustElRectRight - clientX < 20
  // 左側20px以内
  const isLeft = adjustElRectLeft - clientX > -20
  // 上記以外をクリック
  const isCenter = !isRight && !isLeft

  // カーソルを変更
  if (isCenter) {
    adjustEl.style.cursor = 'ew-resize'
  } else if (isLeft) {
    adjustEl.style.cursor = 'w-resize'
  } else if (isRight) {
    adjustEl.style.cursor = 'e-resize'
  }

  // 日付をdate型へ
  let adjustStartDate: Date
  let adjustEndDate: Date
  // 書替え後の日付
  let newStartDateStr: string
  let newEndDateStr: string

  // 日付を計算し、表示する関数
  const dateConversion = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  }

  // 日付(useState)を保存する
  const dateChange = () => {
    adjustStartDateStr(newStartDateStr);
    adjustEndDateStr(newEndDateStr);
    statusSortData.value[index].period = taskPeriod.value;
  }

  // 日付を増減させる関数
  const dateAjust = (moveSize: number) => {
    // 日付をdate型へ
    adjustStartDate = new Date(startDateStr)
    adjustEndDate = new Date(endDateStr)
    // 真ん中なら
    if (isCenter) {
      adjustStartDate.setDate(adjustStartDate.getDate() + moveSize)
      adjustEndDate.setDate(adjustEndDate.getDate() + moveSize)

      // 右なら
    } else if (isRight) {
      adjustStartDate.setDate(adjustStartDate.getDate())
      adjustEndDate.setDate(adjustEndDate.getDate() + moveSize)
      // 左なら
    } else if (isLeft) {
      adjustStartDate.setDate(adjustStartDate.getDate() + moveSize)
      adjustEndDate.setDate(adjustEndDate.getDate())
    }
    // 表示形式の変更
    newStartDateStr = dateConversion(adjustStartDate)
    newEndDateStr = dateConversion(adjustEndDate)
  }

  const mousemoveEvent = (e: MouseEvent) => {
    // 現在の座標
    const currentX = e.clientX
    // ブロック数とサイズを計算
    let adjustBlock = 0
    if (isCenter) {
      // 移動座標距離
      const moveX = currentX - clientX
      // 移動した距離をブロック数で計算
      adjustBlock = moveX / BLOCK_SIZE

    } else if (isRight) {
      // 右へ座標移動距離
      const moveXRight = currentX - adjustElRectRight
      adjustBlock = Math.ceil(moveXRight / BLOCK_SIZE)

      
    } else if (isLeft) {
      // 左へ座標移動距離
      const moveXLeft = currentX - adjustElRectLeft
      adjustBlock = Math.floor(moveXLeft / BLOCK_SIZE)
    }
    // 日付の変更
    dateAjust(adjustBlock)
    // 日付(useState)を保存
    // 条件:①カレンダー始まりの日付より変更した日付が大きければ
    // 条件:②始まりの日付が終わりの日付以上にならず、終わりの日付が始まりの日付以下にならない
    if (new Date(newStartDateStr) >= new Date(`${dayState.startMonth}-01`) && (newEndDateStr >= startDateStr && newStartDateStr <= endDateStr)) {
      dateChange()
    }
  }
  // mouseupイベント
  const mouseupEvent = (e: MouseEvent) => {
    // カーソルを元に戻す
    adjustEl.style.cursor = 'pointer'
    window.removeEventListener('mousemove', mousemoveEvent)
    window.removeEventListener('mouseup', mousemoveEvent)
  }
  window.addEventListener('mousemove', mousemoveEvent)
  window.addEventListener('mouseup', mouseupEvent)
}

// 優先度で並び替え
const onChangeSortPriority = (value: string) => {
  sortPriority.value = value
  changeSortPriority(sortPriority, sortChanged);
}
// 日付順で並び替え
const onChangeSortDay = (value: string) => {
  sortDay.value = value
  changeSortDay(sortDay, sortChanged);
}

</script>

<template>
  <div>
    <div class="container">
      <Header @searchForWords="searchForWords"/>
      <Sort @changeSortPriority="onChangeSortPriority" @changeSortDay="onChangeSortDay" />
      <!-- <div class="calendarRange">
        
      </div> -->
      <div class="taskGantt">
        <div class="taskZorn" ref="taskZorn">
          <ul class="taskHeading" ref="taskHeading">
            <li class="taskTitle">タイトル</li>
            <li class="taskPIC">担当者</li>
            <li class="taskPeriod">期間</li>
            <li class="taskStatus">状態</li>
            <li class="taskPriority">優先度</li>
          </ul>

          <ul class="taskItem" v-for="(task, index) in statusSortData" :key="index" ref="taskItem"
            :style="{ backgroundColor: getTaskColor(task.status), marginTop: `${taskItemDistance}px` }">
            <li class="taskTitle">{{ task.title }}</li>
            <li class="taskPIC">{{ task.PIC }}</li>
            <!-- <li class="taskPeriod">{{ task.taskPeriodStart }}</li> -->
            <li class="taskPeriod">{{ task.period }}</li>
            <li class="taskStatus">{{ task.status }}</li>
            <li class="taskPriority" :style="{ 'backgroundColor': getPriorityColor(task.priority) }">
              {{ task.priority }}</li>
          </ul>
        </div>
        <div class="calendarZorn" ref="calendarZorn">
          <!-- チャート -->
          <ul class="blocks">
            <li class="block" v-for="(task, index) in statusSortData" :key="index" :style="getTaskPeriod(index)" @mousedown="mousedown($event, index)">
            </li>
          </ul>
          <div class="month">
            <div class="monthItem" v-for="(calendar, index) in dayState.calendars" ref="monthItem">
              {{ calendar.date }}
              <div class="day">
                <div class="dayItem" v-for="(day, index) in calendar.days" :key="index" :class="{
                  'saturday': day.dayOfWeek === '土', 'sunday': day.dayOfWeek === '日',
                  'today': isToday(dayjs(`${calendar.year}/${calendar.month}/${day.day}`).format('YYYY/MM/DD'))
                }">
                  {{ day.day }}<br>
                  {{ day.dayOfWeek }}

                  <span class="calendarBlock">
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- control＋K = 選択した右側を削除 -->