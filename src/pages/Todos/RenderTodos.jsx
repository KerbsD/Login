import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { format } from 'date-fns'
import useAuth from "../../hooks/useAuth";

const Todos = ({ trigger }) => {
    const [loading, setLoading] = useState(true);
    const [todo, setTodos] = useState();
    const axiosPrivate = useAxiosPrivate();
    const [success, setSuccess] = useState(false);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])
    const { auth } = useAuth();

    const toggleSuccess = () => {
        setSuccess(prevSucess => !prevSucess)
    }

    const handleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === "In Progress" ? "Done" : "In Progress";
        console.log(newStatus)
        try {
            const response = await axiosPrivate.put('/todo',
                { id: id, status: newStatus }
            );
            console.log(JSON.stringify(response?.data))
            toggleSuccess()
        } catch (err) {
            if (!err?.response) {
                console.log(err);
            } else if (err.response?.status === 400) {
                console.log(err);
            } else {
                console.log(err)
            }
        }
    }

    const handleTodoDelete = async (id) => {
        console.log(id)
        try {
            const response = await axiosPrivate.delete('/todo',
                { data: { id: id } }
            );
            console.log(JSON.stringify(response?.data))
            toggleSuccess()
        } catch (err) {
            if (!err?.response) {
                console.log(err);
            } else if (err.response?.status === 400) {
                console.log(err);
            } else {
                console.log(err)
            }
        }
    }

    useEffect(() => {
        console.log(date)
        let isMounted = true;
        const controller = new AbortController();

        const getTodos = async () => {
            try {
                const response = await axiosPrivate.get(`/todo/${auth.user}`, {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setTodos(response.data);
                setLoading(false)
            } catch (err) {
                console.error(err);
            }
        }

        getTodos();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [trigger, success])


    return (
        !loading ? <>
            {todo?.length
                ? <>
                    <input className="my-5 border border-zinc-400 rounded-md py-1 px-4 max-w-36 mx-auto" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    <ul className="md:max-w-4xl mb-5 p-5 md:p-0 md:min-w-4xl">
                        <h2 className="font-bold text-lg">Current Todo's:</h2>
                        {todo
                        .filter(todo => todo.status === "In Progress" && format(todo.createdAt, "MMMM dd, yyyy") === format(date, "MMMM dd, yyyy"))
                        .map((todo) => (
                            <div className="rounded-lg shadow-lg shadow-zinc-950/40 border-zinc-50 border mt-4 duration-150" key={todo._id}>
                                <div className="flex item-center justify-between">
                                    <p className="text-xs inline-block mx-5 my-1 ">Created: {format(todo.createdAt, "MMMM dd, yyyy")}</p>
                                    <div className={todo.type === "Bad"
                                        ? "w-4 m-1 h-4 mr-2 bg-red-400 rounded-full"
                                        : todo.type === "Neutral"
                                            ? "w-4 m-1 h-4 mr-2 bg-yellow-400 rounded-full"
                                            : "w-4 m-1 h-4 mr-2 bg-green-400 rounded-full"}>
                                    </div>
                                </div>
                                <li className="md:min-w-[550px] px-6 flex items-center my-4 justify-between" key={todo._id}>
                                    <button onClick={() => handleStatus(todo._id, todo.status)}>
                                        {todo.status === "In Progress" ? <img src="/resources/uncheck.png" className="h-5 mr-4" /> : <img src="/resources/checkbox.svg" className="h-5 mr-4" />}
                                    </button>
                                    <div>
                                        <label className={todo.status === "In Progress" ? "text-xl" : "line-through text-zinc-600 text-xl"}>{todo?.taskName}</label>
                                    </div>
                                    <img onClick={() => handleTodoDelete(todo._id)} src="/resources/trash.svg" className="h-6 ml-4 duration-150 hover:animate-bounce" />
                                </li>
                            </div>
                        )
                        )}
                    </ul>
                    <ul className="md:max-w-4xl mb-5 p-5 md:p-0">
                        <h2 className="font-bold text-lg">Completed Todo's:</h2>
                        {todo.filter(todo => todo.status === "Done" && format(todo.createdAt, "MMMM dd, yyyy") === format(date, "MMMM dd, yyyy"))
                            .sort((a, b) => a.type === "Healthy" ? -1 : b.type === "Healthy" ? 1 : 0)
                            .map((todo) => (
                                <div className={
                                    todo.type === "Bad"
                                        ? "duration-300 rounded-lg shadow-lg shadow-zinc-400/40 border-red-400/10 border mt-4 bg-red-400/10"
                                        : todo.type === "Neutral" ? "duration-300 rounded-lg shadow-lg shadow-zinc-400/40 border-yellow-400/10 border mt-4 bg-yellow-400/10" : "duration-300 rounded-lg shadow-lg shadow-zinc-400/40 border-green-400/10 border mt-4 bg-green-400/10"
                                }
                                    key={todo._id}>
                                    <sub className="inline-block px-5">Created: {format(todo.createdAt, "MMMM dd, yyyy")}</sub>
                                    <li className="md:min-w-[550px] px-6 flex items-center my-4 justify-between" key={todo._id}>
                                        <button onClick={() => handleStatus(todo._id, todo.status)}>
                                            {todo.status === "In Progress" ? <img src="/resources/uncheck.png" className="h-5 mr-4" /> : <img src="/resources/checkbox.svg" className="h-5 mr-4" />}
                                        </button>
                                        <div>
                                            <label className={todo.status === "In Progress" ? "text-xl" : "line-through text-zinc-600 text-xl"}>{todo?.taskName}</label>
                                        </div>
                                        <img onClick={() => handleTodoDelete(todo._id)} src="/resources/trash.svg" className="h-6 ml-4 duration-150 hover:animate-bounce" />
                                    </li>
                                </div>
                            )
                            )}
                    </ul>
                </>
                : <p className="text-3xl font-bold mt-20">Loading...</p>
            }
        </> : <div className="grid place-content-center ">
            <div className="p-5 w-[50px] h-[50px] border-2 border-zinc-950 border-l-0 border-t-0 rounded-full animate-spin">
            </div>
        </div>
    );
};

export default Todos;
