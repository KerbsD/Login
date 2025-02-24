import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import Modal from '../../components/Modal';
import { format } from 'date-fns'

function RenderNotes({ trigger }) {
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
        <div>
            {notes?.length
                ? (
                    <div className="p-5 flex gap-2 flex-wrap">
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
                        <div className="p-5 md:-10">
                            <div className="columns-1 gap-5 lg:gap-5 sm:columns-2 lg:columns-3 [&>img:not(:first-child)]:mt-5 lg:[&>img:not(:first-child)]:mt-7">
                                {notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((note) => (
                                    <div onClick={() => handleModalDisplay(note)} className={"border p-10 rounded-md shadow-md " + note.noteBg}>
                                        <p className="font-bold">{note.title}</p>
                                        <p className="text-xs">{format(note.createdAt, "MMMM dd, yyyy")}</p>
                                    </div>
                                )
                                )}
                            </div>
                        </div>
                    </div>
                )
                : <p className="text-center text-2xl tracking-tight">You have no notes currently</p>
            }
        </div>
    )
}



export default RenderNotes;