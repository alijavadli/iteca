import { atom } from 'jotai'

export const langAtom = atom(new URLSearchParams(window.location.search).get('lang') || 'en')
export const exhibCodeAtom = atom(new URLSearchParams(window.location.search).get('exhib_code') || 'KIOGE 2024')
export const currencyAtom = atom(new URLSearchParams(window.location.search).get('currency') || '398')
export const exhibitionDataAtom = atom(null)
export const loadingAtom = atom(false)
export const errorAtom = atom(null)

export const step1SubtotalAtom = atom(0)
export const step2SubtotalAtom = atom(0)
export const step3SubtotalAtom = atom(0)
export const step4SubtotalAtom = atom(0)
export const step5SubtotalAtom = atom(0)
export const step6SubtotalAtom = atom(0)

export const standAreaQtyAtom = atom('')
export const activeAreaTypeAtom = atom(null)
export const unequippedAreaActiveAtom = atom(false)
export const activeStandSetupAtom = atom(null)
export const activeAreaTotalAtom = atom(0);
export const serviceQuantitiesAtom = atom({});

export const selectedMarketingServicesAtom = atom({})
export const selectedPartnershipOptionsAtom = atom(false)

export const unequippedAreaStateAtom = atom({
    isActive: false,
    quantity: ''
});

export const outsideAreaStateAtom = atom({
    isActive: false,
    quantity: ''
});

export const standardStandSetupStateAtom = atom({
    isActive: false,
    quantity: ''
});

export const electricalConnectionStateAtom = atom({
    isActive: false,
    selectedOptions: {}
});

export const standConfigurationStateAtom = atom({
    selectedOption: null,
    qty: '1'
});

export const standConfigurationTotalAtom = atom(
    (get) => {
        const serviceQuantities = get(serviceQuantitiesAtom);
        return serviceQuantities[7]?.total || 0;
    }
);