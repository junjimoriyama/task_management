<script setup lang="ts">

// sort.tsで定義
const { sortPriority, sortDay } = getSortValue()

// emit定義
const emit = defineEmits(['changeSortPriority', 'changeSortDay' ])

// 優先度順関数実行
const onChangeSortPriority = () => {
	emit('changeSortPriority', sortPriority.value)
}
// 日付順関数実行
const onChangeSortDay = () => {
	emit('changeSortDay', sortDay.value)
}

</script>

<template>
	<div class="sort">
		<!-- 優先度順 -->
		<select class="sortPriority" v-model="sortPriority" @change="onChangeSortPriority">
			<option value="toHigh">優先度が高い順</option>
			<option value="toLow">優先度が低い順</option>
		</select>
		<!-- 日付順 -->
		<select class="sortDay" v-model="sortDay" @change="onChangeSortDay">
			<option value="close">日付が近い順</option>
			<option value="far">日付が遠い順</option>
		</select>
	</div>
</template>