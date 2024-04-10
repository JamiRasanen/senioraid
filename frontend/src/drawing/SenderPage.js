import React, { useRef, useEffect, useState } from 'react';

function SenderDrawingApp() {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [ctx, setCtx] = useState(null);
    const [drawnData, setDrawnData] = useState([]);
    const [currentColor, setCurrentColor] = useState('#000000');


    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.strokeStyle = currentColor; // initial color
        context.lineWidth = 2; // initial line width
        setCtx(context);
    }, [currentColor]);

    const startDrawing = (event) => {
        setIsDrawing(true);
        const { offsetX, offsetY } = event.nativeEvent;
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
        setDrawnData([...drawnData, { x: offsetX, y: offsetY, color: currentColor, thickness: ctx.lineWidth }]);
    };

    const draw = (event) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = event.nativeEvent;
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
        setDrawnData([...drawnData, { x: offsetX, y: offsetY, color: currentColor, thickness: ctx.lineWidth }]);
        //sendData();
    };

    const sendData = async () => {

        try {
            const response = await fetch('http://localhost:4000/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(drawnData)
            });

            if (response.ok) {
                console.log('Data sent successfully');
                // Handle success
            } else {
                console.error('Failed to send data');
                // Handle error
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    const endDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        setDrawnData([]);
    };

    const changeColor = (color) => {
        setCurrentColor(color);
    };

    const changeLineWidth = (width) => {
        ctx.lineWidth = width;
    };

    useEffect(() => {
        sendData();
    }, [drawnData])



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
        </div>
    );
}

export { SenderDrawingApp };
