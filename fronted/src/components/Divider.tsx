import { CSSProperties } from "react";

export function Divider({ style }: { style?: CSSProperties }) {
  return (
    <div
      style={{
        width: "100%",
        height: "1px",
        backgroundColor: "rgba(128, 128, 152, 0.1)",
        ...style,
      }}
    />
  );
}
