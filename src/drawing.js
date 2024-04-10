import React, { useRef, useEffect, useState } from 'react';
import './App.css';

function DrawingApp() {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [ctx, setCtx] = useState(null);

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
    };

    const draw = (event) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = event.nativeEvent;
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
    };

    const endDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    };

    const changeColor = (color) => {
        ctx.strokeStyle = color;
    };

    const changeLineWidth = (width) => {
        ctx.lineWidth = width;
    };

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
