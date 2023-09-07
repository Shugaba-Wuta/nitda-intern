import jwtDecode from 'jwt-decode';


export const toTitleCase = (s: string) => {
  return s[0].toLocaleUpperCase() + s.substring(1).toLocaleLowerCase();
};

export const decodeJWT = (token: string) => {
  return jwtDecode(token);
}
export const hexToRgba = (hex: string, alpha: number) => {
  if (hex.length === 4) hex = hex + hex.slice(1)
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
