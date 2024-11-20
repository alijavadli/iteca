import React, { cloneElement, Children } from 'react';

export const ServiceToggle = ({
    id,
    name,
    isActive = false,
    onToggle,
    disabled = false,
    children,
    onActivate
}) => {
    const modifyChildren = (children) => {
        return Children.map(children, child => {
            if (!React.isValidElement(child)) return child;

            const newChildren = child.props.children
                ? modifyChildren(child.props.children)
                : child.props.children;

            if (child.type?.name === 'ServiceCheckbox') {
                return cloneElement(child, {
                    ...child.props,
                    isChecked: false,
                    children: newChildren
                });
            }

            if (child.type?.name === 'QuantityInput') {
                return cloneElement(child, {
                    ...child.props,
                    value: '',
                    children: newChildren
                });
            }

            return cloneElement(child, {
                ...child.props,
                children: newChildren
            });
        });
    };

    const handleToggle = (e) => {
        onToggle(e);
        if (e.target.checked && onActivate) {
            onActivate();
        }
    };

    return (
        <div className="service-block mb-4">
            <div className="d-flex align-items-center mb-3">
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={isActive}
                        onChange={handleToggle}
                        disabled={disabled}
                    />
                    <label className="form-check-label">
                        {name}
                    </label>
                </div>
            </div>
            <div className={!isActive ? 'content-disabled' : ''}>
                {isActive ? children : modifyChildren(children)}
            </div>
        </div>
    );
};