import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import './App.css';


const app = new Clarifai.App({
  apiKey: 'a214c3985b054d2bb50edb7a5b8e4eda'
 });


const particlesOptions = {
  particles: {
    number:{
      value: 100,
      dinsity: {
        enable: true,
        value_area: 800
      }
    }
  }
}


class App extends Component {
  constructor(){
    super();
    this.state = {
      input:'',
      imageURL:'',
      box: {},
      route:'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    //region_info.bounding_box;
    const allBoxFaces = clarifaiFace.map(box => {
      return { 
        leftCol: box.region_info.bounding_box.left_col * width,
        topRow: box.region_info.bounding_box.top_row * height,
        rightCol: width - (box.region_info.bounding_box.right_col * width),
        bottomRow: height - (box.region_info.bounding_box.bottom_row * height),
      }
    })

    return allBoxFaces;
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value }, () => {}); 
  }

  onSubmit = (event) => {
    this.setState({imageURL: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input,)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }
  
  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({isSignedIn: false});
    }else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route})
  }

  render(){
      const { isSignedIn, imageURL, route, box } = this.state;
      return (
        <div className="App">
          <Particles className='particles' 
            params={particlesOptions}
          />
          
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />

          { route === 'home' 
          ?<div>
            <Logo />
            <Rank />
            <ImageLinkForm 
            onInputChange={ this.onInputChange }
            onSubmit={ this.onSubmit }
            />
            <FaceRecognition box={box} imageURL={imageURL} />
          </div>
          :
          (
            route === 'signin'
            ?<Signin onRouteChange={this.onRouteChange} /> 
            :<Register onRouteChange={this.onRouteChange} /> 
          )
          
        }
        </div>
    );
  }
}

export default App;
