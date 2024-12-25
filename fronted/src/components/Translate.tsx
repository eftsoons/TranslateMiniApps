import { Divider } from "@/components/Divider";
import { useContext, useEffect, useRef, useState } from "react";
import { TranslateWindow } from "./TranslateWindow";
import ThemeContext from "@/ThemeContext";
import { Navigate } from "react-router-dom";

export function Translate({ activetranslate }: { activetranslate: number }) {
  const { stableexpressions, setstableexpressions } = useContext(ThemeContext);

  if (!stableexpressions || !setstableexpressions) {
    return <Navigate to="/" />;
  }

  const { setactivehelp, setbuttonhelp } = useContext(ThemeContext);

  if (!setactivehelp || !setbuttonhelp) {
    return <Navigate to="/hellopage" />;
  }

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const [snackbar, setsnackbar] = useState<any>(null);

  useEffect(() => {
    const help = localStorage.getItem("help") as "1/3" | "2/3" | "3/3";
    if (stableexpressions.length > 0) {
      if (help == "3/3") {
        setactivehelp("3/3");
        setbuttonhelp(stableexpressions);
      }
    }
  }, [stableexpressions]);

  return (
    <div
      style={{
        width: "100%",
        borderRadius: "24px",
        padding: "16px",
        boxSizing: "border-box",
        gap: "16px",
        backgroundColor: "white",
        flexDirection: "column",
        display: "flex",
      }}
    >
      {snackbar}
      <TranslateWindow
        setsnackbar={setsnackbar}
        timeoutRef={timeoutRef}
        setstableexpressions={setstableexpressions}
        stableexpressions={stableexpressions}
        snackbar={snackbar}
        translatebool={activetranslate == 0}
      />
      <Divider />
      <TranslateWindow
        setsnackbar={setsnackbar}
        timeoutRef={timeoutRef}
        setstableexpressions={setstableexpressions}
        stableexpressions={stableexpressions}
        snackbar={snackbar}
        translatebool={activetranslate == 1}
      />
    </div>
  );
}
