// ModalComponent.tsx
import React from "react";
import Modal from "react-modal";
import {
  useForm,
  FieldValues,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

interface ModalComponentProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (data: FieldValues) => void;
  title: string;
  children: (
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors<FieldValues>
  ) => React.ReactNode;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  isOpen,
  onRequestClose,
  onSubmit,
  children,
  title,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Form Modal"
    >
      <h2>{title}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {children(register, errors)}
        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
};

export default ModalComponent;
