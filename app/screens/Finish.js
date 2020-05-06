import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Button, BackHandler, TouchableOpacity } from 'react-native';
import { getBoard, setTempBoard, solve, setSolved, setRender, setWin, setTime, setIsActive, setRestart } from "../store/actions/gameActions";
import { useDispatch, useSelector} from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient';

export default function Finish({ navigation, route }) {
    const dispatch = useDispatch(); 
    const { name } = route.params;
    const { board, tempBoard, solved, solving, win, difficulty, time} = useSelector(state => state.gameReducer)
    useEffect(() => {
        console.log('Finish')
        BackHandler.addEventListener('hardwareBackPress', function() {
            return false;
        });
        BackHandler.removeEventListener('hardwareBackPress', true);
    }, [])
    function onPress () {
        dispatch(setIsActive(true));
        dispatch(setRestart(true));
        dispatch(setSolved(false));
        dispatch(setRender(false));
        dispatch(setWin(false));
        dispatch(setTime(0));
        dispatch(getBoard(difficulty));
        navigation.navigate("Game");
        
    }
    function quit(){
        dispatch(setSolved(false));
        dispatch(setRender(false));
        dispatch(setWin(false));
        navigation.navigate("Home", {restart: true});
    }
  return (
    <View style={styles.container}>
        <LinearGradient
        colors={['rgba(238,174,202,1)', 'rgba(148,187,233,1)']}
        style={styles.Gradient}
        />
        { solving && !solved &&
          <Text>Solving...</Text>
        }
        { win && solved && !solving &&
            <View style={styles.status}>
                <Text style={styles.title}>You Win!</Text>
                <Text>Congratulations {name}</Text>
                <Text>Your Time: {time}s</Text>
            </View>  
        }
        { !win && !solved && !solving &&
            <View style={styles.status}>
                <Text style={styles.title}>You Failed!</Text>
                <Text>Try Harder next time, {name}. </Text>
                <Text>Your Time: {time}s</Text>

            </View>  
        }
        { solved && !win && !solving &&
          <View>
            <View style={styles.status}>
              <Text style={styles.title}>You gave up</Text>
              <Text style={styles.space}>
                    {"\n"}
              </Text>

              <Text>Try harder next time, {name} </Text>

              <Text>Your Time: {time}s</Text>
              <Text style={styles.space}>
                    {"\n"}
              </Text>
              <Text>Here is the sollution</Text>
            </View>
            <Text style={styles.space}>
                    {"\n"}
            </Text>


            {tempBoard.map((numCol, idx1) => {
              return(
                <View
                key={idx1} 
                style={styles.row}
                > 
                  {numCol.map((num, idx2)=>{
                    return (
                        <View key={idx2}>
                        { num === board[idx1][idx2] &&
                        <View 
                        style={styles.box}
                        > 
                            <Text> {num} </Text>
                        </View>
                        }
                        { num !== board[idx1][idx2] &&
                        <View 
                        style={styles.boxInput}
                        > 
                            <Text> {num} </Text>
                        </View>
                        }

                        </View>
                    )
                  })}
                </View> 
              )
            })}

          </View>    
        }
        { !solving  &&
            <View style={styles.buttonContainer}>
                <Text >
                    {"\n"}
                </Text>

                <TouchableOpacity style={styles.button} onPress={onPress} title="Play Again">
                    <Text> Play Again </Text>
                </TouchableOpacity>
                <Text style={styles.space}>
                    {"\n"}
                </Text>
                <TouchableOpacity style={styles.button} onPress={quit} title="Quit">
                    <Text> Quit </Text>
                </TouchableOpacity>
            </View>
        }

        
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
    box: {
      borderColor: 'gray',
      borderWidth: 1,
      width: 30,
      height: 30,
      backgroundColor: '#97defc'
    },
    boxInput: {
      borderColor: 'gray',
      borderWidth: 1,
      width: 30,
      height: 30,

    },
    row: {
      flexDirection: 'row'
    },
    space: {
        fontSize: 5
    },
    buttonContainer: {
        width: "80%",
    },
    button: {
      width: "100%",
      alignItems: "center",
      backgroundColor: "#1cb0ff",
      padding: 10
    },
    buttonDis: {
      width: "100%",
      alignItems: "center",
      backgroundColor: "gray",
      padding: 10
    },
    status: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 25
    }

});
