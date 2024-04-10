import React, { useRef, useEffect, useState } from 'react';

function ReceiverDrawingApp() {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [ctx, setCtx] = useState(null);
    const [drawnData, setDrawnData] = useState([]);
    const [drawnCanvasRef, setDrawnCanvasRef] = useState(null);
    const [currentColor, setCurrentColor] = useState('#000000');

    const [fetchedData, setFetchedData] = useState([]);

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


    const fetchData = async () => {

        try {
            const response = await fetch('http://localhost:4000/data', {
                method: 'GET',
            });

            if (response.ok) {
                console.log('Data fetched successfully');
                // Handle success
                const data = await response.json();

                setFetchedData(data);
                //console.log(data);

            } else {
                console.error('Failed to fetch data');
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



    // useEffect(() => {
    //     if (drawnCanvasRef) {
    //         const drawnCanvasCtx = drawnCanvasRef.getContext('2d');
    //         if (drawnData.length > 0) {
    //             drawnData.forEach(({ x, y, color, thickness }, index) => {
    //                 if (index === 0) {
    //                     drawnCanvasCtx.beginPath();
    //                     drawnCanvasCtx.moveTo(x, y);
    //                 } else {
    //                     drawnCanvasCtx.lineTo(x, y);
    //                 }
    //                 drawnCanvasCtx.strokeStyle = color;
    //                 drawnCanvasCtx.lineWidth = thickness;
    //                 drawnCanvasCtx.stroke();
    //             });
    //         } else {
    //             drawnCanvasCtx.clearRect(0, 0, drawnCanvasRef.width, drawnCanvasRef.height);
    //         }
    //     }
    // }, [drawnData, drawnCanvasRef]);

    useEffect(() => {
        if (drawnCanvasRef) {
            const drawnCanvasCtx = drawnCanvasRef.getContext('2d');
            if (fetchedData.length > 0) {
                fetchedData.forEach(({ x, y, color, thickness }, index) => {
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
            } else {
                drawnCanvasCtx.clearRect(0, 0, drawnCanvasRef.width, drawnCanvasRef.height);
            }
        }
    }, [fetchedData, drawnCanvasRef]);

    useEffect(() => {
        // Set up interval to fetch data every 5 seconds
        const intervalId = setInterval(fetchData, 500);

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, [])


    return (
        <div className="App">
            
            <canvas style={{ position: 'absolute', top: 100, left: 0, zIndex: 1 }}
                ref={canvasRef}
                width={1}
                height={1}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={endDrawing}
                onMouseLeave={endDrawing}
            />
            <canvas style={{ position: 'absolute', top: 100, left: 0, zIndex: 1 }}
                ref={(ref) => setDrawnCanvasRef(ref)}
                width={800}
                height={600}
            />
        </div>
    );
}

export { ReceiverDrawingApp };
