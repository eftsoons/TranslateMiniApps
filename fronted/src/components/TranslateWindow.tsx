import { VolumeSVG } from "@/svg/volume";
import { IconButton } from "./IconButton";
import { CopySVG } from "@/svg/copy";
import { copyToClipboard } from "@/function/copy";
import { FavoritesSVG } from "@/svg/favorites";
import { Snackbar } from "./Snackbar";
import { WordsButton } from "./WordsButton";
import { ReactNode, useContext } from "react";
import ThemeContext from "@/ThemeContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { retrieveLaunchParams } from "@telegram-apps/sdk";

export function TranslateWindow({
  translatebool,
  stableexpressions,
  snackbar,
  setsnackbar,
  timeoutRef,
  setstableexpressions,
}: {
  translatebool: boolean;
  stableexpressions: Array<number>;
  snackbar: ReactNode | null;
  setsnackbar: Function;
  timeoutRef: { current: NodeJS.Timeout | null };
  setstableexpressions: Function;
}) {
  //Какой ваш уровень Английского языка? 📶

  const {
    text,
    settext,
    translate,
    settranslate,
    textdescription,
    settextdescription,
  } = useContext(ThemeContext);

  if (!settext || !settranslate || !settextdescription) {
    return <Navigate to="/" />;
  }

  const launchParams = retrieveLaunchParams();

  return translatebool ? (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {translate && (
        <WordsButton
          stableexpressions={stableexpressions}
          settext={settext}
          setstableexpressions={setstableexpressions}
          settextdescription={settextdescription}
        >
          {translate}
        </WordsButton>
      )}
      {/*"надо сделать заглушку"*/}
      <div style={{ height: "40px", width: "100%", display: "flex" }}>
        <IconButton
          style={{
            justifyContent: "start",
          }}
          onClick={() => {
            if (!snackbar) {
              setsnackbar(
                <Snackbar
                  text={
                    <span
                      style={{
                        color: "white",
                        fontFamily: "OpenRundeRegular",
                      }}
                    >
                      Добавлено в{" "}
                      <span
                        style={{
                          fontFamily: "OpenRundeSemibold",
                          color: "white",
                        }}
                      >
                        словарь
                      </span>
                    </span>
                  }
                  icon={<img src="/img/icon.gif" />}
                  button={"Отмена"}
                />
              );

              setTimeout(() => {
                setsnackbar(null);
              }, 2500);
            }
          }}
        >
          <FavoritesSVG style={{ fill: "#5C5CD6" }} />
        </IconButton>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <IconButton
            style={{
              justifyContent: "end",
            }}
            onClick={() => copyToClipboard(translate)}
          >
            <CopySVG />
          </IconButton>
          <IconButton
            style={{
              justifyContent: "end",
            }}
            onClick={() => {
              if (translate) {
                const idsetinterval = setInterval(() => {
                  const utterance = new SpeechSynthesisUtterance(translate);
                  const voices = speechSynthesis.getVoices();
                  const voice = voices.find(
                    (data) => data.name == "Google US English"
                  );
                  if (voice) {
                    utterance.voice = voice;

                    if (speechSynthesis.speaking) {
                      speechSynthesis.cancel();

                      speechSynthesis.speak(utterance);
                    } else {
                      speechSynthesis.speak(utterance);
                    }

                    clearInterval(idsetinterval);
                  }
                }, 200);
              }
            }}
          >
            <VolumeSVG />
          </IconButton>
        </div>
      </div>
    </div>
  ) : (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <div style={{ display: "flex", gap: "4px" }}>
        <div
          id="inputtexttranslate"
          style={{
            border: "none",
            outline: "none",
            color: "rgba(40, 40, 62, 1)",
            fontSize: "17px",
            fontFamily: "OpenRundeMedium",
            width: "100%",
          }}
          onBlur={(event) => {
            const textset = event.currentTarget.textContent;

            if (text != textset) {
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
              }

              settext(textset);

              if (textset || textset == "") {
                axios
                  .post(`${import.meta.env.VITE_API_URL}/translate`, {
                    initData: launchParams.initDataRaw,
                    text: textset,
                  })
                  .then((response) => {
                    settextdescription(null);

                    settranslate(response.data);
                  });
              }
            }
          }}
          contentEditable
          suppressContentEditableWarning={true}
        >
          {text}
        </div>
        {textdescription && (
          <span
            style={{
              color: "rgba(128, 128, 152, 1)",
              fontSize: "14px",
              fontFamily: "OpenRundeRegular",
              display: "flex",
              justifyContent: "center",
              alignItems: "end",
            }}
          >
            {textdescription}
          </span>
        )}
      </div>
      <div style={{ height: "40px", width: "100%", display: "flex" }}>
        <IconButton
          style={{
            justifyContent: "start",
          }}
          onClick={() => {
            if (!snackbar) {
              setsnackbar(
                <Snackbar
                  text={
                    <span
                      style={{
                        color: "white",
                        fontFamily: "OpenRundeRegular",
                      }}
                    >
                      Добавлено в{" "}
                      <span
                        style={{
                          fontFamily: "OpenRundeSemibold",
                          color: "white",
                        }}
                      >
                        словарь
                      </span>
                    </span>
                  }
                  icon={<img src="/img/icon.gif" />}
                  button={"Отмена"}
                />
              );

              setTimeout(() => {
                setsnackbar(null);
              }, 2500);
            }
          }}
        >
          <FavoritesSVG style={{ fill: "#5C5CD6" }} />
        </IconButton>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <IconButton
            style={{
              justifyContent: "end",
            }}
            onClick={() => copyToClipboard(text)}
          >
            <CopySVG />
          </IconButton>
          <IconButton
            style={{
              justifyContent: "end",
            }}
            onClick={() => {
              if (text) {
                const idsetinterval = setInterval(() => {
                  const utterance = new SpeechSynthesisUtterance(text);
                  const voices = speechSynthesis.getVoices();
                  const voice = voices.find(
                    (data) => data.name == "Google русский"
                  );
                  if (voice) {
                    utterance.voice = voice;

                    if (speechSynthesis.speaking) {
                      speechSynthesis.cancel();

                      speechSynthesis.speak(utterance);
                    } else {
                      speechSynthesis.speak(utterance);
                    }

                    clearInterval(idsetinterval);
                  }
                }, 200);
              }
            }}
          >
            <VolumeSVG />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
