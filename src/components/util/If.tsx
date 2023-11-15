import React from "react";

interface IfProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  condition: any
}

export const If: React.FC<IfProps> = ({condition, children}) => {
  return condition ? <>{children}</> : <></>;
};
