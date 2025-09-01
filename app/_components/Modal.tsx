"use client";

import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { CgClose } from "react-icons/cg";
import { useOutsideClick } from "../_hooks/useOutsideClick";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    ...children.props,
    onClick: () => open(opensWindowName),
  });
}

function Window({ children, name, addClassName = "" }) {
  const { openName, close } = useContext(ModalContext);

  const ref = useOutsideClick(close);

  // console.log(openName);

  // if (name !== openName) return null;

  // FIXME Clean code with DropDown
  return createPortal(
    <div
      className={`absolute h-screen w-screen text-textContrast bg-modalContrast inset-0 min-h-max flex items-start gap-3 z-10 duration-200 ease-linear transition-all ${
        name === openName ? "visible opacity-100" : "invisible opacity-0"
      } ${addClassName}`}
    >
      <div ref={ref}>{children}</div>

      {/* FIXME Change transition */}
      <button
        onClick={close}
        className="z-20 mt-5 text-xl p-1 rounded-full focus:outline-2"
      >
        <CgClose />
      </button>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
