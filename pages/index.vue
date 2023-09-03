<script setup lang="ts">
import { TaskList, taskList, taskListPushLocalStorage } from '../composables/common'
import Header from '../components/Header.vue'
import { isShowAddModal, changeShowAddModal } from '../composables/componentStatus'

// tasksheetの項目定義
const { taskTitle, taskDescription, taskPIC, taskPeriodStart, taskPeriodEnd, taskPeriod, taskStatus} = taskDefinition()

// 初めにlocalStorageからtaskListに入れる
onMounted(() => {
	taskListPushLocalStorage()
})

// taskListに変化があればlocalStorageに反映させる
watch(taskList, () => {
	localStorage.setItem(STORAGE_TASKLIST.value, JSON.stringify(taskList))
})

// tasksheet追加
function addTask() {
	changeShowAddModal(true)
}
// ジェネリックス記法（型の変数化）
const currentTask = ref<TaskList | null>(null)

// task編集
function editTask(editSelectedTask: TaskList) {
currentTask.value = editSelectedTask
}


</script>

<template>
	<div>
		<div class="container">
			<Header />
			<SheetFormat v-if="isShowAddModal"
			/>
			<!-- @onEdit="editTask" -->
			<main>
				<div class="task">
					<div class="TodoArea">
						<div class="heading">
							<div class="listName">Todoリスト<span class="countList">
									{{ taskList.length }}
								</span>
							</div>
							<div class="fa-solid fa-ellipsis"></div>
						</div>
						<div class="taskMenu" @click="addTask">
							<div class="addTaskBtn fa-regular fa-square-plus">
								タスクを追加
							</div>
						</div>
						<ul class="TodoTaskLineup">
							<TodoList 
							@edit-task="editTask"
							/>
						</ul>
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