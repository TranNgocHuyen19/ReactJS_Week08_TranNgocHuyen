import { Outlet } from "react-router";
import { Header } from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

export function MainLayout() {
    return (
        <>
            <main className="grid grid-cols-12">
                <div className="col-span-3">
                    <Sidebar />
                </div>
                <div  className="col-span-9">
                    <Header />
                    <Outlet />
                </div>
            </main>
        </>
    )
}