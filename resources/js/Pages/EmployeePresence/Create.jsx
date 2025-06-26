import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Create({ employees }) {
    const { data, setData, post, processing, errors } = useForm({
        employee_id: "",
        check_in: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("employee-presence.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-white leading-tight">
                    Check In Employee
                </h2>
            }
        >
            <Head title="Check In Employee" />

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
                    <div>
                        <label className="block font-medium">Check In</label>
                        <input
                            type="datetime-local"
                            value={data.check_in || ""}
                            onChange={(e) =>
                                setData("check_in", e.target.value)
                            }
                            className="w-full mt-1 p-2 border dark:border-gray-600 bg-white dark:bg-gray-900 rounded text-sm"
                        />
                        {errors.check_in && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.check_in}
                            </p>
                        )}
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                        <Link
                            href={route("employee-presence.index")}
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
