import { SET_BOARD, SET_TEMPBOARD, SET_RENDER, SET_SOLVED, SET_SOLVING, SET_DIFFICULTY, SET_WIN, SET_NAME, SET_TIME, SET_ISACTIVE, SET_RESTART} from '../actions/types';
const initialState = {
  board: [],
  tempBoard: [],
  render: false,
  solved: false,
  win: false,
  solving: false,
  difficulty: 'easy',
  name: '',
  time: 0,
  ladderboard: [],
  isActive: true,
  restart: false
}

export default (state = initialState, action) => {
  switch(action.type){
    case SET_BOARD : 
      return { ...state, board : action.payload }
    case SET_TEMPBOARD : 
      return { ...state, tempBoard : action.payload }
    case SET_RENDER : 
      return { ...state, render : action.payload }
    case SET_SOLVED : 
      return { ...state, solved : action.payload }
    case SET_SOLVING : 
      return { ...state, solving : action.payload }
    case SET_DIFFICULTY : 
      return { ...state, difficulty : action.payload }
    case SET_WIN : 
      return { ...state, win : action.payload }
    case SET_NAME : 
      return { ...state, name : action.payload }
    case SET_TIME : 
      return { ...state, time : action.payload }
    case SET_ISACTIVE : 
      return { ...state, isActive : action.payload }
      case SET_RESTART : 
      return { ...state, restart : action.payload }
    default :
      return state
  }
}