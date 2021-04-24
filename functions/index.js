/*
* Triggered when the user uploads a video file, the video is transcoded to mp4.
*/
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'transcodeVideo') {
  exports.transcodeVideo = require('./transcodeVideo').transcodeVideo;
}

/*
* Triggered when creating a new user, the user account is saved in Firestore.
*/
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'saveUser') {
  exports.saveUser = require('./saveUser').saveUser;
}

/*
* Triggered when creating new video data, the video data is copied to Firestore.
*/
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'onUsersVideoCreate') {
  const copyVideoMetadata = require('./copyVideoMetadata');
  exports.onUsersVideoCreate = copyVideoMetadata.onUsersVideoCreate;
}

/*
* Triggered when updating the video data, the video data is copied to Firestore.
*/
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'onUsersVideoUpdate') {
  const copyVideoMetadata = require('./copyVideoMetadata');
  exports.onUsersVideoUpdate = copyVideoMetadata.onUsersVideoUpdate;
}
