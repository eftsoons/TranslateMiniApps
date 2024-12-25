import { createContext } from "react";
import { InfoDescription } from "./type";

const ThemeContext = createContext<{
  activehelp?: string | null;
  buttonhelp?: Array<number>;
  setactivehelp?: Function;
  setbuttonhelp?: Function;
  infodescription?: InfoDescription;
  setinfodescription?: Function;
  activebutton?: Array<number>;
  setactivebutton?: Function;
  text?: string;
  settext?: Function;
  translate?: string;
  settranslate?: Function;
  textdescription?: string | null;
  settextdescription?: Function;
  stableexpressions?: Array<number>;
  setstableexpressions?: Function;
}>({});

export default ThemeContext;
