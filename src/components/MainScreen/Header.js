import {Text, View, StyleSheet} from 'react-native';

export default function Header(){

    return(
        <View style = {styles.container}>
             <Text style = {styles.boldHeader}>EXPLORE...</Text>
        </View>
       
    );
}

const styles = StyleSheet.create({

    container: {
        marginTop: 10,
        marginHorizontal: 10
    },
    boldHeader: {
        fontSize: 40,
        fontWeight: 'bold',
    }
});