import { Dispatch, FC, SetStateAction, useEffect } from "react"
import { Text, TouchableOpacity } from "react-native"
import styles from "./styles"

type BarItemProps = {
    item: any
    selectedID: string
    setSelectedID: Dispatch<SetStateAction<string>>
    setSelectedBar: Dispatch<SetStateAction<any>>
} 

const BarItem: FC<BarItemProps> = ({item, selectedID, setSelectedID, setSelectedBar}) => {

    const selectBar = () => {
        setSelectedID(item.place_id)
        setSelectedBar(item)
    }

    return (
        <TouchableOpacity style={[styles.container, selectedID === item.place_id ? {backgroundColor: 'grey'} : {backgroundColor: 'white'}]} onPress={() => selectBar()}>
            <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
    )
}

export default BarItem