import React from 'react';
import preloader from './preloader.svg';


const Preloader = ({ width='30px', height='10px' }) => {
    const imgStyle = {width: width, height: height};
      
    return(
        <img style={imgStyle} src={preloader} alt='preloader'/>
    )
}

export default Preloader;