import React, { useState, useMemo, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import DataTable from "@/Components/DataTable";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import SearchBar from "@/Components/SearchBar";
export default function Index({ presences }) {
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
    const filteredPresences = useMemo(() => {
        if (!search) return presences.data;
        return presences.data.filter((item) =>
            item.employee?.name?.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, presences.data]);

    const columns = [
        { label: "Employee", render: (item) => item.employee?.name },
        {
            label: "Check In",
            render: (item) =>
                item.check_in ? new Date(item.check_in).toLocaleString() : "-",
        },
        {
            label: "Check Out",
            render: (item) =>
                item.check_out
                    ? new Date(item.check_out).toLocaleString()
                    : "-",
        },
        { label: "Late In", render: (item) => item.late_in ?? "-" },
        { label: "Early Out", render: (item) => item.early_out ?? "-" },
    ];

    const actions = (employee_presence) => (
        <div className="flex space-x-2 items-center">
            <Link
                href={route("employee-presence.edit", employee_presence.id)}
                className="p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-600 dark:text-blue-400"
                title="Edit"
            >
                <FaEdit />
            </Link>
            <button
                onClick={() =>
                    Swal.fire({
                        title: "Anda yakin ingin menghapus data ini?",
                        text: `Data ${employee_presence.name} akan dihapus secara permanen.`,
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
                                    "employee-presence.destroy",
                                    employee_presence.id
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

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-white leading-tight">
                    Employee Presence
                </h2>
            }
        >
            <Head title="Employee Presence" />
            <div className="space-y-6 p-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                    <SearchBar searchTerm={search} onSearch={setSearch} />
                    <div />
                    <Link
                        href={route("employee-presence.create")}
                        className="bg-blue-500 text-white text-sm px-4 py-2 rounded shadow hover:bg-blue-600 transition"
                    >
                        Add Presence
                    </Link>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded shadow p-4 border border-gray-200 dark:border-gray-700">
                    <DataTable
                        columns={columns}
                        data={filteredPresences}
                        actions={actions}
                        currentPage={presences.current_page}
                        perPage={presences.per_page}
                    />
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-300 mt-4 gap-2">
                    <div>
                        Showing{" "}
                        {(presences.current_page - 1) * presences.per_page + 1}{" "}
                        to{" "}
                        {Math.min(
                            presences.current_page * presences.per_page,
                            presences.total
                        )}{" "}
                        of {presences.total} entries
                    </div>
                    <Pagination links={presences.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
