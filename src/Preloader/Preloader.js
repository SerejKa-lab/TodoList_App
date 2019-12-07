import React from 'react';
import preloader from './preloader.svg';


const Preloader = ({ width='30px', height='15px' }) => {
    const imgStyle = {
        width: width, 
        height: height,
        'margin-left': '10px'
    };
      
    return(
        <img style={imgStyle} src={preloader} alt='preloader'/>
    )
}

export default Preloader;