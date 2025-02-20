import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import Modal from '../../components/Modal';

function RenderNotes({ trigger }) {
    const [showModal, setShowModal] = useState(false);
    const [notes, setNotes] = useState()
    const [note, setNote] = useState()
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate()

    const handleModalDisplay = async (noteId) => {
        console.log(noteId)
        setShowModal(prevShow => !prevShow);

        try {
            const response = await axiosPrivate.get(`/notes/` + noteId, {
                
            });
            console.log(response.data);
            setNote(response.data);
        } catch (err) {
            console.error(err);
        }
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
            <Modal show={showModal} onClose={handleModalDisplay}>
                {note ? (
                    <div>
                        <h1>{note.title}</h1>
                        <p>{note.content}</p>
                    </div>
                ) : (
                    <p>Loading note...</p>
                )}
            </Modal>
            {notes?.length
                ? (
                    <div className="p-5 flex gap-2 flex-wrap">
                        {notes.map((note) => (
                            <div onClick={() => handleModalDisplay(note._id)} className={"border border-zinc-200 p-10 rounded-md shadow-md"} key={note._id}>
                                <p className="font-bold">{note.title}</p>

                            </div>
                        )
                        )}
                    </div>
                )
                : <p className="text-center text-2xl tracking-tight">You have no notes currently</p>
            }
        </div>
    )
}



export default RenderNotes;