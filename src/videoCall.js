
// import React, { useEffect, useRef, useState } from 'react';
// import Peer from 'peerjs';

// const VideoCall = () => {
//     const [peerId, setPeerId] = useState('');
//     const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
//     const remoteVideoRef = useRef(null);
//     const currentUserVideoRef = useRef(null);
//     const peerInstance = useRef(null);
//     const mediaStreamRef = useRef(null);

//     useEffect(() => {
//         const peer = new Peer();

//         peer.on('open', (id) => {
//             setPeerId(id);
//         });

//         peer.on('call', (call) => {
//             navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//                 .then(mediaStream => {
//                     mediaStreamRef.current = mediaStream;
//                     currentUserVideoRef.current.srcObject = mediaStream;
//                     currentUserVideoRef.current.play();
//                     call.answer(mediaStream);
//                     call.on('stream', (remoteStream) => {
//                         remoteVideoRef.current.srcObject = remoteStream;
//                         remoteVideoRef.current.play();
//                     });
//                 })
//                 .catch(error => {
//                     console.error('getUserMedia error:', error);
//                 });
//         });

//         peerInstance.current = peer;

//         return () => {
//             // Clean up resources when unmounting
//             if (mediaStreamRef.current) {
//                 mediaStreamRef.current.getTracks().forEach(track => track.stop());
//             }
//             peer.disconnect();
//             peer.destroy();
//         };
//     }, []);

//     const call = (remotePeerId) => {
//         if (!peerInstance.current) return;

//         navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//             .then(mediaStream => {
//                 mediaStreamRef.current = mediaStream;
//                 currentUserVideoRef.current.srcObject = mediaStream;
//                 currentUserVideoRef.current.play();
//                 const call = peerInstance.current.call(remotePeerId, mediaStream);
//                 call.on('stream', (remoteStream) => {
//                     remoteVideoRef.current.srcObject = remoteStream;
//                     remoteVideoRef.current.play();
//                 });
//             })
//             .catch(error => {
//                 console.error('getUserMedia error:', error);
//             });
//     };

//     return (
//         <div className="App">
//             <h1>Current user id is {peerId}</h1>
//             <input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} />
//             <button onClick={() => call(remotePeerIdValue)}>Call</button>
//             <div>
//                 <video ref={currentUserVideoRef} />
//             </div>
//             <div>
//                 <video ref={remoteVideoRef} />
//             </div>
//         </div>
//     );
// };

// export default VideoCall;

//////////////////////////

// import React, { useEffect, useRef, useState } from 'react';
// import Peer from 'peerjs';

// const VideoCall = () => {
//     const [peerId, setPeerId] = useState('');
//     const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
//     const remoteVideoRef = useRef(null);
//     const currentUserVideoRef = useRef(null);
//     const peerInstance = useRef(null);
//     const mediaStreamRef = useRef(null);

//     useEffect(() => {
//         const peer = new Peer(generateShortId()); // Use custom shorter ID

//         peer.on('open', (id) => {
//             setPeerId(id);
//         });

//         peer.on('call', (call) => {
//             navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//                 .then(mediaStream => {
//                     mediaStreamRef.current = mediaStream;
//                     currentUserVideoRef.current.srcObject = mediaStream;
//                     currentUserVideoRef.current.play();
//                     call.answer(mediaStream);
//                     call.on('stream', (remoteStream) => {
//                         remoteVideoRef.current.srcObject = remoteStream;
//                         remoteVideoRef.current.play();
//                     });
//                 })
//                 .catch(error => {
//                     console.error('getUserMedia error:', error);
//                 });
//         });

//         peerInstance.current = peer;

//         return () => {
//             // Clean up resources when unmounting
//             if (mediaStreamRef.current) {
//                 mediaStreamRef.current.getTracks().forEach(track => track.stop());
//             }
//             peer.disconnect();
//             peer.destroy();
//         };
//     }, []);

//     const call = (remotePeerId) => {
//         if (!peerInstance.current) return;
    
//         navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//             .then(mediaStream => {
//                 mediaStreamRef.current = mediaStream;
//                 currentUserVideoRef.current.srcObject = mediaStream;
//                 // Check if the video is already playing before calling play()
//                 if (currentUserVideoRef.current.paused) {
//                     currentUserVideoRef.current.play();
//                 }
//                 const call = peerInstance.current.call(remotePeerId, mediaStream);
//                 call.on('stream', (remoteStream) => {
//                     remoteVideoRef.current.srcObject = remoteStream;
//                     remoteVideoRef.current.play();
//                 });
//             })
//             .catch(error => {
//                 console.error('getUserMedia error:', error);
//             });
//     };
    

//     // Function to generate a shorter ID
//     const generateShortId = () => {
//         // This is just a sample implementation. You can use any method to generate a shorter ID.
//         const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//         let id = '';
//         for (let i = 0; i < 10; i++) {
//             id += chars.charAt(Math.floor(Math.random() * chars.length));
//         }
//         return id;
//     };

//     return (
//         <div className="App">
//             <h1>Current user id is {peerId}</h1>
//             <input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} />
//             <button onClick={() => call(remotePeerIdValue)}>Call</button>
//             <div>
//                 <video ref={currentUserVideoRef} />
//             </div>
//             <div>
//                 <video ref={remoteVideoRef} />
//             </div>
//         </div>
//     );
// };

// export default VideoCall;


// import React, { useEffect, useRef, useState } from 'react';
// import Peer from 'peerjs';

// const VideoCall = () => {
//     const [peerId, setPeerId] = useState('');
//     const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
//     const remoteVideoRef = useRef(null);
//     const currentUserVideoRef = useRef(null);
//     const peerInstance = useRef(null);
//     const mediaStreamRef = useRef(null);

//     // Function to generate a shorter ID
//     const generateShortId = () => {
//         // This is just a sample implementation. You can use any method to generate a shorter ID.
//         const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//         let id = '';
//         for (let i = 0; i < 10; i++) {
//             id += chars.charAt(Math.floor(Math.random() * chars.length));
//         }
//         return id;
//     };

//     // Function to initiate screen sharing
//     const startScreenSharing = async () => {
//         try {
//             const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//             currentUserVideoRef.current.srcObject = screenStream;
//             currentUserVideoRef.current.play();
//             if (peerInstance.current) {
//                 const call = peerInstance.current.call(remotePeerIdValue, screenStream);
//                 call.on('stream', (remoteStream) => {
//                     remoteVideoRef.current.srcObject = remoteStream;
//                     remoteVideoRef.current.play();
//                 });
//             }
//         } catch (error) {
//             console.error('Error starting screen sharing:', error);
//         }
//     };

//     // Function to initiate video call
//     const call = (remotePeerId) => {
//         if (!peerInstance.current) return;

//         navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//             .then(mediaStream => {
//                 mediaStreamRef.current = mediaStream;
//                 currentUserVideoRef.current.srcObject = mediaStream;
//                 currentUserVideoRef.current.play();
//                 const call = peerInstance.current.call(remotePeerId, mediaStream);
//                 call.on('stream', (remoteStream) => {
//                     remoteVideoRef.current.srcObject = remoteStream;
//                     remoteVideoRef.current.play();
//                 });
//             })
//             .catch(error => {
//                 console.error('getUserMedia error:', error);
//             });
//     };

//     useEffect(() => {
//         const peer = new Peer(generateShortId()); // Use custom shorter ID

//         peer.on('open', (id) => {
//             setPeerId(id);
//         });

//         peer.on('call', (call) => {
//             navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//                 .then(mediaStream => {
//                     mediaStreamRef.current = mediaStream;
//                     currentUserVideoRef.current.srcObject = mediaStream;
//                     currentUserVideoRef.current.play();
//                     call.answer(mediaStream);
//                     call.on('stream', (remoteStream) => {
//                         remoteVideoRef.current.srcObject = remoteStream;
//                         remoteVideoRef.current.play();
//                     });
//                 })
//                 .catch(error => {
//                     console.error('getUserMedia error:', error);
//                 });
//         });

//         peerInstance.current = peer;

//         return () => {
//             // Clean up resources when unmounting
//             if (mediaStreamRef.current) {
//                 mediaStreamRef.current.getTracks().forEach(track => track.stop());
//             }
//             peer.disconnect();
//             peer.destroy();
//         };
//     }, []);

//     return (
//         <div className="App">
//             <h1>Current user id is {peerId}</h1>
//             <input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} />
//             <button onClick={() => call(remotePeerIdValue)}>Call</button>
//             <button onClick={startScreenSharing}>Start Screen Share</button>
//             <div>
//                 <video ref={currentUserVideoRef} />
//             </div>
//             <div>
//                 <video ref={remoteVideoRef} />
//             </div>
//         </div>
//     );
// };

// export default VideoCall;

import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';

const VideoCall = () => {
    const [peerId, setPeerId] = useState('12345');
    const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
    const remoteVideoRef = useRef(null);
    const currentUserVideoRef = useRef(null);
    const peerInstance = useRef(null);
    const mediaStreamRef = useRef(null);
    const screenShareVideoRef = useRef(null);
    const screenShareStreamRef = useRef(null);

    // Function to generate a shorter ID
    // const generateShortId = () => {
    //     // This is just a sample implementation. You can use any method to generate a shorter ID.
    //     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     let id = '';
    //     for (let i = 0; i < 10; i++) {
    //         id += chars.charAt(Math.floor(Math.random() * chars.length));
    //     }
    //     return id;
    // };

    // Function to initiate screen sharing
    const startScreenSharing = async () => {
        try {
            const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            screenShareStreamRef.current = screenStream;
            screenShareVideoRef.current.srcObject = screenStream;
            screenShareVideoRef.current.play();
            if (peerInstance.current) {
                const call = peerInstance.current.call(remotePeerIdValue, screenStream);
                call.on('stream', (remoteStream) => {
                    remoteVideoRef.current.srcObject = remoteStream;
                    remoteVideoRef.current.play();
                });
            }
        } catch (error) {
            console.error('Error starting screen sharing:', error);
        }
    };

    // Function to initiate video call
    const callPeer = () => {
        if (!peerInstance.current) return;

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(mediaStream => {
                mediaStreamRef.current = mediaStream;
                currentUserVideoRef.current.srcObject = mediaStream;
                currentUserVideoRef.current.play();
                const call = peerInstance.current.call(remotePeerIdValue, mediaStream);
                call.on('stream', (remoteStream) => {
                    remoteVideoRef.current.srcObject = remoteStream;
                    remoteVideoRef.current.play();
                });
            })
            .catch(error => {
                console.error('getUserMedia error:', error);
            });
    };

    useEffect(() => {
        const peer = new Peer(generateShortId()); // Use custom shorter ID

        peer.on('open', (id) => {
            setPeerId(id);
        });

        peer.on('call', (call) => {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then(mediaStream => {
                    mediaStreamRef.current = mediaStream;
                    currentUserVideoRef.current.srcObject = mediaStream;
                    currentUserVideoRef.current.play();
                    call.answer(mediaStream);
                    call.on('stream', (remoteStream) => {
                        remoteVideoRef.current.srcObject = remoteStream;
                        remoteVideoRef.current.play();
                    });
                })
                .catch(error => {
                    console.error('getUserMedia error:', error);
                });
        });

        peerInstance.current = peer;

        return () => {
            // Clean up resources when unmounting
            if (mediaStreamRef.current) {
                mediaStreamRef.current.getTracks().forEach(track => track.stop());
            }
            peer.disconnect();
            peer.destroy();
        };
    }, []);

    return (
        <div className="App">
            <h1>Current user id is {peerId}</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <h2>User Webcam</h2>
                    <video ref={currentUserVideoRef} style={{ width: '50%', height: 'auto' }} />
                </div>
                <div>
                    <h2>Peer Webcam</h2>
                    <video ref={remoteVideoRef} style={{ width: '50%', height: 'auto' }} />
                </div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <button onClick={startScreenSharing}>Start Screen Share</button>
                <input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} />
                <button onClick={callPeer}>Call</button>
            </div>
            <div>
                <h2>Screen Share</h2>
                <video ref={screenShareVideoRef} style={{ width: '100%', height: 'auto' }} />
            </div>
        </div>
    );
};

export default VideoCall;


