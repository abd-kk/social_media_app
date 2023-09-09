import { createContext, useState } from "react";
import { users } from "../../public/json files/users";

// eslint-disable-next-line no-unused-vars
const usersAccounts = [
  {
    userId: 1,
    userName: "abd",
    password: "p",
  },
  {
    userId: 2,
    userName: "ammarmalas@gmail.com",
    password: "password",
  },
  {
    userId: 3,
    userName: "adamkalasina@gmail.com",
    password: "password",
  },
  {
    userId: 4,
    userName: "mohammadkraytem@gmail.com",
    password: "password",
  },
  {
    userId: 5,
    userName: "tarekrimeh@gmail.com",
    password: "password",
  },
];

export const Auth = createContext({});

// eslint-disable-next-line react/prop-types
export const AuthenticationContext = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  const isLoggedIn = () => {
    return user !== null;
  };

  const isUserInfoMatched = (info) => {
    let token = false;
    usersAccounts.map((element) => {
      if (
        element.userName === info.userName &&
        element.password === info.password
      ) {
        token = true;
        login({ userId: element.userId, ...element });
        return;
      }
    });
    return token;
  };

  const getUserInfo = (userId) => {
    let userInfo = {};
    users.forEach((u) => {
      if (u.userId === userId) userInfo = u.userInfo;
    });
    return userInfo;
  };

  return (
    <Auth.Provider
      value={{
        user,
        getUserInfo,
        isLoggedIn,
        login,
        logout,
        isUserInfoMatched,
      }}
    >
      {children}
    </Auth.Provider>
  );
};
