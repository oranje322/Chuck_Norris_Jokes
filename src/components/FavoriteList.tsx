import React, {FC} from 'react';
import styled from "styled-components";
import {BlockQuote, DeleteButton} from './Quote';
import {useDispatch, useSelector} from "react-redux";
import {
    deleteFavoriteJoke,
    deleteFavoriteJokes,
    initialStateTypes, JokeType,
    updateLocalStorage
} from "../redux/reducer";


const WrapperFavList = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`;

const ListItem = styled.div`
    width: 33.333%;
    
    @media (max-width: 500px) {
        width: auto;
        display: flex;
        flex-wrap: wrap;
    }

`;

const DeleteAllJokesBtn = styled(DeleteButton)`
    width: 50%;
    margin: 20px auto;
    background-color: #1e25e8;
    color: white;
    
     @media (max-width: 500px) {
        width: 90%;
        
    }
`;


const FavoriteList:FC = () => {
    const favoriteJokes = useSelector((state:initialStateTypes) => state.favoriteJokes)
    const dispatch = useDispatch()

    const onClickDelete = (id: string) => {
        dispatch(deleteFavoriteJoke(id))
        dispatch(updateLocalStorage())
    }

    const onClickDeleteAllJokes = () => {
        dispatch(deleteFavoriteJokes())
        dispatch(updateLocalStorage())
    }

    return (
        <>
            <WrapperFavList>
                {
                    favoriteJokes.map((joke: JokeType) => <ListItem key={joke.id}>
                            <BlockQuote>
                                <p>{joke.value}</p>
                            </BlockQuote>
                        <DeleteButton onClick={() => onClickDelete(joke.id)}>Удалить</DeleteButton>

                        </ListItem>
                    )
                }
            </WrapperFavList>

            {
                favoriteJokes.length > 0 ?  <DeleteAllJokesBtn onClick={onClickDeleteAllJokes}>Удалить все шутки</DeleteAllJokesBtn> : 'Любимых шуток нет'
            }


        </>
    );
};

export default FavoriteList;
