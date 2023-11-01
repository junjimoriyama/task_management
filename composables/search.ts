const { taskList } = taskDefinition()

export const searchHitTaskList = ref(taskList.value)

// // キーワード検索行う
// export const searchForWords = (word: string) => {
// 	if(word === '') {
// 		searchHitTaskList.value = taskList.value
// 	} else {
// 		searchHitTaskList.value = taskList.value.filter(task => 
// 		task.title?.includes(word) ||
// 		task.description?.includes(word) ||
// 		task.period?.includes(word) ||
// 		task.PIC?.includes(word) ||
// 		task.status?.includes(word) ||
// 		task.priority?.includes(word) ||
// 		task.member?.includes(word) 
// 		)
// 	}
//   console.log(searchHitTaskList.value)
//  return searchHitTaskList.value
// };