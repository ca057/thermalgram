import { h } from 'hyperapp';

import Camera from './components/Camera';

type State = {
  camera: {
    viewfinderIsReady: boolean;
    cameraIsReady: boolean;
  };
};
const state: State = {
  camera: {
    viewfinderIsReady: false,
    cameraIsReady: false,
  },
};

interface Actions {
  newPicture: () => (state: State) => State;
}
const actions: Actions = {
  newPicture: () => state => {
    console.log('yeah, a new picture');
    return state;
  },
};

const view = (state: State, actions: Actions) => (
  <main oncreate={console.log}>
    <div class="main-camera-container">
      <Camera {...state.camera} onNewPhoto={actions.newPicture} />
    </div>
  </main>
);

export { state, actions, view };
