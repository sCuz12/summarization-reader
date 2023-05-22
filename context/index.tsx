import { useReducer, createContext, useEffect, ReactNode,Dispatch } from "react";
import axios from "axios";
//initial state
const initialState = {
  user: null,
};


type User = {
  // Define your user properties here
  // Example: id: string;
};

type State = {
  user: User | null;
};

type Action = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

//create context
const Context = createContext<{ state: State; dispatch: React.Dispatch<any> } >(
  {
      state: initialState,
      dispatch: () => null
  }
);

//root reducer to handle actions
const rootReducer = (state:State, action:Action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
  }
};

type ProviderProps = {
  children: ReactNode;
};

//context provider
const UserProvider = ({ children }:ProviderProps) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  //populate from storage the user object to global stage
  useEffect(() => {
    dispatch({
      type: "LOGIN",
      payload: JSON.parse(window.localStorage.getItem("user")!),
    });
  }, []);

  axios.interceptors.response.use(
    function (response) {
      //status code that lies to 2xx cause this function to trigger
      return response;
    },
    function (error) {
      //fals outside of 2xx -> trigger
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          //Execute logout request in order to logout the user
        });
      }
    }
  );

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
export { Context, UserProvider };
