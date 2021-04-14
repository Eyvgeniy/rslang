import React, {useEffect} from 'react';
import { Switch, Route } from 'react-router-dom';
import Book from './Book';
import Savanna from '../games/safari/index';
import SprintGame from '../games/sprint/index';
import AudioChallenge from '../games/audioChallenge/AudioChallenge';
import CardGame from '../games/cards/index';
import Main from './Main';
import Statistics from './Statistics/Statistics';
import HFTRoute from './HFTRoute';
import { withCookies, Cookies } from 'react-cookie';
import { connect } from 'react-redux';
import { RootState } from '../models/RootState';
import { Auth } from '../AppConstants';
import jwt from 'jwt-decode' 
import { useAppDispatch } from './App';
import { GetUserRequestModel, UserModel } from './../models/User/UserModal';
import { getUser, updateToken } from '../slice/user';
import { useSelector } from 'react-redux';
import { fetchWords, getUserWords } from './../slice/words';

interface RootProps {
  cookies: Cookies,
};

const Root = ({cookies}:RootProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const {group, page} = useSelector((state: RootState) => state.words);
  useEffect(() => {
    async function getUserHandler(model: GetUserRequestModel) {
      try{
        await dispatch(getUser(model));
        await dispatch(getUserWords({userId: model.id, token: token}))
      }catch(error){
        console.log(error);
      }
    }
    const token = cookies.get(Auth.COOKIE_TOKEN);
    if(token){
      dispatch(updateToken(token));
      const {id} : {id: string} = jwt(token); 
      if(id){
        getUserHandler({id: id, token: token});
      }
    }
    dispatch(fetchWords({group, page}));
  }, []);

  return(
    <Switch>
      <HFTRoute path="/book" component={Book} />
      <Route path="/savanna" component={Savanna} />
      <Route path="/sprint" component={SprintGame} />
      <Route path="/cardGame" component={CardGame} />
      <Route path="/audioChallenge" component={AudioChallenge} />
      <HFTRoute path="/statistics" component={Statistics} />
      <HFTRoute path="/" component={Main} />
    </Switch>
  )
};

const mapStateToProps = (state: RootState, ownProps: { cookies: Cookies }) => {
  return {
    state: state,
    cookies: ownProps.cookies,
  };
};

export default withCookies(connect(mapStateToProps, null)(Root));
