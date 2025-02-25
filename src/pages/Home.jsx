import { Link } from "react-router-dom";

function Home() {
    const PageCards = ({ linkPage, imgSrc, title }) => {
        return <Link to={linkPage}>
            <div className="border-4 border-zinc-200 rounded-2xl px-5 pt-5 flex flex-col justify-center items-center shadow-md duration-200 hover:bg-zinc-950/10 hover:border-zinc-950/10">
                <img className="w-32" src={imgSrc} alt="" />
                <p className="inline-block my-4 font-bold text-4xl">{title}</p>
            </div>
        </Link>
    }

    return (
        <section className="h-[90vh]">
            <h1 className="text-5xl font-bold tracking-tight uppercase mb-10 text-center">Home</h1>
            <div className="gap-6 md:h-[60vh] flex flex-col md:flex-row justify-center md:items-center">
                <PageCards linkPage={"/todo"} imgSrc={"/resources/to-do-alt.svg"} title={"Todo's"} />
                <PageCards linkPage={"/notes"} imgSrc={'/resources/notes.svg'} title={"Notes"} />
            </div>
        </section>
    )
}

export default Home
