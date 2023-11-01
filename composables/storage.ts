import { TaskList } from './taskList'
const { taskList } = taskDefinition()
// localStorageのkey
export const STORAGE_TASKLIST = ref('TaskList')

// localStorageをtaskListに入れる
export function taskListPushLocalStorage() {
	const localStorageData = localStorage.getItem(STORAGE_TASKLIST.value)

	// 一度空にしないとmountedされる度に追加されることがある。
	taskList.value.length = 0
	if (localStorageData !== null) {
		JSON.parse(localStorageData).forEach((data: TaskList) => {
			taskList.value.push(data)
		})
	}
	return {
		localStorageData
	}
}