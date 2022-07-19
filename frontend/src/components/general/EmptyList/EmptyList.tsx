import { Text, View } from "react-native";

import { FC } from "react";
import styles from "./styles";

type EmptyListProps = {
    name: string
}

const EmptyList:FC<EmptyListProps> = ({name}) => {



    return (
        
        <Text style={styles.name}>{name}</Text>
        
    );


}

export default EmptyList;