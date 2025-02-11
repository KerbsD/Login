import home from '/resources/home.svg'
import { Link } from 'react-router-dom'

function HomeBtn() {
    return <Link to="/">
        <div className='flex items-center bg-zinc-950 py-1 px-3 rounded-full border-4 border-zinc-400 shadow-lg- max-w-24'>
            <img className='w-4 invert' src={home} alt="home icon" />
            <p className='ml-1 font-bold text-zinc-100'>HOME</p>
        </div>
    </Link>

}

export default HomeBtn