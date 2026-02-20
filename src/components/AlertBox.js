import React from 'react';
import './styles/AlertBox.css'

export default function AlertBox({ message }) {
    const [handleClose, setHandleClose] = React.useState(false)

    return (
        <div className={`${handleClose ? "d-none" : "alert-box"}`} role="alert">
          <h5>Error!</h5>
          <p>{message || 'Please enter a valid input.'}</p>
          <button 
            className="close-btn" 
            onClick={()=>setHandleClose(true)}
            aria-label="Close alert"
          >×</button>
        </div>
    )
}
