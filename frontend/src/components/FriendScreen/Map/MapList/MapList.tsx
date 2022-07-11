import { BlurView } from "expo-blur";
import { Dispatch, FC, SetStateAction, useCallback } from "react";
import { FlatList, Modal, Text, View } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import MapListItem from "../MapListItem";
import styles from "./styles";

type MapListProps = {
    setPeeps: Dispatch<SetStateAction<boolean>>
    showPeeps: boolean
    friends: any
    title: string
}


const MapList: FC<MapListProps> = ({setPeeps, showPeeps, friends, title}) => {

    const renderItem = useCallback(({ item }) => {return (<MapListItem name={item.name} seconds={item.checkInTime.seconds}/>)},[]);

    return (

        <GestureRecognizer
            style={{}}
            onSwipeDown={() => setPeeps(!showPeeps)}
            >
            <Modal
                animationType="slide"
                transparent={true}
                visible={showPeeps}
                onRequestClose={() => setPeeps(!showPeeps)}
            >
            
            <BlurView intensity={10} style={styles.blurBackground}>
                <View style={{backgroundColor: 'white', marginHorizontal: 15, borderRadius: 10, padding: 5, marginBottom: 5}}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <FlatList
                    data={friends}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.uid}
                    showsVerticalScrollIndicator={false}
                /> 
            </BlurView> 
            </Modal>
        </GestureRecognizer>

    );

}
export default MapList;