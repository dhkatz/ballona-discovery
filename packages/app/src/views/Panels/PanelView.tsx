import { useDocument } from '../../hooks';
import { doc } from 'firebase/firestore';
import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { Editor } from '@ballona-discovery/editor';

export const PanelView: FunctionComponent = () => {
	const { panelId } = useParams();

	const [panel, { loading }] = useDocument<any>('panels', (ref) => doc(ref, panelId));

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!panel) {
		return <div>Panel not found</div>;
	}

	return (
		<div className={'d-flex flex-row w-100 mt-4'}>
			<h1 className={'flex-grow-0 flex-shrink-1'}>{panel.title}</h1>
			<Editor
				className={'d-flex flex-row w-100 gap-4 justify-content-center'}
				components={[]}
			>
				<Editor.Canvas className={'w-50'} />
			</Editor>
		</div>
	);
};
