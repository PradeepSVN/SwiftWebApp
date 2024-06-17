import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

const LoaderComponent = (props) => {
    return (
        <div>
             <CircularProgress
                style={{ margin: `${props.margin}`, marginRight: `${props.marginRight}`, marginLeft: `${props.marginLeft}`, marginTop: `${props.marginTop}`, color: `${props.color}` }}
                size={props.size}
                className={props.className}
            /> 
        </div>
    )
}

export default LoaderComponent
