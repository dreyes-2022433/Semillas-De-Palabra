import { createContext, useContext, useState, useEffect } from "react";
import { getUserModulesRequest } from "../../services/api";

const UserModulesContext = createContext();

export const UserModulesProvider = ({ children }) => {
  const [userModules, setUserModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      const res = await getUserModulesRequest();
      setUserModules(res.data.userModules || []);
    };
    fetchModules();
  }, []);

  return (
    <UserModulesContext.Provider value={{ userModules, setUserModules }}>
      {children}
    </UserModulesContext.Provider>
  );
};

export const useUserModules = () => useContext(UserModulesContext);