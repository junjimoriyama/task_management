import { TaskList } from './taskList'

const { taskList } = taskDefinition()

// 検索バーの表示・非表示切り替え
export const isShowSearch = useState<boolean>('isShowSearch', () => true)

// 検索バーの表示・非表示切り替えメソッド
export const changeIsSearch = (display: boolean) => {
	const isShowSearch = useState<boolean>('isShowSearch', () => true)
  isShowSearch.value = display
}

// 検索ワード(v-model)
export const searchWord = ref('森山')

// 検索機能でヒットしたtask
// export const searchHitTaskList = ref<TaskList[]>(taskList.value)

// キーワード検索行う
/* キーワードに合うtaskを絞る */
export const searchForWords = (word: string): TaskList[] => {
  if (word) {
    // 検索ボックスに何か文字が入力されている場合
    return taskList.value.filter(task => 
      task.title?.includes(word) ||
      task.description?.includes(word) ||
      task.period?.includes(word) ||
      task.PIC?.includes(word) ||
      task.status?.includes(word) ||
      task.priority?.includes(word) ||
      task.member?.includes(word)
    );
  } else {
    // 検索ボックスが空白かそれ以外（undefined, nullなど）の場合は全てのタスクを表示
    return taskList.value;
  }
};
