import React from "react";
import { Link } from "@inertiajs/react";

const Pagination = ({ links }) => {
    
    return (
        <nav className="flex items-center gap-1">
            {links.map((link, idx) => (
                <Link
                    key={idx}
                    href={link.url ?? "#"}
                    className={`px-3 py-1 rounded transition ${
                        link.active
                            ? "bg-blue-500 text-white dark:bg-blue-600"
                            : "bg-gray-200 hover:bg-gray-300 text-black dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                    } ${
                        !link.url
                            ? "pointer-events-none opacity-50 dark:opacity-50"
                            : ""
                    }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </nav>
    );
};

export default Pagination;
