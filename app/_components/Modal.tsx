"use client";

import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { CgClose } from "react-icons/cg";
import { useOutsideClick } from "../_hooks/useOutsideClick";
import Button from "./Button";

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

  if (name !== openName) return null;

  return createPortal(
    <div
      className={`fixed h-screen w-screen text-textContrast bg-modalContrast inset-0 min-h-max flex justify-center items-center gap-3 z-10 duration-200 ease-linear transition-all ${
        name === openName ? "visible opacity-100" : "invisible opacity-0"
      } ${addClassName}`}
    >
      <div className="h-fit flex gap-2 sm:gap-3 lg:gap-4">
        <div
          ref={ref}
          className="[&>form]:max-h-screen [&>form]:overflow-auto [&>form]:bg-bgContrast"
        >
          {children}
        </div>
        <Button
          onClick={close}
          type="closeModal"
          color="closeModal"
          addClassName="self-start mt-1 sm:text-xl lg:text-2xl"
        >
          <CgClose />
        </Button>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
