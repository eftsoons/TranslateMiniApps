import { CSSProperties, ReactNode } from "react";

import iconbutton from "@/scss/component/iconbutton.module.scss";

export function IconButton({
  style,
  children,
  onClick,
}: {
  style?: CSSProperties;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <div onClick={onClick} className={iconbutton.button} style={style}>
      {children}
    </div>
  );
}
