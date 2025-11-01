import {Radio} from "antd";
import classNames from "classnames";
import style from "./style.module.scss";
import type {SingleQuizProps} from "../../types/api";




const SingleQuiz = ({onRadioChange,
                     value,
                     rightAnswer,
                     workData }:SingleQuizProps) => {

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
                { value: 'A', label: <span className={classNames(style.quizSpan, {[style.rightAnswer]: rightAnswer === 'A'})}>{workData.A}</span> },
                { value: 'B', label: <span className={classNames(style.quizSpan, {[style.rightAnswer]: rightAnswer === 'B'})}>{workData.B}</span> },
                { value: 'C', label: <span className={classNames(style.quizSpan, {[style.rightAnswer]: rightAnswer === 'C'})}>{workData.C}</span> },
                { value: 'D', label: <span className={classNames(style.quizSpan, {[style.rightAnswer]: rightAnswer === 'D'})}>{workData.D}</span> }
                ]}
        />
    )
}

export default SingleQuiz;