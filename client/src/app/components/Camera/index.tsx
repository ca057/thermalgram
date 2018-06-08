import { h } from 'hyperapp';

interface Props {
  onNewPhoto: () => void;
  viewfinderIsReady: boolean;
  cameraIsReady: boolean;
}

const takePicture = (callback: () => void) => (event: Event) => {
  console.log('taking picture');

  callback();
};

export default ({ onNewPhoto, viewfinderIsReady, cameraIsReady }: Props) => (
  <div class="camera">
    <canvas class="camera-photo-canvas" />
    <div class="camera-viewfinder">
      <video id="camera-video" />
      <img id="camera-photo" alt="" />
    </div>
    <button type="button" onclick={takePicture(onNewPhoto)}>
      FOTO MACHEN
    </button>
  </div>
);
