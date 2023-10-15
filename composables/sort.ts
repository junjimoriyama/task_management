// taskList(reactive)
const { taskList } = taskDefinition()

// 優先度
export  const priorityOrder = ['高', '中', '低']

// 並べ替えに関わる値(v-model)
export const getSortValue = () => {
  // 優先度 値の初期値
  const sortPriority = ref('toHigh')
  // 日付順 値の初期値
  const sortDay = ref('close')
  // changeイベント実行 初期値
  const sortChanged = ref(false)

  return {
    sortPriority,
    sortDay,
    sortChanged
  }
}

// 優先度による並べ替え実行
export const changeSortPriority = (sortPriority: Ref<string>, sortChanged: Ref<boolean>) => {
	taskList.value.sort((a, b) => {
	// changeイベント:true
	sortChanged.value = true
		// 優先度比較用変数
		const priorityA = priorityOrder.indexOf(a.priority)
		const priorityB = priorityOrder.indexOf(b.priority)
		// 優先度高い順へ
		if (sortPriority.value === 'toHigh') {
			return priorityA - priorityB
			// 優先度低い順へ
		} else if (sortPriority.value === 'toLow') {
			return priorityB - priorityA
			// 変更なし
		} else {
			return 0
		}
	})
}
// 日付による並べ替え実行
export const changeSortDay = (sortDay: Ref<string>, sortChanged: Ref<boolean>) => {
	taskList.value.sort((a, b) => {
		// changeイベント:true
		sortChanged.value = true
		// 日付順比較用変数
		const endDateA = new Date(a.period.split(' 〜 ')[1])
		const endDateB = new Date(b.period.split(' 〜 ')[1])
		// 日付を近い順へ
		if (sortDay.value === 'close') {
			return endDateA.getTime() - endDateB.getTime()
			// 日付を遠い順へ
		} else if (sortDay.value === 'far') {
			return endDateB.getTime() - endDateA.getTime()
			// 変更なし
		} else {
			return 0
		}
	})
}