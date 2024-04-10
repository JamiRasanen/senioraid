const CopyCanvas = (props) => {



    return (
        <canvas style={{ position: 'absolute', top: props.posY, left: props.posX, zIndex: 1 }}
            ref={(ref) => setDrawnCanvasRef(ref)}
            width={800}
            height={600}
        />
    )
}