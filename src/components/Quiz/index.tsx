import style from "../SingleQuiz/style.module.scss";
import { Button, Space } from "antd";
import workDataAll from "../../workdata";
import SingleQuiz from "../SingleQuiz";
import MultiQuiz from "../MultiQuiz";
import JudgeQuiz from "../JudgeQuiz";
import { JUDGE_QUIZ, MULTI_QUIZ, SINGLE_QUIZ } from "../../constant";
import type { QuizProps } from "../../types/api";
import { HeartFilled } from "@ant-design/icons";

const Quiz = ({
  number,
  workData,
  settingValue,
  quizType,
  onRadioChange,
  rightAnswer,
  value,
  life,
  onCheckBoxChange,
  goNext,
  getAnswer,
  showAnswerBtn,
  mulValue,
}: QuizProps) => {
  let askFontSize = 25;
  askFontSize = 28 - workData.ask.length / 20;

  return (
    <div className={style.quiz}>
      <div className={style.quizTitle}>
        <span className={style.quizNumber}>
          {number} / {workDataAll[settingValue].length}
        </span>
        <span className={style.quizLife}>
          <HeartFilled className={style.quizLifeIcon} /> {life}
        </span>
      </div>
      <p
        style={{
          fontSize: `${askFontSize}px`,
          fontWeight: "700",
          marginBottom: "2.4rem",
        }}
      >
        {workData.ask}
      </p>
      {quizType === SINGLE_QUIZ && (
        <SingleQuiz
          onRadioChange={onRadioChange}
          rightAnswer={rightAnswer}
          value={value}
          workData={workData}
        />
      )}

      {quizType === MULTI_QUIZ && (
        <MultiQuiz
          onCheckBoxChange={onCheckBoxChange}
          rightAnswer={rightAnswer}
          workData={workData}
          mulValue={mulValue}
        />
      )}

      {quizType === JUDGE_QUIZ && (
        <JudgeQuiz
          onRadioChange={onRadioChange}
          value={value}
          rightAnswer={rightAnswer}
        />
      )}

      <div style={{ display: "flex", justifyContent: "center" }}>
        {!showAnswerBtn && (
          <Button
            type="primary"
            className={style.nextBtn}
            block
            onClick={goNext}
          >
            下一题
          </Button>
        )}
        {showAnswerBtn && (
          <Button
            type="primary"
            className={style.answerBtn}
            block
            onClick={getAnswer}
          >
            答案
          </Button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
