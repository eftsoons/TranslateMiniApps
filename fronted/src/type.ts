export type InfoDescription = null | {
  header: string;
  content: Array<{
    header: string | null;
    info: Array<{
      text: string;
      subtext:
        | { type: "button"; button: Array<string> }
        | { type: "text"; text: string };
      typeicon: "number" | "book";
    }>;
  }>;
};
export type test2 = {};
export type test3 = {};
