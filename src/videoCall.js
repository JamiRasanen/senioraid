
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
import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';

const VideoCall = () => {
    const [peerId, setPeerId] = useState('');
    const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
    const remoteVideoRef = useRef(null);
    const currentUserVideoRef = useRef(null);
    const peerInstance = useRef(null);
    const mediaStreamRef = useRef(null);

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

    const call = (remotePeerId) => {
        if (!peerInstance.current) return;

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(mediaStream => {
                mediaStreamRef.current = mediaStream;
                currentUserVideoRef.current.srcObject = mediaStream;
                currentUserVideoRef.current.play();
                const call = peerInstance.current.call(remotePeerId, mediaStream);
                call.on('stream', (remoteStream) => {
                    remoteVideoRef.current.srcObject = remoteStream;
                    remoteVideoRef.current.play();
                });
            })
            .catch(error => {
                console.error('getUserMedia error:', error);
            });
    };

    // Function to generate a shorter ID
    const generateShortId = () => {
        // This is just a sample implementation. You can use any method to generate a shorter ID.
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let id = '';
        for (let i = 0; i < 10; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    return (
        <div className="App">
            <h1>Current user id is {peerId}</h1>
            <input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} />
            <button onClick={() => call(remotePeerIdValue)}>Call</button>
            <div>
                <video ref={currentUserVideoRef} />
            </div>
            <div>
                <video ref={remoteVideoRef} />
            </div>
        </div>
    );
};

export default VideoCall;
