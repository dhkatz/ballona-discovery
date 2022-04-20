import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks';
import { doc } from 'firebase/firestore';
import { Editor } from '@ballona-discovery/editor';
import { PanelSettings } from './PanelSettings';

/**
 * Displays a list of the created tour panels.
 */
export const PanelEditor: FunctionComponent = () => {
	const { panelId } = useParams();
	const [panelDoc, { loading }] = useDocument<any>('panels', (ref) => doc(ref, panelId));

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className={'d-flex w-100 mt-4'}>
			<Editor className={'d-flex flex-row w-100 gap-4'} components={[]}>
				<Editor.Toolbox className={'flex-grow-0 flex-shrink-1'} />
				<Editor.Canvas className={'flex-fill'} />
				<PanelSettings className={'flex-grow-0 flex-shrink-1'} />
			</Editor>
		</div>
	);
};
