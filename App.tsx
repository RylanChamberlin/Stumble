import { LogBox } from "react-native";
import { Provider } from 'react-redux';
import { store } from "./frontend/src/app/store";
import Main from "./frontend/src/Main";

export default function App() {

  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications

  return (
    <Provider store={store}>
      <Main/>
    </Provider>
  );
}