// tasksheetの項目定義
const { taskTitle, taskDescription, taskPIC, taskPeriodStart, taskPeriodEnd, taskPeriod, taskStatus, taskPriority } = taskDefinition()
// import dayjs, { type Dayjs } from 'dayjs'

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


const todays = new Date()

const years = todays.getFullYear()
console.log(todays.getDate())

// tasksheetの項目定義
export function taskDefinition() {
	// 新しいDateオブジェクトを作成
// 今日の日付を取得して初期値とする ===============================
const today = new Date();
// 年、月、日を取得
const year = today.getFullYear();
const month = today.getMonth() + 1; // 月は0から始まるので1を加える
const day = today.getDate();
// 日付をYYYY-MM-DD形式でフォーマット
const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
//  ===========================================================

	const taskList = useState<TaskList[]>('TaskList', () => [])
	
	const changeTaskListData = <K extends TaskListKey>(index: number, key: K, value: TaskList[K]) => {
		taskList.value[index][key] = value
	}
	const taskTitle = ref('')
	const taskDescription = ref('')
	const taskPIC = ref('')
	// メソッドで書き変えるにはuseStateが必要
	const taskPeriodStart = useState('taskPeriodStart', () => formattedDate)
	const taskPeriodEnd = useState('taskPeriodEnd', () => formattedDate)
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
