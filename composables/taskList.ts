// tasksheetの項目定義
const { taskTitle, taskDescription, taskPIC, taskPeriodStart, taskPeriodEnd, taskPeriod, taskStatus, taskPriority } = taskDefinition()

export type TaskList = {
	id: number,
	title: string,
	description: string,
	period: string,
	PIC: string,
	status: string,
	priority: string,
	// color: string
}

type TaskListKey = keyof TaskList;

// tasksheetの項目定義
export function taskDefinition() {
	// const taskList = reactive<TaskList[]>([])
	const taskList = useState<TaskList[]>('TaskList', () => [])
	
	const changeTaskListData = <K extends TaskListKey>(index: number, key: K, value: TaskList[K]) => {
		taskList.value[index][key] = value
	}
	const taskTitle = ref('')
	const taskDescription = ref('')
	const taskPIC = ref('')
	// メソッドで書き変えるにはuseStateが必要
	const taskPeriodStart = useState('taskPeriodStart', () => '2023-10-01')
	const taskPeriodEnd = useState('taskPeriodEnd', () => '2023-10-31')
	const taskPeriod = computed(() => {
		return `${taskPeriodStart.value} 〜 ${taskPeriodEnd.value}`
	})
	const taskStatus = ref('todo')
	const taskPriority = ref('優先度「高」')

	// 期間終わりのデータを書き換えるメソッド
	const adjustEndDateStr = (newEndDate: string) => {
    taskPeriodEnd.value = newEndDate;
  };

	const adjustStartDateStr = (newStartDate: string) => {
		taskPeriodEnd.value = newStartDate;
	}
	return {
		taskList,
		changeTaskListData,
		taskTitle,
		taskDescription,
		taskPIC,
		taskPeriodStart,
		taskPeriodEnd,
		taskPeriod,
		taskStatus,
		taskPriority,
		adjustEndDateStr
		// changeTaskPeriod
		// getPriorityColor
	}
}

// let newEndDateStr: string

// const mousedown = (e: MouseEvent, index: number) => {
//   // クリックした場所の座標
//   const clickX = e.clientX
//   // 伸び縮みさせる要素
//   const adjustEl = e.target as HTMLElement
//   // マウスポインターの形を変える
//   adjustEl.style.cursor = 'ew-resize'
//   // 伸ばす要素の位置情報
//   const adjustElRect = adjustEl.getBoundingClientRect();
//   // 伸ばす要素の左端の座標
//   const adjustElRectLeft = adjustElRect.left
//   // 伸ばす要素の右端の座標
//   const adjustElRectRight = adjustElRect.right

//   // 右側20pxでのmouseイベント
//   const isRight = adjustElRectRight - clickX < 20
//   // 左側20pxでのmouseイベント
//   const isLeft = adjustElRectLeft - clickX < 20


//   // チャートサイズを調整する関数
//   const adjustElSize = (e: MouseEvent, side: number, isLeft: boolean) => {
//     // 現在の座標
//     const currentX = e.clientX
//     // 移動した距離
//     const moveXSize = currentX - side
//     // 距離を切り上げブロック数で計算する
//     const numberOfBlock = Math.ceil(moveXSize / BLOCK_SIZE)
//     // 伸ばす距離(BLOCK_SIZEごと)
//     const adjustSize = adjustElRect.width + (numberOfBlock * BLOCK_SIZE)
//     // 期間の終了日
//     const adjustStartDate = new Date(taskList.value[index].period.split(' 〜 ')[0])
//     const adjustEndDate = new Date(taskList.value[index].period.split(' 〜 ')[1])

//     if(isLeft) {
//       adjustStartDate.setDate(adjustStartDate.getDate() - numberOfBlock)
//     } else {
//       // 終了日をnumberOfBlockに合わせ1日ずつ増やす
//       adjustEndDate.setDate(adjustEndDate.getDate() + numberOfBlock);
//     }
    
//     if(adjustStartDate < adjustEndDate) {
//       // -の文字列に変更
//       newEndDateStr = `${adjustEndDate.getFullYear()}-${String(adjustEndDate.getMonth() + 1).padStart(2, '0')}-${String(adjustEndDate.getDate()).padStart(2, '0')}`;
//     }

//     // BLOCK_SIZEを１つ分は確保
//     if (adjustSize >= BLOCK_SIZE) {
//       // チャートの幅を変更
//       adjustEl.style.width = `${adjustSize}px`
//     } else if (adjustSize < BLOCK_SIZE){

//     }
//   }

  
//   // 要素の右側20px範囲内をclickすると
//   if (isRight) {
//     const mouseMoveEventRight = (e: MouseEvent) => adjustElSize(e, adjustElRectRight, true)
//     // window.addEventListener('mousemove', (e) => adjustElSize(e, adjustElRectRight))
//     const mouseupEvent = () => {
//       adjustEndDateStr(newEndDateStr);
//       // HTMLのstatusSortDataに反映させる
//       statusSortData.value[index].period = taskPeriod.value
//       // ポインターの変更
//       adjustEl.style.cursor = 'pointer'
//       // mousemoveイベント削除
//       window.removeEventListener('mousemove',mouseMoveEventRight )
//       // mouseupイベント削除
//       window.removeEventListener('mouseup', mouseupEvent)
//     }
//     // mousemoveイベント追加
//     window.addEventListener('mousemove', mouseMoveEventRight)
//     // mouseupイベント追加
//     window.addEventListener('mouseup', mouseupEvent)
//   } else if (isLeft) {
//     const mouseMoveEventLeft = (e: MouseEvent) => adjustElSize(e, adjustElRectLeft, true)
//   const mouseupEvent = () => {
//     adjustEndDateStr(newEndDateStr);
//     // ...
//     window.removeEventListener('mousemove', mouseMoveEventLeft)
//     window.removeEventListener('mouseup', mouseupEvent)
//   }
//   window.addEventListener('mousemove', mouseMoveEventLeft)
//   window.addEventListener('mouseup', mouseupEvent)
//   }
// }