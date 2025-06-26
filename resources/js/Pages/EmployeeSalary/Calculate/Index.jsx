import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

export default function Index({
    salaries = [],
    defaultMonth,
    defaultYear,
    isProcessing = false,
    progress = 0,
}) {
    const [month, setMonth] = useState(
        defaultMonth ?? new Date().getMonth() + 1
    );
    const [year, setYear] = useState(defaultYear ?? currentYear);

    const columns = [
        {
            label: "Periode",
            render: (item) => `${months[item.month - 1]} ${item.year}`,
        },
        { label: "Pegawai", render: (item) => item.employee_name },
        {
            label: "Gaji Pokok",
            render: (item) => item.basic_salary?.toLocaleString("id-ID"),
        },
        {
            label: "Bonus",
            render: (item) => item.bonus?.toLocaleString("id-ID"),
        },
        {
            label: "BPJS",
            render: (item) => item.bpjs?.toLocaleString("id-ID"),
        },
        {
            label: "JP",
            render: (item) => item.jp?.toLocaleString("id-ID"),
        },
        {
            label: "Cicilan",
            render: (item) => item.loan?.toLocaleString("id-ID"),
        },
        {
            label: "Total",
            render: (item) => (
                <b>{item.total_salary?.toLocaleString("id-ID")}</b>
            ),
        },
    ];

    const handleCalculate = (e) => {
        e.preventDefault();
        window.location.href = route("employee-salary.calculate", {
            month,
            year,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-white leading-tight">
                    Employee Salary Calculation
                </h2>
            }
        >
            <Head title="Employee Salary Calculation" />
            <div className="space-y-6 p-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <form
                        onSubmit={handleCalculate}
                        className="flex flex-col md:flex-row md:items-end gap-4"
                    >
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-white">
                                Bulan
                            </label>
                            <select
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                className="p-2 rounded border dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                            >
                                {months.map((m, idx) => (
                                    <option key={idx + 1} value={idx + 1}>
                                        {m}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-white">
                                Tahun
                            </label>
                            <select
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="py-2 px-4 rounded border dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                            >
                                {years.map((y) => (
                                    <option key={y} value={y}>
                                        {y}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            disabled={isProcessing}
                        >
                            Hitung
                        </button>
                    </form>
                    <Link
                        href={route("employee-salary.index")}
                        className="bg-blue-500 text-white text-sm px-4 py-2 rounded shadow hover:bg-blue-600 transition"
                    >
                        Lihat Data Gaji
                    </Link>
                </div>

                {isProcessing && (
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                        <div
                            className="bg-blue-500 h-4 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                        ></div>
                        <div className="text-center text-xs mt-1">
                            {progress}%
                        </div>
                    </div>
                )}

                <div className="bg-white dark:bg-gray-800 rounded shadow p-4 border border-gray-200 dark:border-gray-700 overflow-x-auto dark:text-white">
                    <table className="min-w-full table-auto text-sm">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-700">
                                {columns.map((col, idx) => (
                                    <th key={idx} className="p-2">
                                        {col.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {salaries.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="text-center py-6 text-gray-500 dark:text-gray-400"
                                    >
                                        Silakan pilih bulan dan tahun lalu klik
                                        "Hitung"
                                    </td>
                                </tr>
                            ) : (
                                salaries.map((item, idx) => (
                                    <tr
                                        key={idx}
                                        className={
                                            idx % 2 === 0
                                                ? "bg-white dark:bg-gray-800"
                                                : "bg-gray-50 dark:bg-gray-700"
                                        }
                                    >
                                        {columns.map((col, cidx) => (
                                            <td key={cidx} className="p-2">
                                                {col.render(item)}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 text-xs text-gray-600 dark:text-gray-300">
                    <b>Keterangan:</b>
                    <ul className="list-disc ml-6">
                        <li>
                            Bonus dihitung dari presensi: jika terlambat lebih
                            dari 5 menit, denda Rp. 5.000/menit; pulang cepat
                            juga denda Rp. 5.000/menit.
                        </li>
                        <li>BPJS = 2% dari gaji pokok</li>
                        <li>JP = 1% dari gaji pokok</li>
                        <li>Total = (Gaji + Bonus) - (BPJS + JP + Cicilan)</li>
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
