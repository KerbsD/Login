import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (err) {
                console.error(err);
                if (err.code !== "ERR_CANCELED")
                    navigate("/login", { state: { from: location }, replace: true });
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <article className="border border-zinc-950 p-4">
            <h2 className="text-center uppercase font-bold tracking-tight mb-3">Users List</h2>
            {users?.length
                ? (
                    <ul className="border-2 border-zinc-950 px-5 py-1 bg-zinc-950">
                        {users.map((user) => (
                            <li className="font-bold p-1 text-zinc-50" key={user._id}>{user?.username}</li>
                        )
                        )}
                    </ul>
                ) : <p>No users to display</p>
            }
        </article>
    );
};

export default Users;
