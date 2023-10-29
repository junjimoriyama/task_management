<script setup lang="ts">
// import { TaskList } from '../composables/taskList'
import { STORAGE_TASKLIST, taskListPushLocalStorage } from '../composables/storage'
import Header from '../components/Header.vue'
import Sort from '../components/Sort.vue'
import { isShowAddModal, changeShowAddModal } from '../composables/componentStatus'
import { changeSortPriority, changeSortDay, } from '../composables/sort'
import { getSortValue } from '../composables/sort'
// import { profileData } from '../composables/profile'

// const { profileName, profileEmail, changeProfileName, changeProfileEmail } = profileData()

const { editTaskMode, isEditTask, currentSelectedTaskID } = useSharedEditTaskMode()

// taskList(reactive)
const { taskList } = taskDefinition()

// sort.tsで定義
const { sortPriority, sortDay, sortChanged } = getSortValue()

// 初めにlocalStorageからtaskListに入れる
onMounted(() => {
	taskListPushLocalStorage()
})

// taskListに変化があればlocalStorageに反映させる
watch(taskList.value, () => {
	localStorage.setItem(STORAGE_TASKLIST.value, JSON.stringify
		(taskList.value));
});

// const isSearch = ref(true)

// キーワード検索行う
const searchForWords = (word: string) => {
	// .highlightのタグを定義し取得。
	document.querySelectorAll('.highlight').forEach(span => {
		// spanタグ消す
		span.outerHTML = span.innerHTML
	});

	// 全ての要素定義
	const allElement = document.querySelectorAll('*');
	// 全ての要素取得
	allElement.forEach(el => {
		// HTML要素であれば
		if (el instanceof HTMLElement) {
			// 要素全体から該当する引数の検索
			const regs = new RegExp(word, 'g');
			// 該当する要素のスタイル変更
			const heighlightHTML = el.innerHTML.replace(regs, match => `<span class="highlight" style="background-color: yellow">${match}</span>`);
			// 新しいHTMLを組み込む
			el.innerHTML = heighlightHTML;
		}
	});
};

// 追加選択しているstatus
const addStatus: Ref<string> = ref('');
// tasksheet追加
const addTask = (initialStatus: string) => {
	changeShowAddModal(true);
}

// 各タスクの数を出す
const taskStatusLength = (status: string) => {
	return taskList.value.filter(task => task.status === status).length;
}

// 優先度順関数実行
const onChangeSortPriority = (value: string) => {
	sortPriority.value = value
	changeSortPriority(sortPriority, sortChanged);

}
// 日付順関数実行
const onChangeSortDay = (value: string) => {
	sortDay.value = value
	changeSortDay(sortDay, sortChanged);
}



</script>

<template>
	<div>
		<div class="container">
			<Header @searchForWords="searchForWords" />
			<!-- @changeSearchBoolean="changeSearchBoolean" -->
			<Sort @changeSortPriority="onChangeSortPriority" @changeSortDay="onChangeSortDay" />
			<SheetFormat v-if="isShowAddModal" :addStatus="addStatus" />
			<!-- {{ profileName }} -->

			<!-- <button class="testBtn" @click="getAllTexts">テスト</button> -->
			<main>
				<div class="task">
					<div class="TodoArea">
						<div class="heading">
							<div class="listName">Todoリスト<span class="countList">
									{{ taskStatusLength('Todo') }}
								</span>
							</div>
							<div class="fa-solid fa-ellipsis"></div>
						</div>
						<div class="taskMenu" @click="addTask('Todo')">
							<div class="addTaskBtn fa-regular fa-square-plus">
								タスクを追加
							</div>
						</div>

						<TodoList status="Todo" :sortChanged="sortChanged" :sortPriority="sortPriority" :sortDay="sortDay"
							:changeSortDay="changeSortDay" :changeSortPriority="changeSortPriority" />
					</div>
					<div class="progressionArea">
						<div class="heading">
							<div class="listName">進行中リスト<span class="countList">
									{{ taskStatusLength('進行中') }}
								</span>
							</div>
							<div class="fa-solid fa-ellipsis"></div>
						</div>
						<div class="taskMenu" @click="addTask('進行中')">
							<div class="addTaskBtn fa-regular fa-square-plus">
								タスクを追加
							</div>
						</div>
						<TodoList status="進行中" :sortChanged="sortChanged" :sortPriority="sortPriority" :sortDay="sortDay"
							:changeSortDay="changeSortDay" :changeSortPriority="changeSortPriority" />
					</div>
					<div class="completionArea">
						<div class="heading">
							<div class="listName">完了リスト<span class="countList">
									{{ taskStatusLength('完了') }}
								</span>
							</div>
							<div class="fa-solid fa-ellipsis"></div>
						</div>
						<div class="taskMenu" @click="addTask('完了')">
							<div class="addTaskBtn fa-regular fa-square-plus">
								タスクを追加
							</div>
						</div>
						<TodoList status="完了" :sortChanged="sortChanged" :sortPriority="sortPriority" :sortDay="sortDay"
							:changeSortDay="changeSortDay" :changeSortPriority="changeSortPriority" />
					</div>
				</div>
			</main>
		</div>
	</div>
</template>
