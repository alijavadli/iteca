import React, { useEffect, useCallback } from 'react';
import { useAtom } from 'jotai';
import {
    activeStandSetupAtom,
    electricalConnectionStateAtom
} from '../../../store/atoms';
import { ServiceToggle } from '../../common/ServiceToggle';
import { ServiceCheckbox } from '../../common/ServiceCheckbox';
import { SummaryBlock } from '../../common/SummaryBlock';

export const ElectricalConnection = ({ service }) => {
    const [electricalState, setElectricalState] = useAtom(electricalConnectionStateAtom);
    const [activeStandSetup, setActiveStandSetup] = useAtom(activeStandSetupAtom);

    const calculateTotal = useCallback(() => {
        return Object.entries(electricalState.selectedOptions).reduce((total, [optionName, isSelected]) => {
            if (isSelected) {
                const option = service.options.find(opt => opt.name === optionName);
                const activePrice = option?.price[0]?.price?.replace(/,/g, '') || '0';
                return total + Number(activePrice);
            }
            return total;
        }, 0);
    }, [electricalState.selectedOptions, service.options]);

    const handleOptionToggle = useCallback((optionName) => {
        setElectricalState(prev => ({
            ...prev,
            selectedOptions: {
                ...prev.selectedOptions,
                [optionName]: !prev.selectedOptions[optionName]
            }
        }));
    }, [setElectricalState]);

    const handleReset = useCallback(() => {
        setElectricalState(prev => ({
            ...prev,
            selectedOptions: {}
        }));
    }, [setElectricalState]);

    const handleToggle = useCallback((e) => {
        const newIsActive = e.target.checked;
        setElectricalState(prev => ({
            ...prev,
            isActive: newIsActive
        }));
        if (newIsActive) {
            setActiveStandSetup('electrical');
            handleReset();
        } else {
            setActiveStandSetup(null);
        }
    }, [setActiveStandSetup, handleReset, setElectricalState]);

    useEffect(() => {
        if (activeStandSetup && activeStandSetup !== 'electrical' && electricalState.isActive) {
            setElectricalState(prev => ({
                ...prev,
                isActive: false
            }));
            handleReset();
        }
    }, [activeStandSetup, electricalState.isActive, handleReset, setElectricalState]);

    return (
        <ServiceToggle
            id={service.id}
            name={service.name}
            isActive={electricalState.isActive}
            onToggle={handleToggle}
            disabled={activeStandSetup && activeStandSetup !== 'electrical'}
        >
            <div className="d-flex justify-content-between">
                {service.options.map((option, index) => {
                    const activePrice = option.price.find(p => p.status === "active");
                    return (
                        <ServiceCheckbox
                            key={index}
                            name={option.name}
                            price={activePrice?.price}
                            isChecked={!!electricalState.selectedOptions[option.name]}
                            onChange={() => handleOptionToggle(option.name)}
                        />
                    );
                })}
                <SummaryBlock
                    amount={electricalState.isActive ? calculateTotal() : 0}
                    currency="KZT"
                />
            </div>
        </ServiceToggle>
    );
};