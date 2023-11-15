import React from "react";
import {TextInputInline} from "./TextInputInline";
import {LabelDeletable} from "./LabelDeletable";


// interface AppendableItem {
//   value: string;
//   label: string;
// }

interface AppendableProps {
  values?: string[];
  onChange: (values: string[]) => void;
  id: string;
  label: string;
  placeholder?: string;
  loading?: boolean;
}

export const MultiInput: React.FC<AppendableProps> = (props) => {
  const valuesFiltered = ''
  return (
    <div className="row">
      <div className="col-md-12" style={{marginBottom: '-0.625rem'}}>
        <TextInputInline id="" label={props.label} onTextChange={(e) => { valuesFiltered== e }} type="text"/>
      </div>
      <div className="col-md-12 mb-6">
          <LabelDeletable text={valuesFiltered} onDeleteClick={() => {valuesFiltered==''}}/>
      </div>
    </div>
  );
};
