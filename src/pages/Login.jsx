import { useRef, useState, useEffect, useContext } from 'react';
import useAuth from '../hooks/useAuth';
import LoginFields from "../components/auth/LoginFields"
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useInput from '../hooks/useInput';
import useToggle from '../hooks/useToggle';
import axios from '../api/axios';
const LOGIN_URL = '/auth';

const Login = () => {

    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/"

    const userRef = useRef();
    const errRef = useRef();

    const [user, resetUser, userAttr] = useInput('user', '')
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [check, toggleCheck] = useToggle("persist", false);
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            // console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            const id = response?.data?.id;
            setAuth({ user, roles, accessToken, id });
            //setUser('');
            resetUser();

            setPwd('');
            navigate(from, { replace: true })

        } catch (err) {
            console.log(err)
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }


    return (
        <section className='h-[90vh] grid place-content-center'>

            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1 className="text-2xl font-bold tracking-tight uppercase mb-5">Login</h1>
            <form onSubmit={handleSubmit}>
                <LoginFields
                    title={"Username:"}
                    id={"username"}
                    type={"text"}
                    fer={userRef}
                    autoCompt={"off"}
                    attribs={userAttr}

                />

                <LoginFields
                    title={"Password:"}
                    id={"password"}
                    type={"password"}
                    onchange={(e) => setPwd(e.target.value)}
                    value={pwd}
                />

                <button className="py-2 px-4 mt-4 bg-zinc-950 text-zinc-100 tracking-tight hover:bg-zinc-800 active:bg-zinc-700 duration-200 focus:bg-zinc-600">Sign In</button>
                <div className='py-5'>
                    <input
                        type="checkbox"
                        id='persist'
                        onChange={toggleCheck}
                        checked={check}
                    />
                    <label className='ml-1 accent-zinc-600' htmlFor="persist">Trust this Device</label>
                </div>

            </form>
            <p className="text-center">
                Need an Account?
                <span className="hover:text-zinc-400 ml-1 duration-150">
                    <Link to="/register">Sign up</Link>
                </span>
            </p>
        </section>
    )
}

export default Login
