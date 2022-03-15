import React, { ComponentProps } from 'react';

import { EditorInput } from './inputs';

export type EditorState = {
	components: EditorComponent<any>[];
	selected: EditorObject | null;
	select: (object: EditorObject | null) => void;
	register: (canvas: any) => void;
	unregister: (canvas: any) => void;
};

export type CanvasState = {
	items: EditorObject[];
	add: (type: string, index?: number) => void;
	remove: (id: string) => void;
	move: (id: string, index: number) => void;
	find: (id: string) => [EditorObject | null, number];
};

export type EditorObject<T = Record<string, unknown>> = {
	id: string;
	props: ComponentProps<React.ComponentType<T>>;
	component: EditorComponent<T>;
};

export type EditorComponent<T> =
	| React.ComponentType<T> & {
			editor: {
				name: string;
				props: EditorInput[];
			};
	  };
