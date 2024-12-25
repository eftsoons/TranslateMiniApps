import { Page } from "@/components/Page";
import { Translate } from "@/components/Translate";
import { TranslateControls } from "@/components/TranslateControls";
import ThemeContext from "@/ThemeContext";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

//translateAdditional

export function MainPage() {
  const [activetranslate, setactivetranslate] = useState(0);

  const {
    activehelp,
    setactivehelp,
    setbuttonhelp,
    setactivebutton,
    settext,
    settranslate,
  } = useContext(ThemeContext);

  if (
    !setactivehelp ||
    !setbuttonhelp ||
    !setactivebutton ||
    !settext ||
    !settranslate
  ) {
    return <Navigate to="/hellopage" />;
  }

  useEffect(() => {
    const help = localStorage.getItem("help") as "1/3" | "2/3" | "3/3";

    if (!help) {
      localStorage.setItem("help", "1/3");
    }

    const timeout = setTimeout(() => {
      if (help == "1/3" || help == "2/3") {
        // settext("Какой ваш уровень Английского языка? 📶");
        //settranslate("What is your English level? 📶");
        setactivehelp(help);

        if (help == "1/3") {
          setactivebutton([]);
          setbuttonhelp([3]);
        } else {
          setactivebutton([]);
          setbuttonhelp([3, 4]);
        }
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [activehelp]);

  return (
    <Page
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
        boxSizing: "border-box",
      }}
    >
      <TranslateControls
        activetranslate={activetranslate}
        setactivetranslate={setactivetranslate}
        country1={{
          name: "Английский",
          photo: "/img/emoji/GB.png",
        }}
        country2={{
          name: "Русский",
          photo: "/img/emoji/RU.png",
        }}
      />
      <Translate activetranslate={activetranslate} />
      {/*<Description />*/}
    </Page>
  );
}
