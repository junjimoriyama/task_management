<script setup>
// 検索ボックス
import { searchWord } from '../composables/search'
// profile画像
const uploadedImg = localStorage.getItem('uploadedImg')


</script>

<template>
	<div>
		<header>
			<div class="headerWrap">
				<div class="profileImg" v-if="uploadedImg">
					<img :src="uploadedImg" alt="アカウント">
				</div>
				<div class="myName">
					{{ useProfileName }}
				</div>
				<!-- メイン -->
				<div class="board">
					<nuxt-link to="/#">
						<div class="headerItem">
							<div class="headerIcon fa-solid fa-clipboard">
							</div>
							<div class="headerText">
								Todoリスト
							</div>
						</div>
					</nuxt-link>
				</div>
				<!-- チャート -->
				<div class="gantt">
					<NuxtLink to="/gantt">
						<div class="headerItem">
							<div class="headerIcon fa-solid fa-chart-gantt"></div>
							<div class="headerText">
								カレンダー
							</div>
						</div>
					</NuxtLink>
				</div>
				<!-- マイアカウント -->
				<div class="myAccount">
					<nuxt-link to="/myAccount">
						<div class="headerItem">
							<div class="headerIcon fa-solid fa-user"></div>
							<div class="headerText">
								アカウント
							</div>
						</div>
					</nuxt-link>
				</div>
				<!-- メンバー -->
				<!-- <div class="member">
					<nuxt-link to="/member">
						<div class="fa-solid fa-people-group"></div>
					</nuxt-link>
				</div> -->
				<div class="search" v-if="isShowSearch">
					<input type="text" placeholder="検索" v-model="searchWord">
					<!-- キーワード検索 -->
					<div class="fa-solid fa-magnifying-glass"></div>
					<!-- <div class="searchBtn" >検索</div> -->
				</div>
			</div>
		</header>
	</div>
</template>