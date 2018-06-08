import { h } from 'hyperapp';

interface Props {
  onNewPhoto: () => void;
  currentPicture: String | null;
}

const streamPicture = (element: HTMLVideoElement) => {
  navigator.mediaDevices
    .getUserMedia({
      video: {
        width: { exact: 384 },
        facingMode: 'front',
      },
      audio: false,
    })
    .then(stream => {
      element.srcObject = stream;
      element.play();
    });
};

const takePicture = (callback: (img?: string) => void) => (event: Event) => {
  console.log('taking picture');

  const canvas = document.getElementById(
    'camera-photo-canvas'
  ) as HTMLCanvasElement;
  const video = document.getElementById('camera-video') as HTMLVideoElement;

  const context = canvas.getContext('2d');
  if (!video || !canvas || !context) {
    throw new Error('Whoah, there is no stuff we need');
  }

  canvas.height = video.videoHeight;
  canvas.width = video.videoWidth;

  context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

  callback(canvas.toDataURL('image/png'));
};

export default ({ onNewPhoto, currentPicture }: Props) => (
  <div class="camera">
    <canvas id="camera-photo-canvas" />
    <div class="camera-viewfinder">
      {currentPicture ? (
        <img id="camera-photo" src={currentPicture} />
      ) : (
        <video id="camera-video" oncreate={streamPicture} />
      )}
    </div>
    <button type="button" onclick={takePicture(onNewPhoto)}>
      FOTO MACHEN
    </button>
  </div>
);
