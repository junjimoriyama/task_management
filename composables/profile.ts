// プロフィールの名前
export const profileName = useState('profileName', () => 'myName')

// プロフィールネーム変更
export const profileDataChange = (word: string) => {
  profileName.value = word
}