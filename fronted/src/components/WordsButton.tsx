import ThemeContext from "@/ThemeContext";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";

export function WordsButton({
  children,
  stableexpressions,
  settext,
  //setstableexpressions,
  settextdescription,
}: {
  children: string;
  stableexpressions?: Array<number>;
  settext: Function;
  setstableexpressions: Function;
  settextdescription: Function;
}) {
  const childrenarray = children
    .split(
      /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]|\ufe0f)|([^\wа-яА-ЯЁё])/
    )
    .filter((data) => data && data != " " && data != "");
  //const childrenarray = children.split(/(?<=[^\w\s])|(?=[^\w\s])|\s/);

  //console.log(childrenarray);

  const buttonRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activedown, setactivedown] = useState(false);

  const {
    activebutton,
    setactivebutton,
    setinfodescription,
    activehelp,
    buttonhelp,
    setactivehelp,
    setbuttonhelp,
  } = useContext(ThemeContext);

  if (
    !setactivehelp ||
    !setbuttonhelp ||
    !setinfodescription ||
    !activebutton ||
    !setactivebutton
  ) {
    return <Navigate to="/" />;
  }

  const clickoutside = (event: MouseEvent) => {
    const target = event.target as Node;
    const isButtonClicked = buttonRefs.current.some(
      (button) => button && button.contains(target)
    );

    if (!isButtonClicked) {
      setactivebutton([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickoutside);

    return () => {
      document.removeEventListener("mousedown", clickoutside);
    };
  }, []);

  const ondown = (index: number) => {
    if (activehelp != "1/3") {
      setactivebutton((button: Array<number>) => {
        const setbutton = [...button];

        setbutton.splice(0, button.length);

        setbutton.push(index);

        if (!setbutton.includes(index)) {
          setbutton.push(index);
        }

        return setbutton;
      });

      setactivedown(true);
    }
  };

  const onmove = (index: number) => {
    if (activedown) {
      setactivebutton((button: Array<number>) => {
        const setbutton = [...button];

        if (!setbutton.includes(index)) {
          setbutton.push(index);
        }

        return setbutton;
      });
    }
  };

  const onup = () => {
    if (
      (activehelp == "2/3" || activehelp == "3/3") &&
      activebutton.length > 1
    ) {
      if (activehelp == "2/3") {
        localStorage.setItem("help", "3/3");

        setactivehelp(null);
        setbuttonhelp([]);
        setactivebutton([]);
      } else {
        if (activebutton.length == buttonhelp?.length) {
          localStorage.setItem("help", "finish");

          setactivehelp(null);
          setbuttonhelp([]);
        }
      }
    }

    const texttranslate = activedown
      ? activebutton.map((data) => childrenarray[data]).join(" ")
      : childrenarray[0];

    axios
      .post(`${import.meta.env.VITE_API_URL}/translate`, {
        initData: launchParams.initDataRaw,
        text: texttranslate,
      })
      .then((response) => {
        settextdescription(null);

        settext(response.data);
      });

    setactivedown(false);
  };

  const launchParams = retrieveLaunchParams();

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        gap: "6px",
        flexWrap: "wrap",
      }}
    >
      {childrenarray.map((text, index) =>
        !/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]|\ufe0f)|([^\wа-яА-ЯЁё])/.test(
          text
        ) ? (
          buttonhelp?.includes(index) ? (
            <div key={index} style={{ zIndex: "1" }}>
              <div
                style={{
                  backgroundColor: "white",
                  padding: "2px",
                  borderRadius: "12px",
                }}
              >
                <div
                  ref={(el) => (buttonRefs.current[index] = el)}
                  id={String(index)}
                  style={{
                    borderRadius: "12px",
                    padding: "12px",
                    border: `1px solid ${
                      stableexpressions?.includes(index)
                        ? "rgba(254, 218, 180, 1)"
                        : "rgba(194, 194, 240, 1)"
                    }`,
                    backgroundColor: activebutton.includes(index)
                      ? stableexpressions?.includes(index)
                        ? "rgba(251, 157, 57, 1)"
                        : "rgba(92, 92, 214, 1)"
                      : "white",
                    color: activebutton.includes(index) ? "white" : "",
                    transition: "background-color 0.5s",
                    fontSize: "17px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    if (activehelp == "1/3") {
                      localStorage.setItem("help", "2/3");

                      setactivehelp(null);
                      setbuttonhelp([]);

                      axios
                        .post(`${import.meta.env.VITE_API_URL}/translate`, {
                          initData: launchParams.initDataRaw,
                          text: text,
                        })
                        .then((response) => {
                          settextdescription(null);

                          settext(response.data);
                        });

                      setactivebutton((button: Array<number>) => {
                        const setbutton = [...button];

                        setbutton.splice(0, button.length);

                        setbutton.push(index);

                        return setbutton;
                      });
                    }
                  }}
                  onMouseDown={() => ondown(index)}
                  onMouseOver={() => onmove(index)}
                  onMouseUp={onup}
                  onTouchStart={() => ondown(index)}
                  onTouchMove={(event) => {
                    const touches = event.touches;
                    for (let i = 0; i < touches.length; i++) {
                      const touch = touches[i];
                      const elements = document.elementsFromPoint(
                        touch.clientX,
                        touch.clientY
                      );

                      const index = elements[0].id;

                      if (index && index != "") {
                        onmove(Number(index));
                      }
                    }
                  }}
                  onTouchEnd={onup}
                >
                  {text}
                </div>
              </div>
              {buttonhelp[0] == index && (
                <div
                  style={{
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "3px",
                  }}
                >
                  <svg
                    width="14"
                    height="10"
                    viewBox="0 0 14 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginLeft: "14px" }}
                  >
                    <path
                      d="M6.18077 1.17033C6.57887 0.601616 7.42113 0.601614 7.81923 1.17033L14 10H0L6.18077 1.17033Z"
                      fill="#7070DB"
                    />
                  </svg>
                  <div
                    style={{
                      backgroundColor: "rgba(112, 112, 219, 1)",
                      padding: "8px 12px",
                      borderRadius: "16px",
                      fontSize: "16px",
                      textAlign: "center",
                      color: "white",
                      fontFamily: "OpenRundeRegular",
                    }}
                  >
                    {buttonhelp.length > 1
                      ? "Зажмите и выделите слова"
                      : "Нажмите сюда"}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div
              key={index}
              id={String(index)}
              ref={(el) => (buttonRefs.current[index] = el)}
              style={{
                borderRadius: "12px",
                padding: "12px",
                border: `1px solid ${
                  stableexpressions?.includes(index)
                    ? "rgba(254, 218, 180, 1)"
                    : "rgba(194, 194, 240, 1)"
                }`,
                backgroundColor: activebutton.includes(index)
                  ? stableexpressions?.includes(index)
                    ? "rgba(251, 157, 57, 1)"
                    : "rgba(92, 92, 214, 1)"
                  : "white",
                color: activebutton.includes(index) ? "white" : "",
                transition: "background-color 0.5s",
                fontSize: "17px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onMouseDown={() => ondown(index)}
              onMouseOver={() => onmove(index)}
              onMouseUp={onup}
              onTouchStart={() => ondown(index)}
              onTouchMove={(event) => {
                const touches = event.touches;
                for (let i = 0; i < touches.length; i++) {
                  const touch = touches[i];
                  const elements = document.elementsFromPoint(
                    touch.clientX,
                    touch.clientY
                  );

                  const index = elements[0].id;

                  if (index && index != "") {
                    onmove(Number(index));
                  }
                }
              }}
              onTouchEnd={onup}
            >
              {text}
            </div>
          )
        ) : (
          <span
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              userSelect: "text",
              fontSize: "17px",
            }}
          >
            {text}
          </span>
        )
      )}
    </div>
  );
}
