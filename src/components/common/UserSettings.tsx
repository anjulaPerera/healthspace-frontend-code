import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import "../vendors/styles/core.css";
import "../vendors/styles/style.css";
import "../vendors/styles/icon-font.css";
import { AuthService } from "../../services/AuthService";
import swal from "sweetalert";
import { UploadFile } from "./upload-file/UploadFile";
import { UploadCategory } from "../../services/UploadService";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { UserData } from "../../models/User";
import Spinner from "react-bootstrap/Spinner";

const UserSettings: React.FC = () => {
  const [user, setUser] = useContext(UserContext);
  const [userName, setUserName] = useState<any>(user?.name);
  const [confirm_password, setConfirmPassword] = useState("");
  const [loading, loader] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const updateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsOpen(false);
    if (!user?.name) {
      swal({ icon: "error", title: "Please enter name!" });
      setIsOpen(true);
      return;
    }

    if (!user?.email) {
      swal({ icon: "error", title: "Please enter email!" });
      setIsOpen(true);
      return;
    }
    if (user?.password && user?.password.length < 6) {
      swal({ icon: "error", title: "Passwords should have minimum 6 chracters!" });
      setIsOpen(true);
      return;
    }

    if (user?.password && user?.password !== confirm_password) {
      swal({ icon: "error", title: "Passwords do not match!" });
      setIsOpen(true);
      return;
    }

    const updatedUser: UserData = {
      name: userName,
      email: user?.email,
      password: user?.password,
      photo: user?.photo as string,
    };
    loader(true);
    AuthService.updateUser(updatedUser).then((res) => {
      loader(true);
      setUser(res.data);

      if (res.success) {
        swal({ icon: "success", title: "Profile settings updated successfully!" });
        loader(false);
        setIsOpen(true);
        const resetForm: any = e.target;
        resetForm.reset();
      } else {
        swal({ icon: "error", title: res.error ? res.error : "Profile settings updating failed!" });
        setIsOpen(true);
        return;
      }
    });

    setIsOpen(true);
  };

  return (
    <div className="main-container">
      <div className="pd-ltr-20">
        <div className="card-box pd-20 height-100-p mb-30">
          <div className="title">
            <h4 className="cardHearder1">{t("settings_page")}</h4>
          </div>

          <div className="row">
            <div className="col-md-12 mb-15">
              <hr />
            </div>
          </div>

          <form onSubmit={updateUser}>
            <div className="row">
              <div className="col-md-12 mb-20">
                <UploadFile onUpdate={(u) => setUser(user && { ...user, photo: u })} category={UploadCategory.PROFILE_PHOTO} />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-lg-6">
                <label>{t("full_name")}</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder={t("enter_name")}
                  value={userName}
                  /* onChange={(e) => setUser(user && { ...user, name: e.target.value })} */
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div className="form-group col-lg-6">
                <label>{t("email")}</label>
                <input
                  className="form-control"
                  value={user?.email}
                  type="email"
                  placeholder={t("enter_email")}
                  onChange={(e) => setUser(user && { ...user, email: e.target.value })}
                />
              </div>
            </div>

            <div className="row">
              <div className="form-group col-lg-6">
                <label>{t("password")}</label>
                <input
                  className="form-control"
                  type="Password"
                  placeholder={t("enter_password")}
                  onChange={(e) => setUser(user && { ...user, password: e.target.value })}
                />
              </div>

              <div className="form-group col-lg-6">
                <label>{t("confirm_password")}</label>
                <input
                  className="form-control"
                  type="Password"
                  placeholder={t("enter_confirm_password")}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="row height-100-p">
              <div className="col-md-12 text-right">
                <hr />
                <br />

                <button type="submit" disabled={loading} className="btn btncolor1" style={{ display: "inline-flex" }}>
                  {isOpen && <div> {t("save_changes")}</div>}
                  {loading && (
                    <div>
                      {t("loading")}
                      <Spinner animation="grow" color="light" size="sm" />
                    </div>
                  )}
                </button>
              </div>
            </div>
          </form>

          <div className="row">
            <div className="col-md-12">
              <br />
              <hr />
              <br />

              <div className="form-group col-lg-6">
                <label>{t("change_language")}</label>

                <div>
                  <Button className={"btn btn-sm mr-20 " + (i18n.language === "en" ? "btn-danger" : "btn-default")} onClick={() => changeLanguage(`en`)}>
                    English
                  </Button>
                  <Button className={"btn btn-sm mr-20 " + (i18n.language === "fr" ? "btn-danger" : "btn-default")} onClick={() => changeLanguage(`fr`)}>
                    French
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
