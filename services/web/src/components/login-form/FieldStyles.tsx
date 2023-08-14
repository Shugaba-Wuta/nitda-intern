export const inputFieldStyle = (color: string) => {
  return {
    input: {
      color,
      fontSize: "1rem",
    },
    "&.MuiTextField-root > label": {
      fontSize: "1rem",
      color,
    },
    "&.MuiTextField-root": {
      mb: "10px",
    },
  };
};

export const primarySubmitBtnStyle = (bgColor: string, textColor: string) => {
  return {
    borderRadius: "5px",
    background: bgColor,
    fontWeight: "bold",
    width: "fit-content",
    p: "0px 5px",
    mx: "auto",
    cursor: "pointer !important",
    color: textColor,
    "&.MuiTextField-root": {
      fontSize: "2rem",
      color: textColor,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none"
    },

    input: {
      color: textColor,
      fontWeight: "600",
      cursor: "pointer !important",
    },
  };
};
