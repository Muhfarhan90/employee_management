import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Edit({ employee }) {
    const { data, setData, post, processing, errors } = useForm({
        name: employee.name || "",
        email: employee.email || "",
        address: employee.address || "",
        phone: employee.phone || "",
        user_picture: undefined,
        password: "",
        _method: "PUT",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = { ...data };
        // Remove if not changing
        if (!formData.user_picture) delete formData.user_picture;
        post(route("employee.update", employee.id), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-white leading-tight">
                    Edit Employee
                </h2>
            }
        >
            <Head title="Edit Employee" />

            <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow mt-6 text-sm">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 text-gray-900 dark:text-white"
                    encType="multipart/form-data"
                >
                    <div>
                        <label className="block font-medium">Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full mt-1 p-2 border dark:border-gray-600 bg-white dark:bg-gray-900 rounded text-sm"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block font-medium">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="w-full mt-1 p-2 border dark:border-gray-600 bg-white dark:bg-gray-900 rounded text-sm"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block font-medium">Address</label>
                        <input
                            type="text"
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            className="w-full mt-1 p-2 border dark:border-gray-600 bg-white dark:bg-gray-900 rounded text-sm"
                        />
                        {errors.address && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.address}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block font-medium">Phone</label>
                        <input
                            type="text"
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                            className="w-full mt-1 p-2 border dark:border-gray-600 bg-white dark:bg-gray-900 rounded text-sm"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.phone}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block font-medium">
                            User Picture (optional)
                        </label>
                        <input
                            type="file"
                            onChange={(e) =>
                                setData("user_picture", e.target.files[0])
                            }
                            className="w-full mt-1 p-2 border dark:border-gray-600 bg-white dark:bg-gray-900 rounded text-sm"
                        />
                        {errors.user_picture && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.user_picture}
                            </p>
                        )}
                        {employee.user_picture && (
                            <img
                                src={`/storage/${employee.user_picture}`}
                                alt="Current User Picture"
                                className="mt-2 w-24 h-24 object-cover rounded"
                            />
                        )}
                    </div>
                    <div>
                        <label className="block font-medium">
                            New Password (leave blank if not changing)
                        </label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="w-full mt-1 p-2 border dark:border-gray-600 bg-white dark:bg-gray-900 rounded text-sm"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end space-x-2 mt-4">
                        <Link
                            href={route("employee.index")}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
