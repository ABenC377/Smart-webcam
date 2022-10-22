const video = document.getElementById('webcam');
const liveView = document.getElementById('liveView');
const demosSection = document.getElementById('demos');
const enableWebcamButton = document.getElementById('camEnableButton');

const status = document.getElementById('status');
if (status) {
    status.innerText = 'Loaded TensorFlow.js - version: ' + tf.version.tfjs;
}

function getUserMediaSupported() {
    return !!(navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia);
}

if (getUserMediaSupported()) {
    enableWebcamButton.addEventListener('click', enableCam);
} else {
    console.warn('getUserMedia() is not supported by your browser');
}

function enableCam(event) {
    if (!model) {
        return;
    }

    event.target.classList.add('removed');

    const constraints = {
        video: true
    };

    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        video.srcObject = stream;
        video.addEventListener('loadeddata', predictWebcam);
    });
}

let model = undefined;

cocoSsd.load().then(function (loadedModel) {
    model = loadedModel;

    demosSection.classList.remove('invisible');
});