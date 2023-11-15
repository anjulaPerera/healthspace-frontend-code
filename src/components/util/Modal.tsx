import { styles } from "@material-ui/pickers/views/Calendar/Calendar";
import React from "react";

export enum ModalState {
  OPENED,
  CLOSED,
}

interface ModalProps {
  id: string;
  title: string;
  state: ModalState;
  moreStyles?: {[key: string]: any}
  setState: React.Dispatch<React.SetStateAction<ModalState>>
}

export const Modal: React.FC<ModalProps> = (props) => {
  const isOpened = props.state === ModalState.OPENED;
  return (
    <div className="modal fade show" role="dialog" aria-labelledby="exampleModalLabel" id={props.id}
         style={{opacity: isOpened ? 1 : 0, backgroundColor: '#00000040', display: isOpened ? "block" : "none", ...props.moreStyles || {}}}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{props.title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => props.setState(ModalState.CLOSED)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};
