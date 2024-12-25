import { Page } from "@/components/Page";
import { PageError } from "@/components/PageError";

export function Profile() {
  return (
    <Page style={{ height: "100%" }}>
      <PageError
        text={
          "Access your profile, track your level, and get customized recommendations for better learnin"
        }
      />
    </Page>
  );
}
