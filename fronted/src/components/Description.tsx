import ThemeContext from "@/ThemeContext";
import { useContext } from "react";

import style from "@/scss/component/description.module.scss";
import { BookSVG } from "@/svg/book";
import { Divider } from "./Divider";
import { Navigate } from "react-router-dom";

export function Description() {
  const {
    infodescription,
    settext,
    settranslate,
    settextdescription,
    setstableexpressions,
  } = useContext(ThemeContext);

  if (
    !settext ||
    !settranslate ||
    !settextdescription ||
    !setstableexpressions
  ) {
    return <Navigate to="/" />;
  }

  const info = infodescription;

  return info ? (
    <div className={style.main}>
      <div className={style.headertext}>{info.header}</div>
      {info.content.map((data, index) => (
        <div key={index}>
          {data.header && <div className={style.subheader}>{data.header}</div>}
          <div className={style.contentmain}>
            {data.info.map((data, index) => (
              <div key={index} className={style.content}>
                <div className={style.contenttext}>
                  {data.typeicon == "number" ? (
                    <div className={style.index}>{index + 1}</div>
                  ) : (
                    <div className={style.book}>
                      <BookSVG />
                    </div>
                  )}
                  <span className={style.text}>{data.text}</span>
                </div>
                <div className={style.conetentsub}>
                  {data.subtext.type == "button" ? (
                    data.subtext.button.map((text, index) => (
                      <button
                        className={style.button}
                        onClick={() => {
                          settext(text);
                          settranslate(text);
                          settextdescription("");
                          setstableexpressions([]);
                        }}
                        key={index}
                      >
                        {text}
                      </button>
                    ))
                  ) : (
                    <span className={style.subtext}>{data.text}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          {index != info.content.length - 1 && (
            <Divider style={{ margin: "16px 0" }} />
          )}
        </div>
      ))}
    </div>
  ) : (
    <></>
  );
}
