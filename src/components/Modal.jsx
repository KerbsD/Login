import React from 'react';

const Modal = ({ show, onClose, children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="p-10 rounded-lg shadow-md fixed flex justify-center items-center top-0 bottom-0 left-0 right-0 bg-zinc-950/20">
            <div className="p-5 rounded-lg shadow-lg relative bg-zinc-100">
                <span className="absolute top-3 right-3 bg-none border-none text-base cursor-pointer" onClick={onClose}>X</span>
                <div className="mt-5">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal; 