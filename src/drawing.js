import React, { useRef, useEffect, useState } from 'react';
import './App.css';

function DrawingApp() {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [ctx, setCtx] = useState(null);
    const [drawnData, setDrawnData] = useState([]);
    const [drawnCanvasRef, setDrawnCanvasRef] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.strokeStyle = '#000000'; // initial color
        context.lineWidth = 2; // initial line width
        setCtx(context);
    }, []);

    const startDrawing = (event) => {
        setIsDrawing(true);
        const { offsetX, offsetY } = event.nativeEvent;
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
        setDrawnData([...drawnData, { x: offsetX, y: offsetY, color: ctx.strokeStyle, thickness: ctx.lineWidth }]);
    };

    const draw = (event) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = event.nativeEvent;
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
        setDrawnData([...drawnData, { x: offsetX, y: offsetY, color: ctx.strokeStyle, thickness: ctx.lineWidth }]);
    };

    const endDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        setDrawnData([]);
    };

    const changeColor = (color) => {
        ctx.strokeStyle = color;
    };

    const changeLineWidth = (width) => {
        ctx.lineWidth = width;
    };

    useEffect(() => {
        if (drawnCanvasRef) {
            const drawnCanvasCtx = drawnCanvasRef.getContext('2d');
            if (drawnData.length > 0) {
                drawnData.forEach(({ x, y, color, thickness }, index) => {
                    if (index === 0) {
                        drawnCanvasCtx.beginPath();
                        drawnCanvasCtx.moveTo(x, y);
                    } else {
                        drawnCanvasCtx.lineTo(x, y);
                    }
                    drawnCanvasCtx.strokeStyle = color;
                    drawnCanvasCtx.lineWidth = thickness;
                    drawnCanvasCtx.stroke();
                });
            }
            else {
                console.log("clear kutsuttu");
                drawnCanvasCtx.clearRect(0, 0, drawnCanvasRef.width, drawnCanvasRef.height);
            }
            
        }
    }, [drawnData, drawnCanvasRef]);

    return (
        <div className="App">
            <div className="toolbar">
                <button onClick={clearCanvas}>Clear</button>
                <input type="color" onChange={(e) => changeColor(e.target.value)} />
                <input
                    type="range"
                    min="1"
                    max="10"
                    defaultValue="2"
                    onChange={(e) => changeLineWidth(e.target.value)}
                />
            </div>
            <canvas style={{ position: 'absolute', top: 100, left: 0, zIndex: 1 }}
                ref={canvasRef}
                width={800}
                height={600}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={endDrawing}
                onMouseLeave={endDrawing}
            />
            <canvas style={{ position: 'absolute', top: 100, left: 400, zIndex: 1 }}
                ref={(ref) => setDrawnCanvasRef(ref)}
                width={800}
                height={600}
            />
            <h1>awdioawd</h1>
            <h1>awdioawd</h1>
            <h1>awdioawd</h1>
            <h1>awdioawd</h1>
            <h1>awdioawd</h1>
            <h1>awdioawd</h1>
            <h1>awdioawd</h1>
            <h1>awdioawd</h1>
        </div>
    );
}

export default DrawingApp;
