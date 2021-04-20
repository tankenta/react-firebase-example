import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import firebase from 'firebase/app';
import 'firebase/firestore';
import VideoPlayer from './VideoPlayer';

const styles = theme => ({
  root: {
    padding: "50px",
  },
});

const VideoPlayers = ({ videos }) => (
  <>
    {videos.map(video => (
      <Grid key={video.name} item xs={6}>
        <VideoPlayer key={video.name} video={video} />
      </Grid>
    ))}
  </>
);

const VideoFeed = ({ classes }) => {
  const [videos, setVideos] = React.useState([]);

  const asyncComponentDidMount = async () => {
    const userUid = firebase.auth().currentUser.uid;
    const collection = await firebase.firestore().doc(`users/${userUid}`).collection('videos').limit(50);
    const querySnapshot = await collection.get();
    const videosMetadata = querySnapshot.docs.map(doc => doc.data());
    setVideos(videosMetadata);
  }
  React.useEffect(() => {
    asyncComponentDidMount()
  }, []);

  return (
    <Grid container className={classes.root} 
      spacing={10} direction="row" justify="flex-start" alignItems="center"
    >
      <VideoPlayers videos={videos} />
    </Grid>
  );
}

VideoFeed.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VideoFeed);
