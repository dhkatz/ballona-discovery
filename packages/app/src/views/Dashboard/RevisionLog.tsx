import { Table } from 'react-bootstrap';

export const RevisionLog = () => {
	return (
		<div>
			<h1>Revision Log</h1>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Date</th>
						<th>Time</th>
						<th>Document</th>
						<th>Modified by</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>3/25/2022</td>
						<td>4:15 PM</td>
						{/* doc should be a hyperlink */}
						<td>History panels</td>
						<td>Richard Incognito</td>
					</tr>
				</tbody>
			</Table>
		</div>
	);
};
