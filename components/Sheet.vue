<script setup>
// const { taskSheet } = common()
import { taskSheet } from '../class/taskSheet.ts'
// const { taskSheet } = taskSheet()

// db関係 　=========================================
// dbはあらかじめ定義されたfirestoreのインスタンスでデータベースへの接続を提供
import db from '../firebase.js'
// firestoreのライブラリからの関数。colへの参照を取得。新しいdocにcol追加
import { collection, addDoc, doc, onSnapshot } from 'firebase/firestore';

// firebaseからID取得する必要あり

const unsub = onSnapshot(doc(db, "tasks", "E0cBatzXbo2FEiDQmwaM"), (doc) => {
    console.log("Current data: ", doc.data());
});

// title.description,PIC,Period(start&end)
let taskID = ref(1)
const taskTitle = ref('test')
const taskDescription = ref('testです')
const taskPIC = ref('森山')
const taskPeriodStart = ref('2023-08-06'),
taskPeriodEnd = ref('2023-08-07')
// Period
const taskPeriod = computed(() => {
	return `${taskPeriodStart.value}~${taskPeriodEnd.value}`
})
// task追加
const addTask = () => {
	// 文字列して元に戻す（インスタンス情報を消すため）
	const taskInstance = JSON.parse(JSON.stringify(
	new taskSheet(
		taskID.value, 
		taskTitle.value,
		taskDescription.value,
		taskPIC.value,
		taskPeriod.value,
		'test'
	)
	))
	// firestore内のtaskコレクションへの参照を取得
	const taskcollection = collection(db, 'tasks')
	// taskcollectionに値を入れる
	addDoc(taskcollection, taskInstance
	)
	// 成功:値を空に
	.then(() => {
		taskID.value =''
		taskTitle.value =''
		taskDescription.value =''
		taskPIC.value =''
		taskPeriod.value =''
	})
	.catch(e => {
		console.error('error',e)
	})
}
// ===============================================

// カスタムイベント一覧の定義
const emit = defineEmits(['closeSheet'])
// tasksheet非表示の処理
function triggerCloseSheet() {
	emit('closeSheet')
}
</script>

<template>
	
		<div class="taskSheet">
			<div class="closeSheet" @click="triggerCloseSheet">
				<i class="fa-regular fa-rectangle-xmark"></i>
			</div>
			<div class="inputArea">
				<p class="sheetHeading">タスクシート</p>
				<div class="inputTaskId"></div>
				<div class="inputID" :="taskID">{{ taskID }}</div>
				<!-- タイトル -->
				<input class="taskTitle" type="text" v-model="taskTitle" placeholder="タイトル"
				>
				<!-- 説明 -->
				<input class="taskDescription" type="text" v-model="taskDescription" placeholder="説明">
				<!-- 担当者 -->
				<input class="taskPIC"
				type="text" v-model="taskPIC"
				placeholder="担当者">
				<!-- 期間 -->
				<div class="taskPeriod">
					<input class="taskPeriodStart"
					type="date" v-model="taskPeriodStart">~
					<input class="taskPeriodEnd"
					type="date" v-model="taskPeriodEnd">
				</div>
				<button class="addTaskSaveBtn" @click="addTask"
				>保存
				</button>
			</div>
		</div>
		<div class="taskUnderMask"></div>
</template>

<!-- <ul class="taskContents">
	<li class="id"></li>
	<li class="title">
		<input type="text">
	</li>

</ul> -->

