import React from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';

const handleChange = (event, setVideo) => {
  event.preventDefault();
  const video = event.target.files[0];
  setVideo(video);
}

const handleSubmit = (event, video) => {
  event.preventDefault();
  fileUpload(video);
}

const fileUpload = async video => {
  try {
    const userUid = firebase.auth().currentUser.uid;
    const filePath = `videos/${userUid}/${video.name}`;
    const videoStorageRef = firebase.storage().ref(filePath);
    const fileSnapshot = await videoStorageRef.put(video);
    console.log(fileSnapshot);
  } catch (error) {
    console.log(error);
  }
}

const VideoUpload = () => {
  const [video, setVideo] = React.useState(null);

  return (
    <form onSubmit={e => handleSubmit(e, video)}>
      <h2>Video Upload</h2>
      <input type="file" accept="video/*" onChange={e => handleChange(e, setVideo)} />
      <button type="submit">Upload Video</button>
    </form>
  );
}

export default VideoUpload;
