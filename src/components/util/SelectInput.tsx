import React, {ReactElement} from "react";

interface TextInputProps {
  entries: [string | number, string][]
  value?: string | number;
  onTextChange: (text: string) => void;
  id: string;
  label: string;
  placeholder?: string;
}

export function SelectInput(props: TextInputProps): ReactElement {

  // noinspection SpellCheckingInspection
  return (
    <div className="htmlForm-group pb-8" style={{}/*{overflow: "auto"}*/}>
      <label htmlFor={props.id} className="text-black-2 font-size-4 font-weight-semibold mb-4 w40 pr-6 arrow-3 h-px-48"
             style={{float: "left", lineHeight: "48px"}}>{props.label}</label>
      <div style={{float: "left"}} className="w-60">
        <select id={props.id} className="form-control pl-6 arrow-3 h-px-48 w-100 font-size-4"
                value={props.value}
                onChange={e => props.onTextChange(e.target.value)}>
          <option>{props.placeholder}</option>
          {props.entries.map(([v, k], i) => <option key={i} value={v}>{k}</option>)}
        </select>
      </div>
    </div>
  );
}
