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

    if(maxLength < 10)
    {
        return (
            <Radio.Group
                    style={{        display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    paddingLeft: '20%',
                    gap: 8}}
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

    if(maxLength < 15)
    {
        return (
            <Radio.Group
                style={{        display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    paddingLeft: '10%',
                    gap: 4}}
                onChange={onRadioChange}
                value={value}
                options={[
                    { value: 'A', label: <span className={classNames(style.quizSpanMeduim, {[style.rightAnswer]: rightAnswer === 'A'})}>{workData.A}</span> },
                    { value: 'B', label: <span className={classNames(style.quizSpanMeduim, {[style.rightAnswer]: rightAnswer === 'B'})}>{workData.B}</span> },
                    { value: 'C', label: <span className={classNames(style.quizSpanMeduim, {[style.rightAnswer]: rightAnswer === 'C'})}>{workData.C}</span> },
                    { value: 'D', label: <span className={classNames(style.quizSpanMeduim, {[style.rightAnswer]: rightAnswer === 'D'})}>{workData.D}</span> }
                ]}
            />)
    }

    if(maxLength >= 15) {
        return (
            <Radio.Group
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: 1
                }}
                onChange={onRadioChange}
                value={value}
                options={[
                    {value: 'A',
                        label: <span
                            className={classNames(style.quizSpanSmall, {[style.rightAnswer]: rightAnswer === 'A'})}>{workData.A}</span>
                    },
                    {value: 'B',
                        label: <span
                            className={classNames(style.quizSpanSmall, {[style.rightAnswer]: rightAnswer === 'B'})}>{workData.B}</span>
                    },
                    {value: 'C',
                        label: <span
                            className={classNames(style.quizSpanSmall, {[style.rightAnswer]: rightAnswer === 'C'})}>{workData.C}</span>
                    },
                    {value: 'D',
                        label: <span
                            className={classNames(style.quizSpanSmall, {[style.rightAnswer]: rightAnswer === 'D'})}>{workData.D}</span>
                    }
                ]}
            />)
    }
}

export default SingleQuiz;