import style from "../SingleQuiz/style.module.scss";
import { Button, Radio, Space } from "antd";
import classNames from "classnames";
import type { SettingProps } from "../../types/api";
import workDataAll from "../../workdata";
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
                  第一套{"(" + workDataAll[0].length + ")"}
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
                  第二套{"(" + workDataAll[1].length + ")"}
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
                  第三套{"(" + workDataAll[2].length + ")"}
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
                  第四套{"(" + workDataAll[3].length + ")"}
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
                  第五套{"(" + workDataAll[4].length + ")"}
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
                  第六套{"(" + workDataAll[5].length + ")"}
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
                  1.基础心理学{"(" + workDataAll[6].length + ")"}
                </span>
              ),
            },
            {
              value: 7,
              label: (
                <span
                  className={classNames(style.quizSpan, {
                    [style.rightAnswer]: settingValue === 7,
                  })}
                >
                  2.社会心理学{"(" + workDataAll[7].length + ")"}
                </span>
              ),
            },
            {
              value: 8,
              label: (
                <span
                  className={classNames(style.quizSpan, {
                    [style.rightAnswer]: settingValue === 8,
                  })}
                >
                  3.发展心理学{"(" + workDataAll[8].length + ")"}
                </span>
              ),
            },
            {
              value: 9,
              label: (
                <span
                  className={classNames(style.quizSpan, {
                    [style.rightAnswer]: settingValue === 9,
                  })}
                >
                  4.变态心理学{"(" + workDataAll[9].length + ")"}
                </span>
              ),
            },
            {
              value: 10,
              label: (
                <span
                  className={classNames(style.quizSpan, {
                    [style.rightAnswer]: settingValue === 10,
                  })}
                >
                  5.咨询心理学{"(" + workDataAll[10].length + ")"}
                </span>
              ),
            },
            {
              value: 11,
              label: (
                <span
                  className={classNames(style.quizSpan, {
                    [style.rightAnswer]: settingValue === 11,
                  })}
                >
                  6.心理诊断技能{"(" + workDataAll[11].length + ")"}
                </span>
              ),
            },
            {
              value: 12,
              label: (
                <span
                  className={classNames(style.quizSpan, {
                    [style.rightAnswer]: settingValue === 12,
                  })}
                >
                  7.心理咨询技能{"(" + workDataAll[12].length + ")"}
                </span>
              ),
            },
            {
              value: 13,
              label: (
                <span
                  className={classNames(style.quizSpan, {
                    [style.rightAnswer]: settingValue === 13,
                  })}
                >
                  8.心理测试技能{"(" + workDataAll[13].length + ")"}
                </span>
              ),
            },
            {
              value: 14,
              label: (
                <span
                  className={classNames(style.quizSpan, {
                    [style.rightAnswer]: settingValue === 14,
                  })}
                >
                  9.职业伦理{"(" + workDataAll[14].length + ")"}
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
