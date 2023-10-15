// import { TaskList } from './../class/taskSheet';

// tasksheetの項目定義
const { taskTitle, taskDescription, taskPIC, taskPeriodStart, taskPeriodEnd, taskPeriod, taskStatus, taskPriority } = taskDefinition()

const { taskList } = taskDefinition()

// 編集モード
export const editTaskMode = (isEditTask: Ref<boolean>, currentSelectedTaskID: Ref<number | null>) => (status: boolean, newID: number) => {
  isEditTask.value = status
  currentSelectedTaskID.value = newID
}

// 状態管理を一元管理
export const useSharedEditTaskMode = () => {
  const isEditTask = useState('isEditTask', () => false)
  const currentSelectedTaskID = useState<number | null>('currentSelectedTaskID', () => null)
  // readonlyにすると他の場所で値の変更不可
  return {
    isEditTask,
    currentSelectedTaskID,
    editTaskMode: editTaskMode(isEditTask, currentSelectedTaskID),
    // setIsEditTaskState: setIsEditTaskState(isEditTask),
  }
}


// 優先度により色を変える
export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case '高':
      return 'red';
    case '中':
      return 'darkorange';
    case '低':
      return 'gold';
    default:
      return 'gray';
  }
}

