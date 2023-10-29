<script setup>

// 検索ワード(v-model)
const searchWord = ref('森山')
// emit定義
const emit = defineEmits(['searchForWords'])
// searchForWords関数定義(検索ワードを親に渡す)
const serchBtnClicked = (word) => {
	emit('searchForWords', searchWord.value)
	console.log(searchWord.value)
}

// const searchInput = () => {
// 	emit('changeSearchBoolean')
// }

</script>

<template>
	<div>
		<header>
			<div class="headerWrap">
				<!-- メイン -->
				<div class="board">
					<nuxt-link to="/#">
						<div class="fa-solid fa-clipboard"></div>
					</nuxt-link>
				</div>
				<!-- チャート -->
				<div class="gantt">
					<NuxtLink to="/gantt"><div class="fa-solid fa-chart-gantt"></div></NuxtLink>
				</div>
				<!-- マイアカウント -->
				<div class="myAccount">
					<nuxt-link to="/myAccount">
						<div class="fa-solid fa-user"></div>
					</nuxt-link>
				</div>
				<div class="search">
					<input type="text" placeholder="検索" v-model="searchWord">
					<!-- キーワード検索 -->
					<div class="fa-solid fa-magnifying-glass"></div>
					<div class="searchBtn" @click="serchBtnClicked()">検索</div>
				</div>
				<!-- <div class="chart">
						<NuxtLink to="/chart"><i class="fa-solid fa-chart-gantt"></i></NuxtLink>
				</div> -->
			</div>

		</header>
	</div>
</template>