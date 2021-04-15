import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import firebase from 'firebase/app';
import 'firebase/auth';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  avatar: {
    margin: 10,
    backgroundColor: 'white',
  },
  link: {
    textDecoration: 'none',
    color: 'white',
  },
});

const googleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
}

const googleSignOut = () => {
  firebase.auth().signOut();
}

const LoginComponent = ({ classes }) => (
  <Button color="inherit" className={classes.button} onClick={googleLogin}>
    Login with Google
  </Button>
);

const LoginedComponent = ({ classes, userProfile }) => (
  <>
    <Button color="inherit" className={classes.button}>
      <Avatar alt="profile image" src={userProfile.picUrl} className={classes.avatar} />
      {userProfile.name}
    </Button>
    <Button color="inherit" className={classes.button} onClick={googleSignOut}>
      Sign Out
    </Button>
    <Button variant="contained" color="default">
      <Link to="/upload" className={classes.link}>Upload</Link>
      <CloudUploadIcon className={classes.rightIcon} />
    </Button>
  </>
);

const Header = ({ classes }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userProfile, setUserProfile] = useState({ name: '', picUrl: '' });

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setIsLogin(true);
        setUserProfile({ name: user.displayName, picUrl: user.photoURL });
      } else {
        setIsLogin(false);
        setUserProfile({ name: '', picUrl: '' });
      }
    });
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h5" color="inherit" className={classes.flex}>
            <Link to="/" className={classes.link}>Firebase Videos</Link>
          </Typography>
          {
            isLogin
            ? <LoginedComponent classes={classes} userProfile={userProfile} />
            : <LoginComponent classes={classes} />
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
