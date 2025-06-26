import { useForm } from "@inertiajs/react";
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

export default function Create({ employees }) {
    const { data, setData, post, processing, errors } = useForm({
        employee_id: "",
        month: new Date().getMonth() + 1,
        year: currentYear,
        basic_salary: "",
        bonus: "",
        bpjs: "",
        jp: "",
        loan: "",
        total_salary: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("employee-salary.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-white leading-tight">
                    Create Salary
                </h2>
            }
        >
            <Head title="Create Salary" />

            <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow mt-6 text-sm">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 text-gray-900 dark:text-white"
                >
                    <div>
                        <label className="block font-medium">Employee</label>
                        <select
                            value={data.employee_id}
                            onChange={(e) =>
                                setData("employee_id", e.target.value)
                            }
                            className="w-full mt-1 p-2 border dark:border-gray-600 bg-white dark:bg-gray-900 rounded text-sm"
                        >
                            <option value="">-- Select Employee --</option>
                            {employees.map((emp) => (
                                <option key={emp.id} value={emp.id}>
                                    {emp.name}
                                </option>
                            ))}
                        </select>
                        {errors.employee_id && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.employee_id}
                            </p>
                        )}
                    </div>
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block font-medium">Month</label>
                            <select
                                value={data.month}
                                onChange={(e) =>
                                    setData("month", e.target.value)
                                }
                                className="w-full mt-1 p-2 border dark:border-gray-600 bg-white dark:bg-gray-900 rounded text-sm"
                            >
                                {months.map((m, idx) => (
                                    <option key={idx + 1} value={idx + 1}>
                                        {m}
                                    </option>
                                ))}
                            </select>
                            {errors.month && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.month}
                                </p>
                            )}
                        </div>
                        <div className="w-1/2">
                            <label className="block font-medium">Year</label>
                            <select
                                value={data.year}
                                onChange={(e) =>
                                    setData("year", e.target.value)
                                }
                                className="w-full mt-1 p-2 border dark:border-gray-600 bg-white dark:bg-gray-900 rounded text-sm"
                            >
                                {years.map((y) => (
                                    <option key={y} value={y}>
                                        {y}
                                    </option>
                                ))}
                            </select>
                            {errors.year && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.year}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block font-medium">
                            Basic Salary
                        </label>
                        <input
                            type="number"
                            value={data.basic_salary}
                            onChange={(e) =>
                                setData("basic_salary", e.target.value)
                            }
                            className="w-full mt-1 p-2 border dark:border-gray-600 bg-white dark:bg-gray-900 rounded text-sm"
                        />
                        {errors.basic_salary && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.basic_salary}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block font-medium">Bonus</label>
                        <input
                            type="number"
                            value={data.bonus}
                            onChange={(e) => setData("bonus", e.target.value)}
                            className="w-full mt-1 p-2 border dark:border-gray-600 bg-white dark:bg-gray-900 rounded text-sm"
                        />
                        {errors.bonus && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.bonus}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block font-medium">BPJS</label>
                        <input
                            type="number"
                            value={data.bpjs}
                            onChange={(e) => setData("bpjs", e.target.value)}
                            className="w-full mt-1 p-2 border dark:border-gray-600 bg-white dark:bg-gray-900 rounded text-sm"
                        />
                        {errors.bpjs && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.bpjs}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block font-medium">JP</label>
                        <input
                            type="number"
                            value={data.jp}
                            onChange={(e) => setData("jp", e.target.value)}
                            className="w-full mt-1 p-2 border dark:border-gray-600 bg-white dark:bg-gray-900 rounded text-sm"
                        />
                        {errors.jp && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.jp}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block font-medium">Loan</label>
                        <input
                            type="number"
                            value={data.loan}
                            onChange={(e) => setData("loan", e.target.value)}
                            className="w-full mt-1 p-2 border dark:border-gray-600 bg-white dark:bg-gray-900 rounded text-sm"
                        />
                        {errors.loan && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.loan}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block font-medium">
                            Total Salary
                        </label>
                        <input
                            type="number"
                            value={data.total_salary}
                            onChange={(e) =>
                                setData("total_salary", e.target.value)
                            }
                            className="w-full mt-1 p-2 border dark:border-gray-600 bg-white dark:bg-gray-900 rounded text-sm"
                        />
                        {errors.total_salary && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.total_salary}
                            </p>
                        )}
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                        <Link
                            href={route("employee-salary.index")}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
