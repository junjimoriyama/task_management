<script setup lang="ts">
import { taskDefinition, TaskList } from '../composables/taskList'
import { TaskSheetClass } from '../class/taskSheet'
import { isShowAddModal, changeShowAddModal } from '../composables/componentStatus'
import { useSharedEditTaskMode } from '../composables/taskState'

const { isEditTask,currentSelectedTaskID } = useSharedEditTaskMode()

const { taskList } = taskDefinition()

// tasksheetの項目定義
const { taskTitle, taskDescription, taskPIC, taskPeriodStart, taskPeriodEnd, taskPeriod, taskStatus, taskPriority, taskMember } = taskDefinition()


const maxId = ref(0)
if (taskList.value.length > 0) {
	const ids = taskList.value.map(task => task.id)
	// 抽出したidの最大値を変数化
	maxId.value = Math.max(...ids) + 1
} else {
	maxId.value + 1
}

// 選択しているタスクを定義(オブジェクト)
const selectEditTask = taskList.value.find(task => task.id === currentSelectedTaskID.value)

// 各input要素に現在選択している情報を入れる
if (selectEditTask) {
	// idはHTML内で+1されているの
	maxId.value = selectEditTask.id
	taskTitle.value = selectEditTask.title
	taskDescription.value = selectEditTask.description
	const [start, end] = selectEditTask.period.split(' 〜 ')
	taskPeriodStart.value = start
	taskPeriodEnd.value = end
	taskPIC.value = selectEditTask.PIC
	taskStatus.value = selectEditTask.status
	taskPriority.value = selectEditTask.priority
	taskMember.value = selectEditTask.member
}

// 保存ボタン押した場合
function addTaskSave() {
	// 編集モードでない場合(新しいデータを追加)
	if (!isEditTask.value) {
		// 新しいタスクを作成して追加
		const newTask = new TaskSheetClass(
			maxId.value + 1,
			taskTitle.value,
			taskDescription.value,
			taskPeriod.value,
			taskPIC.value,
			taskStatus.value,
			taskPriority.value,
			taskMember.value
		)
		taskList.value.push(newTask)
		// 編集モードの場合(選択しているデータを変更)
	} else {
		
		if (selectEditTask && isEditTask.value) {
			// input要素にあるデータを選択しているデータの値とする
			selectEditTask.title = taskTitle.value
			selectEditTask.description = taskDescription.value
			selectEditTask.period = taskPeriod.value
			selectEditTask.PIC = taskPIC.value
			selectEditTask.status = taskStatus.value
			selectEditTask.priority = taskPriority.value
			selectEditTask.member = taskMember.value
		}
	}
	// モーダル閉じる
	changeShowAddModal(false)
}

// シートを閉じる
function closeSheet() {
	changeShowAddModal(false)
}

const props = defineProps([
'addStatus'
]);


</script>

<template>
	<div class="taskSheet">
		<div class="closeSheet" v-if="isShowAddModal">
			<i class="fa-regular fa-rectangle-xmark" @click="closeSheet"></i>
		</div>
		<div class="inputArea">
			<p class="sheetHeading">タスクシート</p>
			<div class="inputTaskId"></div>
			<div class="inputID">{{ maxId }}</div>
			<!-- タイトル -->
			<input class="taskTitle" type="text" v-model="taskTitle" placeholder="タイトル">
			<!-- 説明 -->
			<input class="taskDescription" type="text" v-model="taskDescription" placeholder="説明">
			<!-- 担当者 -->
			<input class="taskPIC" type="text" v-model="taskPIC" placeholder="担当者">
			<!-- 期間 -->
			<div class="taskPeriod">
				<input class="taskPeriodStart" type="date" v-model="taskPeriodStart">
				から
				<input class="taskPeriodEnd" type="date" v-model="taskPeriodEnd">
			</div>
			<!-- 状態 -->
			<div class="taskStatus" >
				<select name="" id="" v-model="taskStatus"
				>
				<option 
			v-for="status in ['Todo', '進行中', '完了']" 
			:value="status"
			>
			{{ status }}
		</option>
				</select>
			</div>
			<!-- 優先度 -->
			<div class="priority">
				<select name="" id="" v-model="taskPriority">
					<!-- <option>優先度</option> -->
					<option value="高">優先度「高」</option>
					<option value="中">優先度「中」</option>
					<option value="低" selected>優先度「低」</option>
				</select>
			</div>
			<!-- メンバー -->
			<input class="taskMember" type="text" v-model="taskMember" placeholder="メンバー">

			<button class="addTaskSaveBtn" @click="addTaskSave">保存
			</button>
		</div>
	</div>
	<div class="taskUnderMask"></div>
</template>