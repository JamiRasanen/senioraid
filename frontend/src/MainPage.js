import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DrawingApp } from './drawing/drawing';
import { ReceiverDrawingApp } from "./drawing/ReceiverPage";
import { SenderDrawingApp } from './drawing/SenderPage';
import VideoCall from './videoCall';

function App() {
    return (
        <Router>
            <div>
                <div>
                    <button onClick={() => window.location.href = '/send'}>Auttaja</button>
                    <button onClick={() => window.location.href = '/receive'}>Asiakas</button>
                    <button onClick={() => window.location.href = '/call'}>Puhelu</button>
                </div>

                <Routes>
                    <Route path="/send" element={<SenderDrawingApp/>}>
                    </Route>
                    <Route path="/receive" element={<ReceiverDrawingApp/>}>
                    </Route>
                    <Route path="/call" element={<VideoCall/>}>
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;