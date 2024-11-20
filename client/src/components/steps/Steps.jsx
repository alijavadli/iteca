import React, { useEffect } from 'react';
import ArrowNext from '../../assets/icons/next.svg'
import ArrowPre from '../../assets/icons/pre.svg'
import { Step1 } from './step1';
import { Step2 } from './step2';
import { useAtom } from 'jotai';
import { 
    serviceQuantitiesAtom, 
    standConfigurationStateAtom,
    step1SubtotalAtom
} from '../../store/atoms';

export const Steps = ({
    data = { steps: [{}] },
    activeStep,
    setActiveStep
}) => {
    const [serviceQuantities] = useAtom(serviceQuantitiesAtom);
    const [standConfigState] = useAtom(standConfigurationStateAtom);
    const [step1Subtotal] = useAtom(step1SubtotalAtom);

    useEffect(() => {
        const savedState = {
            serviceQuantities,
            standConfigState,
            step1Subtotal
        };
        return () => {
            Object.assign(window, { savedStepState: savedState });
        };
    }, [serviceQuantities, standConfigState, step1Subtotal]);

    useEffect(() => {
        const savedState = window.savedStepState;
        if (savedState) {
            delete window.savedStepState;
        }
    }, []);

    const handleNext = () => {
        setActiveStep(prev => prev + 1);
    };

    const handleBack = () => {
        setActiveStep(prev => prev - 1);
    };

    const renderStepContent = () => {
        switch(activeStep) {
            case 1:
                return <Step1 data={data} />;
            case 2:
                return <Step2 data={data} />;
            case 3:
                return <Step1 data={data} />;
            case 4:
                return <Step1 data={data} />;
            case 5:
                return <Step1 data={data} />;
            case 6:
                return <Step1 data={data} />;
            default:
                return null;
        }
    };

    const totalSteps = Object.keys(data?.steps[0] || {}).length;
    const isLastStep = activeStep === totalSteps;

    return (
        <div className="steps-content">
            {renderStepContent()}
            
            <div className="d-flex justify-content-end mt-4">
                <div className="d-flex">
                    {activeStep > 1 && (
                        <button 
                            className="steps-icon pre-icon btn btn-secondary"
                            onClick={handleBack}
                            type="button"
                        >
                            <img className='me-2' src={ArrowPre} alt="arrow-pre" />
                            Back
                        </button>
                    )}
                    
                    {!isLastStep ? (
                        <button 
                            className="steps-icon next-icon btn btn-primary"
                            onClick={handleNext}
                            type="button"
                        >
                            Next
                            <img className='ms-2' src={ArrowNext} alt="arrow-next" />
                        </button>
                    ) : (
                        <button 
                            className="btn btn-success"
                            onClick={() => {/* Handle form submission */}}
                            type="button"
                        >
                            Submit Application
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
