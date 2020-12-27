import React, {FC, useEffect, useState} from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Quote from './components/Quote';
import styled from "styled-components";
import {getData, initialStateTypes, setFavoriteJokesFromLocalStorage} from "./redux/reducer";
import {useDispatch, useSelector} from "react-redux";
import FavoriteList from "./components/FavoriteList";


const Wrapper = styled.div`
    max-width: 1400px;
    margin: 3% auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h1`
    display: flex;
    justify-content: center;
`

const Img = styled.img`
    margin: auto;
    max-width: 150px;
`

export const Button = styled.button`
    padding: 10px 50px;
    background-color: #ba1fe0;
    outline: none;
    border: none;
    border-radius: 5px;
    color: white;
    margin: auto;
    cursor: pointer;
    margin: 2px 10px 2px 10px;
    
     
    @media (max-width: 500px) {
        width: 100%;
    }   
    
    
`;

const WrapForBtn = styled.div`
    display: flex;
    
    @media (max-width: 500px) {
    flex-direction: column;
    }   
`;


const App:FC = () => {
    const dispatch = useDispatch()

    const [toggleThreeScdBtn, setToggleThreeScdBtn] = useState<boolean>(false)

    useEffect(() => {
        let interval:any = null
        if(toggleThreeScdBtn) {
            interval = setInterval(() => {
                dispatch(getData())
            }, 3000)
        }
        return () => {
            clearInterval(interval)
        }
    },[toggleThreeScdBtn])

    useEffect(() => {
        if(localStorage.hasOwnProperty('favoriteJokes')) {
            dispatch(setFavoriteJokesFromLocalStorage(JSON.parse(localStorage.favoriteJokes)))
        }
    }, [])

    const currentQuote = useSelector((state:initialStateTypes) => state.currentJoke)



    const onClickToThreeSeconds = () => {
        setToggleThreeScdBtn(prev => !prev)
    }



  return (
      <BrowserRouter>
          <Wrapper>
              <Link to={'/'}>
                  <Img src={'https://pngimg.com/uploads/chuck_norris/chuck_norris_PNG9.png'}/>
              </Link>

              <Title>Шутки Чака </Title>
              <WrapForBtn>
                  <Link to={'/'}>
                      <Button onClick={() => dispatch(getData())}>Получить рандом шутку</Button>
                  </Link>

                  {
                      toggleThreeScdBtn ?  <Button onClick={onClickToThreeSeconds}>Хватит шутить!</Button>
                          :  <Button onClick={onClickToThreeSeconds}>Шутка каждые 3с.</Button>
                  }
                  <Link to={'/favorite'}>
                      <Button>Любимые шутки</Button>
                  </Link>

              </WrapForBtn>


              <Switch>
                  <Route path={'/favorite'}>
                      <FavoriteList />
                  </Route>
                  <Route path={'/'}>
                      {
                          currentQuote !== undefined && currentQuote !== null ? <Quote currentQuote={currentQuote}  /> : ''
                      }

                  </Route>
              </Switch>

          </Wrapper>



      </BrowserRouter>

  )
}

export default App
