import style from "@/scss/component/snackbar.module.scss";
import { ReactNode } from "react";

export function Snackbar({
  icon,
  text,
  button,
  onClickButton,
}: {
  icon: ReactNode;
  text: ReactNode;
  button?: string;
  onClickButton?: () => void;
}) {
  return (
    <div className={style.main}>
      <div className={style.info}>
        <div className={style.icon}>{icon}</div>
        <div>{text}</div>
      </div>
      {button && (
        <button className={style.button} onClick={onClickButton}>
          {button}
        </button>
      )}
    </div>
  );
}
