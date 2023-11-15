import React, {ReactElement} from "react";

interface TextAreaProps {
  text: string | undefined;
  onTextChange: (text: string) => void;
  id: string;
  label: string;
  placeholder?: string;
}

export function TextArea(props: TextAreaProps): ReactElement {

  // noinspection SpellCheckingInspection
  return (
    <div className="htmlForm-group pb-8">
      <label htmlFor={props.id} className="d-block text-black-2 font-size-4 font-weight-semibold mb-4">{props.label}</label>
      <textarea name="textarea" id={props.id}
                cols={30} rows={3}
                className="border border-mercury text-gray w-100 pt-4 pl-6"
                value={props.text}
                placeholder={props.placeholder}
                onChange={e => props.onTextChange(e.target.value)}/>
    </div>
  );
}
