import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { format } from 'date-fns'
import useAuth from "../../hooks/useAuth";

const Todos = ({ trigger }) => {
    const [todo, setTodos] = useState();
    const axiosPrivate = useAxiosPrivate();
    const [success, setSuccess] = useState(false);
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
            console.log(JSON.stringify(response))
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
            console.log(JSON.stringify(response))
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
    const dateNow = format(new Date(), "MMMM dd, yyyy");

    useEffect(() => {
        console.log(dateNow)
        let isMounted = true;
        const controller = new AbortController();

        const getTodos = async () => {
            try {
                const response = await axiosPrivate.get(`/todo/${auth.user}`, {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setTodos(response.data);
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
        <>
            {todo?.length
                ? <>
                    <ul className="md:max-w-4xl mb-5 p-5 md:p-0 md:min-w-4xl">
                        <h2 className="font-bold text-lg">Current Todo's:</h2>
                        {todo.filter(todo => todo.status === "In Progress" && format(todo.createdAt, "MMMM dd, yyyy") === dateNow).map((todo) => (
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
                                    <img onClick={() => handleTodoDelete(todo._id)} src="/resources/trash.png" className="h-5 ml-4 duration-150 hover:animate-bounce" />
                                </li>
                            </div>
                        )
                        )}
                    </ul>
                    <ul className="md:max-w-4xl mb-5 p-5 md:p-0">
                        <h2 className="font-bold text-lg">Completed Todo's:</h2>
                        {todo.filter(todo => todo.status === "Done" && format(todo.createdAt, "MMMM dd, yyyy") === dateNow)
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
                                        <img onClick={() => handleTodoDelete(todo._id)} src="/resources/trash.png" className="h-5 ml-4 duration-150 hover:animate-bounce" />
                                    </li>
                                </div>
                            )
                            )} 
                    </ul>
                </>
                : <p className="text-3xl font-bold mt-20">There was an error</p>
            }
        </>
    );
};

export default Todos;
