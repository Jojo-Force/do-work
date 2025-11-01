import {Checkbox} from "antd";
import classNames from "classnames";
import style from "../SingleQuiz/style.module.scss";
import type {MultiQuizProps} from "../../types/api";


const MultiQuiz = ({onCheckBoxChange,rightAnswer,workData}:MultiQuizProps)=> {
    return (
        <Checkbox.Group style={{ display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: '10%'}} onChange={onCheckBoxChange}>
            <Checkbox value='A'><span className={classNames(style.quizSpan, {[style.rightAnswer]: rightAnswer.includes('A')})}>{workData.A}</span></Checkbox>
            <Checkbox value='B'><span className={classNames(style.quizSpan, {[style.rightAnswer]: rightAnswer.includes('B')})}>{workData.B}</span></Checkbox>
            <Checkbox value='C'><span className={classNames(style.quizSpan, {[style.rightAnswer]: rightAnswer.includes('C')})}>{workData.C}</span></Checkbox>
            <Checkbox value='D'><span className={classNames(style.quizSpan, {[style.rightAnswer]: rightAnswer.includes('D')})}>{workData.D}</span></Checkbox>
        </Checkbox.Group>
    )
}

export default MultiQuiz;