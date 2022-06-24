import { FC } from "react"
import { Text, TouchableHighlight } from "react-native"
import styles from "./styles"

type BarListItemProps = {
    clickBarName: (bar: any) => void
    item: any
}


const BarListItem: FC<BarListItemProps> = (props) => {

    return (
        <TouchableHighlight style={styles.container} onPress={() => props.clickBarName(props.item)}>
            <>
                <Text style={styles.name}>{props.item.name}</Text>
                <Text style={styles.address}>{props.item.vicinity}</Text>
            </>
        </TouchableHighlight>
    )

}

export default BarListItem