import { FC } from "react";
import { Text, View } from "react-native"
import styles from "./styles";

type TextDivideLineProps = {
    title: string
}

const TextDivideLine:FC<TextDivideLineProps> = ({title}) => {
    
    return (
        <>
            <View style={styles.container}>
                <View style={styles.line} />
            <View>

            <Text style={styles.title}>{title}</Text>

            </View>
                <View style={styles.line} />
            </View>

        </>
       
    );
}

export default TextDivideLine;