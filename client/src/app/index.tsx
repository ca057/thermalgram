import { h } from 'hyperapp';

import { upload } from './api';
import Camera from './components/Camera';

type CameraState = {
  currentPhoto: null | string;
  isUploading: boolean;
};
type ConfigState = {
  serverUrl: null | string;
  name: null | string;
};
type State = {
  camera: CameraState;
  config: ConfigState;
};

const state: State = {
  camera: {
    currentPhoto: null,
    isUploading: false,
  },
  config: {
    serverUrl: null,
    name: null,
  },
};

type CameraActions = {
  newPhoto: (picture?: string) => (state: CameraState) => CameraState;
  clearPhoto: () => (state: CameraState) => CameraState;
  sendPhotoToServer: () => (state: CameraState, actions: CameraActions) => void;
  startUpload: () => (state: CameraState) => CameraState;
  finishUpload: () => (state: CameraState) => CameraState;
};
type Actions = {
  camera: CameraActions;
};
const actions = {
  camera: {
    newPhoto: (currentPhoto?: string) => (state: CameraState) => ({
      ...state,
      currentPhoto: currentPhoto || null,
    }),
    clearPhoto: () => (state: CameraState) => ({
      ...state,
      currentPhoto: null,
    }),
    sendPhotoToServer: () => async (
      state: CameraState,
      actions: CameraActions
    ) => {
      if (state.currentPhoto !== null) {
        actions.startUpload();
        try {
          await upload({ payload: state.currentPhoto });
        } catch (error) {}
        actions.finishUpload();
      }

      actions.clearPhoto();
    },
    startUpload: () => (state: CameraState) => ({
      ...state,
      isUploading: true,
    }),
    finishUpload: () => (state: CameraState) => ({
      ...state,
      isUploading: false,
    }),
  },
};

const onCreate = (state: State, actions: Actions) => () => {
  console.log(state);
  let config = null;
  try {
    config = JSON.parse(
      window.localStorage.getItem('thermalgram_config') || ''
    );
  } catch (error) {}
  if (config === null) {
    console.log('no stored config found');
  }
};

const view = (state: State, actions: Actions) => (
  <main oncreate={onCreate(state, actions)}>
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
