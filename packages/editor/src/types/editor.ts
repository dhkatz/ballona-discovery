import React, { ComponentProps } from 'react';

import { EditorInput } from './inputs';

export type EditorState = {
	components: EditorComponent<any>[];
	items: EditorObject[];
	selected: string | null;
	select: (id: string) => void;
	move: (id: string, index: number) => void;
	add: (index: number, type: string) => void;
	remove: (id: string) => void;
	find: (id: string) => number;
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
				inputs: EditorInput[];
			};
	  };
