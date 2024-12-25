import { SwitchSVG } from "@/svg/switch";
import { IconButton } from "./IconButton";

export function TranslateControls({
  country1,
  country2,
  activetranslate,
  setactivetranslate,
}: {
  country1: { name: string; photo: string };
  country2: { name: string; photo: string };
  activetranslate: number;
  setactivetranslate: Function;
}) {
  return (
    <div
      style={{
        backgroundColor: "white",
        width: "100%",
        height: "48px",
        borderRadius: "20px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          width: "100%",
        }}
      >
        <img
          style={{ width: "24px", height: "24px" }}
          src={activetranslate == 0 ? country1.photo : country2.photo}
        />
        <span>{activetranslate == 0 ? country1.name : country2.name}</span>
      </div>
      <IconButton
        onClick={() => {
          if (activetranslate == 0) {
            setactivetranslate(1);
          } else {
            setactivetranslate(0);
          }
        }}
        style={{ flexShrink: "0" }}
      >
        <SwitchSVG />
      </IconButton>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          width: "100%",
        }}
      >
        <img
          style={{ width: "24px", height: "24px" }}
          src={activetranslate == 0 ? country2.photo : country1.photo}
        />
        <span>{activetranslate == 0 ? country2.name : country1.name}</span>
      </div>
    </div>
  );
}
