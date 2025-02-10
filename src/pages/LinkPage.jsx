import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth"
import useRefreshToken from "../hooks/useRefreshToken";

function LinkPage() {
    const { auth } = useAuth();
    const refresh = useRefreshToken();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh()
            } catch (err) {
                console.error(err)
            } finally {
                isMounted
            }
        }

        if (!auth?.accessToken) verifyRefreshToken();

        return () => isMounted = false;
    }, [])

    return (
        <section className="">
            <h1 className="text-2xl font-bold tracking-tight text-center uppercase">Links</h1>
            {auth?.accessToken ? (
                <div className="border border-zinc-950 p-2 rounded-lg bg-zinc-800">
                    <p className="text-center text-zinc-50 font-bold">You are logged in.</p>
                </div>
            ) : 
            <div className="border border-zinc-950 p-2 rounded-lg bg-zinc-800">
                <h2 className="text-lg font-semibold text-zinc-100 mb-2">Public:</h2>
                <div className="flex justify-evenly gap-1">
                    <div className="text-center p-1 w-full text-lg text-zinc-100 rounded-lg bg-zinc-600">
                        <Link to="/login">Login</Link>
                    </div>
                    <div className="text-center p-1 w-full text-lg text-zinc-100 rounded-lg bg-zinc-600">
                        <Link to="/register">Register</Link>
                    </div>
                </div>
            </div>
            }
            <br />
            <div className="border border-zinc-950 p-2 rounded-lg bg-zinc-800">
                <h2 className="text-lg font-semibold text-zinc-100 mb-2">Private</h2>
                <div className="flex justify-between gap-1">
                    <button className="text-center p-1 w-full text-lg text-zinc-100 rounded-lg bg-zinc-600">
                        <Link to="/">Home</Link>
                    </button>
                    <div className="text-center p-1 w-full text-lg text-zinc-100 rounded-lg bg-zinc-600">
                        <Link to="/editor">Editors Page</Link>
                    </div>
                    <div className="text-center p-1 w-full text-lg text-zinc-100 rounded-lg bg-zinc-600">
                        <Link to="/admin">Admin Page</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LinkPage