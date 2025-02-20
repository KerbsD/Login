import { Outlet } from "react-router-dom"

function NoteLayout() {
    return (
        <section className="md:max-w-4xl w-screen h-[90vh]">
            <Outlet/>
        </section>
    )
}

export default NoteLayout