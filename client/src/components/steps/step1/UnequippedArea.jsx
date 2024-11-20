import React, { useEffect, useCallback } from 'react';
import { useAtom } from 'jotai';
import { 
    activeAreaTypeAtom,
    activeAreaTotalAtom,
    unequippedAreaStateAtom 
} from '../../../store/atoms';
import { ServiceToggle } from '../../common/ServiceToggle';
import { PriceBlock } from '../../common/PriceBlock';
import { QuantityInput } from '../../common/QuantityInput';
import { SummaryBlock } from '../../common/SummaryBlock';   

export const UnequippedArea = ({ service }) => {
    const [unequippedAreaState, setUnequippedAreaState] = useAtom(unequippedAreaStateAtom);
    const [activeAreaType, setActiveAreaType] = useAtom(activeAreaTypeAtom);
    const [, setActiveAreaTotal] = useAtom(activeAreaTotalAtom);

    const activePrice = service.prices.find(price => price.status === "active");
    const currentTotal = unequippedAreaState.quantity * (activePrice?.price || 0);

    const handleReset = useCallback(() => {
        setUnequippedAreaState(prev => ({
            ...prev,
            quantity: ''
        }));
    }, [setUnequippedAreaState]);

    const handleQuantityChange = useCallback((value) => {
        setUnequippedAreaState(prev => ({
            ...prev,
            quantity: value
        }));
    }, [setUnequippedAreaState]);

    const handleToggle = useCallback((e) => {
        const newIsActive = e.target.checked;
        setUnequippedAreaState(prev => ({
            ...prev,
            isActive: newIsActive
        }));
        
        if (newIsActive) {
            setActiveAreaType('unequipped');
        } else {
            setActiveAreaType(null);
            handleReset();
        }
    }, [setActiveAreaType, handleReset, setUnequippedAreaState]);

    useEffect(() => {
        if (unequippedAreaState.isActive) {
            setActiveAreaTotal(currentTotal);
        } else {
            setActiveAreaTotal(0);
        }
    }, [currentTotal, unequippedAreaState.isActive, setActiveAreaTotal]);

    return (
        <ServiceToggle
            id={service.id}
            name={service.name}
            isActive={unequippedAreaState.isActive}
            onToggle={handleToggle}
            disabled={activeAreaType && activeAreaType !== 'unequipped'}
        >
            <div className="d-flex justify-content-between">
                {service.prices.map((price, index) => (
                    <PriceBlock
                        key={index}
                        title={
                            index === 0 ? 'Early booking price' :
                            index === 1 ? 'Standard price' :
                            'Late booking price'
                        }
                        comment={service.comment}
                        price={price.price}
                        deadline={price.deadline}
                        deadline_to={price.deadline_to}
                        status={price.status}
                    />
                ))}

                <QuantityInput
                    value={unequippedAreaState.quantity}
                    onChange={handleQuantityChange}
                    label="QTY"
                    unit={service.comment}
                    min={0}
                    max={1000}
                />

                <SummaryBlock
                    amount={unequippedAreaState.isActive ? currentTotal : 0}
                />
            </div>
            <div className="row-line"></div>
        </ServiceToggle>
    );
};