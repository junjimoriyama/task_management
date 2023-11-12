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
	member: string
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
	const taskPriority = ref('低')
	const taskMember = ref('名無し')

	// 期間始まりのデータを書き換えるメソッド
	const adjustStartDateStr = (newStartDate: string) => {
		taskPeriodStart.value = newStartDate;
	}
	// 期間終わりのデータを書き換えるメソッド
	const adjustEndDateStr = (newEndDate: string) => {
    taskPeriodEnd.value = newEndDate;
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
		taskMember,
		adjustEndDateStr,
		adjustStartDateStr
	}
}
