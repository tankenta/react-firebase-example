import React from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import _ from 'lodash'

const handleFileSelect = (event, setVideo) => {
  event.preventDefault();
  const video = event.target.files[0];
  setVideo(video);
}

const handleSubmit = (event, video) => {
  event.preventDefault();
  fileUpload(video);
}

const fileUpload = async (video, setVideo) => {
  try {
    const userUid = firebase.auth().currentUser.uid;
    const filePath = `videos/${userUid}/${video.name}`;
    const videoStorageRef = firebase.storage().ref(filePath);
    const idToken = await firebase.auth().currentUser.getIdToken(true);
    const metadataForStorage = {
      customMetadata: { idToken }
    };
    const fileSnapshot = await videoStorageRef.put(video, metadataForStorage);

    if (video.type === 'video/mp4') {
      const downloadURL = await videoStorageRef.getDownloadURL();
      const metadataForFirestore = {
        ..._.omitBy(fileSnapshot.metadata, _.isEmpty),
        downloadURL
      };
      saveVideoMetadata(metadataForFirestore);
    }

    console.log(fileSnapshot);
    if (fileSnapshot.state === 'success') {
      setVideo(null);
    } else {
      alert('File upload failed');
    }
  } catch (error) {
    console.log(error);
  }
}

const saveVideoMetadata = metadata => {
  const userUid = firebase.auth().currentUser.uid;
  const videoRef = firebase.firestore().doc(`users/${userUid}`).collection('videos').doc();
  await videoRef.set({ ...metadata, uid: videoRef.id, merge: true });
}

const VideoUpload = () => {
  const [video, setVideo] = React.useState(null);

  return (
    <form onSubmit={e => handleSubmit(e, video)}>
      <h2>Video Upload</h2>
      <input type="file" accept="video/*" onChange={e => handleFileSelect(e, setVideo)} />
      <button type="submit">Upload Video</button>
    </form>
  );
}

export default VideoUpload;
