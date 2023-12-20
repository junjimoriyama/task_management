<script setup lang='ts'>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
// ストレージ
import { useRole } from '../../composables/storage'
// 役割の追加
import { roleListChange } from '../../composables/role'
import { changeIsSearch, searchForWords } from '../../composables/search'

import { taskDefinition } from '../../composables/taskList'
const { taskList } = taskDefinition()

// 検索ボックス非表示
changeIsSearch(false)

// ストレージ
// メンバー
// import { useRole} from '../../composables/role'

// 入力した役割の名前
const addRoleName = ref('')

const route = useRoute()

const member = route.params.member

const addRoleList = () => {
  // 役割リストに追加
  roleListChange(addRoleName.value)
}

// 役割を削除する
const deleteRole = (index: number) => {
  useRole.value.splice(index, 1)
}


</script>

<template>
  <div class="container">
    <Header @searchForWords="searchForWords"/>
    <div class="teamMember">
      <div class="eachMember">
        <p>メンバー名 : {{ member }}</p>
        <p>役割 : {{  }}</p>
        
      </div>
      <!-- 役割 -->
        <div class="role">
          <p class="title">役割 一覧</p>
          

          {{ taskList }}
          <ul class="roleList">
            <li v-for="(role, index) in useRole" :key="role">
              {{ role }}
              <div class="fa-solid fa-xmark"
          @click="deleteRole(index)"
          ></div>
            </li>
          </ul>
          <input type="text" class="addRoleInput"
          v-model="addRoleName">
          <button class="roleConfirmBtn"
          @click="addRoleList"
            >追加</button>
            <!-- @click="addRoleConfirm" -->
        </div>
    </div>
  

    </div>
</template>