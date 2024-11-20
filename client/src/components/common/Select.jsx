import { useState, useRef, useEffect } from 'react';

export const Select = ({
    value,
    onChange,
    options = [],
    showFlag = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        onChange(option.value);
        setIsOpen(false);
    };

    const selectedOption = options.find(option => option.value === value);

    return (
        <div className="custom-select-container" ref={selectRef}>
            <button
                className="custom-select-button"
                onClick={() => setIsOpen(!isOpen)}
                type="button"
            >
                {showFlag && (
                    <img
                        src={selectedOption?.flag}
                        alt={selectedOption?.label}
                        className="custom-select-flag"
                    />
                )}
                {selectedOption?.label}
            </button>
            {isOpen && (
                <div className="custom-select-dropdown">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={`custom-select-option ${value === option.value ? 'selected' : ''}`}
                            onClick={() => handleSelect(option)}
                        >
                            {showFlag && (
                                <img
                                    src={option.flag}
                                    alt={option.label}
                                    className="custom-select-flag"
                                />
                            )}
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};