export const currentSelectedTaskID = useState('currentSelectedTaskID', () => 0)

// task編集のフラグ
export const isEditTask = useState('isEditTask', () => false)
// 引数は複数でもOK
export const editTaskMode = (status: boolean, taskID: number) => {
	isEditTask.value = status
	currentSelectedTaskID.value = taskID
}