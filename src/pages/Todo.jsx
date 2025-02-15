import Home from "../components/HomeBtn"
import { useState } from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useRefreshToken from "../hooks/useRefreshToken";
import Todos from './todoComp/Todos'

function Todo() {
    const [todos, setTodos] = useState('');
    const [type, setType] = useState('Neutral')
    const [success, setSuccess] = useState(false)
    const axiosPrivate = useAxiosPrivate()

    const toggleSuccess = () => {
        setSuccess(prevSuccess => !prevSuccess);
    };

    const handleAddTodo = async (e) => {
        e.preventDefault();
        console.log(todos)
        try {
            const response = await axiosPrivate.post('/todo',
                JSON.stringify({ taskName: todos, type: type })
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
        <section className="max-w-6xl w-full">
            <div className="flex justify-between items-center w-full">
                <h1 className="font-bold uppercase tracking-tight text-2xl">Todo List</h1>
                <Home />
            </div>
            <div className="p-3 grid place-items-center mt-10">
                <form onSubmit={handleAddTodo} className="flex flex-row items-center">
                    <div className="w-14 h-4 mr-2 bg-red-400 rounded-full"></div>
                    <div className="w-14 h-4 mr-2 bg-green-400 rounded-full"></div>
                    <div className="w-14 h-4 mr-2 bg-yellow-400 rounded-full"></div>
                    <input className="px-4 py-2 outline-none rounded-l-xl w-[700px]" type="text" value={todos} onChange={(e) => setTodos(e.target.value)} />
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
