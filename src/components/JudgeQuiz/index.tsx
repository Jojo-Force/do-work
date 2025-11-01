import {Radio} from "antd";
import classNames from "classnames";
import style from "../SingleQuiz/style.module.scss";
import type {JudgeQuizProps} from "../../types/api";


const JudgeQuiz = ({onRadioChange,value,rightAnswer}:JudgeQuizProps) =>{
    return (
        <Radio.Group
            style={{        display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingLeft: '120px',
                gap: 8}}
                onChange={onRadioChange}
                value={value}
                options={[
                { value: 'J:O', label: <span className={classNames(style.quizSpan, {[style.rightAnswer]: rightAnswer === 'J:O'})}>正确</span> },
                { value: 'J:X', label: <span className={classNames(style.quizSpan, {[style.rightAnswer]: rightAnswer === 'J:X'})}>错误</span> },
            ]}
        />
    )
}


export default JudgeQuiz;