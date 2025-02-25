import { Outlet } from "react-router-dom"

function TodoLayout() {
    return (
        <section className="md:max-w-4xl w-screen h-[90vh]">
            <Outlet/>
        </section>
    )
}

export default TodoLayout;