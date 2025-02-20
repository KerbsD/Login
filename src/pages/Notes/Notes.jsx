import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Modal from '../../components/Modal';
import { useState } from 'react';
import useAuth from "../../hooks/useAuth";
import RenderNotes from "./RenderNotes";

function Notes() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [showModal, setShowModal] = useState(false);
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth();

    const handleModalDisplay = () => {
        setShowModal(prevShow => !prevShow);
    };

    const handleCreateNote = async (e) => {
        e.preventDefault();
        console.log(title);
        console.log(content);

        try {
            const response = await axiosPrivate.post('/notes',
                JSON.stringify({ 
                    curUserId: auth.id, 
                    title, 
                    content })
            );
            console.log(JSON.stringify(response))
            setTitle('');
            setContent('');
            handleModalDisplay();
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
        <>
            <h1 className="p-5 text-center text-2xl md:text-left md:text-3xl font-bold tracking-tight uppercase">Notes</h1>
            <Modal show={showModal} onClose={handleModalDisplay}>
                <form onSubmit={handleCreateNote} className='w-[325px]'>
                    <label className='text-lg mb-1' htmlFor="title">Title:</label>
                    <input className='px-4 py-3 outline-none rounded-md shadow-md border border-zinc-100 mb-5' id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <label className='text-lg mb-1' htmlFor="content">Content:</label>
                    <textarea className='px-4 py-1 outline-none rounded-md shadow-md border border-zinc-100' rows="15" cols="30" id="content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                    <button className="py-2 px-4 mt-4 bg-zinc-950 text-zinc-100 tracking-tight hover:bg-zinc-800 active:bg-zinc-700 duration-200 focus:bg-zinc-600 rounded-md">Add</button>
                </form>
            </Modal>
            <div className='px-10 grid place-content-center md:place-self-end'>
                <button onClick={handleModalDisplay} className="hover:bg-zinc-200 duration-200 p-3 rounded-3xl shadow-lg uppercase font-bold flex items-center"><img src="/resources/add.svg" className="w-5 mr-2 " alt="" />note</button>
            </div>
            <RenderNotes trigger={showModal} curId={auth.id} />
        </>

    )
}

export default Notes;