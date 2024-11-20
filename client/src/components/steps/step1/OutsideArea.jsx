import React, { useEffect, useCallback } from 'react';
import { useAtom } from 'jotai';
import { 
    activeAreaTypeAtom,
    activeAreaTotalAtom,
    outsideAreaStateAtom
} from '../../../store/atoms';
import { ServiceToggle } from '../../common/ServiceToggle';
import { PriceBlock } from '../../common/PriceBlock';
import { QuantityInput } from '../../common/QuantityInput';
import { SummaryBlock } from '../../common/SummaryBlock';   

export const OutsideArea = ({ service }) => {
    const [outsideAreaState, setOutsideAreaState] = useAtom(outsideAreaStateAtom);
    const [activeAreaType, setActiveAreaType] = useAtom(activeAreaTypeAtom);
    const [, setActiveAreaTotal] = useAtom(activeAreaTotalAtom);

    const activePrice = service.prices.find(price => price.status === "active");
    const currentTotal = outsideAreaState.quantity * (activePrice?.price || 0);

    const handleReset = useCallback(() => {
        setOutsideAreaState(prev => ({
            ...prev,
            quantity: ''
        }));
    }, [setOutsideAreaState]);

    const handleQuantityChange = useCallback((value) => {
        setOutsideAreaState(prev => ({
            ...prev,
            quantity: value
        }));
    }, [setOutsideAreaState]);

    const handleToggle = useCallback((e) => {
        const newIsActive = e.target.checked;
        setOutsideAreaState(prev => ({
            ...prev,
            isActive: newIsActive
        }));
        
        if (newIsActive) {
            setActiveAreaType('outside');
        } else {
            setActiveAreaType(null);
            handleReset();
        }
    }, [setActiveAreaType, handleReset, setOutsideAreaState]);

    useEffect(() => {
        if (outsideAreaState.isActive) {
            setActiveAreaTotal(currentTotal);
        } else {
            setActiveAreaTotal(0);
        }
    }, [currentTotal, outsideAreaState.isActive, setActiveAreaTotal]);

    useEffect(() => {
        if (activeAreaType !== 'outside' && outsideAreaState.isActive) {
            setOutsideAreaState(prev => ({
                ...prev,
                isActive: false
            }));
            handleReset();
        }
    }, [activeAreaType, outsideAreaState.isActive, handleReset, setOutsideAreaState]);

    return (
        <ServiceToggle
            id={service.block_id}
            name={service.name}
            isActive={outsideAreaState.isActive}
            onToggle={handleToggle}
            disabled={activeAreaType && activeAreaType !== 'outside'}
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
                    value={outsideAreaState.quantity}
                    onChange={handleQuantityChange}
                    label="QTY"
                    unit={service.comment}
                    min={0}
                    max={1000}
                />

                <SummaryBlock
                    amount={outsideAreaState.isActive ? currentTotal : 0}
                />
            </div>
            <div className="row-line"></div>
        </ServiceToggle>
    );
};