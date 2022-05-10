import { useEffect } from "react";
import useCheckIns from "../../hooks/useCheckIns";
import useLocation from "../../hooks/useLocation";
import { AppContext } from "./Context";

const { Provider } = AppContext;

export const AppProvider = (props) => {

const [location, getLocation] = useLocation();
useEffect(() => {
    getLocation();
}, [])

const [userCheckIns, getCheckIns] = useCheckIns();
  useEffect(() => {
      getCheckIns();
  }, []);


return(

   <Provider value={{location, userCheckIns}}>

      {props.children}

   </Provider>

);

}