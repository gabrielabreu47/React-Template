import React, { useEffect, useState } from 'react';
import UserDetail from 'components/Cards/UserDetail';
import { connect } from 'react-redux';


const HomeModule = ({ user, match }) => {
  
  useEffect(() => {
  }, [])

  return (
    <UserDetail/>
  )
}


const mapStateToProps = (state) => {
  return {
      user: state.user
  }
}

export default connect(mapStateToProps)(HomeModule);