import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import jwt from 'jwt-decode';
import { withCookies, Cookies } from 'react-cookie';
import { connect, useSelector } from 'react-redux';
import Book from './Book';
import BookAuth from './BookAuth';
import Savanna from '../games/safari/index';
import SprintGame from '../games/sprint/index';
import AudioChallenge from '../games/audioChallenge/AudioChallenge';
import CardGame from '../games/cards/index';
import Main from './Main';
import Dictionary from './Dictionary';
import Statistics from './Statistics/Statistics';
import HFTRoute from './HFTRoute';
import { RootState } from '../models/RootState';
import { Auth } from '../AppConstants';
import { useAppDispatch } from './App';
import { GetUserRequestModel } from '../models/User/UserModal';
import { getUser, updateToken } from '../slice/user';
import { fetchWords } from './../slice/words';

interface RootProps {
  cookies: Cookies;
}

const Root = ({ cookies }: RootProps): JSX.Element => {
  const user = useSelector((state: any) => state.user.currentUser);
  const dispatch = useAppDispatch();
  const { group, page } = useSelector((state: RootState) => state.words);
  useEffect(() => {
    async function getUserHandler(model: GetUserRequestModel) {
      try {
        await dispatch(getUser(model));
      } catch (error) {
        console.log(error);
      }
    }

    const token = cookies.get(Auth.COOKIE_TOKEN);
    if (token) {
      dispatch(updateToken(token));
      const { id }: { id: string } = jwt(token);
      if (id) {
        getUserHandler({ id, token });
      }
    }
    dispatch(fetchWords({ group, page }));
  }, []);

  return (
    <>
      {user ? (
        <Switch>
          <HFTRoute path='/book' component={BookAuth} />
          <Route path='/savanna' component={Savanna} />
          <Route path='/sprint' component={SprintGame} />
          <Route path='/cardGame' component={CardGame} />
          <Route path='/audioChallenge' component={AudioChallenge} />
          <HFTRoute path='/statistics' component={Statistics} />
          <HFTRoute path='/dictionary' component={Dictionary} />
          <HFTRoute path='/' component={Main} />
        </Switch>
      ) : (
        <Switch>
          <HFTRoute path='/book' component={Book} />
          <Route path='/savanna' component={Savanna} />
          <Route path='/sprint' component={SprintGame} />
          <Route path='/cardGame' component={CardGame} />
          <Route path='/audioChallenge' component={AudioChallenge} />
          <HFTRoute path='/' component={Main} />
        </Switch>
      )}
    </>
  );
};

const mapStateToProps = (state: RootState, ownProps: { cookies: Cookies }) => ({
  state,
  cookies: ownProps.cookies,
});
export default withCookies(connect(mapStateToProps, null)(Root));
