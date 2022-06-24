import { FC, useCallback, useEffect } from "react";
import { FlatList, View } from "react-native";
import useNearby from "../../../../hooks/useNearby";
import BarListItem from "../BarListItem";
import styles from "./styles"

type SearchListProp = {
    clickBarName: (bar: any) => void
    barInput: string
}

const SearchList: FC<SearchListProp> = (props) => {

    const {data, isError, searchNearby} = useNearby();

    useEffect(() => {
        searchNearby(props.barInput);
    },[props.barInput])

    const renderItem = useCallback (({ item }) => <BarListItem clickBarName={props.clickBarName} item={item}/>,[]);
    const keyExtractor = useCallback( (item) => item.place_id, []);

    return (
        <View style={styles.list}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                showsVerticalScrollIndicator={false} 
            /> 
        </View> 
    );
}

export default SearchList