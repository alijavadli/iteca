import React, { useEffect, useCallback } from 'react';
import { useAtom } from 'jotai';
import { 
    activeAreaTotalAtom,
    standardStandSetupStateAtom,
    unequippedAreaStateAtom
} from '../../../store/atoms';
import { ServiceToggle } from '../../../components/common/ServiceToggle';
import { PriceBlock } from '../../../components/common/PriceBlock';
import { QuantityInput } from '../../../components/common/QuantityInput';
import { SummaryBlock } from '../../../components/common/SummaryBlock';

export const StandardStandSetup = ({ service }) => {
    const [standardStandSetup, setStandardStandSetup] = useAtom(standardStandSetupStateAtom);
    const [unequippedAreaState, setUnequippedAreaState] = useAtom(unequippedAreaStateAtom);
    const [, setActiveAreaTotal] = useAtom(activeAreaTotalAtom);

    const activePrice = service.prices.find(price => price.status === "active");
    const currentTotal = standardStandSetup.quantity * (activePrice?.price || 0);

    const handleReset = useCallback(() => {
        setStandardStandSetup(prev => ({
            ...prev,
            isActive: false,
            quantity: ''
        }));
    }, [setStandardStandSetup]);

    const handleQuantityChange = useCallback((value) => {
        setStandardStandSetup(prev => ({
            ...prev,
            quantity: value
        }));
        setUnequippedAreaState(prev => ({
            ...prev,
            quantity: value
        }));
    }, [setStandardStandSetup, setUnequippedAreaState]);

    const handleToggle = useCallback((e) => {
        const newIsActive = e.target.checked;
        setStandardStandSetup(prev => ({
            ...prev,
            isActive: newIsActive,
            quantity: newIsActive ? unequippedAreaState.quantity : ''
        }));
    }, [setStandardStandSetup, unequippedAreaState.quantity]);

    useEffect(() => {
        if (standardStandSetup.isActive) {
            setActiveAreaTotal(currentTotal);
        }
    }, [currentTotal, standardStandSetup.isActive, setActiveAreaTotal]);

    useEffect(() => {
        if (standardStandSetup.isActive) {
            setStandardStandSetup(prev => ({
                ...prev,
                quantity: unequippedAreaState.quantity
            }));
        }
    }, [unequippedAreaState.quantity, standardStandSetup.isActive, setStandardStandSetup]);

    useEffect(() => {
        if (!unequippedAreaState.isActive) {
            handleReset();
        }
    }, [unequippedAreaState.isActive, handleReset]);

    const isDisabled = !unequippedAreaState.isActive;

    return (
        <ServiceToggle
            id={service.id}
            name={service.name}
            isActive={standardStandSetup.isActive}
            onToggle={handleToggle}
            disabled={isDisabled}
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
                    value={standardStandSetup.quantity}
                    onChange={handleQuantityChange}
                    label={service.headline || 'QTY'}
                    unit={service.comment}
                    min={0}
                    max={1000}
                />

                <SummaryBlock
                    amount={standardStandSetup.isActive ? currentTotal : 0}
                />
            </div>
            <div className="row-line"></div>
        </ServiceToggle>
    );
};