import type { Ref } from 'vue'
export const inc = (counter: Ref<number>) => () => counter.value++
export const dec = (counter: Ref<number>) => () => counter.value--

export const useSharedCounter = () => {
  const counter = useState('counter', () => (0))
  return {
		// 他のファイルから値を変更できない
    counter: readonly(counter),
    dec: dec(counter),
    inc: inc(counter),
  }
}