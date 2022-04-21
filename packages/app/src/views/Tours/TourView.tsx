import { useDocument } from '../../hooks';
import { doc } from 'firebase/firestore';
import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { Editor } from '@ballona-discovery/editor';

export const TourView: FunctionComponent = () => {
	const { tourId } = useParams();

	const [tour, { loading }] = useDocument<any>('tours', (ref) => doc(ref, tourId));

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!tour) {
		return <div>Tour not found</div>;
	}

	const panels = tour.panels?.map((panel: any) => {
		return (
			<div className={'w-100'}>
				<h4>{panel.title}</h4>
				<Editor
					className={'d-flex flex-row w-100 gap-4 justify-content-center'}
					components={[]}
				>
					<Editor.Canvas className={'w-50'} />
				</Editor>
			</div>
		);
	});

	return (
		<div className={'d-flex flex-row w-100 mt-4'}>
			<h1 className={'flex-grow-0 flex-shrink-1'}>{tour.title ?? 'Untitled Tour'}</h1>
			{panels}
		</div>
	);
};
