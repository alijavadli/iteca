import React, { useEffect, useCallback } from 'react';
import { useAtom } from 'jotai';
import { 
   serviceQuantitiesAtom,
   standConfigurationStateAtom,
   unequippedAreaStateAtom,
   outsideAreaStateAtom
} from '../../../store/atoms';
import { ServiceToggle } from '../../common/ServiceToggle';
import { ServiceCheckbox } from '../../common/ServiceCheckbox';
import { SummaryBlock } from '../../common/SummaryBlock';

export const StandConfiguration = ({ service }) => {
   const [standConfigState, setStandConfigState] = useAtom(standConfigurationStateAtom);
   const [serviceQuantities, setServiceQuantities] = useAtom(serviceQuantitiesAtom);
   const [unequippedAreaState] = useAtom(unequippedAreaStateAtom);
   const [outsideAreaState] = useAtom(outsideAreaStateAtom);

   const getBaseAmount = useCallback(() => {
       if (unequippedAreaState.isActive && unequippedAreaState.quantity > 0) {
           return parseFloat(unequippedAreaState.quantity) * 147000;
       }
       if (outsideAreaState.isActive && outsideAreaState.quantity > 0) {
           return parseFloat(outsideAreaState.quantity) * 147000;
       }
       return 0;
   }, [unequippedAreaState, outsideAreaState]);

   const calculateTotal = useCallback((newSelection = null) => {
       const useSelection = newSelection !== null ? newSelection : standConfigState.selectedOption;
       const baseAmount = getBaseAmount();

       if (baseAmount === 0) {
           setServiceQuantities(prev => ({
               ...prev,
               [service.block_id]: {
                   ...prev[service.block_id],
                   total: 0,
                   baseAmount: 0
               }
           }));
           return 0;
       }

       let total = 0;
       
       if (service.options[0]?.percentage) {
           total += baseAmount * (parseFloat(service.options[0].percentage) / 100);
       }

       if (useSelection) {
           const selectedOption = service.options.find(opt => opt.name === useSelection);
           if (selectedOption?.percentage) {
               total += baseAmount * (parseFloat(selectedOption.percentage) / 100);
           }
       }

       return total;
   }, [getBaseAmount, service.options, standConfigState.selectedOption, service.block_id, setServiceQuantities]);

   useEffect(() => {
       const baseAmount = getBaseAmount();
       const total = calculateTotal();
       
       setServiceQuantities(prev => ({
           ...prev,
           [service.block_id]: {
               ...prev[service.block_id],
               option: service.options[0]?.name,
               images: service.options[0]?.images || [],
               additionalOption: standConfigState.selectedOption,
               total,
               baseAmount
           }
       }));
   }, [
       service.block_id, 
       service.options,
       standConfigState.selectedOption,
       calculateTotal,
       setServiceQuantities,
       getBaseAmount
   ]);

   const handleOptionSelect = useCallback((optionName, isFirstOption) => {
       if (isFirstOption) return;
       
       const newSelection = optionName === standConfigState.selectedOption ? null : optionName;
       const baseAmount = getBaseAmount();
       
       setStandConfigState(prev => ({
           ...prev,
           selectedOption: newSelection
       }));

       const newTotal = calculateTotal(newSelection);

       setServiceQuantities(prev => ({
           ...prev,
           [service.block_id]: {
               ...prev[service.block_id],
               option: service.options[0]?.name,
               images: service.options[0]?.images || [],
               additionalOption: newSelection,
               total: newTotal,
               baseAmount
           }
       }));
   }, [
       standConfigState.selectedOption,
       setStandConfigState,
       calculateTotal,
       service.block_id,
       service.options,
       setServiceQuantities,
       getBaseAmount
   ]);

   useEffect(() => {
       const currentConfig = serviceQuantities[service.block_id];
       const baseAmount = getBaseAmount();
       if (currentConfig?.additionalOption && !standConfigState.selectedOption && baseAmount > 0) {
           setStandConfigState(prev => ({
               ...prev,
               selectedOption: currentConfig.additionalOption
           }));

           const total = calculateTotal(currentConfig.additionalOption);
           setServiceQuantities(prev => ({
               ...prev,
               [service.block_id]: {
                   ...prev[service.block_id],
                   total,
                   baseAmount
               }
           }));
       }
   }, [
       serviceQuantities,
       service.block_id,
       standConfigState.selectedOption,
       setStandConfigState,
       calculateTotal,
       setServiceQuantities,
       getBaseAmount
   ]);

   return (
       <ServiceToggle
           id={service.block_id}
           name={service.name}
           isActive={true}
           onToggle={() => {}}
       >
           <div className="d-flex justify-content-between align-items-end">
               <div className="options-container">
                   {service.options.map((option, index) => (
                       <ServiceCheckbox
                           key={index}
                           currency=''
                           name={`${index + 1}. ${option.name}`}
                           price={`${option.comment}`}
                           isChecked={index === 0 || option.name === standConfigState.selectedOption}
                           onChange={() => handleOptionSelect(option.name, index === 0)}
                           disabled={index === 0}
                       />
                   ))}
               </div>   
               <SummaryBlock
                   amount={serviceQuantities[service.block_id]?.total || 0}
                   currency="KZT"
               />
           </div>
       </ServiceToggle>
   );
};
