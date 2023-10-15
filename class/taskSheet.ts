
export class TaskSheetClass {
	constructor(
		public id: number,
		public title: string,
		public description: string,
		public period: string,
		public PIC: string,
		public status: string,
		public priority: string
		// public label?: string
	) { }
}

// 引数はただのローカル変数でなく

// 通常、関数やコンストラクタの引数は、その関数やコンストラクタ内のローカル変数として動作します。つまり、関数の外部からはアクセスできません。
// クラスのプロパティとして自動的に宣言され、
// TypeScriptの特定のシンタックス（コンストラクタ引数にアクセス修飾子を使用する）を使うと、その引数はローカル変数としてだけではなく、クラスのプロパティとしても機能します。これは新しいプロパティを手動で宣言する手間を省きます。
// 引数として渡された値で初期化されます。
// このシンタックスを使用すると、コンストラクタに渡された引数の値は、自動的に新しく作成されたクラスのプロパティに割り当てられます。

// import { TaskSheet } from '../composables/common'

// export type TaskList = {
//   id: number,
// 	title: string,
// 	description: string,
// 	period: string,
// 	PIC: string,
// 	status: 'todo' | 'inProgress' | 'done'
// }

// export function common() {
// 	const STORAGE_TASKLIST = ref('taskList')
// 	// const taskList: TaskList[] = reactive([])

// 	return {
// 		STORAGE_TASKLIST,
// 		// taskList
// 	}
// }
