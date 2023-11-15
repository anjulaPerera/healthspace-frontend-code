import './CustomCollapsible.css';

import React from "react";
import Collapsible from "react-collapsible";

interface CustomCollapsibleProps {
  title: string;
  open?: boolean;
}

export const CustomCollapsible: React.FC<CustomCollapsibleProps> = ({open=true, title, children}) => {

  return (
    <div className="mb-2">
      <Collapsible trigger={title} open={open}>
        {children}
      </Collapsible>
    </div>
  );
};
