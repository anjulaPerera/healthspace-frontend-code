import React from "react";

interface TextInputProps {
  text?: string;
  onTextChange: (text: string) => void;
  id: string;
  label: string;
  placeholder?: string;
}

export const FlexTextInput: React.FC<TextInputProps> = ({text, onTextChange, id, label, placeholder}) => {

  // noinspection SpellCheckingInspection
  return (
    <div className="htmlForm-group pb-8">
      <div style={{display: "flex", flexWrap: "wrap", alignItems: "center"}}>
        <label htmlFor={id} className="text-black-2 font-size-4 font-weight-semibold mb-0 pr-6 float-left">{label}</label>
        <input name="textarea" id={id}
               className="border border-mercury text-gray pt-4 pl-6 pb-4"
               style={{flexGrow: 1}}
               placeholder={placeholder}
               value={text}
               onChange={e => onTextChange(e.target.value)}/>
      </div>
    </div>
  );
};
