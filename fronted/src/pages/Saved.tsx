import { Page } from "@/components/Page";
import { PageError } from "@/components/PageError";

export function Saved() {
  return (
    <Page style={{ height: "100%" }}>
      <PageError
        text={
          "Save words, review your mistakes, and track everything in one place. This section will help you stay organized"
        }
      />
    </Page>
  );
}
