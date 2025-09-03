import React, {useState} from 'react';

const  ColorsRenderer = (props:any)=> {
    const[color, setColor] = useState(props.value);

    const onColorChange = (event:any) => {
        props.onColorChange(event.target.value);
        setColor(event.target.value);
    }
    return(
        <div>
            <select value={color} onChange={onColorChange}>
                <option value="red"> red </option>
                <option value="black"> black </option>
                <option value="green"> green </option>
                <option value="yellow"> yellow </option>
                <option value="violet"> violet </option>
            </select>
        </div>
    )
}
export default   ColorsRenderer