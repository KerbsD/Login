import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from 'react-router-dom';

const Users = ({ trigger }) => {
    const [todo, setTodos] = useState();
    const axiosPrivate = useAxiosPrivate();
    const [del, setDel] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getTodos = async () => {
            try {
                const response = await axiosPrivate.get('/todo', {
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
    }, [trigger, del])

    const handleTodoDelete = async (id) => {
        console.log(id)
        try {
            const response = await axiosPrivate.delete('/todo',
               {data: { id: id}}
            );   
            console.log(JSON.stringify(response))
            setDel(true)
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

    return (
        <>
            {todo?.length
                ? (
                    <ul className="max-w-4xl">
                        {todo.map((todo) => (
                            <li className="px-6 py-4 rounded-lg shadow-lg shadow-zinc-950/40 flex items-center mt-4 justify-between" key={todo._id}>
                                <img src="/resources/checkbox.svg" className="h-5 mr-4" />
                                <div>
                                    <label htmlFor="sample" className="text-lg">{todo?.taskName}</label>
                                </div>
                                <img onClick={() => handleTodoDelete(todo._id)} src="/resources/trash.png" className="h-5 ml-4" />
                            </li>
                        )
                        )}
                    </ul>
                ) : <p className="text-3xl font-bold mt-20">No To-do's currently!</p>
            }
        </>
    );
};

export default Users;
