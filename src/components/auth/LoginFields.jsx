
function LoginFields({ title, id, type, fer, autoCompt, onchange, value, attribs }) {
    return <>
        <label className="text-lg tracking-tight mb-2" htmlFor={id}>{title}</label>
        <input
            className='py-2 px-4 border-[1px] border-zinc-300 mb-4'
            type={type}
            id={id}
            ref={fer}
            autoComplete={autoCompt}
            onChange={onchange}
            value={value}
            {...attribs}
        />
    </>

}

export default LoginFields;