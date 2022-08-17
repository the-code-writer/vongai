function URLImage(props) {

    const [image, setImage] = useState(null);
    useEffect(() => {
        loadImage();
    }, [props.src]);

    function loadImage() {
        const image = new window.Image();
        image.src = props.src;
        image.onload = () => {
            setImage(image);
        };
    }
    return (
        <image image="{image}" x="{props.x}" y="{props.y}"></image>
    );

}

