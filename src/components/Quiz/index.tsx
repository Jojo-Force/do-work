import style from "../SingleQuiz/style.module.scss";
import {Button, Space} from "antd";
import workDataAll from "../../workdata";
import SingleQuiz from "../SingleQuiz";
import MultiQuiz from "../MultiQuiz";
import JudgeQuiz from "../JudgeQuiz";
import {JUDGE_QUIZ, MULTI_QUIZ, SINGLE_QUIZ} from "../../constant";
import type {QuizProps} from "../../types/api";

const Quiz = ({number,workData,settingValue,quizType,onRadioChange,rightAnswer,value,life,onCheckBoxChange,goNext,getAnswer,showAnswerBtn}:QuizProps) =>{

    let askFontSize = 25
    askFontSize = 25 - workData.ask.length/20;

    return (
        <div className={style.quiz}>
            <Space direction="vertical" size="middle" style={{ display: 'flex', justifyContent: 'center'}}>
                <span className={style.quizNumber}>第{number}/{workDataAll[settingValue].length}题  生命：{life}</span>
                <p style={{  fontWeight: 'normal',
                    fontSize: `${askFontSize}px`}}>{workData.ask}</p>
                {quizType === SINGLE_QUIZ && <SingleQuiz onRadioChange={onRadioChange} rightAnswer={rightAnswer} value={value} workData={workData}/>}

                {quizType === MULTI_QUIZ && <MultiQuiz onCheckBoxChange={onCheckBoxChange} rightAnswer={rightAnswer} workData={workData}/>}

                {quizType === JUDGE_QUIZ && <JudgeQuiz onRadioChange={onRadioChange} value={value} rightAnswer={rightAnswer}/>}

                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button type="primary" className="loginBtn" block onClick={goNext}>下一题</Button>
                {showAnswerBtn && <Button type="primary" className="answerBtn" block onClick={getAnswer}>答案</Button>}
                </div>

            </Space>

        </div>
    )
}

export default Quiz;