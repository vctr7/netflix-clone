import React, { useState, useEffect } from 'react';
import registerimg from '../img/register.png';
import checkimg from '../img/check.png';
import secureimg from '../img/secure.png';
import './RegisterForm.css';

const RegisterForm = ({ email }) => {
    const [step, setStep] = useState(1);
    const [registerEmail, setRegisterEmail] = useState(email);
    const [registerPassword, setRegisterPassword] = useState('');

    const [isBasic, setIsBasic] = useState(false);
    const [isStandard, setIsStandard] = useState(false);
    const [isPremium, setIsPremium] = useState(true);

    useEffect(() => {}, [registerEmail]);
    useEffect(() => {}, [registerPassword]);

    useEffect(() => {}, []);

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

    const indicator = (page) => {
        switch (page) {
            case 1:
                return (
                    <div className="RegisterForm">
                        <img src={registerimg} width="280px"></img>

                        <div
                            className="StepIndicator"
                            style={{ fontSize: '13px' }}
                        >
                            {`STEP ${String(step)} OF 5`}
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
                            style={{ fontSize: '13px' }}
                        >
                            {`STEP ${String(step)} OF 5`}
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

            case 3:
                return (
                    <div className="RegisterForm">
                        <img src={checkimg} width="50px"></img>
                        <div
                            className="StepIndicator"
                            style={{ fontSize: '13px', marginTop: '20px' }}
                        >
                            {`STEP ${String(step)} OF 5`}
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
                                    style={{ paddingLeft: '10px' , color: '#333333'}}
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
                                    style={{ paddingLeft: '10px' , color: '#333333'}}
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
                                    style={{ paddingLeft: '10px', color: '#333333' }}
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
                        <div style={{ fontSize: '13px', margin: 'none' }}>
                            {`STEP ${String(step)} OF 5`}
                        </div>

                        <div style={{ fontSize: '23px', fontWeight: '600' , color: '#333333'}}>
                            Choose the plan that’s right for you
                        </div>
                        <div style={{ fontSize: '16px' , color: '#333333'}}>
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
                    <div className="RegisterForm">
                        <img src={secureimg} width="50px"></img>
                        <div
                            className="StepIndicator"
                            style={{ fontSize: '13px', marginTop: '20px' }}
                        >
                            {`STEP ${String(step)} OF 5`}
                        </div>
                        <div>
                            <h1 style={{ fontSize: '23px', color: '#333333' }}>
                                Set up your payment.
                            </h1>
                        </div>
                        
                    </div>
                );
            default:
                return;
        }
    };

    return <div>{indicator(step)}</div>;
};

export default RegisterForm;
