import { useNavigate } from "react-router-dom";
import { Page } from "@/components/Page";

export function HelloPage() {
  const navigation = useNavigate();

  return (
    <Page
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      onClick={() => {
        navigation("/edu");
      }}
    >
      <img
        style={{ width: "482px", height: "482px" }}
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
          style={{ fontSize: "16px", lineHeight: "20px", color: "#50507c" }}
        >
          Нажмите на любое слово в предложении, чтобы увидеть его подробный
          перевод
        </span>
      </div>
    </Page>
  );
}
