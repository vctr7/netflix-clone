import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import registerimg from '../img/register.png';
import checkimg from '../img/check.png';
import secureimg from '../img/secure.png';
import cardimg from '../img/card.png';
import chevronimg from '../img/chevronright.png';
import './RegisterForm.css';
import axios from 'axios';

const RegisterForm = ({ email, signalListener }) => {
    const [step, setStep] = useState(1);
    const [registerEmail, setRegisterEmail] = useState(email);
    const [registerPassword, setRegisterPassword] = useState('');

    const [isBasic, setIsBasic] = useState(false);
    const [isStandard, setIsStandard] = useState(false);
    const [isPremium, setIsPremium] = useState(true);

    const [creditFirstName, setCreditFirstName] = useState('');
    const [creditLastName, setCreditLastName] = useState('');
    const [creditZipCode, setCreditZipCode] = useState('');
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [creditExpirationDate, setCreditExpirationDate] = useState('');
    const [creditCVV, setCreditCVV] = useState('');

    const [isRegister, setIsRegister] = useState(false);
    useEffect(() => {
        if (isRegister) {
            console.log('update');
        }
    }, [isRegister]);

    const selectBasic = () => {
        setIsBasic(true);
        setIsStandard(false);
        setIsPremium(false);
    };
    const selectStandard = () => {
        setIsBasic(false);
        setIsStandard(true);
        setIsPremium(false);
    };
    const selectPremium = () => {
        setIsBasic(false);
        setIsStandard(false);
        setIsPremium(true);
    };
    const getPlanStatus = () => {
        if (isBasic) return 'Basic';
        else if (isStandard) return 'Standard';
        else if (isPremium) return 'Premium';
    };

    const submitRegisteration = () => {
        const currPlan = getPlanStatus();
        console.log(currPlan)
        const creditInfo = {
            firstName: creditFirstName,
            lastName: creditLastName,
            zipCode: creditZipCode,
            cardNumber: creditCardNumber,
            expirationDate: creditExpirationDate,
            cvv: creditCVV,
        };
        const personalInfo = {
            email: registerEmail,
            password: registerPassword,
            plan: currPlan,
        };
        axios
            .post('api/auth/register', { personalInfo, creditInfo })
            .then((res) => {
                if (res.status === 200) {
                    console.log('sign up');
                    setIsRegister(true);
                    signalListener(isRegister);
                } else {
                    console.log('not error but problem');
                }
            });
    };

    const indicator = (page) => {
        switch (page) {
            case 1:
                return (
                    <div className="RegisterForm">
                        <img src={registerimg} width="280px"></img>

                        <div
                            className="StepIndicator"
                            style={{ fontSize: '13px', color: '#333333' }}
                        >
                            {`STEP ${String(step)} OF 6`}
                        </div>
                        <div className="StepTitle">
                            <h1 style={{ fontSize: '23px', color: '#333333' }}>
                                Finish setting up your account.
                            </h1>
                        </div>
                        <div
                            className="StepContext"
                            style={{ fontSize: '17px', color: '#333333' }}
                        >
                            Netflix is personalized for you. Create a password
                            to watch Netflix on any device at any time.
                        </div>
                        <div style={{ marginTop: '30px' }}>
                            <button
                                onClick={() => setStep(step + 1)}
                                style={{
                                    backgroundColor: '#F6141D',
                                    borderRadius: '2px',
                                    width: '340px',
                                    height: '50px',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '17px',
                                    cursor: 'pointer',
                                }}
                            >
                                CONTINUE
                            </button>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="RegisterForm" style={{ textAlign: 'left' }}>
                        <div
                            className="StepIndicator"
                            style={{ fontSize: '13px', color: '#333333' }}
                        >
                            {`STEP ${String(step)} OF 6`}
                        </div>
                        <div>
                            <h1 style={{ fontSize: '23px', color: '#333333' }}>
                                Create a password to start your membership.
                            </h1>
                        </div>
                        <div style={{ fontSize: '19px', color: '#333333' }}>
                            Just a few more steps and you're done!
                        </div>
                        <div style={{ fontSize: '19px', color: '#333333' }}>
                            We hate paperwork, too.
                        </div>

                        <input
                            className="RegisterInput"
                            type="text"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                        ></input>
                        <input
                            className="RegisterInput"
                            placeholder="Add a password"
                            type="password"
                            value={registerPassword}
                            onChange={(e) =>
                                setRegisterPassword(e.target.value)
                            }
                        ></input>
                        <div style={{ marginTop: '30px' }}>
                            <button
                                onClick={() => {
                                    if (registerPassword.length > 4)
                                        setStep(step + 1);
                                    else
                                        alert(
                                            'Password should longer than 4 characters!',
                                        );
                                }}
                                style={{
                                    backgroundColor: '#F6141D',
                                    borderRadius: '2px',
                                    width: '340px',
                                    height: '50px',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '17px',
                                    cursor: 'pointer',
                                }}
                            >
                                CONTINUE
                            </button>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="RegisterForm">
                        <img src={checkimg} width="50px"></img>
                        <div
                            className="StepIndicator"
                            style={{
                                fontSize: '13px',
                                marginTop: '20px',
                                color: '#333333',
                            }}
                        >
                            {`STEP ${String(step)} OF 6`}
                        </div>
                        <div>
                            <h1 style={{ fontSize: '23px', color: '#333333' }}>
                                Choose your plan.
                            </h1>
                        </div>
                        <div
                            style={{
                                textAlign: 'left',
                                marginTop: '30px',
                                paddingLeft: '10px',
                                paddingRight: '10px',
                            }}
                        >
                            <div style={{ display: 'flex' }}>
                                <svg
                                    style={{
                                        width: '24px',
                                        height: '24px',
                                        color: '#F6141D',
                                    }}
                                >
                                    <path
                                        fill="currentColor"
                                        d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"
                                    ></path>
                                </svg>
                                <div
                                    width="266px"
                                    height="42px"
                                    style={{
                                        paddingLeft: '10px',
                                        color: '#333333',
                                    }}
                                >
                                    You won't be charged until after your free
                                    month.
                                </div>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    marginTop: '20px',
                                }}
                            >
                                <svg
                                    style={{
                                        width: '24px',
                                        height: '24px',
                                        color: '#F6141D',
                                    }}
                                >
                                    <path
                                        fill="currentColor"
                                        d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"
                                    ></path>
                                </svg>
                                <div
                                    width="266px"
                                    height="42px"
                                    style={{
                                        paddingLeft: '10px',
                                        color: '#333333',
                                    }}
                                >
                                    We'll remind you three days before your
                                    trial ends.
                                </div>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    marginTop: '20px',
                                }}
                            >
                                <svg
                                    style={{
                                        width: '24px',
                                        height: '24px',
                                        color: '#F6141D',
                                    }}
                                >
                                    <path
                                        fill="currentColor"
                                        d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"
                                    ></path>
                                </svg>
                                <div
                                    width="266px"
                                    height="42px"
                                    style={{
                                        paddingLeft: '10px',
                                        color: '#333333',
                                    }}
                                >
                                    No commitments, cancel anytime.
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '30px' }}>
                            <button
                                onClick={() => setStep(step + 1)}
                                style={{
                                    backgroundColor: '#F6141D',
                                    borderRadius: '2px',
                                    width: '340px',
                                    height: '50px',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '17px',
                                    cursor: 'pointer',
                                }}
                            >
                                SEE THE PLANS
                            </button>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div
                        style={{
                            width: '946px',
                            height: '786px',
                            margin: '0 auto',
                        }}
                    >
                        <div
                            style={{
                                fontSize: '13px',
                                margin: 'none',
                                color: '#333333',
                            }}
                        >
                            {`STEP ${String(step)} OF 6`}
                        </div>

                        <div
                            style={{
                                fontSize: '23px',
                                fontWeight: '600',
                                color: '#333333',
                            }}
                        >
                            Choose the plan that’s right for you
                        </div>
                        <div style={{ fontSize: '16px', color: '#333333' }}>
                            Downgrade or upgrade at any time.
                        </div>
                        {/* redbox */}
                        <div
                            style={{
                                width: '946px',
                                height: '144px',
                                marginTop: '30px',
                            }}
                        >
                            <div style={{ display: 'flex', float: 'right' }}>
                                {isBasic ? (
                                    <div
                                        style={{
                                            width: '118px',
                                            height: '118px',
                                            padding: '1px',
                                            marginLeft: '34.6px',
                                            marginRight: '34.6px',
                                            backgroundColor: '#E50914',
                                            borderRadius: '2px',
                                            color: 'white',
                                            textAlign: 'center',
                                        }}
                                        onClick={selectBasic}
                                    >
                                        <div
                                            style={{
                                                marginTop: '48px',
                                                fontSize: '17px',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Basic
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        style={{
                                            width: '118px',
                                            height: '118px',
                                            padding: '1px',
                                            marginLeft: '34.6px',
                                            marginRight: '34.6px',
                                            backgroundColor: '#E50914',
                                            borderRadius: '2px',
                                            color: 'white',
                                            textAlign: 'center',
                                            opacity: '50%',
                                        }}
                                        onClick={selectBasic}
                                    >
                                        <div
                                            style={{
                                                marginTop: '48px',
                                                fontSize: '17px',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Basic
                                        </div>
                                    </div>
                                )}
                                {isStandard ? (
                                    <div
                                        style={{
                                            width: '118px',
                                            height: '118px',
                                            padding: '1px',
                                            marginLeft: '34.6px',
                                            marginRight: '34.6px',
                                            backgroundColor: '#E50914',
                                            borderRadius: '2px',
                                            color: 'white',
                                            textAlign: 'center',
                                        }}
                                        onClick={selectStandard}
                                    >
                                        <div
                                            style={{
                                                marginTop: '48px',
                                                fontSize: '17px',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Standard
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        style={{
                                            width: '118px',
                                            height: '118px',
                                            padding: '1px',
                                            marginLeft: '34.6px',
                                            marginRight: '34.6px',
                                            backgroundColor: '#E50914',
                                            borderRadius: '2px',
                                            color: 'white',
                                            textAlign: 'center',
                                            opacity: '50%',
                                        }}
                                        onClick={selectStandard}
                                    >
                                        <div
                                            style={{
                                                marginTop: '48px',
                                                fontSize: '17px',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Standard
                                        </div>
                                    </div>
                                )}
                                {isPremium ? (
                                    <div
                                        style={{
                                            width: '118px',
                                            height: '118px',
                                            padding: '1px',
                                            marginLeft: '34.6px',
                                            marginRight: '34.6px',
                                            backgroundColor: '#E50914',
                                            borderRadius: '2px',
                                            color: 'white',
                                            textAlign: 'center',
                                        }}
                                        onClick={selectPremium}
                                    >
                                        <div
                                            style={{
                                                marginTop: '48px',
                                                fontSize: '17px',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Premium
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        style={{
                                            width: '118px',
                                            height: '118px',
                                            padding: '1px',
                                            marginLeft: '34.6px',
                                            marginRight: '34.6px',
                                            backgroundColor: '#E50914',
                                            borderRadius: '2px',
                                            color: 'white',
                                            textAlign: 'center',
                                            opacity: '50%',
                                        }}
                                        onClick={selectPremium}
                                    >
                                        <div
                                            style={{
                                                marginTop: '48px',
                                                fontSize: '17px',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Premium
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* categories */}
                        <div>
                            <div style={{ display: 'flex', float: 'right' }}>
                                <div
                                    style={{
                                        width: '346.391px',
                                        padding: '12px 16px 12px 16px',
                                    }}
                                >
                                    Monthly price after free month ends on
                                    February 26, 2021
                                </div>
                                <div
                                    style={{
                                        textAlign: 'center',
                                        display: 'flex',
                                    }}
                                >
                                    {isBasic ? (
                                        <div
                                            className="PlanIndex"
                                            style={{ color: '#E50914' }}
                                            onClick={selectBasic}
                                        >
                                            KRW9,500
                                        </div>
                                    ) : (
                                        <div
                                            className="PlanIndex"
                                            style={{ opacity: '30%' }}
                                            onClick={selectBasic}
                                        >
                                            KRW9,500
                                        </div>
                                    )}
                                    {isStandard ? (
                                        <div
                                            className="PlanIndex"
                                            style={{ color: '#E50914' }}
                                            onClick={selectStandard}
                                        >
                                            KRW12,000
                                        </div>
                                    ) : (
                                        <div
                                            className="PlanIndex"
                                            style={{ opacity: '30%' }}
                                            onClick={selectStandard}
                                        >
                                            KRW12,000
                                        </div>
                                    )}
                                    {isPremium ? (
                                        <div
                                            className="PlanIndex"
                                            style={{ color: '#E50914' }}
                                            onClick={selectPremium}
                                        >
                                            KRW14,500
                                        </div>
                                    ) : (
                                        <div
                                            className="PlanIndex"
                                            style={{ opacity: '30%' }}
                                            onClick={selectPremium}
                                        >
                                            KRW14,500
                                        </div>
                                    )}
                                </div>
                            </div>
                            <hr
                                style={{ margin: '0 0 0 0', opacity: '50%' }}
                            ></hr>
                            <div style={{ display: 'flex', float: 'right' }}>
                                <div
                                    style={{
                                        width: '346.391px',
                                        height: '36px',
                                        padding: '12px 16px 12px 16px',
                                        lineHeight: '35px',
                                    }}
                                >
                                    Video quality
                                </div>
                                <div
                                    style={{
                                        textAlign: 'center',
                                        display: 'flex',
                                    }}
                                >
                                    {isBasic ? (
                                        <div
                                            className="PlanIndex"
                                            style={{ color: '#E50914' }}
                                            onClick={selectBasic}
                                        >
                                            Good
                                        </div>
                                    ) : (
                                        <div
                                            className="PlanIndex"
                                            style={{ opacity: '30%' }}
                                            onClick={selectBasic}
                                        >
                                            Good
                                        </div>
                                    )}
                                    {isStandard ? (
                                        <div
                                            className="PlanIndex"
                                            style={{ color: '#E50914' }}
                                            onClick={selectStandard}
                                        >
                                            Better
                                        </div>
                                    ) : (
                                        <div
                                            className="PlanIndex"
                                            style={{ opacity: '30%' }}
                                            onClick={selectStandard}
                                        >
                                            Better
                                        </div>
                                    )}
                                    {isPremium ? (
                                        <div
                                            className="PlanIndex"
                                            style={{ color: '#E50914' }}
                                            onClick={selectPremium}
                                        >
                                            Best
                                        </div>
                                    ) : (
                                        <div
                                            className="PlanIndex"
                                            style={{ opacity: '30%' }}
                                            onClick={selectPremium}
                                        >
                                            Best
                                        </div>
                                    )}
                                </div>
                            </div>
                            <hr
                                style={{ margin: '0 0 0 0', opacity: '50%' }}
                            ></hr>
                            <div style={{ display: 'flex', float: 'right' }}>
                                <div
                                    style={{
                                        width: '346.391px',
                                        height: '36px',
                                        padding: '12px 16px 12px 16px',
                                        lineHeight: '35px',
                                    }}
                                >
                                    Resolution
                                </div>
                                <div
                                    style={{
                                        textAlign: 'center',
                                        display: 'flex',
                                    }}
                                >
                                    {isBasic ? (
                                        <div
                                            className="PlanIndex"
                                            style={{ color: '#E50914' }}
                                            onClick={selectBasic}
                                        >
                                            480p
                                        </div>
                                    ) : (
                                        <div
                                            className="PlanIndex"
                                            style={{ opacity: '30%' }}
                                            onClick={selectBasic}
                                        >
                                            480p
                                        </div>
                                    )}
                                    {isStandard ? (
                                        <div
                                            className="PlanIndex"
                                            style={{ color: '#E50914' }}
                                            onClick={selectStandard}
                                        >
                                            1080p
                                        </div>
                                    ) : (
                                        <div
                                            className="PlanIndex"
                                            style={{ opacity: '30%' }}
                                            onClick={selectStandard}
                                        >
                                            1080p
                                        </div>
                                    )}
                                    {isPremium ? (
                                        <div
                                            className="PlanIndex"
                                            style={{ color: '#E50914' }}
                                            onClick={selectPremium}
                                        >
                                            4K+HDR
                                        </div>
                                    ) : (
                                        <div
                                            className="PlanIndex"
                                            style={{ opacity: '30%' }}
                                            onClick={selectPremium}
                                        >
                                            4K+HDR
                                        </div>
                                    )}
                                </div>
                            </div>
                            <hr
                                style={{ margin: '0 0 0 0', opacity: '50%' }}
                            ></hr>
                            <div style={{ display: 'flex', float: 'right' }}>
                                <div
                                    style={{
                                        width: '346.391px',
                                        height: '36px',
                                        padding: '12px 16px 12px 16px',
                                        lineHeight: '35px',
                                    }}
                                >
                                    Screens you can watch on at the same time
                                </div>
                                <div
                                    style={{
                                        textAlign: 'center',
                                        display: 'flex',
                                    }}
                                >
                                    {isBasic ? (
                                        <div
                                            className="PlanIndex"
                                            style={{ color: '#E50914' }}
                                            onClick={selectBasic}
                                        >
                                            1
                                        </div>
                                    ) : (
                                        <div
                                            className="PlanIndex"
                                            style={{ opacity: '30%' }}
                                            onClick={selectBasic}
                                        >
                                            1
                                        </div>
                                    )}
                                    {isStandard ? (
                                        <div
                                            className="PlanIndex"
                                            style={{ color: '#E50914' }}
                                            onClick={selectStandard}
                                        >
                                            2
                                        </div>
                                    ) : (
                                        <div
                                            className="PlanIndex"
                                            style={{ opacity: '30%' }}
                                            onClick={selectStandard}
                                        >
                                            2
                                        </div>
                                    )}
                                    {isPremium ? (
                                        <div
                                            className="PlanIndex"
                                            style={{ color: '#E50914' }}
                                            onClick={selectPremium}
                                        >
                                            4
                                        </div>
                                    ) : (
                                        <div
                                            className="PlanIndex"
                                            style={{ opacity: '30%' }}
                                            onClick={selectPremium}
                                        >
                                            4
                                        </div>
                                    )}
                                </div>
                            </div>
                            <hr
                                style={{ margin: '0 0 0 0', opacity: '50%' }}
                            ></hr>
                            <div style={{ display: 'flex', float: 'right' }}>
                                <div
                                    style={{
                                        width: '346.391px',
                                        height: '36px',
                                        padding: '12px 16px 12px 16px',
                                    }}
                                >
                                    Watch on your TV, computer, mobile phone and
                                    tablet
                                </div>
                                <div
                                    style={{
                                        textAlign: 'center',
                                        display: 'flex',
                                    }}
                                >
                                    {isBasic ? (
                                        <div
                                            className="PlanIndex"
                                            style={{ color: '#E50914' }}
                                            onClick={selectBasic}
                                        >
                                            <svg
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    color: '#F6141D',
                                                }}
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"
                                                ></path>
                                            </svg>
                                        </div>
                                    ) : (
                                        <div
                                            className="PlanIndex"
                                            style={{ opacity: '30%' }}
                                            onClick={selectBasic}
                                        >
                                            <svg
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    color: 'black',
                                                }}
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"
                                                ></path>
                                            </svg>
                                        </div>
                                    )}
                                    {isStandard ? (
                                        <div
                                            className="PlanIndex"
                                            style={{ color: '#E50914' }}
                                            onClick={selectStandard}
                                        >
                                            <svg
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    color: '#F6141D',
                                                }}
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"
                                                ></path>
                                            </svg>
                                        </div>
                                    ) : (
                                        <div
                                            className="PlanIndex"
                                            style={{ opacity: '30%' }}
                                            onClick={selectStandard}
                                        >
                                            <svg
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    color: 'black',
                                                }}
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"
                                                ></path>
                                            </svg>
                                        </div>
                                    )}
                                    {isPremium ? (
                                        <div
                                            className="PlanIndex"
                                            style={{ color: '#E50914' }}
                                            onClick={selectPremium}
                                        >
                                            <svg
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    color: '#F6141D',
                                                }}
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"
                                                ></path>
                                            </svg>
                                        </div>
                                    ) : (
                                        <div
                                            className="PlanIndex"
                                            style={{ opacity: '30%' }}
                                            onClick={selectPremium}
                                        >
                                            <svg
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    color: 'black',
                                                }}
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"
                                                ></path>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <hr
                                style={{ margin: '0 0 0 0', opacity: '50%' }}
                            ></hr>
                            <div style={{ display: 'flex', float: 'right' }}>
                                <div
                                    style={{
                                        width: '346.391px',
                                        height: '36px',
                                        padding: '12px 16px 12px 16px',
                                        lineHeight: '35px',
                                    }}
                                >
                                    Unlimited movies and TV shows
                                </div>
                                <div
                                    style={{
                                        textAlign: 'center',
                                        display: 'flex',
                                    }}
                                >
                                    {isBasic ? (
                                        <div
                                            className="PlanIndex"
                                            style={{ color: '#E50914' }}
                                            onClick={selectBasic}
                                        >
                                            <svg
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    color: '#F6141D',
                                                }}
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"
                                                ></path>
                                            </svg>
                                        </div>
                                    ) : (
                                        <div
                                            className="PlanIndex"
                                            style={{ opacity: '30%' }}
                                            onClick={selectBasic}
                                        >
                                            <svg
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    color: 'black',
                                                }}
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"
                                                ></path>
                                            </svg>
                                        </div>
                                    )}
                                    {isStandard ? (
                                        <div
                                            className="PlanIndex"
                                            style={{ color: '#E50914' }}
                                            onClick={selectStandard}
                                        >
                                            <svg
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    color: '#F6141D',
                                                }}
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"
                                                ></path>
                                            </svg>
                                        </div>
                                    ) : (
                                        <div
                                            className="PlanIndex"
                                            style={{ opacity: '30%' }}
                                            onClick={selectStandard}
                                        >
                                            <svg
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    color: 'black',
                                                }}
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"
                                                ></path>
                                            </svg>
                                        </div>
                                    )}
                                    {isPremium ? (
                                        <div
                                            className="PlanIndex"
                                            style={{ color: '#E50914' }}
                                            onClick={selectPremium}
                                        >
                                            <svg
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    color: '#F6141D',
                                                }}
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"
                                                ></path>
                                            </svg>
                                        </div>
                                    ) : (
                                        <div
                                            className="PlanIndex"
                                            style={{ opacity: '30%' }}
                                            onClick={selectPremium}
                                        >
                                            <svg
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    color: 'black',
                                                }}
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"
                                                ></path>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <hr
                                style={{ margin: '0 0 0 0', opacity: '50%' }}
                            ></hr>
                            <div style={{ display: 'flex', float: 'right' }}>
                                <div
                                    style={{
                                        width: '346.391px',
                                        height: '36px',
                                        padding: '12px 16px 12px 16px',
                                        lineHeight: '35px',
                                    }}
                                >
                                    Cancel anytime
                                </div>
                                <div
                                    style={{
                                        textAlign: 'center',
                                        display: 'flex',
                                    }}
                                >
                                    {isBasic ? (
                                        <div
                                            className="PlanIndex"
                                            style={{ color: '#E50914' }}
                                            onClick={selectBasic}
                                        >
                                            <svg
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    color: '#F6141D',
                                                }}
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"
                                                ></path>
                                            </svg>
                                        </div>
                                    ) : (
                                        <div
                                            className="PlanIndex"
                                            style={{ opacity: '30%' }}
                                            onClick={selectBasic}
                                        >
                                            <svg
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    color: 'black',
                                                }}
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"
                                                ></path>
                                            </svg>
                                        </div>
                                    )}
                                    {isStandard ? (
                                        <div
                                            className="PlanIndex"
                                            style={{ color: '#E50914' }}
                                            onClick={selectStandard}
                                        >
                                            <svg
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    color: '#F6141D',
                                                }}
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"
                                                ></path>
                                            </svg>
                                        </div>
                                    ) : (
                                        <div
                                            className="PlanIndex"
                                            style={{ opacity: '30%' }}
                                            onClick={selectStandard}
                                        >
                                            <svg
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    color: 'black',
                                                }}
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"
                                                ></path>
                                            </svg>
                                        </div>
                                    )}
                                    {isPremium ? (
                                        <div
                                            className="PlanIndex"
                                            style={{ color: '#E50914' }}
                                            onClick={selectPremium}
                                        >
                                            <svg
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    color: '#F6141D',
                                                }}
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"
                                                ></path>
                                            </svg>
                                        </div>
                                    ) : (
                                        <div
                                            className="PlanIndex"
                                            style={{ opacity: '30%' }}
                                            onClick={selectPremium}
                                        >
                                            <svg
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    color: 'black',
                                                }}
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"
                                                ></path>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <hr
                                style={{ margin: '0 0 0 0', opacity: '50%' }}
                            ></hr>
                        </div>

                        <div style={{ marginTop: '50px', textAlign: 'center' }}>
                            <button
                                onClick={() => setStep(step + 1)}
                                style={{
                                    backgroundColor: '#E50914',
                                    borderRadius: '2px',
                                    width: '340px',
                                    height: '50px',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '17px',
                                    cursor: 'pointer',
                                }}
                            >
                                CONTINUE
                            </button>
                        </div>
                    </div>
                );

            case 5:
                return (
                    <div
                        style={{
                            width: '914px',
                            height: '560px',
                            padding: '20px 32px 60px 32px',
                            margin: '0 auto',
                            textAlign: 'center',
                        }}
                    >
                        <img src={secureimg} width="50px"></img>
                        <div
                            className="StepIndicator"
                            style={{
                                fontSize: '13px',
                                marginTop: '20px',
                                color: '#333333',
                            }}
                        >
                            {`STEP ${String(step)} OF 6`}
                        </div>
                        <div>
                            <h1
                                style={{
                                    fontSize: '23px',
                                    color: '#333333',
                                    marginBottom: '9.2px',
                                }}
                            >
                                Set up your payment.
                            </h1>
                        </div>
                        <div
                            style={{ marginTop: '20px', marginBottom: '20px' }}
                        >
                            <div
                                style={{
                                    fontSize: '16px',
                                    color: '#333333',

                                    margin: '0 auto',
                                    width: '205px',
                                    height: '60px',
                                }}
                            >
                                Your membership starts as soon as you set up
                                payment.
                            </div>
                        </div>

                        <div
                            style={{ marginTop: '20px', marginBottom: '20px' }}
                        >
                            <div
                                style={{
                                    fontSize: '16px',
                                    color: '#333333',

                                    margin: '0 auto',
                                    width: '205px',
                                    height: '60px',
                                }}
                            >
                                <b>No commitments.</b>
                                <br />
                                <b>Cancel online anytime.</b>
                            </div>
                        </div>
                        {/* credit card */}
                        <div
                            style={{ marginTop: '20px', marginBottom: '20px' }}
                        >
                            <div
                                onClick={() => setStep(step + 1)}
                                style={{
                                    cursor: 'pointer',
                                    margin: '0 auto',
                                    display: 'flex',
                                    height: '60px',
                                    width: '496px',
                                    border: 'solid 2px #CCCCCC',
                                    borderRadius: '5px',
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: '16px',
                                        color: '#333333',
                                        paddingTop: '20px',
                                        paddingLeft: '15px',
                                    }}
                                >
                                    Credit or Debit Card
                                </div>
                                <div
                                    style={{
                                        marginLeft: '10px',
                                        paddingTop: '12px',
                                    }}
                                >
                                    <img
                                        draggable="false"
                                        height="40px"
                                        src={cardimg}
                                    ></img>
                                </div>
                                <img
                                    draggable="false"
                                    src={chevronimg}
                                    style={{
                                        height: '19px',
                                        opacity: '33%',
                                        paddingTop: '20px',
                                        paddingLeft: '75px',
                                    }}
                                ></img>
                            </div>
                        </div>
                    </div>
                );

            case 6:
                return (
                    <div
                        style={{
                            width: '440px',
                            height: '890px',
                            padding: '20px 32px 60px 32px',
                            margin: '0 auto',
                            // textAlign: 'center',
                        }}
                    >
                        <div
                            className="StepIndicator"
                            style={{
                                fontSize: '13px',
                                color: '#333333',
                            }}
                        >
                            {`STEP ${String(step)} OF 6`}
                        </div>
                        <div>
                            <h1
                                style={{
                                    fontSize: '23px',
                                    color: '#333333',
                                    marginBottom: '3px',
                                }}
                            >
                                Set up your credit or debit card.
                            </h1>
                        </div>
                        <img
                            draggable="false"
                            height="40px"
                            src={cardimg}
                        ></img>

                        {/* credit card */}
                        <div style={{ marginBottom: '20px' }}>
                            <input
                                className="RegisterCredit"
                                placeholder="First Name"
                                type="text"
                                value={creditFirstName}
                                onChange={(e) =>
                                    setCreditFirstName(e.target.value)
                                }
                            />
                            <input
                                className="RegisterCredit"
                                placeholder="Last Name"
                                type="text"
                                value={creditLastName}
                                onChange={(e) =>
                                    setCreditLastName(e.target.value)
                                }
                            />
                            <input
                                className="RegisterCredit"
                                placeholder="Billing Zip Code"
                                type="text"
                                value={creditZipCode}
                                onChange={(e) =>
                                    setCreditZipCode(e.target.value)
                                }
                            />
                            <input
                                className="RegisterCredit"
                                placeholder="Card Number"
                                type="text"
                                value={creditCardNumber}
                                onChange={(e) =>
                                    setCreditCardNumber(e.target.value)
                                }
                            />
                            <input
                                className="RegisterCredit"
                                placeholder="Expiration Date (MM/YY)"
                                type="text"
                                value={creditExpirationDate}
                                onChange={(e) =>
                                    setCreditExpirationDate(e.target.value)
                                }
                            />
                            <input
                                className="RegisterCredit"
                                placeholder="Security Code (CVV)"
                                type="text"
                                value={creditCVV}
                                onChange={(e) => setCreditCVV(e.target.value)}
                            />
                        </div>

                        <div style={{ marginTop: '30px' }}>
                            <button
                                onClick={submitRegisteration}
                                style={{
                                    margin: '0 auto',
                                    marginTop: '10px',
                                    backgroundColor: '#F6141D',
                                    borderRadius: '2px',
                                    width: '440px',
                                    height: '48px',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '17px',
                                    cursor: 'pointer',
                                }}
                            >
                                START MEMBERSHIP
                            </button>
                        </div>
                    </div>
                );
            default:
                return;
        }
    };

    return <div>{isRegister ? <Redirect to="/" /> : indicator(step)}</div>;
};

export default RegisterForm;
