import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import { useDispatch, useSelector} from 'react-redux'
import { getBoard, setTempBoard, solve, setSolved, setRender, submit, setTime, setIsActive, setRestart } from "../store/actions/gameActions";
import { LinearGradient } from 'expo-linear-gradient';

function Game ({ navigation, route }){
    const { board, tempBoard, render, solved, solving, difficulty, time, isActive, restart} = useSelector(state => state.gameReducer);
    const dispatch = useDispatch(); 
    const { name } = route.params;
    const [seconds, setSeconds] = useState(0);
    useEffect(()=>{
      console.log('eaaaaaaaa')
      dispatch(setSolved(false));
      dispatch(setRender(false));
      dispatch(getBoard(difficulty));
      setSeconds(0);
      dispatch(setIsActive(true));
    }, []);
    useEffect(()=>{
      if(restart){
        dispatch(setRestart(false));
        setSeconds(0);
      }
      let interval = null;
      if (isActive) {
        interval = setInterval(() => {
          setSeconds(seconds => seconds + 1);
        }, 1000);
      } else if (!isActive && seconds !== 0) {
        clearInterval(interval);
      }

      // if (isActive) {
      //   interval = setInterval(() => {
      //     setSeconds(seconds => seconds + 1);
      //   }, 1000);
      // } else if (!isActive && seconds !== 0) {
      //   clearInterval(interval);
      // }
      return () => clearInterval(interval);
    }, [isActive, seconds]);
    const updateBoard = (e, idx1, idx2) => {
        let temp = tempBoard;
        temp[idx1][idx2] = Number(e.target.value);
        dispatch(setTempBoard(temp));
    }
    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
    const encodeParams = (params) => 
      Object.keys(params)
      .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
      .join('&');

    const solvee = () => {
      let data = {
          board: board
      }
      dispatch(setTime(seconds));
      setSeconds(0);
      dispatch(setIsActive(false));

      dispatch(solve(encodeParams(data)));
      navigation.navigate("Finish", {name});

    }
    function submito(){
      let data = {
        board: tempBoard
      }
      let data2 = {
        board: board
      }
      dispatch(setTime(seconds));
      setSeconds(0);
      dispatch(setIsActive(false));

      dispatch(submit(encodeParams(data, data2)));
      console.log('submitinggg')
      navigation.navigate("Finish", {name})

    }
    function quit(){
      dispatch(setSolved(false));
      dispatch(setRender(false));
      navigation.navigate("Home");
    }
    function countZeros(board){
      let count =0;
      for(let i=0; i<board.length; i++){
        for(let j=0; j<board.length; j++){
          if(board[i][j] == 0){
            count++;
          }
        }
      }
      return count;
    }
    
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['rgba(238,174,202,1)', 'rgba(148,187,233,1)']}
          style={styles.Gradient}
        />
        { !render && !solved && !solving &&
          <Text>Fetching board...</Text>
        }
        { render && !solved && !solving &&
        <View style={styles.boardy}>
          <View style={styles.timeContainer}>
            <Text style={styles.time}>Time: {seconds}s</Text>
          </View>
          <Text style={styles.space}>
            {"\n"}
          </Text>

          {board.map((numCol, idx1) => {
            return(
              <View
              key={idx1} 
              style={styles.row}
              > 
                {numCol.map((num, idx2)=>{
                  if(num == 0) return (
                    <TextInput 
                    key={idx2}
                    style={styles.boxInput}
                    maxLength={1}
                    keyboardType={'numeric'}
                    returnKeyType='done'
                    onChange={(e)=>{
                      updateBoard(e, idx1, idx2)
                    }}
                    />
                  )
                  if(num != 0) return (
                    <View 
                    key={idx2}
                    style={styles.box}
                    > 
                      <Text> {num} </Text>
                    </View>
                  )
                })}
              </View>  
            )
          }
        )}
        
          <Text>
            {"\n"}
          </Text>
          {
            countZeros(tempBoard) === 0 &&
            <TouchableOpacity style={styles.button} onPress={submito} title="Submit">
              <Text> Submit </Text>
            </TouchableOpacity>
            }
          {
            countZeros(tempBoard) !== 0 &&
            <TouchableOpacity style={styles.buttonDis} disabled={true} onPress={submito} title="Submit">
              <Text> Submit </Text>
            </TouchableOpacity>
          }
          <Text style={styles.space}>
            {"\n"}
          </Text>
          <TouchableOpacity style={styles.button} onPress={solvee} title="Magic Solve">
            <Text> Magic Solve </Text>
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
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    Gradient: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: '100%',
      zIndex : -1
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
      height: 30
    },
    timeContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: 30,
      backgroundColor: 'orange',
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 25
    },
    time: {
      zIndex : 10
    },
    space: {
      fontSize: 5
    },
    row: {
      margin: 0,
      padding: 0,
      flexDirection: 'row'
    },
    boardy: {
      margin: 0,
      padding: 0,
      position: 'absolute',
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
    }
});
  
export default Game;