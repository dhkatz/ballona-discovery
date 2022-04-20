import { useDocument } from '../../hooks';
import { doc } from 'firebase/firestore';
import { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';

export const PanelView: FunctionComponent = () => {
	const { panelId } = useParams();

	const [panel, { loading }] = useDocument<any>('panels', (ref) => doc(ref, panelId));

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!panel) {
		return <div>Panel not found</div>;
	}

	return <div>{panel.title}</div>;
};
