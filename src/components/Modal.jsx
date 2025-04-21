import React from 'react';

const Modal = ({ bgColor = 'bg-zinc-50', show, onClose, children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="p-10 h-auto rounded-lg shadow-md fixed flex justify-center items-center top-0 bottom-0 left-0 right-0 bg-zinc-950/20">
            <div
                className={
                    "p-5 rounded-lg shadow-lg relative duration-200 animate-pop h-auto " + bgColor
                }
                style={{ animation: "pop 0.4s ease-out" }}
            >
                <span className="absolute top-3 right-3 bg-none border-none text-base cursor-pointer hover:rounded-full hover:bg-zinc-950/50 duration-150 hover:animate-spin" onClick={onClose}><img className="w-5" src="/resources/cross-circle.svg" alt="" /></span>
                <div className="mt-5">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal; 