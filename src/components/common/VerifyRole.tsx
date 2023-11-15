import React, { useContext } from 'react';
import UserContext from '../../context/UserContext';
import { Role } from '../../models/Role';

interface VerifyRoleProps {
  allow?: Role[];
  children: React.ReactNode;
}

const VerifyRole: React.FC<VerifyRoleProps> = ({ allow, children }) => {
  const [user] = useContext(UserContext);
  const role:any = user && user?.userType;

  if (!role) {
    return <div></div>;
  } 
  else {
    switch (role) {
      case Role.SUPER_ADMIN:
        if (allow && allow.includes(Role.SUPER_ADMIN)) {
          return <>{children}</>;
        }
        else{
          return <></>
        }
      case Role.LEVEL01:
      case Role.LEVEL02:
        if (allow && (allow.includes(Role.LEVEL01) || allow.includes(Role.LEVEL02))) {
          return <>{children}</>;
        }
        else{
          return <></>
        }
      default:
        return null; 
    }
  }
 
};

export default VerifyRole;
