import { useState, useEffect } from "react";

export const useTitleChange = (value: string = "unset") => {
  const [titleValue, setTitleValue] = useState(value);
  useEffect(() => {
    document.title = titleValue;
  }, [titleValue]);
  return [titleValue, setTitleValue];
};
