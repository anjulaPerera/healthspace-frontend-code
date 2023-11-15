import * as React from "react";
const TournamentContext = React.createContext<any>([undefined, () => ({})]);
export default TournamentContext;
