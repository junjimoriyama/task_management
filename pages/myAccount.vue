<script setup lang="ts">
import { profileName, profileEmail, profileDataChange } from '../composables/profile'
import { useProfileName } from '../composables/storage'


// プロフィール画像呼び出し
onMounted(() => {
  imgUrl.value = localStorage.getItem('uploadedImg') || '';
})

// 検索ボックス非表示
changeIsSearch(false)

// 入力された値
const myName = ref('')

// 決定ボタンをクリックしたら
const doProfileDataChange = () => {
  profileDataChange(myName.value)
  useProfileName.value = myName.value
}


// =======================================

// 画像をアップロードする
const isImgUpload = ref(false)

// 画像のアップロードの可否
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
      // ローカルストレージに保存
      localStorage.setItem('uploadedImg', imgUrl.value); 
    }
     // 指定されたファイルをURL形式で読み込む
    reader.readAsDataURL(profileImg)
    
  }
}
</script>

<template>
  <div>
    <div class="container">
      <Header/>
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
            <p>名前</p>
            <input type="text" v-model="myName"
            >
          </div>
          <div class="mailAddress">
            <p>メールアドレス</p>
            <input type="email">
          </div>
          <button class="profileConfirmBtn"
          @click="doProfileDataChange"
          >決定</button>
        </div>
      </div>
    </div>
  </div>
</template>