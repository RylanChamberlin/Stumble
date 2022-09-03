import { Provider } from 'react-redux';
import { store } from "./frontend/src/app/store";
import Main from "./frontend/src/Main";


export default function App() {

    return (
        <Provider store={store}>
            <Main/>
        </Provider>
    );
    
}