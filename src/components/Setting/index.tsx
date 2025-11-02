import style from "../SingleQuiz/style.module.scss";
import {Button, Radio, Space} from "antd";
import classNames from "classnames";
import type {SettingProps} from "../../types/api";

const Setting = ({onSettingCheckBoxChange,settingValue,goBack}:SettingProps) =>{
    return (
        <div className={style.quiz}>

            <Space direction="vertical" size="large" style={{ display: 'flex', justifyContent: 'center'}}>
                <span className={style.quizSpan}>选择题库：</span>
                <Radio.Group
                    style={{        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        paddingLeft: '120px',
                        gap: 8}}
                    onChange={onSettingCheckBoxChange}
                    value={settingValue}
                    options={[
                        { value: 0, label: <span className={classNames(style.quizSpan, {[style.rightAnswer]: settingValue === 0})}>第一套</span> },
                        { value: 1, label: <span className={classNames(style.quizSpan, {[style.rightAnswer]: settingValue === 1})}>第二套</span> },
                        { value: 2, label: <span className={classNames(style.quizSpan, {[style.rightAnswer]: settingValue === 2})}>第三套</span> },
                        { value: 3, label: <span className={classNames(style.quizSpan, {[style.rightAnswer]: settingValue === 3})}>第四套</span> }
                    ]}
                />

                <Button type="primary" className="loginBtn" block onClick={goBack}>确定</Button>
            </Space>

        </div>
    )
}

export default Setting;