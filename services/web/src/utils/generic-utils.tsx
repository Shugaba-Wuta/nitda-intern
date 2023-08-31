import jwtDecode from 'jwt-decode';


export const toTitleCase = (s: string) => {
  return s[0].toLocaleUpperCase() + s.substring(1).toLocaleLowerCase();
};

export const decodeJWT = (token: string) => {
  return jwtDecode(token);
}
