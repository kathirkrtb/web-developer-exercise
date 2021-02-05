import React from 'react'

function Input(props) {

    const {name,type,label,className,value,onChange,placeHolder,required}=props;

    return (
        <>
            <label htmlFor={name}>{label}</label>

            <input name={name}
                className={className}
                value={value}
                type={type}
                placeholder={placeHolder}
                onChange={onChange}
                required={required}
                
             />  
        </>
    )
}

export default Input;
