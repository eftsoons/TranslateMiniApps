import ThemeContext from "@/ThemeContext";
import style from "@/scss/component/helppage.module.scss";
import { CloseSVG } from "@/svg/close";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export function HelpPage() {
  const { activehelp, setactivehelp, setbuttonhelp } = useContext(ThemeContext);

  if (!setactivehelp || !setbuttonhelp) {
    return <Navigate to="/hellopage" />;
  }

  return (
    <div className={style.main}>
      <div className={style.infopage}>
        <button
          onClick={() => {
            if (activehelp == "1/3") {
              localStorage.setItem("help", "2/3");

              setactivehelp("2/3");
              setbuttonhelp([3, 4]);
            } else if (activehelp == "2/3") {
              localStorage.setItem("help", "3/3");

              setactivehelp(null);
              setbuttonhelp([]);
            } else if (activehelp == "3/3") {
              localStorage.setItem("help", "finish");

              setactivehelp(null);
              setbuttonhelp([]);
            }
          }}
          className={style.close}
        >
          <CloseSVG />
        </button>
        <img
          src={`/img/${
            activehelp == "1/3"
              ? "help1"
              : activehelp == "2/3"
              ? "help2"
              : "help3"
          }.png`}
          width="100%"
          height="200px"
        />
        <div className={style.infopage_info}>
          <div className={style.infopage_text}>
            {activehelp == "1/3"
              ? "Нажимите на отдельное слово, чтобы узнать его подробный перевод"
              : activehelp == "2/3"
              ? "Выделяйте несколько слов одновременно, чтобы перевести целые конструкции"
              : "Жёлтым цветом выделены устойчивые выражения: переводите их вместе"}
          </div>
          <div className={style.infopage_button}>
            <span>{activehelp?.split("/")[0]}/2</span>
            <button
              onClick={() => {
                if (activehelp == "1/3") {
                  localStorage.setItem("help", "2/3");

                  setactivehelp("2/3");
                  setbuttonhelp([3, 4]);
                } else if (activehelp == "2/3") {
                  localStorage.setItem("help", "3/3");

                  setactivehelp(null);
                  setbuttonhelp([]);
                } else if (activehelp == "3/3") {
                  localStorage.setItem("help", "finish");

                  setactivehelp(null);
                  setbuttonhelp([]);
                }
              }}
            >
              Окей!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
