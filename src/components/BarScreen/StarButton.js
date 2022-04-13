import React, { useState } from "react";
import { Pressable } from "react-native";
import { Entypo } from '@expo/vector-icons'; 

export default function StarButton(){
  const [liked, setLiked] = useState(false);
  return (
    <Pressable onPress={() => setLiked((isLiked) => !isLiked)}>
      <Entypo
        name={liked ? "star" : "star-outlined"}
        size={20}
        color={liked ? "gold" : "black"}
      />
    </Pressable>
  );
};