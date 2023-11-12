<script setup lang="ts">
import { TaskList } from '../composables/taskList'
import { useSharedEditTaskMode, getPriorityColor } from '../composables/taskState'
import { priorityOrder, getSortValue } from '../composables/sort'
import { searchWord, searchForWords } from '../composables/search'

const { editTaskMode, currentSelectedTaskID } = useSharedEditTaskMode()

// taskListと
const { taskList, changeTaskListData } = taskDefinition()

// 並べ替え
const { sortPriority, sortChanged } = getSortValue()


// 編集、削除メニュー表示
function taskModifyMenuOpen(event: MouseEvent, index: number) {
	// event.stopPropagation();
	// openMenuIndexが同じでなければ(nullも含む）であれば
	if (currentSelectedTaskID.value !== index) {
		// indexと同じにする
		currentSelectedTaskID.value = index
	} else {
		// currentSelectedTaskIDが同じであれば閉じる
		currentSelectedTaskID.value = null
	}
}
// taskの削除
function daleteTask(index: number) {
	taskList.value.splice(index, 1)
}

// 編集ボタン押した時の処理
function editTask(index: number) {
	// モーダルを開く
	changeShowAddModal(true)
	// 選択したtaskを選択したtaskのidと同じ番号にする
	currentSelectedTaskID.value = taskList.value[index].id
	// 編集モードへ
	editTaskMode(true, currentSelectedTaskID.value)
}

// index.vueよりtodo,進行中、完了などの文字列が渡されている
const props = defineProps([
	'status',
	'sortPriority',
	'addStatus'
]);


// 検索したタスクのIDをしまう箱
const searchResultTaskID = ref<number[]>([])

// 検索ボックスの文字が変わったらキーワードに合うtaskを絞る関数実行
watch(searchWord, () => {
	// キーワードで絞ったタスクのIDを取得
  searchResultTaskID.value = searchForWords(searchWord.value).map(task => task.id);
});


// const searchAndSortList = computed(() => {
// 	// 検索ボックスに文字が入った場合とそうでない場合に並べ替えるリストを変える
// 	const sortToList = searchWord ? [...searchHitTaskList.value] : [...taskList.value]

// 	// 数値型を返さなければいけない
// 	return sortToList.sort((a, b) => {
// 		// sortChanged.value = true
// 		if (sortPriority.value === 'toLow') {
// 			return priorityOrder.indexOf(b.priority) - priorityOrder.indexOf(a.priority)
// 		}
// 		const priorityDifference = priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)

// 		if (priorityDifference === 0) {
// 			const dateA = new Date(a.period.split(' 〜 ')[1])
// 			const dateB = new Date(b.period.split(' 〜 ')[1])
// 			return dateA.getTime() - dateB.getTime()
// 		}
// 		// number型を返す
// 		return priorityDifference
// 	})
// })

const sortData = taskList.value.sort((a, b) => {
		if (sortPriority.value === 'toLow') {
			return priorityOrder.indexOf(b.priority) - priorityOrder.indexOf(a.priority)
		}
		const priorityDifference = priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)

		if (priorityDifference === 0) {
			const dateA = new Date(a.period.split(' 〜 ')[1])
			const dateB = new Date(b.period.split(' 〜 ')[1])
			return dateA.getTime() - dateB.getTime()
		}
		// number型を返す
		return priorityDifference
	})



// taskマウスで移動　=================================
// mouseEventで移動させる要素
const moveItem: Ref<TaskList | null> = ref(null)
// mousedownイベント発火
const mousedown = (downEvent: MouseEvent, index: number) => {
	// mousedownイベントがメニューの場合は処理させない
	const taskModifyIcon = downEvent.target as HTMLElement;
	if (
		taskModifyIcon.classList.contains('taskModifyIcon') ||
		taskModifyIcon.classList.contains('taskEditBtn') ||
		taskModifyIcon.classList.contains('taskDeleteBtn')

	) {
		return;
	}
	// mousedownされる要素を変数化
	moveItem.value = taskList.value[index]
	// mousePositionの型
	type mousePosition = {
		x: number,
		y: number
	}
	// mousePositionの座標
	const mousePosition: mousePosition = {
		x: downEvent.clientX,
		y: downEvent.clientY
	}
	// mousedownの情報変数
	const targetEl = downEvent.target as HTMLElement;
	// targetElの親要素
	const parentElement = targetEl.parentElement as HTMLElement;
	// mousemove関数
	function mousemoveFunc(moveEvent: MouseEvent) {
		if (parentElement) {
			// z-index上げることで要素が裏に隠れない
			parentElement.style.zIndex = '1'
			// ポインターの変更
			parentElement.style.cursor = 'grabbing'
			// 要素の移動距離
			parentElement.style.transform = `translate(${moveEvent.clientX - downEvent.clientX}px, ${moveEvent.clientY - downEvent.clientY}px)`;

			// スムーズに動かすため
			parentElement.style.willChange = 'transform'
		}
	}
	// mousemoveイベントの発火と処理
	parentElement.addEventListener('mousemove', mousemoveFunc)
	// mouseupの発火と処理
	function mouseUpFunc(moveEvent: MouseEvent) {
		// TodoArea,progressionArea,completionArea取得
		const taskStatusElements = document.querySelectorAll('.TodoTaskLineup')
		//indexと距離を入れる空の配列を用意
		const areaElDistanceArrey: { index: number, distance: number }[] = []
		// 上記要素の左端からの距離取得
		let moveDistance: number
		taskStatusElements.forEach((areaEl, index) => {
			if (parentElement) {
				// 手を広げるカーソルになる
				parentElement.style.cursor = 'grab'

				moveDistance = areaEl.getBoundingClientRect().left -
					parentElement.getBoundingClientRect().left
			}
			// 配列に入れるためindexと距離をobjectにする
			const areaElDistanceObj = {
				index: index,
				distance: moveDistance
			}
			// 配列の中でindexと距離を入れる
			areaElDistanceArrey.push(areaElDistanceObj)
		})
		// 移動した要素の距離が一番近い(数字の小さい)index(エリア)を出す
		const closestIndex = areaElDistanceArrey.reduce((prev, current) => {
			// 基準を0として絶対値を比べる
			return Math.abs(current.distance) < Math.abs(prev.distance) ? current : prev
		}).index

		// indexとエリアの紐付け
		const areaIndex = ['Todo', '進行中', '完了']
		// エリアの番号を移動させた要素の状態に
		if (moveItem.value) {
			changeTaskListData(index, 'status', areaIndex[closestIndex])
		}

		// 終了させる
		parentElement.style.willChange = ''
		parentElement.style.transform = ''
		// mouseupしたらmousemoveイベント終了
		parentElement.removeEventListener('mousemove', mousemoveFunc)
		// mouseupイベント自体も終了
		parentElement.removeEventListener('mouseup', mouseUpFunc)
	}
	// mouseupイベントの発火と処理
	parentElement.addEventListener('mouseup', mouseUpFunc)
	// z-index下げる
	parentElement.style.zIndex = '0'
	// カーソルポインターに戻す
	parentElement.style.cursor = 'pointer'
}

</script>

<!--mouseupした時の状態で判定でする -->
<template>
	<!-- @mouseup="mouseup($event, index)" -->
	<ul class="TodoTaskLineup">
		<!-- v-show: 進行状態が合致するものがtrue →  ID.lengthが0で全てのタスク表示　or ID.lengthが1つでもあれば検索文字と合致するタスクを表示 -->
		<li class="eachTask" v-for="(task, index) in sortData" :key="task.id" v-show="task.status === status && (searchResultTaskID.length === 0 || searchResultTaskID.length && searchResultTaskID.includes(task.id))"
			@mousedown="mousedown($event, index)">
			<!-- @mousemove="mousemove($event, index)" -->
			<div class="taskID">
				{{ task.id }}
			</div>
			<div class="taskTitle">
				{{ task.title }}
			</div>
			<div class="taskDescription">
				{{ task.description }}
			</div>
			<div class="taskPeriod">
				{{ task.period }}
			</div>
			<div class="taskPIC">
				担当者 : {{ task.PIC }}
			</div>
			<div class="taskStatus">
				メンバー : {{ task.member }}
			</div>
			<div class="taskPriority" :style="{ 'backgroundColor': getPriorityColor(task.priority) }">{{ task.priority }}
			</div>
			<div>
				<div class="taskModify">
					<div class="taskModifyIcon" @click="taskModifyMenuOpen($event, index)">...</div>
					<ul class="taskModifyMenu" v-show="currentSelectedTaskID === index">
						<li class="taskEditBtn fa-solid fa-pen-to-square" @click="editTask(index)"></li>
						<li class="taskDeleteBtn fa-solid fa-trash" @click="daleteTask(index)"></li>
					</ul>
				</div>
			</div>
		</li>
	</ul>
</template>

<!-- 
・todo、進行中、完了の３つの状況がある
・それぞれ区別できるようにする必要あり
・作ったタスクシートをそれぞれの領域に分けて表示するには？

-->

<!-- :style="{ backgroundColor: getPriorityColor(task.priority) }" -->