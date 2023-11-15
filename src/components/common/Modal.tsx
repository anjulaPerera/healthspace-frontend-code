import React from "react";
import Modal from "react-modal";
import "../vendors/styles/healthSpaceStyles.css";
import Close from "../vendors/images/icon/x.png";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

const CustomModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const customModalStyles: Modal.Styles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      width: "fit-content",
      height: "fit-content",
      //   width: "310px",
      //   height: "280px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    },
  };

  const closeBtnStyle: React.CSSProperties = {
    position: "absolute",
    top: "10px",
    right: "0px",
    cursor: "pointer",
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal"
      style={{
        overlay: customModalStyles.overlay,
        content: customModalStyles.content,
      }}
    >
      {onClose ? (
        <img
          className="close-icon-size mr-1"
          style={closeBtnStyle}
          onClick={onClose}
          src={Close}
        />
      ) : null}

      {children}
    </Modal>
  );
};

export default CustomModal;
