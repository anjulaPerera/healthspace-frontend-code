import React from "react";
import {SelectSearchInput} from "./SelectSearchInput";
import {LabelDeletable} from "./LabelDeletable";


interface AppendableItem {
  value: any;
  label: string;
}

interface AppendableProps {
  options: AppendableItem[];
  values: any[];
  onChange: (values: any[]) => void;
  id: string;
  label: string;
  placeholder?: string;
  loading?: boolean;
}

export const MultiSelect: React.FC<AppendableProps> = (props) => {
  const valuesFiltered = props.options.filter(v => props.values.includes(v.value));
  return (
    <div className="row">
      <div className="col-md-12" style={{marginBottom: '-0.625rem'}}>
        <SelectSearchInput id="category" label={props.label} placeholder={props.placeholder || "choose"}
                           options={props.options}
                           onSelectChange={(v: any) => !props.values.includes(v) && props.onChange([...props.values, v])}/>
      </div>
      <div className="col-md-12 mb-6">
        {valuesFiltered.map((v, i) => {
          return <LabelDeletable key={i} text={v.label} onDeleteClick={() => props.onChange(props.values.filter(e => e !== v.value))}/>;
        })}
      </div>
    </div>
  );
};
