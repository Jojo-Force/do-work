import style from './login.module.scss'
import initLoginBg from './init.ts'
import { useEffect, useState, type ChangeEvent } from 'react'
import {
    Button,
    Input,
    Space,
    message,
    Checkbox,
    type CheckboxProps,
    Radio,
    type RadioChangeEvent,
    type GetProp
} from 'antd';
import './login.less'
import {useNavigate} from "react-router-dom"
import { CaptchaAPI,LoginAPI } from '@/request/api';
import classNames from "classnames";
import workDataAll from '../workdata';
import type {Work} from "../types/api";
import {SINGLE_QUIZ,MULTI_QUIZ,JUDGE_QUIZ}from '@/constant';
import SingleQuiz from "../components/SingleQuiz";
import MultiQuiz from "../components/MultiQuiz";
import JudgeQuiz from "../components/JudgeQuiz";
const View = () => {
    let navigateTo = useNavigate();
    // 加载完这个组件之后，加载背景
    useEffect(()=>{
        initLoginBg();
        window.onresize= function(){initLoginBg()};
        getCaptchaImg();


        loadData();
    },[])


    const saveData = () => {
        localStorage.setItem('value', value);
        localStorage.setItem('rightAnswer', rightAnswer);
        localStorage.setItem('workData', JSON.stringify(workData));
        localStorage.setItem('number', number.toString());
        localStorage.setItem('mulValue', JSON.stringify(mulValue));
        localStorage.setItem('quizType', quizType);
        localStorage.setItem('life', life.toString());
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
        setLife(parseInt(localStorage.getItem('life') || '3'));
        if(localStorage.getItem('quizType') !== ''){
            setQuizType(localStorage.getItem('quizType') as string);
        }
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

    const [workData,setWorkData] = useState<Work>(workDataAll[0]);
    const [number,setNumber] = useState(1);

    const [mulValue,setMulValue] = useState(['']);
    const [quizType,setQuizType] = useState(SINGLE_QUIZ);
    const [life,setLife] = useState(3);

    const getQuizType = () => {
        if(workDataAll[number-1].answer.length > 1) {
            if(workDataAll[number-1].answer.includes("J:")) {
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
    }, [getQuizType, number, saveData])
    

    useEffect(() => {
        if(life<= 0){
            alert('亲爱的老婆：游戏失败，重来吧！')
            setNumber(1)
            setWorkData(workDataAll[0]);
            setValue('');
            setMulValue(['']);
            setRightAnswer('');
        }
    }, [life])

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
        if(count == workData.answer.length) {
            return true;
        }
        return false
    }
    
    const judgeNext = () =>{
        if (number < workDataAll.length) {
            setRightAnswer('');
            setValue('');
            setRightAnswer('');
            setMulValue(['']);
            if(number > 5 && number % 10 === 0) {
                setLife(life+1)
                alert('每过10关生命值+1，太棒了，老婆！')
            }
            setWorkData(workDataAll[number]);
            setNumber(number + 1);
            console.log('quizType', quizType,getQuizType());
            saveData()
        } else {
            alert("亲爱的老婆：全部做完!")
        }
    }

    const goNext = () =>{
        //验证是否有空值
        if(getQuizType() === SINGLE_QUIZ) {
            console.log("本题目选择为：单选：", value)
            if (!value.trim()) {
                alert("亲爱的老婆：请选择!")
                return
            }
            if (value !== workData.answer) {
                alert("亲爱的老婆：回答错误!")
                setLife(life-1)
                return
            }

            judgeNext();
        }

        if(getQuizType() === MULTI_QUIZ)
        {
            console.log("本题目选择为：多选：", mulValue)
            if(mulValue.length == 0) {
                alert("亲爱的老婆：请选择!")
                return
            }

            if(!getMulRight()) {
                alert("亲爱的老婆：回答错误!")
                setLife(life-1)
                return
            }

            judgeNext();
        }

        if(getQuizType() === JUDGE_QUIZ)
        {
            console.log("本题目选择为：判断题：", mulValue)
            if (!value.trim()) {
                alert("亲爱的老婆：请选择!")
                return
            }

            if (value !== workData.answer) {
                alert("亲爱的老婆：回答错误!")
                setLife(life-1)
                return
            }

            judgeNext();
        }
    }
    const getAnswer = ()=>{
        console.log("答案是：",workData.answer)
        if(rightAnswer === "") {
            setLife(life-1)
            setRightAnswer(workData.answer);
        } else {
            setRightAnswer('');
        }
    }
    const onCheckBoxChange: (checkedValues:string[])=>void = (checkedValues)=> {
        console.log('checked = ', checkedValues);
        setMulValue(checkedValues as string[]);
    };
    return (
        <div className={style.loginPage}>
            {/* 存放背景 */}
            <canvas id="bg-canvas" style={{display:"block"}}></canvas>
            {/* 登录盒子 */}
            <div className={style.loginBox+ " loginbox"}>
                {/* 标题部分 */}
                <div className={style.title}>
                    <h1>Jojo的心理学刷题APP</h1>
                    <p>老婆加油！</p>
                </div>

                {/* 表单部分 */}
                <div className={style.quiz}>
                    <Space direction="vertical" size="large" style={{ display: 'flex', justifyContent: 'center'}}>
                        <span className={style.quizNumber}>第{number}/{workDataAll.length}题  生命：{life}</span>
                        <p className={style.quizAsk}>{workData.ask}</p>
                        {quizType === SINGLE_QUIZ && <SingleQuiz onRadioChange={onRadioChange} rightAnswer={rightAnswer} value={value} workData={workData}/>}

                        {quizType === MULTI_QUIZ && <MultiQuiz onCheckBoxChange={onCheckBoxChange} rightAnswer={rightAnswer} workData={workData}/>}

                        {quizType === JUDGE_QUIZ && <JudgeQuiz onRadioChange={onRadioChange} value={value} rightAnswer={rightAnswer}/>}

                        <Button type="primary" className="loginBtn" block onClick={goNext}>下一题</Button>
                        <Button type="primary" className="answerBtn" block onClick={getAnswer}>答案</Button>

                    </Space>

                </div>
                {/*<div className='quiz'>*/}


                {/*</div>*/}
            </div>

        </div>
    )
}

export default View