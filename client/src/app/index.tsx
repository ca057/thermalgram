import { h } from 'hyperapp';

import Camera from './components/Camera';

type State = {
  camera: {
    currentPicture: null | String;
  };
};
const state: State = {
  camera: {
    currentPicture: null,
  },
};

interface Actions {
  camera: {
    newPicture: (picture?: String) => (state: State) => State;
  };
}
const actions: Actions = {
  camera: {
    newPicture: (currentPicture?: String) => state => {
      console.log('yeah, a new picture');
      return {
        ...state,
        currentPicture,
      };
    },
  },
};

const view = (state: State, actions: Actions) => (
  <main oncreate={console.log}>
    <div class="main-camera-container">
      <Camera {...state.camera} onNewPhoto={actions.camera.newPicture} />
    </div>
  </main>
);

export { state, actions, view };
