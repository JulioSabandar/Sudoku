import { SET_BOARD, SET_TEMPBOARD, SET_RENDER, SET_SOLVED, SET_SOLVING, SET_DIFFICULTY, SET_WIN, SET_NAME, SET_TIME, SET_ISACTIVE, SET_RESTART  } from '../actions/types';
const axios = require('axios');
export function getBoard(difficulty){
    return (dispatch) => {
        fetch('https://sugoku.herokuapp.com/board?difficulty=' + difficulty)
        .then(res=>res.json())
        .then(data => {
            let board = data.board
            dispatch(setRender(true));
            dispatch(setBoard(JSON.parse(JSON.stringify(board))));
            dispatch(setTempBoard(board));
        })
        .catch(console.log)
    }
}

export function solve(data){
    return (dispatch) => {
        dispatch(setSolving(true));
        axios({
            method: 'post',
            url: 'https://sugoku.herokuapp.com/solve',
            data: data,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(res=>{
            if(res.data.status == 'solved'){
                dispatch(setSolved(true));
                dispatch(setTempBoard(res.data.solution));
            }
            
        })
        .catch(err=>{
            console.log(err);
        })
        .finally(()=>{
            dispatch(setSolving(false));
        })
    }
}
export function submit(data){
    return (dispatch) => {
        dispatch(setSolving(true));
        axios({
            method: 'post',
            url: 'https://sugoku.herokuapp.com/validate',
            data: data,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(res=>{
            if(res.data.status == 'solved'){
                dispatch(setSolved(true));
                dispatch(setWin(true));
                // dispatch(setTempBoard(res.data.solution));
            }
        })
        .catch(err=>{
            console.log(err);
        })
        .finally(()=>{
            dispatch(setSolving(false));
        })
    }
}
export const setBoard = (value) => {
    return {
        type : SET_BOARD,
        payload : value
    }
}
export const setTempBoard = (value) => {
    return {
        type : SET_TEMPBOARD,
        payload : value
    }
}
export const setRender = (value) => {
    return {
        type : SET_RENDER,
        payload : value
    }
}
export const setSolved = (value) => {
    return {
        type : SET_SOLVED,
        payload : value
    }
}
export const setSolving = (value) => {
    return {
        type : SET_SOLVING,
        payload : value
    }
}
export const setDifficulty = (value) => {
    return {
        type : SET_DIFFICULTY,
        payload : value
    }
}
export const setWin = (value) => {
    return {
        type : SET_WIN,
        payload : value
    }
}
export const setName = (value) => {
    return {
        type : SET_NAME,
        payload : value
    }
}
export const setTime = (value) => {
    return {
        type : SET_TIME,
        payload : value
    }
}

export const setIsActive = (value) => {
    return {
        type : SET_ISACTIVE,
        payload : value
    }
}

export const setRestart = (value) => {
    return {
        type : SET_RESTART,
        payload : value
    }
}