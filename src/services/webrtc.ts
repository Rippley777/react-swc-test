import store from '../store/store';
import { setUserLocations, setConnected } from '../store/reducers/webrtc';

const ws = new WebSocket(
  `ws://99.97.209.132/webrtc?token=${localStorage.getItem('token')}`,
);

export const setupWebRTC = () => {
  console.log('Setting up WebRTC');
  ws.onopen = () => {
    console.log('Connected to WebSocket server');
    store.dispatch(setConnected(true));

    const peer = new RTCPeerConnection();

    const dataChannel = peer.createDataChannel('locations');

    dataChannel.onopen = () => {
      console.log('Data channel opened');
    };

    dataChannel.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === 'userLocations') {
        const userLocations = message.data;
        store.dispatch(setUserLocations(userLocations));
      }
    };

    peer.onicecandidate = (event) => {
      if (event.candidate) {
        ws.send(
          JSON.stringify({ type: 'candidate', candidate: event.candidate }),
        );
      }
    };

    peer
      .createOffer()
      .then((offer) => peer.setLocalDescription(offer))
      .then(() => {
        ws.send(
          JSON.stringify({ type: 'offer', offer: peer.localDescription }),
        );
      });

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === 'answer') {
        peer.setRemoteDescription(new RTCSessionDescription(message.answer));
      }
    };
  };

  ws.onclose = () => {
    console.log('Disconnected from WebSocket server');
    store.dispatch(setConnected(false));
  };
};
