import React, {FC} from 'react';
import styled from "styled-components";
import {
    deleteFavoriteJoke,
    initialStateTypes,
    JokeType,
    setFavoriteJoke,
    updateLocalStorage
} from "../redux/reducer";
import {useDispatch, useSelector} from "react-redux";



const WrapperQuote = styled.div`
    width: 1000px;
    display: flex;
    flex-direction: column;
    @media (max-width: 500px) {
    width: auto;
    }
`

export const BlockQuote = styled.blockquote`
    text-align: justify;
    background: #f9f9f9;
    border-left: 10px solid #ccc;
    margin: 1.5em 10px;
    padding: .5em 10px;
    &:before {
        color: #ccc;
        content: open-quote;
        font-size: 4em;
        line-height: .1em;
        margin-right: .25em;
        vertical-align: -.4em;
    };
    & p {
        display: inline;
    }
`;


const AddButton = styled.button`
    padding: 5px 30px;
    background-color: #21eb35;
    outline: none;
    border: none;
    border-radius: 5px;
    color: black;
    width: 150px;
    cursor: pointer;
    margin-top: 10px;
    margin-left: 15px;
    
    @media (max-width: 500px) {
    margin: auto;
    }
`;

export const DeleteButton = styled(AddButton)`
    background-color: #ed212f
`


type propsType = {
    currentQuote: JokeType
}


const Quote:FC<propsType> = ({currentQuote}) => {
    const {id, value } = currentQuote

    const dispatch = useDispatch()

    const favoriteJokes = useSelector((state:initialStateTypes) => state.favoriteJokes)

    const isExist = favoriteJokes.filter((joke:JokeType) => joke.id === id)


    const onClickAddButton = () => {
        dispatch(setFavoriteJoke({id, value}))
        dispatch(updateLocalStorage())
    }

    const onClickDeleteButton = () => {
        dispatch(deleteFavoriteJoke(id))
        dispatch(updateLocalStorage())
    }


    return (
        <WrapperQuote>

            <BlockQuote>
                <p>{value}</p>
            </BlockQuote>
            {
                isExist.length > 0 ? <DeleteButton onClick={onClickDeleteButton}>Удалить</DeleteButton>
                    : <AddButton onClick={onClickAddButton}>Добавить</AddButton>
            }
        </WrapperQuote>
    );
};

export default Quote;