import React from 'react';
import './styles/AlertBox.css'

export default function AlertBox() {
    const [handleClose, setHandleClose] = React.useState(false)

    return (
        <div className={`${handleClose ? "d-none" : "alert-box"}`}>
          <h5>Error!</h5>
          <p>Please enter a valid input or contact the administrator.</p>
          <button className="close-btn" onClick={()=>setHandleClose(true)}>x</button>
        </div>
    )
}
