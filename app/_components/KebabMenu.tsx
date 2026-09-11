"use client";

import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi";
import { useOutsideClick } from "../_hooks/useOutsideClick";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import LinkButton from "./LinkButton";
import Modal from "./Modal";

function KebabMenu({
  children,
  opens = "",
  href = "",
  handleDelete,
  hasModal = true,
}) {
  const [isOpen, setIsOpen] = useState(false);
  // NOTE Close listenCapturing -> close both kebab and edit modal
  const ref = useOutsideClick(() => setIsOpen(false), false);

  return (
    <Modal>
      <div className="relative" ref={ref}>
        <button onClick={() => setIsOpen((is) => !is)}>
          <HiDotsVertical />
        </button>
        {isOpen && (
          <div className="z-10 absolute flex flex-col gap-2 p-2 right-0 rounded-sm bg-containerContrast border border-borderContrast">
            {hasModal && (
              <Modal.Open opens={opens}>
                <EditButton />
              </Modal.Open>
            )}

            {!hasModal && (
              <LinkButton href={href} type="tertiary" color="secondary">
                <span>
                  <AiFillEdit />
                </span>
                <span>Edit</span>
              </LinkButton>
            )}

            <DeleteButton onClick={handleDelete} />
          </div>
        )}
      </div>
      {/* NOTE For edit modal */}
      {hasModal && children}
    </Modal>
  );
}

export default KebabMenu;
