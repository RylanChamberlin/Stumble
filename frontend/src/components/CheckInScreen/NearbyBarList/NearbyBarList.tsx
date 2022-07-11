import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { FlatList } from "react-native"
import Loader from "../../general/Loader";
import BarItem from "../BarItem";


type NearbyBarListProps = {
   user: any
   data: any
   isLoading: boolean
   setSelectedBar: Dispatch<SetStateAction<any>>
}

const NearbyBarList: FC<NearbyBarListProps>= ({user, data, isLoading, setSelectedBar}) => {

    const [selectedID, setSelectedID] = useState<string>('');
    
    useEffect(() => {
        setSelectedID(user?.checkIn?.locationID);
    },[])

    const renderItem = ({ item }: any) => <BarItem item={item} selectedID={selectedID} setSelectedID={setSelectedID} setSelectedBar={setSelectedBar}/>;

    if (isLoading || !user) {
        <Loader/>
    }

    return (
        <FlatList
            data={data} 
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: any) => item.place_id}
        />
    )

}

export default NearbyBarList