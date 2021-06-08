import React, { useEffect } from 'react';
import '@fortawesome/fontawesome-free/js/all.js';
import './assets/scss/custom.scss';
import './App.css';
import Layout from 'layout';
import CallForLoginOrHandleRedirect from "config/azure-ad/settings";
import { connect } from 'react-redux';
import { SetUser } from "redux/actions/userActions";
import { SetLoggedIn } from "redux/actions/isLoggedInActions";
import { get } from './services';
import { tokenStorage, currentUserStorage } from 'localStorage';

const App = (props) => {

  useEffect(() => {
    (async function mounted() {
      await CallForLoginOrHandleRedirect(onLoggedIn);
    })();
  }, []);

  const onLoggedIn = async (tokenResponse) => {
    tokenStorage.set(tokenResponse.accessToken);
    const result = await get('User/Current');
    currentUserStorage.set(result.data);
    props.SetUser(result.data);
    props.SetLoggedIn(true);
  };

  return props.isLoggedIn && <Layout />;
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SetUser: (user) => dispatch(SetUser(user)),
    SetLoggedIn: (value) => dispatch(SetLoggedIn(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);