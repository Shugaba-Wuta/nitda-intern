export const toTitleCase = (s: string) => {
  return s[0].toLocaleUpperCase() + s.substring(1).toLocaleLowerCase();
};
