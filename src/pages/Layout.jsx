import { Outlet, Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";

function Layout() {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const logout = useLogout()

    const signOut = async () => {
        await logout();
        navigate('/login');
    }

    return (
        <>
            <nav className="bg-zinc-950 py-3 px-10 flex justify-between items-center">
                <Link to="/">
                    <div className="uppercase font-bold text-zinc-100 text-xl duration-300">Monotes</div>
                </Link>
                <div className="flex items-center gap-3">
                    <p className="text-zinc-100">{auth.user}</p>
                    {auth?.accessToken ? (
                        <>
                            <p className="text-zinc-100">/</p>
                            <p className="text-zinc-100 font-bold hover:bg-zinc-400 py-1 hover:px-3 rounded duration-300 hover:text-zinc-900" onClick={signOut}>Logout</p>
                        </>) : (<p></p>)
                    }
                </div>
            </nav>
            <main className="grid place-content-center my-10">
                <Outlet />
            </main>
        </>
    )
}

export default Layout
