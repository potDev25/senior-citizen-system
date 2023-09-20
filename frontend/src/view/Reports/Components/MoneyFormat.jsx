import React from 'react'

export default function MoneyFormat({amount}) {
    const formattedAmount = new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
    }).format(amount);
    
    return <span>{formattedAmount}</span>;
}
