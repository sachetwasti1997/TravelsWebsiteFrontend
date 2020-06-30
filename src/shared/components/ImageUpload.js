import React, { Component } from "react";

class ImageUpload extends Component{
    state = { 
  
        // Initially, no file is selected 
        selectedFile: null,
        fileNotSelected: true
      }; 
       
      // On file select (from the pop up) 
      onFileChange = event => { 
       
        // Update the state 
        this.setState({ 
            selectedFile: event.target.files[0],
            fileNotSelected: false 
        }); 

       
      }; 
       
      // On file upload (click the upload button) 
      onFileUpload = () => { 
       
        // Create an object of formData 
        const formData = new FormData(); 
       
        // Update the formData object 
        formData.append( 
          "myFile", 
          this.state.selectedFile, 
          this.state.selectedFile.name 
        ); 
       
        // Details of the uploaded file 
        console.log(this.state.selectedFile); 
       
        // Request made to the backend api 
        // Send formData object 
        this.props.image(this.state.selectedFile);
      };

    render() { 
     
        return ( 
          <div>  
              <div> 
                  <input type="file" onChange={this.onFileChange} /> 
                  <button type="button" disabled={this.state.fileNotSelected} onClick={this.onFileUpload}> 
                    Upload! 
                  </button> 
              </div>  
          </div> 
        ); 
      } 
}

export default ImageUpload;
