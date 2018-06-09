import { h } from 'hyperapp';

interface Props {
  onNewPhoto: () => void;
  rejectPhoto: () => void;
  acceptPhoto: () => void;
  currentPhoto: String | null;
}

const streamPhoto = (element: HTMLVideoElement) => {
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

const takePhoto = (callback: (img?: string) => void) => (event: Event) => {
  const canvas = document.getElementById(
    'camera-photo-canvas'
  ) as HTMLCanvasElement;
  const video = document.getElementById('camera-video') as HTMLVideoElement;

  const context = canvas.getContext('2d');
  if (!video || !canvas || !context) {
    throw new Error('Whoah, there is no stuff we need');
  }

  const { videoHeight, videoWidth } = video;

  canvas.height = videoHeight;
  canvas.width = videoWidth;
  context.drawImage(video, 0, 0, videoWidth, videoHeight);

  callback(canvas.toDataURL('image/png'));
};

export default ({
  onNewPhoto,
  currentPhoto,
  rejectPhoto,
  acceptPhoto,
}: Props) => (
  <div class="camera">
    <canvas id="camera-photo-canvas" />
    <div class="camera-viewfinder">
      <video
        id="camera-video"
        oncreate={streamPhoto}
        style={{ display: currentPhoto ? 'none' : 'block' }}
      />
      {currentPhoto && <img id="camera-photo" src={currentPhoto} />}
    </div>
    {currentPhoto ? (
      <div>
        <button type="button" onclick={rejectPhoto}>
          NOCHMAL
        </button>
        <button type="button" onclick={acceptPhoto}>
          ABSCHICKEN
        </button>
      </div>
    ) : (
      <button type="button" onclick={takePhoto(onNewPhoto)}>
        FOTO MACHEN
      </button>
    )}
  </div>
);
