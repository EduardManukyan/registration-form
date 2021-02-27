import React, {useState} from 'react';
import PersonalInfo from './Components/PersonalInfo';
import EmailPassword from "./Components/EmailPassword";
import BankCard from "./Components/BankCard"


function App() {
    const [userPersonalInfo, setUserPersonalInfo] = useState(null);
    const [userCredentials, setUserCredentials] = useState(null);
    const [userCreditCardDetails, setUserCreditCardDetails] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    return (
        <div className={'container'}>
            <div className={`form-tab ${pageNumber === 1 ? 'active' : ''}`}><PersonalInfo setData={setUserPersonalInfo}
                                                                                          setPageNumber={setPageNumber}/>
            </div>
            <div className={`form-tab ${pageNumber === 2 ? 'active' : ''}`}><EmailPassword setData={setUserPersonalInfo}
                                                                                           setPageNumber={setPageNumber}/>
            </div>
            <div className={`form-tab ${pageNumber === 3 ? 'active' : ''}`}><BankCard setData={setUserPersonalInfo}
                                                                                           setPageNumber={setPageNumber}/>
            </div>
        </div>
    )
}

export default App;
