import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../context/UserContext";
import "../vendors/styles/core.css";
import "../vendors/styles/style.css";
import { MenuContext } from "../../context/MenuContext";
import "../vendors/styles/healthSpaceStyles.css";
import { NavLink, useParams } from "react-router-dom";
import { AdminService } from "../../services/AdminService";
import { Role } from "../../models/Role";
import UserImg from "../vendors/images/icon/User.png";
import UserImg1 from "../vendors/images/icon/userIcon.png";
// import Certificate from "../vendors/images/icon/Certificate.png";
// import Certificate1 from "../vendors/images/icon/packageIcon.png";
import { User } from "../../models/User";
import SilverBadge from "../vendors/images/Silver.svg";
import GoldBadge from "../vendors/images/Gold.svg";
import FreeBadge from "../vendors/images/Free.svg";

const NavBar: React.FC = () => {
  const [user, setUser] = useContext(UserContext);

  const [isMenuOpen, setIsMenuOpen] = useContext(MenuContext);
  const [reload, setReload] = useState(false);

  // const [tournamentData, setTournamentData] = useState<any>(null);
  // const { tournamentId }: any = useParams();
  // const [isUpgraded, setIsUpgraded] = useState<boolean>(false);
  // const [nextPackage, setNextPackage] = useState<string>("");

  // useEffect(() => {
  //   const pack = "silver";
  //   const pack2 = "gold";
  //   setNextPackage(pack);
  // });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    AdminService.getUserById(user?._id).then((res) => {
      console.log("res", res.data);
      const user: User = res.data;
      setUser(user);
      setReload(false);
    });
  }, [reload]);

  // useEffect(() => {
  //   if (tournamentId) {
  //     AdminService.getTournamentDataByTournamentId(tournamentId).then((res) => {
  //       if (res.success) {
  //         setTournamentData(res.data);
  //       } else {
  //         console.log("error", res.error);
  //       }
  //     });
  //   }
  // }, [tournamentId]);

  const handleUpgradeClick = (user: any) => {
    // setTournament(tournament);
  };
  return (
    <div className="header">
      <div className="header-left">
        <div
          className="menu-icon ti ti-menu-alt mr-2"
          onClick={toggleMenu}
        ></div>
      </div>
      {user?.userType === Role.SUPER_ADMIN ? null : (
        <div className="header-right d-flex justify-content-between align-items-center flex-wrap">
          <div className="d-flex justify-content-start align-items-center header-container-left"></div>
          <div className="d-flex justify-content-start align-items-center">
            <span className="head-tournament-list user-name">
              {user?.packageBought}{" "}
              <span>
                {user?.packageBought === "SILVER" ? (
                  <img src={SilverBadge} alt="" />
                ) : user?.packageBought === "GOLD" ? (
                  <img src={GoldBadge} alt="" />
                ) : (
                  <img src={FreeBadge} alt="" />
                )}
              </span>{" "}
            </span>
            <span className="head-tournament-list user-name">
              {user?.name}{" "}
              <span>
                <img src={UserImg1} alt="" />
              </span>{" "}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
