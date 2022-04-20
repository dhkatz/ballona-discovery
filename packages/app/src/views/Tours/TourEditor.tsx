import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks';
import { doc } from 'firebase/firestore';

export const TourEditor = () => {
	const { tourId } = useParams();
	const [tour, { loading }] = useDocument<any>('tours', (ref) => doc(ref, tourId));

	if (loading) {
		return <div>Loading...</div>;
	}

	return <div>{tour.title}</div>;
};
