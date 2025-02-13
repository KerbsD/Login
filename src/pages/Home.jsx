import { Link } from "react-router-dom";
import Modal from '../components/Modal';
import { useState } from 'react'

function Home() {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <section>
            <Modal show={showModal} onClose={handleCloseModal}>
                <h2>Modal Title</h2>
                <p>This is the modal content.</p>
            </Modal>
            <h1>Home</h1>
            <button onClick={handleOpenModal} className="hover:bg-zinc-200 duration-200 p-3 rounded-3xl shadow-lg uppercase font-bold flex items-center"><img src="/resources/add.svg" className="w-5 mr-2 " alt="" />note</button>
            <br />
            <Link to="/todo">Go to the Todo page</Link>
            <br />
            <Link to="/admin">Go to the Admin page</Link>
            <br />
            <Link to="/lounge">Go to the Lounge</Link>
            <br />
            <Link to="/linkpage">Go to the link page</Link>
        </section>
    )
}

export default Home
