import React, { useState, useMemo, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import DataTable from "@/Components/DataTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

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

export default function Index({ salaries, filters }) {
    const { props } = usePage();
    useEffect(() => {
        if (props.flash?.success) {
            Swal.fire("Sukses!", props.flash.success, "success");
        }
        if (props.flash?.error) {
            Swal.fire("Error!", props.flash.error, "error");
        }
    }, [props.flash]);

    const [search, setSearch] = useState("");
    const [month, setMonth] = useState(filters?.month ?? new Date().getMonth());
    const [year, setYear] = useState(filters?.year ?? currentYear);

    // Filter frontend (optional, bisa dihapus jika tidak ingin search lokal)
    const filteredSalaries = useMemo(() => {
        if (!search) return salaries.data;
        return salaries.data.filter((item) =>
            item.employee_name?.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, salaries.data]);

    const columns = [
        { label: "Bulan", render: (item) => months[item.month] },
        { label: "Tahun", render: (item) => item.year },
        { label: "Pegawai", render: (item) => item.employee?.name || "-" },
        {
            label: "Gaji Pokok",
            render: (item) => item.basic_salary?.toLocaleString("id-ID"),
        },
        {
            label: "Bonus",
            render: (item) => item.bonus?.toLocaleString("id-ID"),
        },
        { label: "BPJS", render: (item) => item.bpjs?.toLocaleString("id-ID") },
        { label: "JP", render: (item) => item.jp?.toLocaleString("id-ID") },
        {
            label: "Cicilan",
            render: (item) => item.loan?.toLocaleString("id-ID"),
        },
        {
            label: "Total Gaji",
            render: (item) => (
                <b>{item.total_salary?.toLocaleString("id-ID")}</b>
            ),
        },
    ];

    const actions = (employee_salary) => (
        <div className="flex space-x-2 items-center">
            <Link
                href={route("employee-salary.edit", employee_salary.id)}
                className="p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-600 dark:text-blue-400"
                title="Edit"
            >
                <FaEdit />
            </Link>
            <button
                onClick={() =>
                    Swal.fire({
                        title: "Anda yakin ingin menghapus data ini?",
                        text: `Data ${employee_salary.name} akan dihapus secara permanen.`,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#d33",
                        cancelButtonColor: "#3085d6",
                        confirmButtonText: "Ya, hapus",
                        cancelButtonText: "Batal",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            router.delete(
                                route(
                                    "employee-salary.destroy",
                                    employee_salary.id
                                ),
                                {
                                    onSuccess: () => {
                                        Swal.fire(
                                            "Terhapus!",
                                            "Data berhasil dihapus.",
                                            "success"
                                        );
                                    },
                                    onError: () => {
                                        Swal.fire(
                                            "Error",
                                            "Gagal menghapus data.",
                                            "error"
                                        );
                                    },
                                }
                            );
                        }
                    })
                }
                className="p-2 rounded hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400"
                type="button"
                title="Delete"
            >
                <FaTrash />
            </button>
        </div>
    );

    const handleFilter = (e) => {
        e.preventDefault();
        window.location.href = route("employee-salary.index", { month, year });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-white leading-tight">
                    Employee Salary
                </h2>
            }
        >
            <Head title="Employee Salary" />
            <div className="space-y-6 p-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <form
                        onSubmit={handleFilter}
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
                                    <option key={idx} value={idx}>
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
                        >
                            Filter
                        </button>
                    </form>
                    <Link
                        href={route("employee-salary.create")}
                        className="bg-blue-500 text-white text-sm px-4 py-2 rounded shadow hover:bg-blue-600 transition"
                    >
                        Add Salary
                    </Link>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded shadow p-4 border border-gray-200 dark:border-gray-700">
                    <DataTable
                        columns={columns}
                        data={filteredSalaries}
                        actions={actions}
                        currentPage={salaries.current_page}
                        perPage={salaries.per_page}
                    />
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-300 mt-4 gap-2">
                    <div>
                        Showing{" "}
                        {(salaries.current_page - 1) * salaries.per_page + 1} to{" "}
                        {Math.min(
                            salaries.current_page * salaries.per_page,
                            salaries.total
                        )}{" "}
                        of {salaries.total} entries
                    </div>
                    <Pagination links={salaries.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
