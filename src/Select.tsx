import React, { ChangeEventHandler, FC } from 'react';

type SelectValue = string;

type SelectOption = {
    value: SelectValue;
    label: string;
};

type SelectProps = {
    placeholder: string;
    selected: SelectValue | null;
    onSelect: (value: SelectValue) => void;
    options: SelectOption[];
    disabled?: boolean;
};

export const Select: FC<SelectProps> = ({
    placeholder,
    selected,
    onSelect,
    options,
    disabled,
}) => {
    const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
        onSelect(event.target.value);
    };

    return (
        <select
            onChange={handleChange}
            value={selected || ''}
            disabled={disabled}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <option value="" disabled>
                {placeholder}
            </option>
            {options.map(({ value, label }) => (
                <option key={value} value={value}>
                    {label}
                </option>
            ))}
        </select>
    );
};
