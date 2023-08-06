// TaskSheetの型
export type TaskSheet = {
	id: number;
	title: string;
	description: string;
	PIC: string;
	period: string;
	label?: string;
}

export function common() {
	const taskList: TaskSheet[] = reactive([])
	return {
		taskList
	}
}


