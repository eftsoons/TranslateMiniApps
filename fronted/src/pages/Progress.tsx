import { Page } from "@/components/Page";
import { PageError } from "@/components/PageError";

export function Progress() {
  return (
    <Page style={{ height: "100%" }}>
      <PageError
        text={
          "Monitor your language progress with detailed stats and personalized insights. Stay tuned!"
        }
      />
    </Page>
  );
}
