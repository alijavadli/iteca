import React from 'react';
import { useAtom } from 'jotai';
import { selectedPartnershipOptionsAtom } from '../../../store/atoms';
import { ServiceToggle } from '../../common/ServiceToggle';

export const PartnershipOpportunities = ({ service }) => {
    const [isSelected, setIsSelected] = useAtom(selectedPartnershipOptionsAtom);

    return (
        <div className="partnership-opportunities">
            <p className="mb-4">{service.comment}</p>
            <ServiceToggle
                id="partnership"
                name={service.options[0].name}
                isActive={isSelected}
                onToggle={(e) => setIsSelected(e.target.checked)}
            >
                <div className="selected-message">
                    {isSelected && (
                        <p className="text-success mb-0">
                            Thank you for your interest. We will send you the partnership details shortly.
                        </p>
                    )}
                </div>
            </ServiceToggle>
        </div>
    );
};