import React from 'react';
import { useAtom } from 'jotai';
import { 
    step1SubtotalAtom,
    step2SubtotalAtom,
    step3SubtotalAtom,
    step4SubtotalAtom,
    step5SubtotalAtom,
    step6SubtotalAtom
} from '../../store/atoms';

export const StepsNavigation = ({ stepsObj, activeStep }) => {
    const [step1Subtotal] = useAtom(step1SubtotalAtom);
    const [step2Subtotal] = useAtom(step2SubtotalAtom);
    const [step3Subtotal] = useAtom(step3SubtotalAtom);
    const [step4Subtotal] = useAtom(step4SubtotalAtom);
    const [step5Subtotal] = useAtom(step5SubtotalAtom);
    const [step6Subtotal] = useAtom(step6SubtotalAtom);

    const getSubtotalForStep = (stepNumber) => {
        switch(stepNumber) {
            case 1: return step1Subtotal;
            case 2: return step2Subtotal;
            case 3: return step3Subtotal;
            case 4: return step4Subtotal;
            case 5: return step5Subtotal;
            case 6: return step6Subtotal;
            default: return 0;
        }
    };

    return (
        <div className="row">
            <div className="col-12">
                <div className="steps">
                    {stepsObj && Object.entries(stepsObj).map(([key, value]) => {
                        const stepNumber = parseInt(key);
                        return (
                            <div
                                key={key}
                                className={`
                                    step-item
                                    ${stepNumber === activeStep ? 'active' : ''}
                                    ${stepNumber < activeStep ? 'completed' : ''}
                                `}
                            >
                                <div className="step-number">{key}</div>
                                <div className="step-content">
                                    <div className="step-title">{value}</div>
                                    <div className="step-subtitle">
                                        Subtotal: KZT {getSubtotalForStep(stepNumber)}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};