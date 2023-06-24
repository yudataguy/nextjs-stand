import styles from "./login.module.scss";
import { IconButton } from "./button";

import { useNavigate } from "react-router-dom";
import { Path } from "../constant";
import Locale from "../locales";

import BotIcon from "../icons/bot.svg";
import GmailIcon from "../icons/gmail-icon.svg";
import { useState } from "react";
import { logInWithEmailAndPassword, signInWithGoogle } from "../firebase";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const goHome = () => navigate(Path.Home);
  const goRegister = () => navigate(Path.Register);

  const handleLogin = () => {
    logInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(response);
        goHome();
      })
      .catch((e) => console.log(e));
  };

  const loginWithGmail = () => {
    signInWithGoogle()
      .then((Response) => console.log(Response))
      .catch((e) => console.log(e));
  };

  return (
    <div className={styles["auth-page"]}>
      <div className={`no-dark ${styles["auth-logo"]}`}>
        <BotIcon />
      </div>

      <div className={styles["auth-title"]}>{"BUNSHO AI"}</div>
      <div className={styles["auth-tips"]}>
        {"Please enter email & password to login"}
      </div>
      <div className={styles["input-container"]}>
        <input
          className={styles["auth-input"]}
          type="email"
          placeholder={"Enter email"}
          value={email}
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
        />

        <input
          className={styles["auth-input"]}
          type="password"
          placeholder={"Enter password"}
          value={password}
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />
      </div>
      <div className={styles["auth-actions"]}>
        <div className={styles["button-container"]}>
          <IconButton text={"Login"} type="primary" onClick={handleLogin} />
          <IconButton
            type="primary"
            icon={<GmailIcon />}
            onClick={loginWithGmail}
          />
        </div>
        <IconButton text={"Register"} onClick={goRegister} />
      </div>
    </div>
  );
}
