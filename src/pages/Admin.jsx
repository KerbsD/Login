import { Link } from 'react-router-dom'
import Users from './Users'
import Home from '../components/HomeBtn'

function Admin(){
    return (
        <section>
            <h1>Admins Page</h1>
            <br />
            <Users />
            <div className="flexGrow">
                <Home />
            </div>
        </section>
    )
}

export default Admin