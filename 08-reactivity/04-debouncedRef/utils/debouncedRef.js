import { ref, watch } from 'vue';

/**
 * @template T
 * @param {Ref<T>} source - Исходный ref
 * @param {number} wait - Ожидание в миллисекундах для debounce
 * @returns {Ref<T>} - Новый ref, обновляющийся с debounce при обновлении исходного ref-а
 */

let timer = null

export function debouncedRef(source, wait) {
	const debounced = ref(undefined);
	debounced.value = source.value

	watch(source, (nV) => {
		if (timer) clearTimeout(timer)
		timer = setTimeout(() => {
			debounced.value = nV
		}, wait)

	 }, )

	return debounced;
}
