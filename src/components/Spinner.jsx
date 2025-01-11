import React from 'react'
import {PulseLoader} from 'react-spinners'  

export default function Spinner() {
    
    const override = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        background: 'rgba(0, 0, 0, 0.6)',
        pointerEvents: 'none',
        height: '100%',
        width: '100%',
        zIndex: '200',
    };

  return (
    <PulseLoader
        color={'rgba(255,255,255,0.6)'}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
    />
  )
}
