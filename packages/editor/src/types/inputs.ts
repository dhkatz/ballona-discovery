export const text = (name: string, fallback?: string) => ({
	type: 'text',
	name,
	fallback,
});

export const textarea = (name: string, fallback?: string) => ({
	type: 'textarea',
	name,
	fallback,
});

export const number = (name: string, fallback?: number) => ({
	type: 'number',
	name,
	fallback,
});

export const checkbox = (name: string, fallback?: boolean) => ({
	type: 'checkbox',
	name,
	fallback,
});

export const select = (name: string, options: string[], fallback?: string) => ({
	type: 'select',
	name,
	fallback,
	options,
});

export const color = (name: string, fallback?: string) => ({
	type: 'color',
	name,
	fallback,
});

export type EditorInput =
	| ReturnType<typeof text>
	| ReturnType<typeof textarea>
	| ReturnType<typeof number>
	| ReturnType<typeof checkbox>
	| ReturnType<typeof select>
	| ReturnType<typeof color>;
