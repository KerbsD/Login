import React from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function    FormElement({ label, desc, turo, focus, note, classcont, autocompt = "", name, type, value, onChange, onblur, onfocus}) {
        return <>
            <label className='mt-4 font-semibold' htmlFor={name}>
                {label}
                <FontAwesomeIcon icon={faCheck} className={classcont ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={classcont || !value ? "hide" : "invalid"} />
            </label>
            <input
                className='py-2 px-4 border-[1px] border-zinc-300'
                type={type}
                id={name}
                ref={turo}
                autoComplete={autocompt}
                onChange={onChange}
                value={value}
                required
                aria-invalid={classcont ? "false" : "true"}
                aria-describedby={note}
                onFocus={onfocus}
                onBlur={onblur}
            />
            <p id={note} className={focus && value && !classcont ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                {desc}
            </p>
        </>
    }

export default FormElement
