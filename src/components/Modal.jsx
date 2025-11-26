import { useEffect } from "react";
import ReactDOM from "react-dom";
import { FiX } from "react-icons/fi";
import { motion } from "framer-motion";

const modal = document.getElementById("modal") || document.createElement("modal");
if (!document.getElementById("modal")) {
  modal.id = "modal";
  modal.className = "relative z-50";
  document.body.appendChild(modal);
}

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.3 },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <motion.div className="fixed top-0 left-0 right-0 bottom-0 bg-black/75 flex items-center justify-center modal-overlay z-[100] p-4 md:p-0" onClick={onClose} variants={overlayVariants} initial="hidden" animate="visible" exit="hidden" transition={{ duration: 0.3 }}>
      <motion.div className="w-full md:w-[891.5px] max-h-[90vh] overflow-y-auto scrollbar-none pb-8 rounded-md relative bg-[#181818] text-white shadow-2xl" onClick={(e) => e.stopPropagation()} variants={modalVariants} initial="hidden" animate="visible" exit="exit">
        <button onClick={onClose} className="h-8 w-8 md:h-9 md:w-9 absolute top-4 right-4 bg-[#181818] md:bg-[#333] border-none rounded-full flex items-center justify-center cursor-pointer modal-close-button z-30 hover:bg-white hover:text-black transition-colors">
          <FiX size={20} className="md:w-6 md:h-6" />
        </button>
        {children}
      </motion.div>
    </motion.div>,
    modal
  );
};

export default Modal;
