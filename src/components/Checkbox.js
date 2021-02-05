import React from 'react'

function Checkbox(props) {

    const {name,label,checked,onChange,required}=props;

    return (
        <>
            <input
                type="checkbox"
                name={name}
                checked={checked}                
                onChange={onChange}
                required={required}
            />  

            <small style={{paddingLeft:'5px'}}>{label}</small>
        </>
    )
}

export default Checkbox
