import styles from "./login.module.scss";
import { IconButton } from "./button";

import { useNavigate } from "react-router-dom";
import { Path } from "../constant";
import Locale from "../locales";

import BotIcon from "../icons/bot.svg";
import { useState } from "react";
import { registerWithEmailAndPassword } from "../firebase";

export function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const goLogin = () => navigate(Path.Login);

  const handleRegister = () => {
    if (!email && !password) return;

    registerWithEmailAndPassword(name, email, password);
  };

  return (
    <div className={styles["auth-page"]}>
      <div className={`no-dark ${styles["auth-logo"]}`}>
        <BotIcon />
      </div>

      <div className={styles["auth-title"]}>{"BUNSHO AI"}</div>
      <div className={styles["auth-tips"]}>
        {"Please enter email & password to register"}
      </div>
      <div className={styles["input-container"]}>
        <input
          className={styles["auth-input"]}
          type="text"
          placeholder={"Enter name"}
          value={name}
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
        />
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
          <IconButton
            text={"Register"}
            type="primary"
            onClick={handleRegister}
          />
        </div>
        <IconButton text={"Login"} onClick={goLogin} />
      </div>
    </div>
  );
}
