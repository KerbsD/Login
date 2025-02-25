import Home from "../../components/HomeBtn"
import { useState } from 'react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Todos from './RenderTodos'
import useAuth from "../../hooks/useAuth";

function Todo() {
    const [todos, setTodos] = useState('');
    const [type, setType] = useState("Neutral")
    const [success, setSuccess] = useState(false)
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth();

    const toggleSuccess = () => {
        setSuccess(prevSuccess => !prevSuccess);
    };

    const handleType = (type) => {
        setType(t => type);
        console.log(type)
    }

    const handleAddTodo = async (e) => {
        e.preventDefault();
        console.log(todos)
        try {
            const response = await axiosPrivate.post('/todo',
                JSON.stringify({ currentUser: auth.user, taskName: todos, type: type })
            );
            console.log(JSON.stringify(response))
            setTodos('');
            toggleSuccess()
        } catch (err) {
            if (!err?.response) {
                console.log(err);
            } else if (err.response?.status === 400) {
                console.log('Invalid type provided.');
            } else {
                console.log(err)
            }
        }
    }

    return (
        <section className="md:max-w-6xl md:w-full">
            <div className="flex mx-auto justify-between items-center w-[350px] md:w-full">
                <h1 className="font-bold uppercase tracking-tight text-2xl">Todo List</h1>
                <Home />
            </div>
            <div className="p-3 grid place-items-center mt-10">
                <form onSubmit={handleAddTodo} className="flex flex-row items-center">
                    <div onClick={() => handleType("Bad")} className={type === "Bad" ? "w-11 h-4 mr-2 bg-red-400 rounded-full border-2 border-red-700" : "w-14 h-4 mr-2 bg-red-400 rounded-full"}></div>
                    <div onClick={() => handleType("Healthy")} className={type === "Healthy" ? "w-11 h-4 mr-2 bg-green-400 rounded-full border-2 border-green-700" : "w-14 h-4 mr-2 bg-green-400 rounded-full"}></div>
                    <div onClick={() => handleType("Neutral")} className={type === "Neutral" ? "w-11 h-4 mr-2 bg-yellow-400 rounded-full border-2 border-yellow-700" : "w-14 h-4 mr-2 bg-yellow-400 rounded-full"}></div>
                    <input className="px-4 py-2 outline-none rounded-l-xl md:w-[700px]" type="text" value={todos} onChange={(e) => setTodos(e.target.value)} />
                    <button className="px-3 py-1 rounded-r-xl font-semibold text-zinc-50 bg-zinc-950">Add</button>
                </form>
            </div>
            
            <div className="grid place-content-center">
                <Todos trigger={success} />
            </div>
        </section>
    )
}

export default Todo
