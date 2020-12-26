import {ThunkAction} from "redux-thunk";

const SET_CURRENT_JOKE = 'SET_CURRENT_JOKE'
const SET_FAVORITE_JOKE = 'SET_FAVORITE_JOKE'
const SET_FAVORITE_JOKES_FROM_LOCALSTORAGE = 'SET_FAVORITE_JOKES_FROM_LOCALSTORAGE'
const DELETE_FAVORITE_JOKES = 'DELETE_FAVORITE_JOKES'
const DELETE_FAVORITE_JOKE = 'DELETE_FAVORITE_JOKE'

export interface initialStateTypes {
    currentJoke: JokeType | null
    favoriteJokes: JokeType[]

}

export interface JokeType {
    id: string,
    value: string
}


const initialState:initialStateTypes = {
    currentJoke: null,
    favoriteJokes: []
}


const reducer = (state = initialState, action:AllActionTypes ):initialStateTypes => {
    switch (action.type) {
        case SET_CURRENT_JOKE:
            return {
                ...state,
                currentJoke: action.payload
            };
        case SET_FAVORITE_JOKE: {
            const newJokesMass = [...state.favoriteJokes, action.payload]
            if(newJokesMass.length > 10) {
                newJokesMass.shift()
            }

            return {
                ...state,
                favoriteJokes: newJokesMass
            }
        }
        case SET_FAVORITE_JOKES_FROM_LOCALSTORAGE:
            return {
                ...state,
                favoriteJokes: action.payload
            }
        case DELETE_FAVORITE_JOKES:
            return {
                ...state,
                favoriteJokes: []
            };
        case DELETE_FAVORITE_JOKE:
            return {
                ...state,
                favoriteJokes: state.favoriteJokes.filter(joke => joke.id !== action.payload)
            }
        default:
            return state

    }
}

export default reducer


// actions

interface setCurrentJokeType {
    type: typeof SET_CURRENT_JOKE,
    payload: JokeType
}
export const setCurrentJoke = (payload:JokeType):setCurrentJokeType => ({type: SET_CURRENT_JOKE, payload})

interface setFavoriteJokeType {
    type: typeof SET_FAVORITE_JOKE,
    payload: JokeType
}
export const setFavoriteJoke = (payload:JokeType):setFavoriteJokeType => ({type: SET_FAVORITE_JOKE, payload})

interface deleteFavoriteJokesType {
    type: typeof DELETE_FAVORITE_JOKES
}
export const deleteFavoriteJokes = ():deleteFavoriteJokesType => ({type: DELETE_FAVORITE_JOKES})

interface deleteFavoriteJokeType {
    type: typeof DELETE_FAVORITE_JOKE,
    payload: string
}
export const deleteFavoriteJoke = (payload: string):deleteFavoriteJokeType => ({type: DELETE_FAVORITE_JOKE, payload})

export type AllActionTypes = setCurrentJokeType | setFavoriteJokeType | deleteFavoriteJokeType | deleteFavoriteJokesType | setFavJokesFromLocalStorageType

interface setFavJokesFromLocalStorageType {
    type: typeof SET_FAVORITE_JOKES_FROM_LOCALSTORAGE,
    payload: JokeType[]
}
export const setFavoriteJokesFromLocalStorage = (payload:JokeType) => ({type: SET_FAVORITE_JOKES_FROM_LOCALSTORAGE, payload})

export const getData = ():ThunkAction<void, initialStateTypes, unknown, AllActionTypes> => async (dispatch:any) => {
    const {id, value}:JokeType = await fetch('https://api.chucknorris.io/jokes/random').then(response => response.json())
    dispatch(setCurrentJoke({id, value}))
}

export const updateLocalStorage = ():ThunkAction<void, initialStateTypes, unknown, AllActionTypes> => (dispatch:any, getState:any) => {
    localStorage.setItem('favoriteJokes', JSON.stringify(getState().favoriteJokes));
}