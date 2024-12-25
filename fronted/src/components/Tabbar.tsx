import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import style from "@/scss/component/tabbar.module.scss";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { EducationSVG } from "@/svg/education";
import { ProgressSVG } from "@/svg/progress";
import { SaveBookSVG } from "@/svg/savebook";
import { ProfileSVG } from "@/svg/profile";

export function TabBar({ children }: { children: ReactNode }) {
  const lp = useLaunchParams();

  const navigate = useNavigate();
  const location = useLocation().pathname;

  return (
    <>
      <div style={{ overflow: "hidden auto", height: "100%", width: "100%" }}>
        {children}
      </div>
      <div
        style={{
          paddingBottom: ["macos", "ios"].includes(lp.platform)
            ? "34px"
            : "12px",
        }}
        className={style.tabbar}
      >
        <div
          className={`${style.item} ${location == "/edu" ? style.select : ""}`}
          onClick={() => navigate("/edu")}
        >
          <EducationSVG
            style={{
              fill:
                location == "/edu"
                  ? "rgba(92, 92, 214, 1)"
                  : "rgba(128, 128, 152, 1)",
            }}
          />
          Edu
        </div>
        <div
          className={`${style.item} ${
            location == "/progress" ? style.select : ""
          }`}
          onClick={() => navigate("/progress")}
        >
          <ProgressSVG
            style={{
              fill:
                location == "/progress"
                  ? "rgba(92, 92, 214, 1)"
                  : "rgba(128, 128, 152, 1)",
            }}
          />
          Progress
        </div>
        <div
          className={`${style.item} ${
            location == "/saved" ? style.select : ""
          }`}
          onClick={() => navigate("/saved")}
        >
          <SaveBookSVG
            style={{
              fill:
                location == "/saved"
                  ? "rgba(92, 92, 214, 1)"
                  : "rgba(128, 128, 152, 1)",
            }}
          />
          Saved
        </div>
        <div
          className={`${style.item} ${
            location == "/profile" ? style.select : ""
          }`}
          onClick={() => navigate("/profile")}
        >
          <ProfileSVG
            style={{
              fill:
                location == "/profile"
                  ? "rgba(92, 92, 214, 1)"
                  : "rgba(128, 128, 152, 1)",
            }}
          />
          Profile
        </div>
      </div>
    </>
  );
}
