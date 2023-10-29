
export const profileData = () => {
  const profileName = useState('profileName', () => 'myName')
  const profileEmail = useState('profileEmail', () => 'myEmail')
 
  // const changeProfileName = (e: Event) => {
  //   if(e.target) {
  //     const target = e.target as  HTMLInputElement
  //     profileName.value = target.value
  //   }
  // }
  // const changeProfileEmail = (newProfileEmail: string) => {
  //   // profileEmail.value = newProfileEmail
  // }

  return {
    profileName,
    profileEmail,
    // changeProfileName,
    // changeProfileEmail
  }
}

