export type TaskList = {
	id: number,
	title: string,
	description: string,
	period: string,
	PIC: string,
	status: string,
	// label?: string
}

// taskListを定義　functionに入れないことでファイルを跨いでも変化があれば反映される
export const taskList = reactive<TaskList[]>([])

// localStorageのkey
export const STORAGE_TASKLIST = ref('TaskList')

// localStorageの箱
export const localStorageData = localStorage.getItem(STORAGE_TASKLIST.value)

// localStorageをtaskListに入れる
export function taskListPushLocalStorage() {
	if (localStorageData !== null) {
		JSON.parse(localStorageData).forEach((data: TaskList) => {
			taskList.push(data)
		})
	}
}

// tasksheetの項目定義
export function taskDefinition() {
	const taskTitle = ref('')
	const taskDescription = ref('')
	const taskPIC = ref('')
	// const label = ref('')
	const taskPeriodStart = ref('')
	const taskPeriodEnd = ref('')
	const taskPeriod = computed(() => {
		return `${taskPeriodStart.value}~${taskPeriodEnd.value}`
	})
	const taskStatus = ref('todo')

	return {
		taskTitle,
		taskDescription,
		taskPIC,
		taskPeriodStart,
		taskPeriodEnd,
		taskPeriod,
		taskStatus
	}
}


// // openMenuIndexの定義（number型かnullのどちらか）
// const openMenuIndex = ref<number | null>(null)

// // メニューを開く関数
// function taskModifyMenuOpen(index: number) {
// 	// もしopenMenuIndexがindexと同じなら閉じる
// 	if(openMenuIndex.value === index) {
// 		openMenuIndex.value = null
// 	// もしopenMenuIndexがindexと同じでなければ開く
// 	} else {
// 		openMenuIndex.value = index;
// 	}
// }