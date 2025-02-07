
import { Outlet } from "react-router-dom"

function Layout(){
    return (
        
        <main className="flex flex-col justify-center items-center min-h-[100vh] py-4 px-2">
            <Outlet />
        </main>
    )
}

export default Layout
