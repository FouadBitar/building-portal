import React from 'react';

export default ({ input, label, meta }) => {
    console.log("touched: " + meta.touched);
    console.log("error: " + meta.error);
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{ marginBottom: '5px' }}/>
            <div className="red-text" style={{ marginBottom: '10px' }}>
                {meta.touched && meta.error}
            </div>
        </div>
    );
};