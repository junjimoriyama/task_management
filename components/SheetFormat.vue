<script setup lang="ts">
import { TaskSheetClass } from '../class/taskSheet'
import { useMember, useMemberRoles } from '../composables/storage'
// メンバー
import { taskDefinition } from '../composables/taskList'
import { isShowAddModal, changeShowAddModal } from '../composables/componentStatus'
import { useSharedEditTaskMode } from '../composables/taskState'
import dayjs, { type Dayjs } from 'dayjs'


const { isEditTask, currentSelectedTaskID } = useSharedEditTaskMode()

const { taskList } = taskDefinition()

// tasksheetの項目定義
const { taskTitle, taskDescription, taskPIC, taskPeriod, taskPeriodStart, taskPeriodEnd, taskStatus, taskPriority, taskMember } = taskDefinition()


const props = defineProps([
	'addStatus'
]);
taskStatus.value = props.addStatus

const maxId = ref(1)
if (taskList.value.length > 0) {
	const ids = taskList.value.map(task => task.id)
	// 抽出したidの最大値を変数化
	// taskがあればそのidに1を加えた数字にする
	maxId.value = Math.max(...ids) + 1
} else {
	maxId.value
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
			maxId.value,
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
		}
	}
	// モーダル閉じる
	changeShowAddModal(false)

}

// シートを閉じる
function closeSheet() {
	changeShowAddModal(false)
	// 閉じた時にスタートの日付を本日の日付に戻す
	taskPeriodStart.value = dayjs().format('YYYY-MM-DD')
}

// 役割のモーダル =================================
// 入力した役割の名前
const addRoleName = ref('')

const isRoleModal = ref(false)

// 役割モーダル選択された人の名前
const selectedMember = ref('')
// チェックが付いた役割
const checkedRoles = ref([])

// 選択した人と役割を保存するオブジェクト
// const memberRoles: Ref<Record<string, string[]>> = ref({})
const checkedFilterRole = ref([''])
// 役割決定
const roleDecision = () => {
	// 選択した役割
	checkedFilterRole.value = useRole.value.filter((role, index) => checkedRoles.value[index])
	useMemberRoles.value[selectedMember.value] = checkedFilterRole.value
	isRoleModal.value = false
}
</script>

<template>
	<div class="taskSheet">
		<div class="closeSheet" v-if="isShowAddModal">
			<div class="fa-regular fa-rectangle-xmark" @click="closeSheet"></div>
		</div>
		<div class="inputArea">
			<p class="sheetHeading">タスクシート</p>
			<div class="inputTaskId"></div>
			<div class="inputID">{{ maxId }}</div>
			<!-- タイトル -->
			<input class="taskTitle" type="text" placeholder="タイトル" v-model="taskTitle">
			<!-- 説明 -->
			<input class="taskDescription" type="text" placeholder="説明" v-model="taskDescription">
			<!-- 担当者 -->
			<input class="taskPIC" type="text" placeholder="担当者" v-model="taskPIC">
			<!-- 期間 -->
			<div class="taskPeriod">
				<input class="taskPeriodStart" type="date" v-model="taskPeriodStart">
				から
				<input class="taskPeriodEnd" type="date" :min="taskPeriodStart" v-model="taskPeriodEnd">
			</div>
			<!-- 状態 -->
			<div class="taskStatus">
				<!-- <div class="fa-solid fa-caret-down"></div> -->
				<select name="" id="" v-model="taskStatus">
					<option v-for="status in ['Todo', '進行中', '完了']" :value="status">
						{{ status }}
					</option>
				</select>

			</div>
			<!-- 優先度 -->
			<div class="priority">
				<select v-model="taskPriority">
					<!-- <option>優先度</option> -->
					<option value="高">優先度「高」</option>
					<option value="中">優先度「中」</option>
					<option value="低">優先度「低」</option>
				</select>
			</div>
			<button class="addTaskSaveBtn" @click="addTaskSave">保存
			</button>
		</div>
	</div>
</template>
