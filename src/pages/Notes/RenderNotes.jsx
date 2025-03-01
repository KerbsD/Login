import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import Modal from '../../components/Modal';
import { format, set } from 'date-fns'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { se } from "date-fns/locale";

function RenderNotes({ trigger }) {
    const [isDisabled, setIsDisabled] = useState(true);
    const [loading, setLoading] = useState(true)
    const [notes, setNotes] = useState()
    const [selectedNote, setSelectedNote] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate()

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [noteId, setNoteId] = useState();

    const handleModalDisplay = (note) => {
        setSelectedNote(note)
        setShowModal(prev => !prev);
        setTitle(note.title);
        setContent(note.content);
        setNoteId(note._id);
    };

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getNotes = async () => {
            try {
                const response = await axiosPrivate.get(`/notes/${auth.id}`, {
                    signal: controller.signal
                });
                console.log(response.data);
                setLoading(false)
                isMounted && setNotes(response.data);
            } catch (err) {
                console.error(err);
            }
        }

        getNotes();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [trigger, noteId])

    const handleEditNote = async (e) => {
        e.preventDefault();
        console.log(noteId);
        try {
            const response = await axiosPrivate.put(`/notes/${noteId}`,
                JSON.stringify({
                    title,
                    content
                })
            );
            console.log(JSON.stringify(response))
            setTitle('');
            setContent('');
            setNoteId('')
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

    const handleDeleteNote = async (id) => {
        try {
            const response = await axiosPrivate.delete('/notes',
                { data: { id: id } }
            );
            console.log(JSON.stringify(response))
            setTitle('');
            setContent('');
            setNoteId('')
            handleModalDisplay();
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

    const enableInput = () => {
        setIsDisabled(prev => !prev);
    }

    return (
        !loading ?
            <div>
                {notes?.length
                    ? (
                        <div className="p-5">
                            {selectedNote ? (
                                <Modal bgColor={selectedNote.noteBg} show={showModal} onClose={() => setShowModal(false)}>
                                    <form onSubmit={handleEditNote} className='w-[325px]'>
                                        <input type="text" disabled={isDisabled} className="placeholder:text-zinc-950 outline-none text-2xl font-bold tracking-tight bg-transparent" value={title} onChange={(e) => setTitle(e.target.value)} />
                                        <span className="inline-block py-3">{format(selectedNote.createdAt, "MMMM dd, yyyy - hh:mm aaa")}</span>
                                        <input type="text" disabled={isDisabled} className="bg-transparent outline-none placeholder:text-zinc-950" value={content} onChange={(e) => setContent(e.target.value)} />
                                        <div className="mt-5 flex justify-end gap-3 items-center">
                                            <img onClick={() => enableInput()} src="/resources/edit.svg" className={isDisabled ? "h-[21px] duration-150" : "h-[21px] bg-zinc-950/25 rounded duration-150"} />
                                            <img onClick={() => handleDeleteNote(selectedNote._id)} src="/resources/trash.svg" className="h-6 duration-150" />
                                            <button className={isDisabled ? "hidden" : " px-3 bg-zinc-950 text-zinc-100 tracking-tight hover:bg-zinc-800 active:bg-zinc-700 duration-200 focus:bg-zinc-600 rounded-md"}>Edit</button>
                                        </div>
                                    </form>
                                </Modal>
                            ) : (
                                <Modal>
                                    <p>Error no content!</p>
                                </Modal>
                            )}

                            <div className="p-5 md:p-10">
                                <div className="">
                                    <DragDropContext>
                                        <Droppable droppableId="notes">
                                            {(provided) => (
                                                <div {...provided.droppableProps} ref={provided.innerRef} className="notes grid grid-col-1 md:grid-cols-3 gap-3">
                                                    {notes
                                                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                                    .map((note, index) => (
                                                        <Draggable key={note._id} draggableId={note.title} index={index}>
                                                            {(provided) => (
                                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={() => handleModalDisplay(note)} className={"border p-10 rounded-md shadow-md " + note.noteBg}>
                                                                    <p className="font-bold mb-1">{note.title}</p>
                                                                    <p className="text-xs">{format(note.createdAt, "MMMM dd, yyyy")}</p>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </DragDropContext>
                                </div>
                            </div>
                        </div>
                    )
                    : <p className="text-center text-2xl tracking-tight">You have no notes currently</p>
                }
            </div> :
            <div className="grid place-content-center h-1/2">
                <div className="p-5 w-[50px] h-[50px] border-2 border-zinc-950 border-l-0 border-t-0 rounded-full animate-spin">
                </div>
            </div>
    )
}



export default RenderNotes;