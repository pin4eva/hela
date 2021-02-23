import { atom } from "recoil";

export const ReportsAtom = atom({
  key: "Report-Atom",
  default: [],
});

export const ReportCount = atom({
  key: "Report-Count",
  default: 0,
});
