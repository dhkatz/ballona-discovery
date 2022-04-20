import { useDocument } from '../../hooks';
import { doc } from 'firebase/firestore';
import { FunctionComponent } from 'react';

export interface PanelViewProps {
	id: string;
}

export const PanelView: FunctionComponent<PanelViewProps> = ({ id }) => {
	const [panel, { loading }] = useDocument<any>('panels', (ref) => doc(ref, id));

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!panel) {
		return <div>Panel not found</div>;
	}

	return <div>{panel.title}</div>;
};
