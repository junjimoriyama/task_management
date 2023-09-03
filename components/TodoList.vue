<script setup lang="ts">
import { TaskList, taskList, STORAGE_TASKLIST } from '../composables/common'
import { TaskSheetClass } from '../class/taskSheet'
import { TodoList } from '.nuxt/components';
import { isEditTask, editTaskMode } from '../composables/task'

// tasksheetの項目定義
const { taskTitle, taskDescription, taskPIC, taskPeriodStart, taskPeriodEnd, taskPeriod, taskStatus } = taskDefinition()

const emit = defineEmits(['editTask'])

// taskSheet編集
function triggerEditTask(index: number) {
	// 選択されたtasksheet
	// const editSelectedTask = taskList[index]
	// emit('editTask', editSelectedTask);
}

// openMenuIndexがnumberかnullの型を持つ
const openMenuIndex = ref<number | null>(null)

// 編集、削除メニュー表示
function taskModifyMenuOpen(currentSelectedTask: number) {
	// openMenuIndexが同じでなければ(nullも含む）であれば
	if(openMenuIndex.value !== currentSelectedTask) {
		// indexと同じにする
		openMenuIndex.value = currentSelectedTask
	} else {
		// openMenuIndexが同じであれば閉じる
		openMenuIndex.value = null
	}
}
// taskの削除(number型だがオブジェクトが取れている。なぜ？)
function daleteTask(currentSelectedTask: number) {
	taskList.splice(currentSelectedTask, 1)
}
// taskの編集
function editTask(currentSelectedTask: number) {
const currentSelectedTaskID = taskList[currentSelectedTask].id
editTaskMode(true, currentSelectedTaskID)
changeShowAddModal(true)
	
}
</script>

<template>
	<div>
		<ul class="eachTask" v-for="(task, index) in taskList" :key="task.id" >
			<li class="taskID">
				{{ task.id }}
			</li>
			<li class="taskTitle">
				{{ task.title }}
			</li>
			<li class="taskDescription">
				{{ task.description }}
			</li>
			<li class="taskPeriod">
				{{ task.period }}
			</li>
			<li class="taskPIC">
				{{ task.PIC }}
			</li>
			<li class="taskStatus">
				{{ task.status }}
			</li>
			<li>
				<div class="taskModify">
					<div class="taskModifyIcon"
					@click="taskModifyMenuOpen(index)"
					>...</div>
					<ul class="taskModifyMenu" 
					v-show="openMenuIndex === index"
					>
						<li class="taskEditBtn" @click="editTask(index)">編集</li>
						<li class="taskDeleteBtn"
						@click="daleteTask(index)"
						>削除</li>
					</ul>
				</div>
			</li>
		</ul>
	</div>
</template>

<!-- 
・todo、進行中、完了の３つの状況がある
・それぞれ区別できるようにする必要あり
・作ったタスクシートをそれぞれの領域に分けて表示するには？

-->