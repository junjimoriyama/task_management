<script setup lang="ts">
import { common, TaskSheet } from '../composables/common'
import Header from '../components/Header.vue'

const { taskList } = common()

// const database:[] = reactive([])

// tasksheet表示非表示
const isSheetDisplay = ref(false)
// tasksheet追加
function addTask() {
	isSheetDisplay.value = true
}
// tasksheet非表示
function closeSheet() {
	isSheetDisplay.value = false
}
</script>

<template>
	<div>
		<div class="container">
			<Header />
			<Sheet v-if="isSheetDisplay"
			@close-sheet="closeSheet"
			/>
			<!-- @input-TaskTitle="inputTaskTitle" -->
			<main>
				<div class="task">
					<div class="TodoArea">
						<div class="heading">
							<div class="listName">Todoリスト<span class="countList">
									1
								</span>
							</div>
							<div class="fa-solid fa-ellipsis"></div>
						</div>
						<div class="taskMenu" @click="addTask">
							<div class="addTaskBtn fa-regular fa-square-plus">
								タスクを追加
							</div>
						</div>
					</div>
					<div class="progressionArea">
						<div class="heading">
							<div class="listName">進行中リスト<span class="countList">
									1
								</span>
							</div>
							<div class="fa-solid fa-ellipsis"></div>
						</div>
						<div class="taskMenu" @click="addTask">
							<div class="addTaskBtn fa-regular fa-square-plus">
								タスクを追加
							</div>
						</div>
					</div>
					<div class="completionArea">
						<div class="heading">
							<div class="listName">完了リスト<span class="countList">
									1
								</span>
							</div>
							<div class="fa-solid fa-ellipsis"></div>
						</div>
						<div class="taskMenu" @click="addTask">
							<div class="addTaskBtn fa-regular fa-square-plus">
								タスクを追加
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	</div>
</template>

<!-- npm install -g firebase-tools -->