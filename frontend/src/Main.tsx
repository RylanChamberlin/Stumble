import Routes from "./navigation/Routes"
import useCachedResources from './hooks/useCachedResources';

const Main = () => {


    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    } else {
        return(<Routes/>)
    }
}

export default Main