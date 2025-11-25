import {Radio} from "antd";
import classNames from "classnames";
import style from "./style.module.scss";
import type {SingleQuizProps} from "../../types/api";




function max(a: number, b: number): number {
    return a > b ? a : b;
}

const SingleQuiz = ({onRadioChange,
                     value,
                     rightAnswer,
                     workData }:SingleQuizProps) => {
    let maxLength = 0
    maxLength = max(workData.A.length, maxLength)
    maxLength = max(workData.B.length, maxLength)
    maxLength = max(workData.C.length, maxLength)
    maxLength = max(workData.D.length, maxLength)

    var SingleQuizRadioStyle = style.SingleQuizRadioSmall;
    if(maxLength < 10) {
        SingleQuizRadioStyle = style.SingleQuizRadioSmall;
    }
    else if(maxLength < 15) {
        SingleQuizRadioStyle = style.SingleQuizRadioMedium;
    }
    else if(maxLength >= 15) {
        SingleQuizRadioStyle = style.SingleQuizRadioLarge;
    }

    return (
        <Radio.Group
                className={SingleQuizRadioStyle}
                onChange={onRadioChange}
                value={value}
                options={[
                { value: 'A', label: <span className={classNames(style.quizSpan, {[style.rightAnswer]: rightAnswer === 'A'})}>{workData.A}</span> },
                { value: 'B', label: <span className={classNames(style.quizSpan, {[style.rightAnswer]: rightAnswer === 'B'})}>{workData.B}</span> },
                { value: 'C', label: <span className={classNames(style.quizSpan, {[style.rightAnswer]: rightAnswer === 'C'})}>{workData.C}</span> },
                { value: 'D', label: <span className={classNames(style.quizSpan, {[style.rightAnswer]: rightAnswer === 'D'})}>{workData.D}</span> }
                ]}
        />)


}

export default SingleQuiz;