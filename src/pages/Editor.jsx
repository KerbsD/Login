import { Link } from "react-router-dom" 
import Home from "../components/HomeBtn"

function Editor() {
    return (
        <section>
            <h1>Editors Page</h1>
            <br />
            <p>You must have been assigned an Editor role.</p>
            <Home />
        </section>
    )
}

export default Editor
