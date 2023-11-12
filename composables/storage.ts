// import { STORAGE_TASKLIST } from './storage';
import { TaskList } from './taskList'
import { profileName, profileEmail} from './profile'
import { useStorage } from '@vueuse/core'
const { taskList } = taskDefinition()
// localStorageのkey
export const STORAGE_TASKLIST = ref('TaskList')

// localStorageをtaskListに入れる
export const taskListPushLocalStorage = () => {
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


// プロフィール用storage
// ストレージに使用するkeyの名前を定義
export const STORAGE_PROFILE = 'profileName'

// ストレージキーを保存する変数
/* 第１引数:🔑 第２引数:初期値(ここではuseState)*/
export const useProfileName = useStorage(STORAGE_PROFILE, profileName.value)

// 画像のストレージ
export const STORAGE_PROFILE_IMG = 'profileImage'
