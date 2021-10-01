import React from 'react'

const Alert = ({ message, dismissible }) => {
    return (
        <div class={`alert alert-danger ${dismissible && "alert-dismissible fade show"}`} role="alert">
            {message}
        </div>
    )
}

export default Alert
