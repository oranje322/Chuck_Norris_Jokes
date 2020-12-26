import {applyMiddleware, compose, createStore, Store} from "redux";
import thunk from "redux-thunk";
import reducer, {AllActionTypes, initialStateTypes} from "./reducer";

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const configureStore = () => (
    createStore(
        reducer,
        composeEnhancers(
            applyMiddleware(thunk)
        )
    )
)

const store: Store<initialStateTypes, AllActionTypes> = configureStore()


export default store