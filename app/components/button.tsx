import * as React from "react";

import styles from "./button.module.scss";

export function IconButton(props: {
  onClick?: () => void;
  icon?: JSX.Element;
  type?: "primary" | "danger";
  text?: string;
  bordered?: boolean;
  shadow?: boolean;
  className?: string;
  title?: string;
  disabled?: boolean;
  fillPath?: boolean;
}) {
  const {
    onClick,
    icon,
    type,
    text,
    bordered,
    shadow,
    className,
    title,
    disabled,
    fillPath = true,
  } = props;

  const buttonClasses = [styles["icon-button"]];

  if (bordered) buttonClasses.push(styles.border);
  if (shadow) buttonClasses.push(styles.shadow);
  if (type) buttonClasses.push(styles[type]);
  if (className) buttonClasses.push(className);
  if (fillPath !== false) buttonClasses.push(styles.fillPath);

  const iconClasses = [styles["icon-button-icon"]];
  if (type === "primary") iconClasses.push("no-dark");

  return (
    <button
      className={buttonClasses.join(" ")}
      onClick={onClick}
      title={title}
      disabled={disabled}
      role="button"
    >
      {icon && <div className={iconClasses.join(" ")}>{icon}</div>}
      {text && <div className={styles["icon-button-text"]}>{text}</div>}
    </button>
  );
}
