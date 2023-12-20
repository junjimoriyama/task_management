
//　メンバーのローカルストレージを書き換える
export const memberListChange = (member: string) => {
  // ローカルストレージを直接書き換える
  useMember.value.push(member)
}

//　役割のローカルストレージを書き換える
export const roleListChange = (role: string) => {
  // ローカルストレージを直接書き換える
  useRole.value.push(role)
}

export type MemberRole = {
  name: string,
  role: string[],
}



