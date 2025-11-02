import style from './login.module.scss'
import initLoginBg from './init.ts'
import { useEffect, useState} from 'react'
import {
    message,
    type RadioChangeEvent,
    Modal,
} from 'antd';
const { confirm } = Modal;
import './login.less'
import { CaptchaAPI, } from '@/request/api';
import workDataAll from '../workdata';
import type {Work} from "../types/api";
import {SINGLE_QUIZ,MULTI_QUIZ,JUDGE_QUIZ}from '@/constant';

import {
    SettingOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import Quiz from "../components/Quiz";
import Setting from "../components/Setting";
import setting from "../components/Setting";
import {LIFE_ADD, LIFE_ERR, LIFE_INIT, QUIZ_PAGE, SETTING_PAGE} from "../constant";
const View = () => {
    // 加载完这个组件之后，加载背景
    useEffect(()=>{
        initLoginBg();
        window.onresize= function(){initLoginBg()};
        getCaptchaImg();


        loadData();
    },[])


    const msgSucess = (str:string) => {
        message.success({
            content: str,
            className: 'custom-class',
            style: {
                marginTop: '20vh',
            },
        },2);
    };

    const msgError = (str:string) => {
        message.error({
            content: str,
            className: 'custom-class',
            style: {
                marginTop: '20vh',
            },
        },2);
    };
    const saveData = () => {
        localStorage.setItem('value', value);
        localStorage.setItem('rightAnswer', rightAnswer);
        localStorage.setItem('workData', JSON.stringify(workData));
        localStorage.setItem('number', number.toString());
        localStorage.setItem('mulValue', JSON.stringify(mulValue));
        localStorage.setItem('quizType', quizType);
        localStorage.setItem('life', life.toString());
        localStorage.setItem('settingValue', settingValue.toString());
        localStorage.setItem('showAnswerBtn', showAnswerBtn.toString());
    }

    const loadData = () => {
        setValue(localStorage.getItem('value') || '');
        setRightAnswer(localStorage.getItem('rightAnswer') || '');

        if (localStorage.getItem('workData') !== '') {
            setWorkData(JSON.parse(localStorage.getItem('workData')as string) as Work);
        }
        setNumber(parseInt(localStorage.getItem('number') || '1'));
        if (localStorage.getItem('mulValue') !== '') {
            setMulValue(JSON.parse(localStorage.getItem('mulValue') as string));
        }
        setLife(parseInt(localStorage.getItem('life') || LIFE_INIT.toString()));
        if(localStorage.getItem('quizType') !== ''){
            setQuizType(localStorage.getItem('quizType') as string);
        }

        if(localStorage.getItem('showAnswerBtn') !== ''){
            setShowAnswerBtn(Boolean(localStorage.getItem('showAnswerBtn') as string));
        }
        setSettingValue(parseInt(localStorage.getItem('settingValue') || '0'))
    }

    const initData = () => {
        setValue('');
        setRightAnswer('');
        setWorkData(workDataAll[settingValue][0]);
        setNumber(1);
        setMulValue(['']);
        setLife(LIFE_INIT);
        setQuizType(SINGLE_QUIZ)
        setShowAnswerBtn(false)
    }

    //获取用户输入的信息
    const getCaptchaImg = async ()=>{
        // captchaAPI().then((res)=>{
        //     console.log(res);
        // })
        let capthaAPIRes = await CaptchaAPI();
        console.log(capthaAPIRes)
        if(capthaAPIRes.code === 200){
            setCaptchImg("data:imgae/gif;base64,"+capthaAPIRes.img)
            localStorage.setItem("uuid",capthaAPIRes.uuid)
        }
    }

    const [value, setValue] = useState('');
    const [rightAnswer, setRightAnswer] = useState("");
    const [captchaImg,setCaptchImg] = useState("");

    const [workData,setWorkData] = useState<Work>(workDataAll[0][0]);
    const [number,setNumber] = useState(1);

    const [mulValue,setMulValue] = useState(['']);
    const [quizType,setQuizType] = useState(SINGLE_QUIZ);
    const [life,setLife] = useState(LIFE_INIT);
    const [lastSettingValue,setLastSettingValue] = useState(0);
    const [settingValue,setSettingValue] = useState(0);
    const [quizOrSetting,setQuizOrSetting] = useState(0);
    const [showAnswerBtn,setShowAnswerBtn] = useState(false);

    const getQuizType = () => {
        if(workDataAll[settingValue][number-1].answer.length > 1) {
            if(workDataAll[settingValue][number-1].answer.includes("J:")) {
                return JUDGE_QUIZ
            }
            return MULTI_QUIZ
        }
        else {
            return SINGLE_QUIZ
        }
    }

    useEffect(() => {
        console.log('number 已更新为：', number);
        setQuizType(getQuizType())
        saveData()
    }, [number])
    

    useEffect(() => {
        if(life<= 0){
            msgError('亲爱的老婆：游戏失败，重来吧！')
            setNumber(1)
            setWorkData(workDataAll[settingValue][0]);
            setValue('');
            setMulValue(['']);
            setRightAnswer('');
            setLife(LIFE_INIT);
            setShowAnswerBtn(false);
        }
    }, [life,settingValue])

    const onRadioChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
        console.log(e.target.value);
    };

    const getMulRight = () => {
        let count = 0;

        if(mulValue.length !== workData.answer.length)
            return false;

        for(let i = 0; i < mulValue.length;i++) {
            if(workData.answer.includes(mulValue[i])) {
                count = count+1;
            }
        }
        // console.log(count,workData.answer.length);
        if (count == workData.answer.length) {
            return true;
        }
        return false
    }


    const judgeNext = () =>{
        if (number < workDataAll[settingValue].length) {
            setRightAnswer('');
            setValue('');
            setMulValue(['']);


            if(number > 5 && number % 10 === 0) {
                setLife(life + LIFE_ADD)
                msgSucess('每过10关生命值 + '+LIFE_ADD.toString()+'，太棒了，老婆！')
            }
            setWorkData(workDataAll[settingValue][number]);
            setNumber(number + 1);
            setShowAnswerBtn(false);
            console.log('quizType', quizType,getQuizType());
            saveData()
        } else {
            msgSucess("亲爱的老婆：太棒了，你真牛！全部做完了!")
        }
    }

    const goNext = () =>{
        //验证是否有空值
        if(getQuizType() === SINGLE_QUIZ) {
            console.log("本题目选择为：单选：", value)
            if (!value.trim()) {
                msgSucess("亲爱的老婆：请选择!")
                return
            }
            if (value !== workData.answer) {
                msgError("亲爱的老婆：回答错误!")
                setLife(life - LIFE_ERR)
                setShowAnswerBtn(true)
                return
            }

            judgeNext();
        }

        if(getQuizType() === MULTI_QUIZ)
        {
            console.log("本题目选择为：多选：", mulValue,mulValue.length)
            if(mulValue.length <= 1) {
                msgSucess("亲爱的老婆：请选择!")
                return
            }

            if(!getMulRight()) {
                msgError("亲爱的老婆：回答错误!")
                setLife(life - LIFE_ERR)
                setShowAnswerBtn(true)
                return
            }

            judgeNext();
        }

        if(getQuizType() === JUDGE_QUIZ)
        {
            console.log("本题目选择为：判断题：", mulValue)
            if (!value.trim()) {
                msgSucess("亲爱的老婆：请选择!")
                return
            }

            if (value !== workData.answer) {
                msgError("亲爱的老婆：回答错误!")
                setLife(life - LIFE_ERR)
                setShowAnswerBtn(true)
                return
            }

            judgeNext();
        }
    }
    const getAnswer = ()=>{
        console.log("答案是：",workData.answer)
        if(rightAnswer === "") {
            //setLife(life - LIFE_ERR)
            setRightAnswer(workData.answer);
        } else {
            setRightAnswer('');
        }
    }
    const onCheckBoxChange: (checkedValues:string[])=>void = (checkedValues)=> {
        console.log('checked = ', checkedValues);
        setMulValue(checkedValues as string[]);
    };

    const onSettingCheckBoxChange: (e: RadioChangeEvent)=>void = (e)=> {
        //console.log('checked = ', checkedValues);
        // setSettingData(e.target.value);
        setSettingValue(e.target.value);
        console.log(e.target.value);
    }
    const goBack = () => {
        if(settingValue !== lastSettingValue) {
            showConfirm()

        } else {
            setSettingValue(lastSettingValue)
            setQuizOrSetting(QUIZ_PAGE);
        }
    }
    const switchPage = () => {
        if(quizOrSetting === QUIZ_PAGE) {
            setQuizOrSetting(SETTING_PAGE);
            setLastSettingValue(settingValue);
        }
        if(quizOrSetting === SETTING_PAGE){
            setSettingValue(lastSettingValue);
            setQuizOrSetting(QUIZ_PAGE);
        }
    }
    const showConfirm = () => {
        confirm({
            title: '你确定要选择新的题库，重新开始吗?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText:'是',
            cancelText:'否',
            onOk() {
                msgSucess('选择了新的题目，重新开始！')
                setLastSettingValue(settingValue)
                initData()
                setQuizOrSetting(QUIZ_PAGE);
            },
            onCancel() {
                console.log('Cancel');
                setSettingValue(lastSettingValue)
                setQuizOrSetting(QUIZ_PAGE);
            },
        });
    };
    return (
        <div className={style.loginPage}>
            {/* 存放背景 */}
            <canvas id="bg-canvas" style={{display:"block"}}></canvas>
            {/* 登录盒子 */}
            <div className={style.loginBox+ " loginbox"}>
                {/* 标题部分 */}
                <div className={style.title}>
                    <h1 style={{fontSize:'18px'}}>老婆专属心理学刷题</h1>
                    <div className={style.betweenBox}>
                        <p style={{fontSize:'21px'}}>题库: {settingValue+1} 老婆加油！</p>
                        <SettingOutlined onClick={switchPage} style={{fontSize:"30px"}}/>
                    </div>
                </div>

                {/* 表单部分 */}

                {quizOrSetting === QUIZ_PAGE && <Quiz goNext={goNext}
                      workData={workData} settingValue={settingValue}
                      rightAnswer={rightAnswer}
                      getAnswer={getAnswer}
                      quizType={quizType}
                      onRadioChange={onRadioChange}
                      onCheckBoxChange={onCheckBoxChange}
                      number={number}
                      value={value}
                      life={life} showAnswerBtn={showAnswerBtn}
                />}
                {quizOrSetting === SETTING_PAGE && <Setting onSettingCheckBoxChange={onSettingCheckBoxChange}
                         settingValue={settingValue} goBack={goBack} goCancel={switchPage}/>}
                {/*<div className='quiz'>*/}


                {/*</div>*/}
            </div>

        </div>
    )
}

export default View