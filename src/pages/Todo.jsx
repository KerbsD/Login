import { Link } from "react-router-dom" 
import Home from "../components/HomeBtn"
import { useState } from 'react';

function Todo() {
    return (
        <section className="max-w-6xl w-full">
            <div className="flex justify-between items-center w-full">
                <h1 className="font-bold uppercase tracking-tight text-xl">Todo List</h1>
                <Home />
            </div>
            <div>
                <form className="flex flex-row gap-1">
                   <input type="text" />
                   <input type="radio" name="type" id="healthy" />
                   <input type="radio" name="type" id="neutral" />
                   <input type="radio" name="type" id="bad" />
                   <button className="px-3 py-1 rounded-lg bg-zinc-400">Add</button> 
                </form>
            </div>
            <div className="grid place-content-center">
                <ul className="max-w-4xl">
                    <li className="px-6 py-4 rounded-2xl shadow-xl flex items-center">
                        <img src="/resources/checkbox.svg" className="h-5 mr-4" alt="" />
                        <label htmlFor="sample" className="text-lg">This is a Sample Lorem ipsum dolor</label>
                    </li>
                    <li className="px-6 py-4 rounded-2xl shadow-xl flex items-center">
                        <img src="/resources/checkbox.svg" className="h-5 mr-4" alt="" />
                        <label htmlFor="sample" className="text-lg">This is a Sample Lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi natus quis aspernatur sed facilis esse id quasi optio soluta ea nam, saepe fugiat in! Ducimus voluptatibus facilis eum explicabo voluptates.</label>
                    </li>
                    <li className="px-6 py-4 rounded-2xl shadow-xl flex items-center">
                        <img src="/resources/checkbox.svg" className="h-5 mr-4" alt="" />
                        <label htmlFor="sample" className="text-lg">This is a Sample Lorem ipsum dolor Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor culpa odio eligendi quas minus amet. Possimus ratione eos</label>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Todo
