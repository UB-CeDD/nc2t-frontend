import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface TableProps<T> {
    data: T[];
    columns: { key: keyof T; label: string }[];
    onRowSelect?: (selectedRows: T[]) => void;
    renderActions?: (row: T) => React.ReactNode;
}

const Table = <T extends { id: string }>({ data, columns, onRowSelect, renderActions }: TableProps<T>) => {
    const [selectedRows, setSelectedRows] = React.useState<Set<string>>(new Set());

    const handleRowSelect = (id: string) => {
        const newSelectedRows = new Set(selectedRows);
        if (newSelectedRows.has(id)) {
            newSelectedRows.delete(id);
        } else {
            newSelectedRows.add(id);
        }
        setSelectedRows(newSelectedRows);
        if (onRowSelect) {
            const selectedData = data.filter((row) => newSelectedRows.has(row.id));
            onRowSelect(selectedData);
        }
    };

    const handleSelectAll = () => {
        if (selectedRows.size === data.length) {
            setSelectedRows(new Set());
            if (onRowSelect) onRowSelect([]);
        } else {
            const allRowIds = new Set(data.map((row) => row.id));
            setSelectedRows(allRowIds);
            if (onRowSelect) onRowSelect(data);
        }
    };

    return (
        <>
            <style>
                {`
                .table-auto th, .table-auto td {
                    text-align: left;
                }

                .table-auto td:first-child, .table-auto th:first-child {
                    text-align: center;
                }

                .actions-cell {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                }
            `}
            </style>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">
                            <input
                                type="checkbox"
                                checked={selectedRows.size === data.length}
                                onChange={handleSelectAll}
                            />
                        </th>
                        {columns.map((column) => (
                            <th key={column.key as string} className="border border-gray-300 p-2">
                                {column.label}
                            </th>
                        ))}
                        {renderActions && <th className="border border-gray-300 p-2">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 p-2">
                                <input
                                    type="checkbox"
                                    checked={selectedRows.has(row.id)}
                                    onChange={() => handleRowSelect(row.id)}
                                />
                            </td>
                            {columns.map((column) => (
                                <td key={column.key as string} className="border border-gray-300 p-2">
                                    {row[column.key]}
                                </td>
                            ))}
                            {renderActions && (
                                <td className="border border-gray-300 p-2 actions-cell">
                                    {renderActions(row)}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Table;