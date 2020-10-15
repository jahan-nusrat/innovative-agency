import React from 'react';
import { LoginComponent } from './Login.style';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { useDispatch } from 'react-redux';
import firebaseConfig from '../../firebase.config';
import { loggedInUser } from '../redux/action';
import logo from '../../images/logos/logo.png'

const Login = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const { from } = location.state || { from: { pathname: '/' } };
    var provider = new firebase.auth.GoogleAuthProvider();

    const googleLogin = () => {
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(function (result) {
                dispatch(loggedInUser(result.user));
                storeAuthToken();
            })
            .catch(function (error) {
                alert(error.message);
            });
    };

    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(true)
            .then(function (idToken) {
                sessionStorage.setItem('token', idToken);
                history.replace(from);
            }).catch(function (error) {
                alert(error.message)
            });
    }

    return (
        <LoginComponent>
            <div className="container text-center">
                <Link to="/">
                    <img className="img-fluid login-logo" src={logo} alt="logo" />
                </Link>
                <div className="row align-items-center">
                    <div className="col-lg-5 login">
                        <div className="login-content">
                            <h3>Login With</h3>
                            <button className="btn" onClick={googleLogin}>
                                <FaGoogle className="icon" />
								Continue with Google
							</button>
                        </div>
                    </div>
                </div>
            </div>
        </LoginComponent>
    );
};

export default Login;