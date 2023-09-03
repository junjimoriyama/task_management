<script setup lang="ts">
import { taskDefinition, TaskList, taskList, STORAGE_TASKLIST, localStorageData } from '../composables/common'
import { TaskSheetClass } from '../class/taskSheet'
import { isShowAddModal, changeShowAddModal } from '../composables/componentStatus'
import { isEditTask, editTaskMode, currentSelectedTaskID } from '../composables/task'
import { useSharedCounter } from '../composables/counter'


const { counter, inc, dec } = useSharedCounter()
onMounted(() => { console.log(counter.value) })

// tasksheetの項目定義
const { taskTitle, taskDescription, taskPIC, taskPeriodStart, taskPeriodEnd, taskPeriod, taskStatus } = taskDefinition()

const ids = taskList.map(task => task.id);
const maxID = ref(Math.max(...ids));


function addTaskSave() {
	const newTask = new TaskSheetClass(
		maxID.value + 1,
		taskTitle.value,
		taskDescription.value,
		taskPeriod.value,
		taskPIC.value,
		taskStatus.value
	)
	taskList.push(newTask)
	// localStorageにはtaskListが入る
	localStorage.setItem(STORAGE_TASKLIST.value, JSON.stringify(taskList))
	// シートを閉じる
	changeShowAddModal(false)
}

// シートを閉じる
function closeSheet() {
	changeShowAddModal(false)
}

console.log(editTaskMode)

watch(editTaskMode, () => {
	console.log(editTaskMode)
})

</script>

<template>
	<div class="taskSheet">

		カウンター: {{ counter }}
    <button @click="inc"> + </button>
    <button @click="dec"> - </button>
		<div class="closeSheet" v-if="isShowAddModal">
			<i class="fa-regular fa-rectangle-xmark" @click="closeSheet"></i>
		</div>
		<div class="inputArea">
			<p class="sheetHeading">タスクシート</p>
			<div class="inputTaskId"></div>
			<div class="inputID">{{ maxID + 1 }}</div>
			<!-- タイトル -->
			<input class="taskTitle" type="text" v-model="taskTitle" placeholder="タイトル">
			<!-- 説明 -->
			<input class="taskDescription" type="text" v-model="taskDescription" placeholder="説明">
			<!-- 担当者 -->
			<input class="taskPIC" type="text" v-model="taskPIC" placeholder="担当者">
			<!-- 期間 -->
			<div class="taskPeriod">
				<input class="taskPeriodStart" type="date" v-model="taskPeriodStart">~
				<input class="taskPeriodEnd" type="date" v-model="taskPeriodEnd">
			</div>
			<div class="taskStatus">
				<select name="" id="" v-model="taskStatus">
					<option value="todo">Todoリスト</option>
					<option value="inProgress">進行中</option>
					<option value="done">完了</option>
				</select>
			</div>
			<button class="addTaskSaveBtn" @click="addTaskSave">保存
			</button>
		</div>
	</div>
	<div class="taskUnderMask"></div>
</template>

