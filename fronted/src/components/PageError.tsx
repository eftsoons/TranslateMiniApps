import { MascotSVG } from "@/svg/mascot";
import style from "@/scss/component/pageerror.module.scss";

export function PageError({ text }: { text: string }) {
  return (
    <div className={style.main}>
      <MascotSVG />
      <span className={style.text}>{text}</span>
    </div>
  );
}
