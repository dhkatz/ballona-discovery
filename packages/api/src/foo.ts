export function add(a: number, b: number) {
	if (a < 0 || b < 0) {
		throw new Error('Negative numbers are not allowed');
	}

	return a + b;
}
