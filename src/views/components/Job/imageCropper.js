import React from 'react'
import ReactDOM from 'react-dom'
import Cropper from 'react-easy-crop'
import { defaultActions } from '../../../common/redux/actions/default.actions';
import { Slider } from '@material-ui/core'

class ImageCropper extends React.Component {
    state = {
        imageSrc:
            'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000',
        crop: { x: 0, y: 0 },
        zoom: 1,
        aspect: 1.64 / 1,
    }

    onCropChange = crop => {
        // console.log(crop)
        this.setState({ crop })
    }

    onCropComplete = (croppedArea, croppedAreaPixels) => {
        let ctx = this.state.ctx;
        let img = this.state.img
        let axis = croppedArea

        ctx.drawImage(img, axis.y, axis.x, axis.width, axis.height);
        const data = ctx.canvas.toBlob((blob) => {
            const file = new File([blob], this.state.name, {
                lastModified: Date.now()
            });
            // console.log(this.props.files)
            // console.log(file)

            
            let files = this.props.files
            files[0] = file;
            console.log(files[0], file)
            // files[0] = file
            // console.log(files)
            // this.setState({
            //     files,
            // })
        });;
    }

    onOk=()=>{
        let upload = this.props.upload
        let dispatch = this.props.dispatch
        let FileList = [];
        FileList.push(this.state.files)
        dispatch(defaultActions.upload(FileList, upload));

    }

    onZoomChange = zoom => {
        this.setState({ zoom })
    }

    componentWillMount() {
        let oFReader = new FileReader();
        const img = new Image();
        const elem = document.createElement('canvas');
        elem.width = 640;
        elem.height = 384;
        const ctx = elem.getContext('2d')
        let axis = this.state.croppedArea;

        oFReader.readAsDataURL(this.props.files[0]);
        // console.log(this.props.files)
        oFReader.onload = (oFREvent) => {
            img.src = oFREvent.target.result;
            let name = this.props.files[0].name
            this.setState({
                imageSrc: oFREvent.target.result,
                ctx,
                img,
                name
            })
        };
    }

    render() {
        return (
            <div className="App">
                <div className="crop-container">
                    <Cropper
                        image={this.state.imageSrc}
                        crop={this.state.crop}
                        zoom={this.state.zoom}
                        aspect={this.state.aspect}
                        onCropChange={this.onCropChange}
                        onCropComplete={this.onCropComplete}
                        onZoomChange={this.onZoomChange}
                    />
                </div>
                <div className="controls">
                    <Slider
                        value={this.state.zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        aria-labelledby="Zoom"
                        onChange={(e, zoom) => this.onZoomChange(zoom)}
                    />
                <button onClick={this.onOk} style={{position: "absolute"}}>
                    Upload
                </button>
                </div>
            </div>
        )
    }
}

export default ImageCropper;