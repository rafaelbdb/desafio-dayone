import React from 'react';

function Campo({ id, label, type, value, onChange, required }) {
    return (
        <div className='row align-items-center mb-3'>
            <label htmlFor={id} className='col-form-label col-sm-2'>{label}</label>
            <div className='col-sm-10'>
                <input
                    type={type}
                    id={id}
                    name={id}
                    className='form-control'
                    value={value}
                    onChange={onChange}
                    required={required}
                />
            </div>
        </div>
    );
}

export default Campo;
