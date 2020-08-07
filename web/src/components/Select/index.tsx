import React, { SelectHTMLAttributes } from 'react'
import './styles.css'

interface SelectPropsInterface extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    label: string;
    options: Array<{
        value: string;
        label: string;
    }>;
}

const Select: React.FC<SelectPropsInterface> = ({ name, label, options, ...rest }) => {
    return (
        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select id={name} value="" {...rest}>
                <option value="" disabled hidden>Selecione uma opção</option>
                {options.map(({ value, label }) => {
                    return <option key={value} value={value}>{label}</option>
                })}
            </select>
        </div>
    )
}

export default Select