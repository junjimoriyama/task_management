<!-- <script setup lang='ts'>
// ストレージ
import { STORAGE_MEMBERS, useMember } from '../composables/storage'
// メンバー
import { memberListChange } from '../composables/member'

// 検索ボックス非表示
changeIsSearch(false)

// メンバー追加入力欄表示非表示フラグ
const isAddMemberInputShow = ref(false)
// メンバー入力欄表示ボタン　表示
const isAddBtnHide = ref(true)
// メンバー入力欄非表示ボタン　非表示
const isMinusBtnHide = ref(false)
// 入力された名前
const addMemberName = ref('')
// すでに追加済みであることを知らせる
const isDoneMemberName = ref(false)
// 空であることを知らせる
const isAddNameBlanc = ref(false)

// メンバー入力欄表示切り替え
const toggleMemberInput = () => {
  // 入力欄の表示非表示切り替え
  isAddMemberInputShow.value = !isAddMemberInputShow.value
  // ＋ボタン 表示非表示
  isAddBtnHide.value = !isAddBtnHide.value
  // -ボタン　表示非表示
  isMinusBtnHide.value = !isMinusBtnHide.value

  // 警告文の非表示
  isDoneMemberName.value = false
  isAddNameBlanc.value = false
}

const addMemberDecision = () => {
  // 値があり追加した人と同じ名前が含まれていなければ
  if (addMemberName.value && !useMember.value.includes(addMemberName.value)) {
    // メンバーを追加
    memberListChange(addMemberName.value)
    // 入力欄を空にする
    addMemberName.value = ''
  }
  // 値があり追加した人と同じ名前があれば
  else if (addMemberName.value && useMember.value.includes(addMemberName.value)) {
    
    // すでに同じ名前登録済み文章の表示
    isDoneMemberName.value = true
  }
  // 入力された文字が空なら
  else if (addMemberName.value === '') {
    // 空文字であること表示させる
    isAddNameBlanc.value = true
  }
}

// メンバーすでに追加の文章消す
const doneMemberErase = () => {
  isAddNameBlanc.value = false
  // すでに同じ名前登録済み文章の非表示
  isDoneMemberName.value = false
}

// メンバー削除
const deleteMember = (index: number) => {
  useMember.value.splice(index, 1)
}


// 役割のモーダル =================================
// 入力した役割の名前
const addRoleName = ref('')

// メンバー追加入力欄表示非表示フラグ
const isAddRoleInputShow = ref(false)
// メンバー入力欄表示ボタン　表示
const isAddRoleBtnHide = ref(true)
// メンバー入力欄非表示ボタン　非表示
const isMinusRoleBtnHide = ref(false)
// 入力された名前
// const addMemberName = ref('')
// すでに追加済みであることを知らせる
const isDoneRoleName = ref(false)
// 空であることを知らせる
const isAddRoleBlanc = ref(false)

// 役割追加決定ボタン押したら
const addRoleDecision = () => {
  // 登録されている値に入力した値とがなければ
  if(addRoleName.value && !useRole.value.includes(addRoleName.value)) {
    // 役割追加
    roleListChange(addRoleName.value)
    // 役割入力欄追加
    addRoleName.value = '';
  } else if (addRoleName.value && useRole.value.includes(addRoleName.value)) {
    // すでに同じ名前登録済み文章の表示
    isDoneRoleName.value = true
  }
  // 入力された文字が空なら
  else if (addRoleName.value === '') {
    // 空文字であること表示させる
    isAddRoleBlanc.value = true
  }
}

// 役割を削除する
const deleteRole = (index: number) => {
  useRole.value.splice(index, 1)
}



// メンバー入力欄表示切り替え
const toggleRoleInput = () => {
  // 入力欄の表示非表示切り替え
  isAddRoleInputShow.value = !isAddRoleInputShow.value
  // ＋ボタン 表示非表示
  isAddRoleBtnHide.value = !isAddRoleBtnHide.value
  // -ボタン　表示非表示
  isMinusRoleBtnHide.value = !isMinusRoleBtnHide.value

  // 警告文の非表示
  isDoneRoleName.value = false
  isAddRoleBlanc.value = false
}


</script>

<template>
  <div class="container">
    <Header @searchForWords="searchForWords" />
    <!-- メンバー -->
    <div class="list memberWrap">
      <p class="title">メンバー 一覧</p>
      <TransitionGroup name="list" tag="ul"
      class="list"
      >
        <li v-for="(member, index) in useMember" :key="member">
          <NuxtLink :to="`/team/${member}`">{{ member }}</NuxtLink>
          <div class="fa-solid fa-xmark" @click="deleteMember(index)"></div>
        </li>
      </TransitionGroup>
      <div class="form">
        <input type="text" class="input" v-show="isAddMemberInputShow" v-model="addMemberName"
          placeholder="追加するメンバー" @input="doneMemberErase">
        <button class="decisionBtn" v-show="isAddMemberInputShow" @click="addMemberDecision">決定</button>
      </div>
      <p class="doneName" v-show="isDoneMemberName">すでに追加しています</p>
      <p class="blanc" v-show="isAddNameBlanc">名前を入力してください。</p>
      <div class="fa-regular fa-square-plus toggleBtn" v-show="isAddBtnHide" @click="toggleMemberInput">
        メンバー</div>
      <div class="fa-regular fa-square-minus toggleBtn" v-show="isMinusBtnHide" @click="toggleMemberInput">
      </div>
    </div>

    <div class="roleWrap">
      <p class="title">役割 一覧</p>
      <TransitionGroup name="list" tag="ul" class="list roleList">
        <li v-for="(role, index) in useRole" :key="role">
          {{ role }}
          <div class="fa-solid fa-xmark" @click="deleteRole(index)"></div>
        </li>
      </TransitionGroup>

      <div class="form">
        <input type="text" class="input" v-model="addRoleName" v-show="isAddRoleInputShow">
  
        <button class="decisionBtn" v-show="isAddRoleInputShow" @click="addRoleDecision">決定</button>
      </div>
      <p class="doneName" v-show="isDoneRoleName">すでに追加しています</p>
      <p class="blanc" v-show="isAddRoleBlanc">役割を入力してください。</p>
      <!-- 役割追加 -->
      <!-- 役割追加欄　表示 -->
      <div class="fa-regular  fa-square-plus toggleBtn" v-show="isAddRoleBtnHide" @click="toggleRoleInput"> 役割
      </div>
      <!-- 役割追加欄　非表示 -->
      <div class="fa-regular fa-square-minus toggleBtn" v-show="isMinusRoleBtnHide" @click="toggleRoleInput">
      </div>
    </div>
  </div>
</template> -->