import React from "react";

export default function DataTable({
    columns,
    data,
    actions,
    currentPage = 1,
    perPage = 10,
}) {
    return (
        <div className="w-full overflow-x-auto rounded shadow border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-blue-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                        <th className="text-left px-4 py-2 font-semibold text-gray-700 dark:text-gray-100">No</th>
                        {columns.map((col, idx) => (
                            <th
                                key={idx}
                                className="text-left px-4 py-2 font-semibold text-gray-700 dark:text-gray-100"
                            >
                                {col.label}
                            </th>
                        ))}
                        {actions && (
                            <th className="text-left px-4 py-2 font-semibold text-gray-700 dark:text-gray-100">
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length + (actions ? 1 : 0) + 1}
                                className="text-center px-4 py-6 text-gray-500 dark:text-gray-400"
                            >
                                No data available.
                            </td>
                        </tr>
                    ) : (
                        data.map((item, idx) => (
                            <tr
                                key={item.id || idx}
                                className={
                                    idx % 2 === 0
                                        ? "bg-white dark:bg-gray-800"
                                        : "bg-gray-50 dark:bg-gray-700"
                                }
                            >
                                <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 dark:text-gray-100">
                                    {(currentPage - 1) * perPage + idx + 1}
                                </td>
                                {columns.map((col, colIdx) => (
                                    <td
                                        key={colIdx}
                                        className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 dark:text-gray-100"
                                    >
                                        {col.render(item)}
                                    </td>
                                ))}
                                {actions && (
                                    <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 dark:text-gray-100">
                                        {actions(item)}
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
