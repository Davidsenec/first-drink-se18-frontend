"use client";

import {
    ReactElement,
    ReactNode,
    cloneElement,
    isValidElement,
    useRef,
} from "react";

interface ModalProps {
    trigger: ReactElement;
    title: string;
    children: ReactNode;
}

export default function Modal({trigger, title, children,}: ModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const openModal = () => dialogRef.current?.showModal();
    const closeModal = () => dialogRef.current?.close();

    const triggerWithProps = isValidElement(trigger)
        ? cloneElement(trigger, {
            onClick: openModal,
        } as React.HTMLAttributes<HTMLElement>)
        : trigger;

    return (
        <>
            {triggerWithProps}
            <dialog ref={dialogRef} className="m-auto rounded-lg bg-[#232329] p-6 shadow-lg backdrop:bg-black/50">
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold text-emerald-500">{title}</h2>

                    {children}

                    <div className="flex justify-end">
                        <button onClick={closeModal} className="cursor-pointer rounded bg-emerald-500 px-4 py-2">
                            Close
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
}