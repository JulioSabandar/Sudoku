import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { setDifficulty } from "../store/actions/gameActions";
import { useDispatch, useSelector} from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient';

export default function Finish({ navigation }) {
  useEffect(() => {
    console.log('Home')
  }, [])
  const dispatch = useDispatch(); 
  const { difficulty } = useSelector(state => state.gameReducer)
  function onPress (difficulty) {
    dispatch(setDifficulty(difficulty))
    navigation.navigate("Home")
  }

  return (
    <View style={styles.container}>
      <LinearGradient
            colors={['rgba(238,174,202,1)', 'rgba(148,187,233,1)']}
            style={styles.Gradient}
            />
        <Text> Current Difficulty: {difficulty} </Text>
        <Text>
          {"\n"}
        </Text>

        <TouchableOpacity style={styles.button} onPress={()=>onPress('easy')} title="Easy">
          <Text> Easy </Text>
        </TouchableOpacity>
        <Text>
          {"\n"}
        </Text>
        <TouchableOpacity style={styles.button} onPress={()=>onPress('medium')} title="Medium">
          <Text> Medium </Text>
        </TouchableOpacity>
        <Text>
          {"\n"}
        </Text>
        <TouchableOpacity style={styles.button} onPress={()=>onPress('hard')} title="Hard">
          <Text> Hard </Text>
        </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  Gradient: {
    position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
        zIndex : -1

},
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      width: "80%",
      alignItems: "center",
      backgroundColor: "#1cb0ff",
      padding: 10
    },
    buttonDis: {
      width: "80%",
      alignItems: "center",
      backgroundColor: "gray",
      padding: 10
    }

});