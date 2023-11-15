import React, {ReactElement} from "react";

interface TextInputProps {
  text: string | undefined;
  onTextChange: (text: string) => void;
  id: string;
  label: string;
  placeholder?: string;
}

export function TextInput(props: TextInputProps): ReactElement {

  // noinspection SpellCheckingInspection
  return (
    <div className="htmlForm-group pb-8">
      <label htmlFor={props.id} className="d-block text-black-2 font-size-4 font-weight-semibold mb-4">{props.label}</label>
      <input name="textarea" id={props.id}
             className="border border-mercury text-gray w-100 pt-4 pl-6 pb-4"
             placeholder={props.placeholder}
             value={props.text}
             onChange={e => props.onTextChange(e.target.value)}/>
    </div>
  );
}
