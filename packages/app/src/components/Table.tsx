import { FunctionComponent, useMemo, useState } from 'react';
import BootstrapTable from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import type { TableProps as BSTableProps } from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { PlusSquareFill } from 'react-bootstrap-icons';
import { Modal } from 'react-bootstrap';

export type TableColumn = { name: string; key: string };

export interface TableProps extends BSTableProps {
	columns: Array<TableColumn>;
	rows?: Record<string, any>[];

	paginate?: boolean;
	page?: (page: number) => Promise<any[]>;

	search?: boolean;

	select?: 'single' | 'multi' | false;
	canSelect?: (row: Record<string, any>) => boolean;
	onSelect?: (row: Record<string, any>) => void;

	edit?: boolean;
	canEdit?: (row: Record<string, any>, column: TableColumn) => boolean;
	onEdit?: (row: Record<string, any>) => void;

	create?: boolean;
	onCreate?: (row: Record<string, any>) => void;

	delete?: boolean;
	canDelete?: (row: Record<string, any>) => boolean;
	onDelete?: (row: Record<string, any>) => void;
}

export const Table: FunctionComponent<TableProps> = ({
	columns,
	rows,
	paginate,
	search,
	edit,
	canEdit,
	onEdit,
	create,
	onCreate,
	...props
}) => {
	const [query, setQuery] = useState<string>('');
	const [column, setColumn] = useState<string>(columns[0].key);
	const [editing, setEditing] = useState<{ row: any; column: string } | null>(null);
	const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

	const hideModal = () => setShowCreateModal(false);
	const showModal = () => setShowCreateModal(true);

	const createButton = useMemo(() => {
		if (!create) return null;
		return (
			<Button
				variant={'secondary'}
				className={
					'h-50 mt-auto my-auto d-flex flex-row justify-content-center align-items-center'
				}
				onClick={showModal}
			>
				<span>Create</span> <PlusSquareFill className={'ms-2 my-auto'} />
			</Button>
		);
	}, [create, onCreate]);

	const createModal = useMemo(() => {
		if (!create) return null;

		// Modal with submit and cancel button

		return (
			<Modal show={showCreateModal} onHide={hideModal} centered>
				<Modal.Header closeButton>
					<Modal.Title>Create</Modal.Title>
				</Modal.Header>
				<Modal.Body></Modal.Body>
				<Modal.Footer>
					<Button variant={'dark'} onClick={hideModal}>
						Cancel
					</Button>
					<Button variant={'secondary'} onClick={hideModal}>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}, [create, showCreateModal]);

	const searchbar = useMemo(() => {
		if (!search) return null;

		return (
			<Form.Group className={'d-flex flex-column flex-lg-row gap-2 py-3 ms-lg-auto align'}>
				<Form.Control
					type="text"
					placeholder="Search"
					onChange={({ target }) => setQuery(target.value)}
				/>
				<Form.Select onChange={({ target }) => setColumn(target.value)}>
					{columns.map(({ key, name }) => (
						<option key={key} value={key}>
							{name}
						</option>
					))}
				</Form.Select>
			</Form.Group>
		);
	}, [search, columns]);

	const tableHeaders = useMemo(
		() => columns.map(({ key, name }) => <th key={key}>{name}</th>),
		[columns]
	);

	const tableRows = useMemo(() => {
		let filtered = rows ?? [];

		if (search && query !== '') {
			filtered = filtered.filter((row) => {
				const keys = column.split('.');

				let value = row;

				for (const key of keys) {
					value = value[key];
				}

				return value.toString().toLowerCase().includes(query.toLowerCase());
			});
		}

		return filtered.map((row, i) => (
			<tr key={i}>
				{columns.map((column) => {
					const keys = column.key.split('.');

					let value: any = row;

					for (const key of keys) {
						value = value[key];
					}

					if (edit && editing?.row === row && editing?.column === column.key) {
						return (
							<td
								key={column.key}
								onBlur={() => {
									setEditing(null);
									onEdit?.(row);
								}}
							>
								<input
									autoFocus={true}
									type="text"
									value={value}
									onChange={({ target }) => {
										console.log(target.value);
									}}
								/>
							</td>
						);
					}

					if (edit && true) {
						// editable?.(row, column)) {
						return (
							<td
								key={column.key}
								onDoubleClick={() => setEditing({ row, column: column.key })}
							>
								{value}
							</td>
						);
					}

					return <td key={column.key}>{value}</td>;
				})}
			</tr>
		));
	}, [rows, columns, column, query, search, edit, canEdit, editing]);

	const pagination = useMemo(() => paginate && <Pagination>{}</Pagination>, [paginate]);

	return (
		<div className={'d-flex flex-column'}>
			<Form className={'d-flex flex-column flex-lg-row'}>
				{createButton}
				{searchbar}
			</Form>
			<BootstrapTable responsive={'lg'} {...props}>
				<thead>
					<tr>{tableHeaders}</tr>
				</thead>
				<tbody>{tableRows}</tbody>
			</BootstrapTable>
			{pagination}
			{createModal}
		</div>
	);
};
