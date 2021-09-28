import React from 'react'

const Input = ({ name, type, value, id, label, placeholder, required, inputChangeHandler }) => {
    return (
        <div class="mb-3">
            {label && <label for={id} className="form-label">{label}</label>}
            <input
                type={type}
                name={name}
                className="form-control"
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={inputChangeHandler}
                required={required}
            />
        </div>
    )
}

export default Input;
