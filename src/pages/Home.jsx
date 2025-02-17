import { Link } from "react-router-dom";
import Modal from '../components/Modal';
import { useState } from 'react'

function Home() {
    const [showModal, setShowModal] = useState(false);

    const handleModalDisplay = () => {
        setShowModal(prevShow => !prevShow);
    };

    const PageCards = ({ linkPage, imgSrc, title }) => {
        return <Link to={linkPage}>
            <div className="border-4 border-zinc-950 rounded-2xl px-5 pt-5 flex flex-col justify-center items-center shadow-inner max-w-44">
                <img className="w-20" src={imgSrc} alt="" />
                <p className="inline-block my-4 font-bold text-2xl">{title}</p>
            </div>
        </Link>
    }

    return (
        <section>
            <Modal show={showModal} onClose={handleModalDisplay}>
                <h2>Modal Title</h2>
                <p>This is the modal content.</p>
            </Modal>
            <h1>Home</h1>
            <button onClick={handleModalDisplay} className="hover:bg-zinc-200 duration-200 p-3 rounded-3xl shadow-lg uppercase font-bold flex items-center"><img src="/resources/add.svg" className="w-5 mr-2 " alt="" />note</button>
            <div className="flex gap-2">
                <PageCards linkPage={"/todo"} imgSrc={"/resources/to-do-alt.svg"} title={"Todo's"} />
                <PageCards linkPage={"/admin"} title={"Admin"} />
                <PageCards linkPage={"/lounge"} imgSrc={"/resources/table-picnic.svg"} title={"Lounge"} />
                <PageCards linkPage={"/linkpage"} imgSrc={"/resources/link-horizontal.svg"} title={"Linkpage"} />
            </div>

        </section>
    )
}

export default Home
