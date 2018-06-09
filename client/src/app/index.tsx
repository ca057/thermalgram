import { h } from 'hyperapp';

import Camera from './components/Camera';

type CameraState = {
  currentPhoto: null | String;
};

type State = {
  camera: CameraState;
};
const state: State = {
  camera: {
    currentPhoto: null,
  },
};

type CameraActions = {
  newPhoto: (picture?: String) => (state: CameraState) => CameraState;
  clearPhoto: () => (state: CameraState) => CameraState;
  sendPhotoToServer: () => (state: CameraState, actions: CameraActions) => void;
};
type Actions = {
  camera: CameraActions;
};
const actions: Actions = {
  camera: {
    newPhoto: (currentPhoto?: String) => state => ({
      ...state,
      currentPhoto: currentPhoto || null,
    }),
    clearPhoto: () => (state: CameraState) => ({
      ...state,
      currentPhoto: null,
    }),
    sendPhotoToServer: () => (state: CameraState, actions: CameraActions) => {
      // send to server
      // then
      actions.clearPhoto();
    },
  },
};

const view = (state: State, actions: Actions) => (
  <main oncreate={console.log}>
    <div class="main-camera-container">
      <Camera
        {...state.camera}
        onNewPhoto={actions.camera.newPhoto}
        rejectPhoto={actions.camera.clearPhoto}
        acceptPhoto={actions.camera.sendPhotoToServer}
      />
    </div>
  </main>
);

export { state, actions, view };
