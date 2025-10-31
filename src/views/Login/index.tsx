import style from './login.module.scss'
import initLoginBg from './init.ts'
import { useEffect, useState, type ChangeEvent } from 'react'
import {Button, Input, Space, message, Checkbox, type CheckboxProps, Radio, type RadioChangeEvent} from 'antd';
import './login.less'
import {useNavigate} from "react-router-dom"
import { CaptchaAPI,LoginAPI } from '@/request/api';
import classNames from "classnames";
import workDataAll from '../../workdata';
import type {Work} from "../../types/api";

const View = () => {
    let navigateTo = useNavigate();
    // 加载完这个组件之后，加载背景
    useEffect(()=>{
        initLoginBg();
        window.onresize= function(){initLoginBg()};
        getCaptchaImg();
    },[])

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
    const onRadioChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
        console.log(e.target.value);
    };

    const goNext = () =>{
        console.log("本题目选择为：", value)
        //验证是否有空值
        if(!value.trim()){
            alert("亲爱的老婆：请选择!")
            return
        }
        if(value !== workData.answer){
            alert("亲爱的老婆：回答错误!")
            return
        }

        if(number < workDataAll.length) {
            setRightAnswer('');
            setValue('');
            setWorkData(workDataAll[number]);
            setNumber(number + 1);
        }
        else{
            alert("亲爱的老婆：全部做完!")
        }
    }
    const getAnswer = ()=>{
        console.log("答案是：",workData.answer)
        if(rightAnswer === "") {
            setRightAnswer(workData.answer);
        } else {
            setRightAnswer('');
        }
    }
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
                    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                        <span className={style.quizNumber}>第{number}题：</span>
                        <p className={style.quizAsk}>{workData.ask}</p>
                        <Radio.Group
                            style={{        display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                paddingLeft: '120px',
                                gap: 8}}
                            onChange={onRadioChange}
                            value={value}
                            options={[
                                { value: 'A', label: <span className={classNames(style.quizSpan, {[style.rightAnswer]: rightAnswer === 'A'})}>{workData.A}</span> },
                                { value: 'B', label: <span className={classNames(style.quizSpan, {[style.rightAnswer]: rightAnswer === 'B'})}>{workData.B}</span> },
                                { value: 'C', label: <span className={classNames(style.quizSpan, {[style.rightAnswer]: rightAnswer === 'C'})}>{workData.C}</span> },
                                { value: 'D', label: <span className={classNames(style.quizSpan, {[style.rightAnswer]: rightAnswer === 'D'})}>{workData.D}</span> }
                            ]}
                        />
                        <Button type="primary" className="loginBtn" block onClick={goNext}>下一题</Button>
                        <Button type="primary" className="loginBtn" block onClick={getAnswer}>答案</Button>
                    </Space>

                </div>
                {/*<div className='quiz'>*/}


                {/*</div>*/}
            </div>

        </div>
    )
}

export default View