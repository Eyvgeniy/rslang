import * as React from "react";
import { Cookies, withCookies } from "react-cookie";
import { connect, useDispatch, useSelector } from "react-redux";
import { logOut } from "../../slice/user";
import { UserModel } from './../../models/User/UserModal';
import { Button } from "react-bootstrap";
import routes from '../../routes';import { Auth } from "../../AppConstants";
import { RootState } from "models/RootState";
import './UserInfo.css';

interface UserInfoProps {
    cookies: Cookies;
    user: UserModel
}


const UserInfo = ({cookies, user}: UserInfoProps): JSX.Element => {
    const dispatch = useDispatch();

    const handleOnLogOut = async () => {
        cookies.remove(Auth.COOKIE_TOKEN);
        await dispatch(logOut(null));
    };
    const userPhoto = user.photoFileName ? routes.getUserPhotoUrl(user.photoFileName)  : '../../../public/assets/user.jpg';
    return (
        <>
            <img
                src={userPhoto}
                alt="user-info"
                className="img-picture"
            />
            <span className="name">{user.name}</span>
            <Button variant="outline-secondary" className="btn-logout" onClick={handleOnLogOut}>Выход</Button>
        </>
    )
}

const mapStateToProps = (state: RootState , ownProps: {cookies: Cookies}) => {
    return ({
      state: state,
      cookies: ownProps.cookies
    });
}

export default withCookies(connect(mapStateToProps, null)(UserInfo));
