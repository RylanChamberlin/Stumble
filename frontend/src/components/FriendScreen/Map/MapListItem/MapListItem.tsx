import { FC } from "react";
import { Text, View } from "react-native";
import styles from "./styles";

type MapListItemProps = {
    name: string
    seconds: number
}

const MapListItem: FC<MapListItemProps> = ({name, seconds}) => {

    return (
        <View style={styles.box}>
            <Text style={styles.name}>{name}</Text>
            <Text>{new Date(seconds * 1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</Text>
        </View>
    );
};


export default MapListItem