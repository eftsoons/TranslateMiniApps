import { useNavigate } from "react-router-dom";
import { Page } from "@/components/Page";
import { useEffect } from "react";

export function HelloPage() {
  const navigation = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation("/edu");
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Page
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
        //marginBottom: "50px",
        backgroundColor: "rgba(239, 239, 251, 1)",
      }}
      onClick={() => {
        navigation("/edu");
      }}
    >
      <img
        style={{ width: "398px", height: "365px" }}
        src="/img/hellopage.gif"
      />
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          maxWidth: "346px",
        }}
      >
        <h1>Слова</h1>
        <span
          style={{
            fontSize: "14px",
            lineHeight: "20px",
            color: "rgba(80, 80, 124, 1)",
            fontFamily: "OpenRundeRegular",
          }}
        >
          Нажмите на любое слово в предложении, чтобы увидеть его подробный
          перевод
        </span>
      </div>
    </Page>
  );
}
