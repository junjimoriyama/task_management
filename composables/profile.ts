// プロフィールの名前
export const profileName = useState('profileName', () => 'myName')

export const profileEmail = useState('profileEmail', () => 'myEmail')

// プロフィールネーム変更
export const profileDataChange = (word: string) => {
  profileName.value = word
}

