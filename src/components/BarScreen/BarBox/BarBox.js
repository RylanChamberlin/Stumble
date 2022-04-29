import {StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Modal, TouchableHighlight} from "react-native";
import { Dimensions } from 'react-native';
import {elevation, bold} from "../../../common/styles";
import LikeButton from "../../general/LikeButton";
import { useState } from "react";
import {GOOGLE_KEY} from '@env'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function BarBox({item, numComment}){

    //const [more, setMore] = useState(true);
    
    return (


            <ScrollView horizontal={true}  showsHorizontalScrollIndicator={false}>
            <View style={[styles.outsideContainer]}>
            <View style={styles.container}>
                <View style = {styles.infoBox}>
                    <View style = {styles.infoBoxLeft}>
                        <Text style = {[styles.title, bold]}>{item.name}</Text>

                        <View>
                            {numComment == 1 ? 
                            <Text>{numComment} new post</Text> : 
                            <Text>{numComment ??= 0} new posts</Text>
                            }
                        </View>
                        
                        <View style = {styles.specialsContainer}>
                            <Text style={[styles.specialsTitle, bold]}>TODAY'S DEALS:</Text>
                            <Text>{}</Text>
                        </View>

                        {/* <TouchableOpacity onPress={() => setMore((isMore) => !isMore)}>
                            {more ? moreButton() : <View style = {styles.moreContainer}><Text style={styles.moreArrow}>More Info:</Text></View>} 
                        </TouchableOpacity> */}
                        
                    </View>

                    <View style={styles.infoBoxRight}>
                        {/* <View>
                            <LikeButton/>
                        </View> */}
                        <Image style = {styles.image} source={{uri:`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${item.photoID}&key=${GOOGLE_KEY}`}}/>

                    </View>
                </View>

                    {/* <View>
                        {!more ? moreText( () => setMore((isMore) => !isMore),  ) : null} 
                    </View> */}
                
            </View>
            </View>
            </ScrollView>
    );

}

// function moreButton(){
//     return( 
//         <View style = {styles.moreContainer}>
//             <Text style={[styles.moreText, bold]}>more </Text>
//             <Text style={styles.moreArrow}>ˇ</Text>
//         </View> 
//     );
// }

// function lessButton(){
//     return(
//         <View style = {styles.moreContainer}>
//             <Text style={styles.moreArrow}>^</Text>
//         </View>      
//     );
// }

// function moreText(onClick){
//     return(
//         <View>

//             <View style = {styles.moreTextContainer}>
//                 <Text>{}</Text>
//                 <Text>{}</Text>

//                 {/* <ScrollView horizontal={true}>
//                     <Image style = {styles.image} source={image}/>
//                     <Image style = {styles.image} source={image}/>
//                     <Image style = {styles.image} source={image}/>
//                     <Image style = {styles.image} source={image}/>
//                     <Image style = {styles.image} source={image}/>
//                 </ScrollView> */}

//                 <Text>{}</Text>   

//             </View>
//             <TouchableOpacity onPress={onClick}>
//                 {lessButton(onClick)}
//             </TouchableOpacity>     
//         </View>
//     );
// }

const infoBoxWidth = windowWidth-30;
const infoBoxHeight = windowHeight/4;

const styles = StyleSheet.create({

    outsideContainer:{
        padding: 3,
        shadowColor: "black",
        shadowOffset: {width: 10, height: 30}, //gives shadow offset
        shadowOpacity: .3,
    },

    container: {
        borderRadius: 8,
        backgroundColor: "#f2f1f1",
        marginTop: 5,
        width: infoBoxWidth,
        borderWidth: 1,
        
    },
   
    infoBox: {

        padding: 10,
        margin: 10,
        borderRadius: 8,
        borderWidth: StyleSheet.hairlineWidth,
        backgroundColor: "#ffffff",
        flexDirection: "row",
        justifyContent: "space-between",
        

        },
    infoBoxRight: {
      
     
    },
    infoBoxLeft: {
        width: infoBoxWidth/3,
        justifyContent: "space-between",
       
    },
    title: {
        fontSize: 20,
    },
    
    image: {

        resizeMode : 'stretch',
        width: infoBoxWidth/2.3, 
        height: infoBoxWidth/3,
        borderRadius: 10
    },
    elevation,
    bold,

})