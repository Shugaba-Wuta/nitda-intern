import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { IChildren } from "../types";

interface IAuthContext {
  user: string | null;
  login(data: {}): Promise<void>;
  logout(): Promise<void>;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  login: async (data: {}) => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: IChildren) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const login = async (data: {}) => {
    setUser(data);
    navigate("/home");
  };

  const logout = async () => {
    setUser(null);
    navigate("/", { replace: true });
  };
  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider {...{ value }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  return useContext(AuthContext);
};
export default useAuth;
