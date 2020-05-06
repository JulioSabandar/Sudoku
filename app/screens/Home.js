import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector} from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient';


export default function Finish({ navigation }) {
    const [name, setName] = useState('');
    useEffect(() => {
        console.log('Home')
    }, [])
    function start () {
        navigation.navigate("Game", {name})
    }
    function selectDifficulty () {
        navigation.navigate("Difficulty")
    }
    return (
        <View style={styles.container}>
            <LinearGradient
            colors={['rgba(238,174,202,1)', 'rgba(148,187,233,1)']}
            style={styles.Gradient}
        />
        <Image
            style={styles.logo}
            source={require('../assets/logo.png')}     
        />
            <TextInput 
                style={{padding : 4, borderWidth: 2, borderColor: "black", width : "80%"} }
                onChangeText={name => setName(name)} 
                value={name}
                placeholder="Enter Your Name"
            >  
            </TextInput>

            <Text>
                {"\n"}
            </Text>

            {   name.length > 0 &&
                (
                <TouchableOpacity style={styles.button} onPress={start} title="Start Game">
                    <Text> Start Game </Text>
                </TouchableOpacity>
                )
            }
            {   name.length === 0 &&
                <TouchableOpacity style={styles.buttonDis} onPress={start} disabled={true} title="Start Game">
                    <Text> Start Game </Text>
                </TouchableOpacity>
            }
            <Text>
                {"\n"}
            </Text>
            <TouchableOpacity style={styles.button} onPress={selectDifficulty} title="Select Difficulty">
                <Text> Select Difficulty </Text>
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
    },
    logo: {
        resizeMode: 'contain',
        width: '80%',
        height: '20%',
        zIndex : 5
    }
});