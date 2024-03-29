import {useRouter} from 'next/router';
import Image from 'next/image';
import Layout from '../../../components/common/Layout';
import styles from '../../../styles/Survey.module.css';
import React, {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {
    selectedBodyPartState,
    selectedTargetBodyPartState,
    selectedPresentedSymptomState,
    showLoginConfirmState,
    currentOptionsState,
} from '../../../state/survey';
import home from '../../../../public/assets/icon/ic_home.png';
import before from '../../../../public/assets/icon/ic_before.png';
import hospital from '../../../../public/assets/icon/ic_hospital.png';
import {options} from '../../../../mock/SurveyMock';
import ShareButton from '../../../components/Share/ShareButton';
import {IOption} from '../../../types/server/survey';
import LoginConfirmPopup from '../../../components/common/LoginConfirmPopup';
import useSaveLocalContent from '../../../hooks/useSaveLocalContent';
import {useSaveHealthSurvey} from '../../../hooks/react-query/useSurvey';
import Alert, {AlertColor} from '@mui/material/Alert';

const Index = () => {
    const router = useRouter();
    const {getDecryptedCookie} = useSaveLocalContent();
    const accessToken = getDecryptedCookie('zzgg_at');
    const [alertInfo, setAlertInfo] = useState<{show: boolean; message: string; severity: AlertColor}>({
        show: false,
        message: '',
        severity: 'success',
    });
    const {id, targetBodyPart, diagnosisPart, presentedSymptom} = router.query;
    const [showLoginConfirm, setShowLoginConfirm] = useRecoilState(showLoginConfirmState);
    const [selectedBodyPart, setSelectedBodyPart] = useRecoilState(selectedBodyPartState);
    const [selectedTargetBodyPart, setSelectedTargetBodyPart] = useRecoilState(selectedTargetBodyPartState);
    const [selectedPresentedSymptom, setSelectedPresentedSymptom] = useRecoilState(selectedPresentedSymptomState);
    const [currentOptions, setCurrentOptions] = useRecoilState(currentOptionsState);
    const [maxClassName, setMaxClassName] = useState<string>('styles.options');
    const currentStage = parseInt(id as string, 10);
    
    useEffect(() => {
        setShowLoginConfirm(false);
    }, [setShowLoginConfirm]);
    
    const {mutate: saveHealthSurvey} = useSaveHealthSurvey();
    
    useEffect(() => {
        const {targetBodyPart, diagnosisPart, presentedSymptom} = router.query;
        
        if (typeof targetBodyPart === 'string') {
            setSelectedBodyPart(targetBodyPart);
        }
        if (typeof diagnosisPart === 'string') {
            setSelectedTargetBodyPart(diagnosisPart);
        }
        if (typeof presentedSymptom === 'string') {
            setSelectedPresentedSymptom(presentedSymptom);
        }
    }, [router.query, setSelectedBodyPart, setSelectedPresentedSymptom, setSelectedTargetBodyPart]);
    
    useEffect(() => {
        let newFilteredOptions = options.filter(option => option.stage === currentStage);
        
        if (currentStage === 2 && selectedBodyPart) {
            newFilteredOptions = newFilteredOptions.filter(option => option.targetBodyPart === selectedBodyPart);
        } else if (currentStage === 3 && selectedBodyPart && selectedTargetBodyPart) {
            newFilteredOptions = newFilteredOptions.filter(option =>
                option.targetBodyPart === selectedBodyPart &&
                option.diagnosisPart === selectedTargetBodyPart);
        } else if (currentStage === 4 && selectedBodyPart && selectedTargetBodyPart && selectedPresentedSymptom) {
            newFilteredOptions = newFilteredOptions.filter(option =>
                option.targetBodyPart === selectedBodyPart &&
                option.diagnosisPart === selectedTargetBodyPart &&
                option.presentedSymptom === selectedPresentedSymptom);
        }
        
        setCurrentOptions(newFilteredOptions);
    }, [currentStage, selectedBodyPart, selectedTargetBodyPart, selectedPresentedSymptom]);
    
    const SurveyAskText = () => {
        switch (currentStage) {
            case 1:
                return <>직짱인 님이 <b>체크하고 싶은 부위</b>는 어디인가요?</>;
            case 2:
                return <><b>{'\''}{targetBodyPart}{'\''}</b> 중에서 <b>어떤 부분의 진단</b>이 필요하세요?</>;
            case 3:
                return <> 해당하는 <b>증상</b>을 선택하세요!</>;
            case 4:
                return (
                    <>
                        <>직짱인 님, <b>이런 증상이 의심</b> 돼요!</>
                        <br />
                        <>결과를 토대로 <b>병원을 추천</b> 드릴게요.</>
                    </>
                );
            default:
                return <>잘못된 접근입니다. 유효한 설문 페이지를 선택해 주세요.</>;
        }
    };
    
    const splitTextIntoLines = (text: string) => {
        let result = '';
        
        if (!text) return '';
        if (text.length <= 10) return text;
        
        for (let i = 0; i < text.length; i += 10) {
            const nextChunk = text.substring(i, i + 10);
            result += nextChunk;
            
            if (i + 10 < text.length) result += '\n';
        }
        
        return result;
    };
    
    const SurveyAnswerText = (currentStage: number, option: IOption) => {
        let text: string | undefined;
        switch (currentStage) {
            case 1:
                text = option.targetBodyPart;
                break;
            case 2:
                text = option.diagnosisPart;
                break;
            case 3:
                text = option.presentedSymptom;
                break;
            case 4:
                text = option.disease || option.department;
                break;
            default:
                text = '';
        }
        return splitTextIntoLines(text as string);
    };
    
    
    const goToNextPage = (selectedOption: IOption) => {
        const nextId = currentStage + 1;
        if (nextId <= 4) {
            let query = `/Survey/${nextId}?targetBodyPart=${selectedOption.targetBodyPart}&diagnosisPart=${selectedOption.diagnosisPart}&presentedSymptom=${selectedOption.presentedSymptom}`;
            router.push(query);
        }
    };
    
    const homeButton = () => {
        setAlertInfo({show: true, message: '건강설문 데이터가 없어집니다!', severity: 'warning'});
        router.push('/');
    };
    
    const choiceHospitalButton = (currentOptions: any[], forceRedirect: boolean = false) => {
        const diseases = currentOptions
            .filter((option: {disease?: string}) => option.disease)
            .map((option: {disease: string}) => option.disease);
        const departments = currentOptions
            .filter((option: {department?: string}) => option.department)
            .map((option: {department: string}) => option.department);
        const surveyOption = {
            disease: diseases.join(','),
            department: departments.join(','),
            diagnosisPart,
            presentedSymptom,
            targetBodyPart,
        };
        
        if (!accessToken && !forceRedirect) {
            localStorage.setItem('surveyOption', JSON.stringify(surveyOption));
            setShowLoginConfirm(true);
        } else if (accessToken) {
            saveHealthSurvey(surveyOption, {
                onSuccess: (response) => {
                    if (response.success) {
                        router.push({
                            pathname: '/Map',
                            query: {
                                disease: diseases.join(','),
                                department: departments.join(','),
                            },
                        });
                    } else {
                        setAlertInfo({show: true, message: '건강 설문 저장을 실패하였습니다. 잠시 후 시도 해주세요.', severity: 'error'});
                    }
                },
                onError: (error) => {
                    console.error('건강 설문 저장 중 오류 발생:', error);
                    setAlertInfo({show: true, message: '건강 설문 저장 중 문제가 발생했습니다. 잠시 후 시도 해주세요.', severity: 'error'});
                },
            });
        } else {
            if (diseases.length > 0 && departments.length > 0) {
                router.push({
                    pathname: '/Map',
                    query: {
                        disease: diseases.join(','),
                        department: departments.join(','),
                    },
                });
            }
        }
    };
    
    const handleLoginConfirm = () => {
        router.push('/Login');
    };
    
    const handleCancelLogin = () => {
        setShowLoginConfirm(false);
        choiceHospitalButton(currentOptions, true);
    };
    
    const handleCloseAlert = () => {
        setAlertInfo({...alertInfo, show: false});
    };
    
    useEffect(() => {
        let timer: any;
        if (alertInfo.show) {
            timer = setTimeout(() => {
                setAlertInfo({...alertInfo, show: false});
            }, 1500);
        }
        return () => clearTimeout(timer);
    }, [alertInfo.show]);
    
    useEffect(() => {
        const updateClassName = () => {
            if (typeof window !== 'undefined') {
                if (window.innerWidth >= 1920 && currentOptions.length > 10) {
                    setMaxClassName(styles.max_options);
                } else if (window.innerWidth >= 1920 && currentOptions.length < 10) {
                    setMaxClassName(styles.options);
                } else if (window.innerWidth < 1920 && currentOptions.length > 5) {
                    setMaxClassName(styles.max_options);
                } else if (window.innerWidth < 1920 && currentOptions.length < 5) {
                    setMaxClassName(styles.options);
                }
            }
        };
        
        updateClassName();
        window.addEventListener('resize', updateClassName);
        
        return () => {
            window.removeEventListener('resize', updateClassName);
        };
    }, [currentOptions]);
    
    return (
        <Layout>
            {alertInfo.show && (
                <Alert
                    severity={alertInfo.severity}
                    onClose={handleCloseAlert}
                    style={{position: 'fixed', top: 200, left: '50%', transform: 'translateX(-50%)', zIndex: 1000}}
                >
                    {alertInfo.message}
                </Alert>
            )}
            {showLoginConfirm && (
                <LoginConfirmPopup onConfirm={handleLoginConfirm} onCancel={handleCancelLogin} />
            )}
            <div className={styles.quizContainer}>
                <div
                    className={currentStage < 4 ? styles.question_num : styles.question_complete}>{currentStage < 4 ? currentStage : <>설문
                    완료!</>}</div>
                <div className={currentStage < 4 ? styles.question : styles.question_complete_title}>
                    <SurveyAskText />
                </div>
                <div style={{marginTop: currentStage === 4 ? '64px' : '122px'}}
                     className={maxClassName}>
                    {currentOptions.map(option => {
                        const imageSrc = option.image;
                        const optionText = SurveyAnswerText(currentStage, option);
                        if (!imageSrc || !optionText) {
                            return null;
                        }
                        const handleClick = () => {
                            if (currentStage < 4 || optionText !== null) {
                                goToNextPage(option);
                            }
                        };
                        
                        if (imageSrc && optionText) {
                            return (
                                <div key={option.id} style={{ marginLeft: '35px'}}
                                     className={`${currentStage === 4 ? styles.cursorNone : ''}`}
                                     onClick={handleClick}>
                                    <Image src={imageSrc} alt="survey-option" className={styles.option} width={150}
                                           height={150}
                                           priority
                                    />
                                    <br />
                                    <div className={styles.survey_text}>
                                        {optionText}
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
            <div className={currentStage === 4 ? styles.fixed_buttons_container : styles.fixed_buttons_container_first}>
                {currentStage > 1 && (
                    <>
                        <button className={styles.before_button} onClick={() => router.back()}>
                            <Image src={before} alt="before" width={8} height={15} />
                            <span className={styles.text}>전 단계로 돌아가기</span>
                        </button>
                        {currentStage < 4 && (
                            <button className={styles.home_button} onClick={homeButton}>
                                <Image src={home} alt="home" width={14} height={16} />
                                <span className={styles.text}>직<b>짱</b>건강</span>
                            </button>
                        )}
                    </>
                )}
                {currentStage === 4 && (
                    <>
                        <button className={styles.hospital_button} onClick={() => choiceHospitalButton(currentOptions)}>
                            <span className={styles.text}>추천병원</span>
                            <Image src={hospital} alt="hospital" width={16} height={16} />
                        </button>
                        <ShareButton />
                    </>
                )}
            </div>
        </Layout>
    );
};

export async function getServerSideProps(context: {
    query: {targetBodyPart: IOption; diagnosisPart: IOption; presentedSymptom: IOption;};
}) {
    const {targetBodyPart, diagnosisPart, presentedSymptom} = context.query;
    
    return {
        props: {
            initialBodyPart: targetBodyPart || null,
            initialTargetBodyPart: diagnosisPart || null,
            initialPresentedSymptom: presentedSymptom || null,
        },
    };
}


export default Index;
