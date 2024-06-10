import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "auto",
  },
};

Modal.setAppElement("#root");

interface ModalComponentProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (data: FormData) => void; // Change FieldValues to FormData
  title: string;
  children: React.ReactNode; // Change children prop type
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  isOpen,
  onRequestClose,
  onSubmit,
  children,
  title,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    const formData = new FormData(event.target as HTMLFormElement);
    console.log("Form data", formData);
    onSubmit(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Form Modal"
    >
      <h2>{title}</h2>

      {children}
    </Modal>
  );
};

export default ModalComponent;
