import React, {useEffect} from 'react';
import { Switch, Route } from 'react-router-dom';
import Book from './Book';
import Savanna from '../games/safari/index';
import Main from './Main';
import HFTRoute from './HFTRoute';
import { withCookies, Cookies } from 'react-cookie';
import { connect } from 'react-redux';
import { RootState } from '../models/RootState';
import { Auth } from '../AppConstants';
import jwt from 'jwt-decode' 
import { useAppDispatch } from './App';
import { GetUserRequestModel, UserModel } from './../models/User/UserModal';
import { getUser, updateToken } from '../slice/user';

interface RootProps {
  cookies: Cookies,
};

const Root = ({cookies}:RootProps): JSX.Element => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    async function getUserHandler(model: GetUserRequestModel) {
      try{
        const getUserResult = await dispatch(getUser(model));
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
  }, []);

  return(
    <Switch>
      <HFTRoute path="/book" component={Book} />
      <Route path="/savanna" component={Savanna} />
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
