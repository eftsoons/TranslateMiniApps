import { AppRoot } from "@telegram-apps/telegram-ui";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { miniApp, postEvent } from "@telegram-apps/sdk-react";
import { HelpPage } from "./components/HelpPage";
import { MainPage } from "./pages/MainPage";
import { HelloPage } from "./pages/HelloPage";
import ThemeContext from "./ThemeContext";
import { InfoDescription } from "./type";
import { TabBar } from "@/components/Tabbar";
import { Progress } from "./pages/Progress";
import { Saved } from "./pages/Saved";
import { Profile } from "./pages/Profile";

import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, {
  retries: Infinity,
  retryDelay: axiosRetry.exponentialDelay,
});

export function App() {
  const navigation = useNavigate();
  const [text, settext] = useState("Какой ваш уровень Английского языка? 📶");
  const [translate, settranslate] = useState("What is your English level? 📶");
  const [textdescription, settextdescription] = useState(null);
  const [stableexpressions, setstableexpressions] = useState([]);

  const [activehelp, setactivehelp] = useState<"1/3" | "2/3" | "3/3" | null>(
    null
  );
  const [activebutton, setactivebutton] = useState<Array<number>>([]);

  const [infodescription, setinfodescription] = useState<InfoDescription>({
    header: "Варианты перевода конструкции look forward to",
    content: [
      {
        header: "Фразовый глагол",
        info: [
          {
            text: "Предвкушать, ждать с нетерпением",
            subtext: {
              type: "button",
              button: [
                "anticipate",
                "asd",
                "asd",
                "asd",
                "asd",
                "asd",
                "asd",
                "asd",
                "asd",
                "asd",
              ],
            },
            typeicon: "number",
          },
          {
            text: "Предвкушать, ждать с нетерпением",
            subtext: {
              type: "button",
              button: [
                "anticipate",
                "asd",
                "asd",
                "asd",
                "asd",
                "asd",
                "asd",
                "asd",
                "asd",
                "asd",
              ],
            },
            typeicon: "book",
          },
          {
            text: "Предвкушать, ждать с нетерпением",
            subtext: {
              type: "text",
              text: "asd",
            },
            typeicon: "book",
          },
        ],
      },
      {
        header: "asd",
        info: [
          {
            text: "Предвкушать, ждать с нетерпением",
            subtext: {
              type: "button",
              button: ["anticipate"],
            },
            typeicon: "number",
          },
          {
            text: "Предвкушать, ждать с нетерпением",
            subtext: {
              type: "button",
              button: ["anticipate"],
            },
            typeicon: "book",
          },
          {
            text: "Предвкушать, ждать с нетерпением",
            subtext: {
              type: "text",
              text: "asd",
            },
            typeicon: "book",
          },
        ],
      },
    ],
  });

  const [buttonhelp, setbuttonhelp] = useState([]);

  useEffect(() => {
    miniApp.ready();

    postEvent("web_app_expand");

    miniApp.setHeaderColor("#efeffb");

    navigation("/");
  }, []);

  const routesWithTabBar = [
    { path: "/edu", component: <MainPage /> },
    { path: "/progress", component: <Progress /> },
    { path: "/saved", component: <Saved /> },
    { path: "/profile", component: <Profile /> },
  ];

  return (
    <AppRoot
      style={{
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <ThemeContext.Provider
        value={{
          activehelp: activehelp,
          buttonhelp: buttonhelp,
          setactivehelp: setactivehelp,
          setbuttonhelp: setbuttonhelp,
          infodescription: infodescription,
          setinfodescription: setinfodescription,
          setactivebutton: setactivebutton,
          activebutton: activebutton,
          text: text,
          settext: settext,
          translate: translate,
          settranslate: settranslate,
          textdescription: textdescription,
          settextdescription: settextdescription,
          stableexpressions: stableexpressions,
          setstableexpressions: setstableexpressions,
        }}
      >
        {activehelp && <HelpPage />}
        <Routes>
          {routesWithTabBar.map(({ path, component }) => (
            <Route
              key={path}
              path={path}
              element={<TabBar>{component}</TabBar>}
            />
          ))}

          <Route path="/" element={<HelloPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ThemeContext.Provider>
    </AppRoot>
  );
}
