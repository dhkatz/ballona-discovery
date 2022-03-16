import React, { ComponentProps } from 'react';

import { EditorInput } from './inputs';

export type EditorState = {
	components: EditorComponent[];
	canvases: CanvasState[];
	selected: EditorObject | null;
	select: (object: EditorObject | null) => void;
	register: (canvas: CanvasState) => void;
	unregister: (canvas: CanvasState) => void;
};

export type CanvasState = {
	id: string;
	items: EditorObject[];
	add: (type: EditorObject | string, index?: number) => void;
	remove: (id: string | number) => EditorObject;
	move: (source: number, target: number) => void;
	find: (id: string) => [EditorObject | null, number];
};

export type EditorObject<T = Record<string, unknown>> = {
	id: string;
	props: ComponentProps<React.ComponentType<T>>;
	component: EditorComponent<T>;
};

export type EditorComponent<T = Record<string, unknown>> =
	| React.ComponentType<T> & {
			editor: {
				name: string;
				props: EditorInput[];
			};
	  };
