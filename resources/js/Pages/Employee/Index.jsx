import React, { useEffect, useMemo, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import SearchBar from "@/Components/SearchBar";
import Pagination from "@/Components/Pagination";
import DataTable from "@/Components/DataTable";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";

export default function Index({ employees }) {
    const { props } = usePage();
    console.log(props);
    useEffect(() => {
        if (props.flash?.success) {
            Swal.fire("Sukses!", props.flash.success, "success");
        }
        if (props.flash?.error) {
            Swal.fire("Error!", props.flash.error, "error");
        }
    }, [props.flash]);

    const [search, setSearch] = useState("");

    // Filter hanya di frontend, paginasi tetap backend
    const filteredEmployees = useMemo(() => {
        if (!search) return employees.data;
        return employees.data.filter((employee) =>
            employee.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, employees.data]);

    const columns = [
        { label: "Name", render: (item) => item.name },
        {
            label: "Photo",
            render: (item) => {
                if (item.user_picture) {
                    return (
                        <img
                            src={`storage/${item.user_picture}`}
                            alt={item.name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    );
                }
                return (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Photo</span>
                    </div>
                );
            },
        },
        { label: "Email", render: (item) => item.email },
        { label: "Address", render: (item) => item.address },
        { label: "Phone", render: (item) => item.phone },
        {
            label: "Date Joined",
            render: (item) => new Date(item.created_at).toLocaleDateString(),
        },
    ];

    const actions = (employee) => (
        <div className="flex space-x-2 items-center">
            {/* <Link
                href={route("employee.show", employee.id)}
                className="p-2 rounded hover:bg-green-100 dark:hover:bg-green-900 text-green-600 dark:text-green-400"
                title="View"
            >
                <FaEye />
            </Link> */}
            <Link
                href={route("employee.edit", employee.id)}
                className="p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-600 dark:text-blue-400"
                title="Edit"
            >
                <FaEdit />
            </Link>
            <button
                onClick={() =>
                    Swal.fire({
                        title: "Anda yakin ingin menghapus data ini?",
                        text: `Data ${employee.name} akan dihapus secara permanen.`,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#d33",
                        cancelButtonColor: "#3085d6",
                        confirmButtonText: "Ya, hapus",
                        cancelButtonText: "Batal",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            router.delete(
                                route("employee.destroy", employee.id),
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
                    Employee List
                </h2>
            }
        >
            <Head title="Employee" />
            <div className="space-y-6 p-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                    <SearchBar searchTerm={search} onSearch={setSearch} />
                    <Link
                        href={route("employee.create")}
                        className="bg-blue-500 text-white text-sm px-4 py-2 rounded shadow hover:bg-blue-600 transition"
                    >
                        Add New Employee
                    </Link>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded shadow p-4 border border-gray-200 dark:border-gray-700">
                    <DataTable
                        columns={columns}
                        data={filteredEmployees}
                        actions={actions}
                        currentPage={employees.current_page}
                        perPage={employees.per_page}
                    />
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-300 mt-4 gap-2">
                    <div>
                        Showing{" "}
                        {(employees.current_page - 1) * employees.per_page + 1}{" "}
                        to{" "}
                        {Math.min(
                            employees.current_page * employees.per_page,
                            employees.total
                        )}{" "}
                        of {employees.total} entries
                    </div>
                    <Pagination links={employees.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
