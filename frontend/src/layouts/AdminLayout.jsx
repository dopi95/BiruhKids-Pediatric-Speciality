import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout({ children }) {
    return (
        <div className="flex bg-gray-50">
            <AdminSidebar />
            <main className="w-full mt-14 md:mt-0">{children}</main>
        </div>
    );
}
