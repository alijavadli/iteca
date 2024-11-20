export const ServiceCheckbox = ({
    name,
    price,
    isChecked,
    onChange,
    currency = 'KZT',
    disabled = false
}) => {
    return (
        <div className="form-check checkbox-service">
            <div className='mt-1'>
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={isChecked}
                    onChange={onChange}
                    disabled={disabled}
                />
                <label
                    className="form-check-label w-100 d-flex"
                >
                    <div>
                        {name}
                    </div>
                    <div className="price">
                        {currency} {price}
                    </div>
                </label>
            </div>
        </div>
    );
};