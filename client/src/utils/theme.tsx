// import { bootstrap } from "@theme-ui/presets";
import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  // ...bootstrap,
  //   ...bootstrap,
  colors: {
    text: "#0e0e16",
    background: "#fff",
    base: ["#e85d45", "#564FCC"], //"#564FCC", //"#11e",
    primary: "#e43f23",
    white: "#fff",
    secondary: "#c4c4c4",
    highlight: "#F7E8DB",
    muted: "#808080",
    error: "#f65",
    black: "#333",
    green: "#004150",
    lightGray: "#F2F2F2",
    modes: {
      dark: {
        text: "#fff",
        background: "#000",
        primary: "#e85d45",
        secondary: "#353535",
        highlight: "#f0c",
        muted: "#111",
      },
    },
  },
  forms: {
    select: {
      borderRadius: "1.875rem",
      // padding: "0.6rem 3.125rem",
    },
  },
  fonts: {
    body: '"Popins", sans-serif',
    heading: "inherit",
    monospace: "Menlo, monospace",
  },
  buttons: {
    primary: {
      padding: "0.6rem 3.125rem",
      borderRadius: "3.125rem",
    },
    secondary: {
      bg: "secondary",

      color: "text",
    },
  },
  badges: {
    primary: {
      color: "background",
      bg: "primary",
    },
    outline: {
      color: "primary",
      bg: "transparent",
      boxShadow: "inset 0 0 0 1px",
    },
    circle: {
      borderRadius: "100%",
    },
  },
};
