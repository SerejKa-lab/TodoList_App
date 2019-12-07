import React from 'react';
import preloader from './preloader.svg';


const Preloader = ({ width='30px', height='15px', marginTop='0px' }) => {
    const imgStyle = {
        width, 
        height,
        marginLeft: '10px',
        marginTop
    };
      
    return(
        <img style={imgStyle} src={preloader} alt='preloader'/>
    )
}

export default Preloader;