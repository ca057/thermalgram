import { h } from 'hyperapp';

import { upload } from './api';
import Camera from './components/Camera';
import Loading from './components/Loading';
import Config from './components/Config';
import { getStoredConfig, setStoredConfig } from './util/config';

enum Screens {
  LOADING,
  CONFIG,
  CAMERA,
}

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
  currentScreen: Screens;
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
  currentScreen: Screens.LOADING,
};

type CameraActions = {
  newPhoto: (picture?: string) => (state: CameraState) => CameraState;
  clearPhoto: () => (state: CameraState) => CameraState;
  sendPhotoToServer: () => (state: CameraState, actions: CameraActions) => void;
  startUpload: () => (state: CameraState) => CameraState;
  finishUpload: () => (state: CameraState) => CameraState;
};
type ConfigActions = {
  setConfig: (config: ConfigState) => (state: ConfigState) => ConfigState;
};
type Actions = {
  camera: CameraActions;
  config: ConfigActions;
  setScreen: (nextScreen: Screens) => (state: State) => State;
};
const actions = {
  setScreen: (nextScreen: Screens) => (state: State) => ({
    ...state,
    currentScreen: nextScreen,
  }),
  config: {
    setConfig: (config: ConfigState) => (state: ConfigState) => {
      setStoredConfig(config);
      return config;
    },
  },
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

const onAppCreate = (state: State, actions: Actions) => () => {
  const config = getStoredConfig();
  console.log({ config });
  if (config.serverUrl === null) {
    actions.setScreen(Screens.CONFIG);
  } else {
    actions.config.setConfig(config);
    actions.setScreen(Screens.CAMERA);
  }
};

const getScreen = (state: State, actions: Actions) => {
  switch (state.currentScreen) {
    case Screens.CAMERA:
      return (
        <Camera
          {...state.camera}
          onNewPhoto={actions.camera.newPhoto}
          rejectPhoto={actions.camera.clearPhoto}
          acceptPhoto={actions.camera.sendPhotoToServer}
        />
      );
    case Screens.CONFIG:
      return (
        <Config
          setConfig={config => {
            actions.config.setConfig(config);
            actions.setScreen(Screens.CAMERA);
          }}
        />
      );
    case Screens.LOADING:
    default:
      return <Loading />;
  }
};

const view = (state: State, actions: Actions) => (
  <main oncreate={onAppCreate(state, actions)}>
    {getScreen(state, actions)}
  </main>
);

export { state, actions, view };
