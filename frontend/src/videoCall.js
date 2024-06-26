import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';

const VideoCall = () => {
    const [peerId, setPeerId] = useState('');
    const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
    const remoteVideoRef = useRef(null);
    const currentUserVideoRef = useRef(null);
    const peerInstance = useRef(null);
    const mediaStreamRef = useRef(null);
    const screenShareVideoRef = useRef(null);
    const screenShareStreamRef = useRef(null);

    // Function to generate a shorter ID
    const generateShortId = () => {
        // This is just a sample implementation. You can use any method to generate a shorter ID.
        const chars = '0123456789';
        let id = '';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

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

    // Function to end the call
    const endCall = () => {
        if (peerInstance.current) {
            peerInstance.current.destroy();
            peerInstance.current = null;
        }
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach(track => track.stop());
        }
        if (screenShareStreamRef.current) {
            screenShareStreamRef.current.getTracks().forEach(track => track.stop());
        }
        remoteVideoRef.current.srcObject = null;
        currentUserVideoRef.current.srcObject = null;
        screenShareVideoRef.current.srcObject = null;
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
            endCall();
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
                <button onClick={endCall}>End Call</button>
            </div>
            <div>
                <h2>Screen Share</h2>
                <video ref={screenShareVideoRef} style={{ width: '100%', height: 'auto' }} />
            </div>
        </div>
    );
};

export default VideoCall; 

/*
import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';

const VideoCall = () => {
    const [peerId, setPeerId] = useState('');
    const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
    const remoteVideoRef = useRef(null);
    const currentUserVideoRef = useRef(null);
    const peerInstance = useRef(null);
    const mediaStreamRef = useRef(null);
    const screenShareVideoRef = useRef(null);
    const screenShareStreamRef = useRef(null);
    const canvasRef = useRef(null);
    const drawingRef = useRef(false);
    const prevPositionRef = useRef(null);

    // Function to generate a shorter ID
    const generateShortId = () => {
        // This is just a sample implementation. You can use any method to generate a shorter ID.
        const chars = '0123456789';
        let id = '';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

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

    // Function to end the call
    const endCall = () => {
        if (peerInstance.current) {
            peerInstance.current.destroy();
            peerInstance.current = null;
        }
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach(track => track.stop());
        }
        if (screenShareStreamRef.current) {
            screenShareStreamRef.current.getTracks().forEach(track => track.stop());
        }
        remoteVideoRef.current.srcObject = null;
        currentUserVideoRef.current.srcObject = null;
        screenShareVideoRef.current.srcObject = null;
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
            endCall();
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.strokeStyle = '#000';
        context.lineWidth = 2;

        const handleMouseDown = (event) => {
            drawingRef.current = true;
            const { offsetX, offsetY } = event.nativeEvent;
            prevPositionRef.current = { offsetX, offsetY };
            context.beginPath();
            context.moveTo(offsetX, offsetY);
        };

        const handleMouseMove = (event) => {
            if (drawingRef.current) {
                const { offsetX, offsetY } = event.nativeEvent;
                context.lineTo(offsetX, offsetY);
                context.stroke();
                prevPositionRef.current = { offsetX, offsetY };
            }
        };

        const handleMouseUp = () => {
            drawingRef.current = false;
            prevPositionRef.current = null;
        };

        const handleMouseOut = () => {
            drawingRef.current = false;
            prevPositionRef.current = null;
        };

        canvas.addEventListener('mousedown',(event) => handleMouseDown(event));
        canvas.addEventListener('mousemove',(event) => handleMouseMove(event));
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mouseout', handleMouseOut);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('mouseout', handleMouseOut);
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
                <button onClick={endCall}>End Call</button>
            </div>
            <div>
                <h2>Screen Share</h2>
                <video ref={screenShareVideoRef} style={{ width: '100%', height: 'auto' }} />
            </div>
            <div>
                <h2>Draw on Screen Share</h2>
                <canvas
                    ref={canvasRef}
                    style={{ border: '1px solid #000' }}
                />
            </div>
        </div>
    );
};

export default VideoCall;
*/



