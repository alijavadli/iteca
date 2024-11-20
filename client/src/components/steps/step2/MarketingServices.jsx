import React from 'react';
import { useAtom } from 'jotai';
import { 
    selectedMarketingServicesAtom,
    step2SubtotalAtom
} from '../../../store/atoms';
import { ServiceToggle } from '../../common/ServiceToggle';
import { ServiceImage } from '../../common/ServiceImage';
import { QuantityInput } from '../../common/QuantityInput';
import { SummaryBlock } from '../../common/SummaryBlock';

export const MarketingServices = ({ service }) => {
    const [selectedServices, setSelectedServices] = useAtom(selectedMarketingServicesAtom);
    const [, setStep2Subtotal] = useAtom(step2SubtotalAtom);

    const handleServiceToggle = (optionId, isActive) => {
        setSelectedServices(prev => ({
            ...prev,
            [optionId]: isActive ? { qty: '', images: service.options[0].images } : null
        }));
    };

    const handleQuantityChange = (optionId, value) => {
        setSelectedServices(prev => ({
            ...prev,
            [optionId]: {
                ...prev[optionId],
                qty: value
            }
        }));
    };

    const calculateTotal = () => {
        return Object.entries(selectedServices).reduce((total, [optionId, data]) => {
            if (!data || !data.qty) return total;
            
            const option = service.options.find(opt => opt.name === optionId);
            const activePrice = option?.prices?.find(p => p.status === "active");
            return total + (Number(data.qty) * Number(activePrice?.price || 0));
        }, 0);
    };

    React.useEffect(() => {
        setStep2Subtotal(calculateTotal());
    }, [selectedServices]);

    return (
        <div className="marketing-services">
            {service.options.map((option, index) => {
                const isSelected = !!selectedServices[option.name];
                const activePrice = option.prices?.find(p => p.status === "active");

                return (
                    <ServiceToggle
                        key={index}
                        id={option.name}
                        name={option.name}
                        isActive={isSelected}
                        onToggle={(e) => handleServiceToggle(option.name, e.target.checked)}
                    >
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="option-details">
                                <p className="comment mb-2">{option.comment}</p>
                                {option.images && (
                                    <ServiceImage
                                        images={option.images}
                                        quantity={selectedServices[option.name]?.qty}
                                        name={option.name}
                                    />
                                )}
                            </div>

                            {isSelected && (
                                <>
                                    <QuantityInput
                                        value={selectedServices[option.name]?.qty || ''}
                                        onChange={(value) => handleQuantityChange(option.name, value)}
                                        label={option.type === 'hour' ? 'Hours' : 'QTY'}
                                        min={1}
                                        max={1000}
                                    />

                                    <SummaryBlock
                                        amount={selectedServices[option.name]?.qty ? 
                                            Number(selectedServices[option.name].qty) * Number(activePrice?.price || 0) : 0
                                        }
                                    />
                                </>
                            )}
                        </div>
                    </ServiceToggle>
                );
            })}
        </div>
    );
};