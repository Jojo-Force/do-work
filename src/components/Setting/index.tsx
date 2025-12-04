import style from "../SingleQuiz/style.module.scss";
import { Button, Radio, Space } from "antd";
import classNames from "classnames";
import type { SettingProps } from "../../types/api";

const Setting = ({
  onSettingCheckBoxChange,
  settingValue,
  goBack,
  settingOpen,
}: SettingProps) => {
  return (
    <div
      className={classNames(style.setting, {
        [style.settingOpen]: settingOpen === true,
      })}
    >
      <div className={style.settingBox}>
        <span className={style.quizSpan}>选择题库</span>
        <Radio.Group
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "4px",
          }}
          onChange={onSettingCheckBoxChange}
          value={settingValue}
          options={[
            {
              value: 0,
              label: (
                <span
                  className={classNames(style.quizSpan, {
                    [style.rightAnswer]: settingValue === 0,
                  })}
                >
                  第一套
                </span>
              ),
            },
            {
              value: 1,
              label: (
                <span
                  className={classNames(style.quizSpan, {
                    [style.rightAnswer]: settingValue === 1,
                  })}
                >
                  第二套
                </span>
              ),
            },
            {
              value: 2,
              label: (
                <span
                  className={classNames(style.quizSpan, {
                    [style.rightAnswer]: settingValue === 2,
                  })}
                >
                  第三套
                </span>
              ),
            },
            {
              value: 3,
              label: (
                <span
                  className={classNames(style.quizSpan, {
                    [style.rightAnswer]: settingValue === 3,
                  })}
                >
                  第四套
                </span>
              ),
            },
            {
              value: 4,
              label: (
                <span
                  className={classNames(style.quizSpan, {
                    [style.rightAnswer]: settingValue === 4,
                  })}
                >
                  第一章
                </span>
              ),
            },
            {
              value: 5,
              label: (
                <span
                  className={classNames(style.quizSpan, {
                    [style.rightAnswer]: settingValue === 5,
                  })}
                >
                  第二章
                </span>
              ),
            },
            {
              value: 6,
              label: (
                <span
                  className={classNames(style.quizSpan, {
                    [style.rightAnswer]: settingValue === 6,
                  })}
                >
                  第三章
                </span>
              ),
            },
          ]}
        />

        <Button
          type="primary"
          className={style.settingBtn}
          block
          onClick={goBack}
        >
          确定
        </Button>
      </div>
    </div>
  );
};

export default Setting;
