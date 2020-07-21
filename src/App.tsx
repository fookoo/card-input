import React, { useState } from 'react';

import CardInput from './components/card-input/CardInput.component';
import CardDetail from './components/card-detail/CardDetail.component';
import { ICreditCard } from './services/card.service';

import './App.scss'

const App: React.FC = () => {
    const [creditCardDetails, setCreditCardDetails] = useState<ICreditCard | null>();

    return (
        <div>
            <h1>Card input component</h1>
            <div className="example">
                <CardInput onSubmitReady={setCreditCardDetails}/>
                {creditCardDetails && (
                    <CardDetail card={creditCardDetails} />
                )}
            </div>
        </div>
    )
}

export default App;
