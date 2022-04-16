import { useCollection } from '../../hooks';

export const Panels = () => {
	const [panels] = useCollection<any>('panels', (ref) => ref);
};
