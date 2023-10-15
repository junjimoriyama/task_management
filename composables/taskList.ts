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

	// 日付を「/」表記にする関数
	// function formatData(dataStr: string) {
	// 	// YYYY-MM-DDの表記それぞれを変数へ
	// 	const [year, month, day] = dataStr.split('-')
	// 	// 日付を整数表示へ
	// 	return `${year}-${parseInt(month)}-${parseInt(day)}`
	// }

	

	// const changeTaskPeriod = (taskIndex: number, newStart: string, newEnd: string) => {
	// 	taskList.value[taskIndex].taskPeriodStart = newStart;
	// 	taskList.value[taskIndex].taskPeriodEnd = newEnd;
	// };
	
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

// export function useTaskPeriod() {

// 	// const adjustEndDateStr = (newEndDate: string) => {
//   //   taskPeriodEnd.value = newEndDate;
//   // };

//   return {
//     taskPeriodEnd,
//     adjustEndDateStr
//   }
// }

// export function useTaskPeriod() {

// 	const adjustEndDateStr = (newEndDate: string) => {
//     taskPeriodEnd.value = newEndDate;
//   };

//   return {
//     taskPeriodEnd,
//     adjustEndDateStr
//   }
// }

// ========================================================
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


//   // 現在の座標
//   const currentX = e.clientX
//   // 期間の開始日
//   const adjustStartDate = new Date(taskList.value[index].period.split(' 〜 ')[0])
//   // 期間の終了日
//   const adjustEndDate = new Date(taskList.value[index].period.split(' 〜 ')[1])

//   /* 右側の値 =========================================================== */
//   //右側に移動した距離
//   const moveXSizeRight = currentX - adjustElRectRight
//   // 距離を切り上げブロック数で計算する
//   const numberOfBlockRight = Math.ceil(moveXSizeRight / BLOCK_SIZE)
//   console.log(numberOfBlockRight)
//   // 右側に伸ばす距離(BLOCK_SIZEごと)
//   const adjustSizeRight = adjustElRect.width + (numberOfBlockRight * BLOCK_SIZE)
// console.log(currentX, adjustElRectRight)
//   // console.log(moveXSizeRight, numberOfBlockRight, adjustSizeRight)

//   /* 左側の値 =========================================================== */
//   //左側に移動した距離
//   const moveXSizeLeft = currentX - adjustElRectLeft
//   // 距離を切り上げブロック数で計算する
//   const numberOfBlockLeft = Math.ceil(moveXSizeLeft / BLOCK_SIZE)
//   // 左側に伸ばす距離(BLOCK_SIZEごと)
//   const adjustSizeLeft = adjustElRect.width - (numberOfBlockLeft * BLOCK_SIZE)


//   // 左側にチャートサイズを調整する関数 =======================================
//   const adjustElSizeLeft = (e: MouseEvent) => {
//     // 終了日をnumberOfBlockLeftに合わせ1日ずつ増やす
//     adjustEndDate.setDate(adjustEndDate.getDate() + numberOfBlockLeft);
//     // 新しい終了日が開始日より後であることを確認
//     if (adjustStartDate >= adjustEndDate) {
//       // -の文字列に変更
//       newEndDateStr = `${adjustEndDate.getFullYear()}-${String(adjustEndDate.getMonth() + 1).padStart(2, '0')}-${String(adjustEndDate.getDate()).padStart(2, '0')}`;
//     }
//     // BLOCK_SIZEを１つ分は確保
//     if (adjustSizeLeft >= BLOCK_SIZE) {
//       // チャートの幅を変更
//       adjustEl.style.width = `${adjustSizeLeft}px`
//     }
//   }

//   // 右側にチャートサイズを調整する関数 =======================================
//   const adjustElSizeRight = (e: MouseEvent) => {
//     console.log(adjustEndDate)
//     // 終了日をnumberOfBlockRightに合わせ1日ずつ増やす
//     adjustEndDate.setDate(adjustEndDate.getDate() + numberOfBlockRight);
//     // 新しい終了日が開始日より後であることを確認
//     if (adjustEndDate >= adjustStartDate) {
//       // -の文字列に変更
//       newEndDateStr = `${adjustEndDate.getFullYear()}-${String(adjustEndDate.getMonth() + 1).padStart(2, '0')}-${String(adjustEndDate.getDate()).padStart(2, '0')}`;
//     }
//     // BLOCK_SIZEを１つ分は確保
//     if (adjustSizeRight >= BLOCK_SIZE) {
//       // チャートの幅を変更
//       adjustEl.style.width = `${adjustSizeRight}px`
//       console.log(adjustEl.style.width)
//     }
//   }

//   // 要素の右側20px範囲内をclickすると
//   if (adjustElRectRight - clickX < 20) {

//     window.addEventListener('mousemove', adjustElSizeRight)

//     window.addEventListener('mouseup', () => {
//       // taskPeriodEnd.value = adjustEndDateStr
//       adjustEndDateStr(newEndDateStr);
//       // HTMLのstatusSortDataに反映させる
//       statusSortData.value[index].period = taskPeriod.value
//       // ポインターの変更
//       adjustEl.style.cursor = 'pointer'
//       window.removeEventListener('mousemove', adjustElSizeRight)
//     })
//   } else if (adjustElRectLeft - clickX < 20) {
//     console.log('left')
//   }
// }