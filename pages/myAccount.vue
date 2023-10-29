<script setup lang="ts">
// profileName
// import { profileData } from '../composables/profile'

// const { profileName, profileEmail, changeProfileName, changeProfileEmail } = profileData()


/* v-model ==============================*/

const profileName = ref('myName')

const emit = defineEmits([])

const changeProfileName = (e: Event) => {
  const target = e.target as HTMLInputElement
  console.log(target.value)
}

// =======================================

const isImgUpload = ref(false)

const imgUpload = () => {
  isImgUpload.value = !isImgUpload.value
}

// imgURLの初期値
const imgUrl = ref('')

// 画像を選択したら(eはファイル変更時のイベントobj)
const onImgChange = (changeEvent: Event) => {
  // e.target変数化
  const target = changeEvent.target as HTMLInputElement
  // もしe.targetのファイルがあれば
  if(target.files) {
    // 初めに選んだファイル変数化
    const profileImg = target.files[0]
    // 読み込みobjの初期化
    const reader = new FileReader
    // ファイルが読み込まれたら実行(eは読み込みを完了した時に発生するイベントobj)
    reader.onload = (loadEvent: ProgressEvent<FileReader>) => {
      // string型であれば
      if(typeof loadEvent.target?.result === 'string')
      // imgUrlに結果を読み込んだファイルデータを代入
      imgUrl.value = loadEvent.target?.result
    }
     // 指定されたファイルをURL形式で読み込む
    reader.readAsDataURL(profileImg)
  }
}

// const profileName = ref('森山')

</script>

<template>
  <div>
    <div class="container">
      <div class="myProfile">
        <div class="profileImg" @click="imgUpload">
          <img v-if="imgUrl" class="imgDisplay" :src="imgUrl" alt="profileImg">
          
          <div class="imgUpload" v-show="isImgUpload">
            <label for="imgUploadBtn">
              <!-- ファイルを選択というボタンを表示させない -->
              <input id="imgUploadBtn" type="file" style="display: none;" accept=".jpg, .jpeg, .png, .gif" 
              @change="onImgChange">
              画像をアップロード
            </label>
          </div>
        </div>
        <div class="profileData">
          <div class="userName">
            名前<br>
            <!-- <input type="text"
            @input="changeProfileName($event)"
            > -->
            <input type="text" v-model="profileName"
            @input="changeProfileName($event)" 
            >
           
          </div>
          <div class="mailAddress">
            メールアドレス<br>
            <!-- <input type="email" v-model="inputProfileEmail"> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>