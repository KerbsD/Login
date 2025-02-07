function LoginFields({ title, id, type, fer, autoCompt, onchange, value }) {
    return <>
        <label className="text-lg font-semibold tracking-tight mb-2" htmlFor={id}>{title}</label>
        <input
            className='py-2 px-4 border-[1px] border-zinc-300 mb-4'
            type={type}
            id={id}
            ref={fer}
            autoComplete={autoCompt}
            onChange={onchange}
            value={value}
            required
        />
    </>

}

export default LoginFields;