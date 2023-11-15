import * as React from "react";
import { User } from "../models/User";

type UserData = [User | undefined, (user: User | undefined) => void];

const UserContext = React.createContext<UserData>([undefined, () => ({})]);

export default UserContext;
