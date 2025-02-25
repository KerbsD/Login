import { useRef, useState, useEffect } from "react";
import FormElement from "../components/auth/FormField";
import axios from '../api/axios';
import { Link, useNavigate } from 'react-router-dom'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

function Register() {
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate()
    
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            setUser('');
            setPwd('');
            setMatchPwd('');
            navigate("/login")
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <section className="text-lg h-[90vh] grid place-content-center">

            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1 className="text-2xl font-bold tracking-tight uppercase">Register</h1>
            <form onSubmit={handleSubmit}>
                <FormElement
                    label={"Username:"}
                    classcont={validName}
                    turo={userRef}
                    name={"username"}
                    type={"text"}
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    autocompt={"off"}
                    onblur={() => setUserFocus(false)}
                    onfocus={() => setUserFocus(true)}
                    focus={userFocus}
                    note={"uidnote"}
                    desc={'4 to 24 characters.Must begin with a letter.Letters, numbers, underscores, hyphens allowed.'} />

                <FormElement
                    label={"Password:"}
                    classcont={validPwd}
                    name={"password"}
                    type={"password"}
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    onblur={() => setPwdFocus(false)}
                    onfocus={() => setPwdFocus(true)}
                    focus={pwdFocus}
                    note={"pwdnote"}
                    desc={"Must be 8 to 24 Characters. Must not have special symbols."} />

                <FormElement
                    label={"Confirm Password:"}
                    classcont={validMatch && matchPwd}
                    name={"confirm_pwd"}
                    type={"password"}
                    value={matchPwd}
                    onChange={(e) => setMatchPwd(e.target.value)}
                    onblur={() => setMatchFocus(false)}
                    onfocus={() => setMatchFocus(true)}
                    focus={matchFocus}
                    note={"confirmnote"}
                    desc={"Must match the first password input field."} />

                <button className="py-2 px-4 mt-4 bg-zinc-950 text-zinc-100 tracking-tight mb-5 hover:bg-zinc-800 active:bg-zinc-700 duration-200" disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
            </form>

            <p className="text-center">
                Already registered?
                <span className="hover:text-zinc-400 ml-1 duration-150">
                    <Link to='/login'>Log in</Link>
                </span>
            </p>
        </section>
    )
}


export default Register