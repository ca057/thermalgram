import { h } from 'hyperapp';

import { upload } from './api';
import Camera from './components/Camera';

type CameraState = {
  currentPhoto: null | string;
  isUploading: boolean;
};
type State = {
  camera: CameraState;
};

const state: State = {
  camera: {
    currentPhoto: null,
    isUploading: false,
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
        await upload({ payload: state.currentPhoto });
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
