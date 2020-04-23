// import Cropper from 'react-easy-crop'

// export default class ImageCropper extends React.Component {
//   state = {
//     image: 'your-image-url or as base64',
//     crop: { x: 0, y: 0 },
//     zoom: 1,
//     aspect: 1.67 / 1,
//   }

//   onCropChange = crop => {
//     this.setState({ crop })
//   }

//   onCropComplete = (croppedArea, croppedAreaPixels) => {
//     console.log(croppedArea, croppedAreaPixels)
//   }

//   onZoomChange = zoom => {
//     this.setState({ zoom })
//   }

//   render() {
//     return (
//       <Cropper
//         image={this.props.image}
//         crop={this.state.crop}
//         zoom={this.state.zoom}
//         aspect={this.state.aspect}
//         onCropChange={this.onCropChange}
//         onCropComplete={this.onCropComplete}
//         onZoomChange={this.onZoomChange}
//       />
//     )
//   }
// }