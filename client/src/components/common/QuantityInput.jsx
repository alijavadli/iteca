export const QuantityInput = ({
    value,
    onChange,
    onBlur,
    min = 0,
    max = 1000,
    label = "QTY",
    unit = "",
    className = ""
}) => {
    const handleChange = (e) => {
        const value = e.target.value;

        if (value === '' || !isNaN(value)) {
            const numValue = value === '' ? '' : parseInt(value, 10);

            if (value === '' || (numValue >= min && numValue <= max)) {
                onChange(value);
            }
        }
    };

    const handleInputBlur = () => {
        if (value === '') return;

        const numValue = parseInt(value, 10);
        if (numValue < min) {
            onChange(min.toString());
        } else if (numValue > max) {
            onChange(max.toString());
        }
        if (onBlur) onBlur();
    };

    return (
        <div className="price-block">
            <div className="label">
                <label className='title'>
                    {label} {unit}
                </label>
                <div className="comment"></div>
                <input
                    type="number"
                    className={`form-control price ${className}`}
                    value={value}
                    onChange={handleChange}
                    onBlur={handleInputBlur}
                    placeholder="X="
                    min={min}
                    max={max}
                />
            </div>
        </div>
    );
};