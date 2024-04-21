import React from 'react';

export const StripeContext = React.createContext(null);

export function StripeProvider({ children, stripePromise }) {
    return (
        <StripeContext.Provider value={stripePromise}>
            {children}
        </StripeContext.Provider>
    );
}
