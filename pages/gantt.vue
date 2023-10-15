<script setup lang='ts'>
// import { Sort } from '../components/Sort';
// import { useTaskPeriod } from '../composables/taskList'
import dayjs, { type Dayjs } from 'dayjs'

// tasksheetの項目定義
const { taskTitle, taskDescription, taskPIC, taskPeriodStart, taskPeriodEnd, taskPeriod, taskStatus, taskPriority, adjustEndDateStr } = taskDefinition()
// taskList
const { taskList } = taskDefinition()

// sort.tsで定義
const { sortPriority, sortDay, sortChanged } = getSortValue()


// 初めにlocalStorageからtaskListに入れる
onMounted(() => {
  taskListPushLocalStorage()
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

const dayState = reactive({
  startMonth: '2023/10',/* 初めの月 */
  endMonth: '2024/1',/* 終わりの月 */
  blockNumber: 0,/* ブロック数 */
  calendars: [] as calendar[], /* 各月の情報が入る */
  // monthlyDayList: [] as eachDay[] /* 各月の1日ごとの情報(日付、曜日、ブロック数) */
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

// 関数化

const getTaskPeriod = (index: number) => {
  // チャートスタートの日時
  const chartStartDay = new Date(`${dayState.startMonth}/1`)
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
    right: `-${startBlock * BLOCK_SIZE + 5}px`
  }
}

// =====================================================

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
let newEndDateStr: string

const mousedown = (e: MouseEvent, index: number) => {
  // クリックした場所の座標
  const clickX = e.clientX
  // 伸び縮みさせる要素
  const adjustEl = e.target as HTMLElement
  // マウスポインターの形を変える
  adjustEl.style.cursor = 'ew-resize'
  // 伸ばす要素の位置情報
  const adjustElRect = adjustEl.getBoundingClientRect();
  // 伸ばす要素の左端の座標
  const adjustElRectLeft = adjustElRect.left
  // 伸ばす要素の右端の座標
  const adjustElRectRight = adjustElRect.right

  // チャートサイズを調整する関数
  const adjustElSize = (e: MouseEvent) => {

    // 現在の座標
    const currentX = e.clientX
    // 移動した距離
    const moveXSize = currentX - adjustElRectRight
    // 距離を切り上げブロック数で計算する
    const numberOfBlock = Math.ceil(moveXSize / BLOCK_SIZE)
    // 伸ばす距離(BLOCK_SIZEごと)
    const adjustSize = adjustElRect.width + (numberOfBlock * BLOCK_SIZE)
    // 期間の終了日
    const adjustEndDate = new Date(taskList.value[index].period.split(' 〜 ')[1])
    // 終了日をnumberOfBlockに合わせ1日ずつ増やす
    adjustEndDate.setDate(adjustEndDate.getDate() + numberOfBlock);
    
    // -の文字列に変更
    newEndDateStr = `${adjustEndDate.getFullYear()}-${String(adjustEndDate.getMonth() + 1).padStart(2, '0')}-${String(adjustEndDate.getDate()).padStart(2, '0')}`;

    // BLOCK_SIZEを１つ分は確保
    if (adjustSize >= BLOCK_SIZE) {
      // チャートの幅を変更
      adjustEl.style.width = `${adjustSize}px`
    } else if (adjustSize < BLOCK_SIZE){
      console.log('a')
    }
  }

  // 要素の右側20px範囲内をclickすると
  if (adjustElRectRight - clickX < 20) {

    window.addEventListener('mousemove', adjustElSize)

    window.addEventListener('mouseup', () => {
      // taskPeriodEnd.value = adjustEndDateStr
      adjustEndDateStr(newEndDateStr);
      // HTMLのstatusSortDataに反映させる
      statusSortData.value[index].period = taskPeriod.value
      // ポインターの変更
      adjustEl.style.cursor = 'pointer'
      window.removeEventListener('mousemove', adjustElSize)
    })
  } else if (adjustElRectLeft - clickX < 20) {

  }
}

const onChangeSortPriority = (value: string) => {
  sortPriority.value = value
  changeSortPriority(sortPriority, sortChanged);
}

const onChangeSortDay = (value: string) => {
  sortDay.value = value
  changeSortDay(sortDay, sortChanged);
}

</script>



<template>
  <div>
    <div class="container">
      <Header />
      <Sort
      @changeSortPriority="onChangeSortPriority"
      @changeSortDay="onChangeSortDay"
      />
      <div class="taskGantt">
        <div class="taskZorn">
          <ul class="taskHeading">
            <li class="taskTitle">タイトル</li>
            <li class="taskPIC">担当者</li>
            <li class="taskPeriod">期間</li>
            <li class="taskStatus">状態</li>
            <li class="taskPriority">優先度</li>
          </ul>

          <ul class="taskItem" v-for="(task, index) in statusSortData" :key="index"
            :style="{ backgroundColor: getTaskColor(task.status) }">
            <li class="taskTitle">{{ task.title }}</li>
            <li class="taskPIC">{{ task.PIC }}</li>
            <!-- <li class="taskPeriod">{{ task.taskPeriodStart }}</li> -->
            <li class="taskPeriod">{{ task.period }}</li>
            <li class="taskStatus">{{ task.status }}</li>
            <li class="taskPriority" :style="{ 'backgroundColor': getPriorityColor(task.priority) }">
              {{ task.priority }}</li>
            <li class="block" :style="getTaskPeriod(index)" @mousedown="mousedown($event, index)">
            </li>
          </ul>
        </div>
        <div class="calendarZorn">
          <div class="month">
            <div class="monthItem" v-for="(calendar, index) in dayState.calendars">
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

