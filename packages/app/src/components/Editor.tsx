import {useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';

export const Editor = () => {
	const [components, setComponents] = useState<any[]>([]);
	const [selected, setSelected] = useState<any>();

	return (
		<Container fluid>
			<Row>
				<Col sm={2}>
					<div className={'editor-sidebar'}>
						<div className={'editor-sidebar-preview'}>
							<span className={'editor-title'}>Preview</span>
							<div className={'editor-sidebar-preview-content'}>
								{selected && selected.preview()}
							</div>
						</div>
						<div className={'editor-sidebar-buttons'}>
							<span className={'editor-title'}>Components</span>
							<div className={'editor-sidebar-buttons-content'}>
								{components.map((component: any) => null)}
							</div>
						</div>
					</div>
				</Col>
				<Col sm={8}>
					<div className={''}/>
				</Col>
			</Row>
		</Container>
	);
};
