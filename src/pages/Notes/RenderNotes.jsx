import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import Modal from '../../components/Modal';
import { format } from 'date-fns'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function RenderNotes({ trigger }) {
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false);
    const [notes, setNotes] = useState()
    const [selectedNote, setSelectedNote] = useState(null);
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate()

    const handleModalDisplay = async (note) => {
        setSelectedNote(note)
        setShowModal(prev => !prev);
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
    }, [trigger])

    return (
        !loading ?
            <div>
                {notes?.length
                    ? (
                        <div className="p-5">
                            {selectedNote ? (
                                <Modal bgColor={selectedNote.noteBg} show={showModal} onClose={() => setShowModal(false)}>
                                    <div>
                                        <h1 className="text-2xl font-bold tracking-tight">{selectedNote.title}</h1>
                                        <span className="inline-block py-3">{format(selectedNote.createdAt, "MMMM dd, yyyy - hh:mm aaa")}</span>
                                        <p>-{selectedNote.content}</p>
                                    </div>
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
                                                    {notes.map((note, index) => (
                                                        <Draggable key={note.title} draggableId={note.title} index={index}>
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