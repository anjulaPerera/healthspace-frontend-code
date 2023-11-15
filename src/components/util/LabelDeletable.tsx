import React, {CSSProperties} from "react";

interface LabelDeletableProps {
  text: string;
  onDeleteClick: () => void;
}

export const LabelDeletable: React.FC<LabelDeletableProps> = ({text, onDeleteClick}) => {
  const styles: CSSProperties = {
    float: "left",
    padding: '2px 4px',
    margin: '0 4px 8px 0',
    borderRadius: '4px',
    backgroundColor: '#ffb300',
    color: '#212529',
    fontWeight: "bold",
    fontSize: '12px'
  };
  return (
    <div style={styles}>
      <span style={{padding: '0 4px'}}>{text}</span>
      <a onClick={() => onDeleteClick()} style={{cursor: "pointer"}}>
        <i className="fas fa-times"/>
      </a>
    </div>);
};
