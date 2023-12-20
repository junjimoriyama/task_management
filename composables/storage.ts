// import { STORAGE_TASKLIST } from './storage';
import type { TaskList } from './taskList'
import { profileName, profileEmail} from './profile'
// メンバー
// import { memberList} from './member'
import { useStorage } from '@vueuse/core'
const { taskList } = taskDefinition()
// localStorageのkey
export const STORAGE_TASKLIST = ref('TaskList')

// localStorageをtaskListに入れる
export const taskListPushLocalStorage = () => {
  const localStorageData = localStorage.getItem(STORAGE_TASKLIST.value)

  // 一度空にしないとmountedされる度に追加されることがある。
  taskList.value.length = 0
  if(localStorageData !== null) {
		const parsedData = JSON.parse(localStorageData)
		// 配列であるかチェック
		if(Array.isArray(parsedData)) {
			parsedData.forEach((data: TaskList) => {
				taskList.value.push(data)
			})
		}
	}
  return {
    localStorageData
  }
}

// メンバー 一覧
export const STORAGE_MEMBERS = 'members'
// メンバーのローカルストレージ
export const useMember = useStorage(STORAGE_MEMBERS, [''])

// 役割 一覧
export const STORAGE_ROLE = 'role'
export const useRole = useStorage(STORAGE_ROLE, [''])

export const  STORAGE_SELECTED_ROLE = 'memberRoles'
export const useMemberRoles: Ref<Record<string, string[]>> = ref({})



// プロフィール用storage
// ストレージに使用するkeyの名前を定義
export const STORAGE_PROFILE = 'profileName'

// ストレージキーを保存する変数
/* 第１引数:🔑 第２引数:初期値(ここではuseState)*/
export const useProfileName = useStorage(STORAGE_PROFILE, profileName.value)

// 画像のストレージ
export const STORAGE_PROFILE_IMG = 'profileImage'
