import React from "react";

interface TextInputProps {
  text?: string;
  onTextChange: (text: string) => void;
  id: string;
  label: string;
  placeholder?: string;
}

export const LabelledInput: React.FC<TextInputProps> = (props) => {

  // noinspection SpellCheckingInspection
  return (
    <div className="htmlForm-group pb-8">
      <label className="sr-only" htmlFor={props.id}>{props.label}</label>
      <div className="input-group mb-2">
        <div className="input-group-prepend">
          <div className="input-group-text" style={{lineHeight: 0}}>{props.children}</div>
        </div>
        <input type="text" className="form-control" id={props.id}
               placeholder={props.placeholder} value={props.text}
               onChange={e => props.onTextChange(e.target.value)}/>
      </div>
    </div>
  );
};
