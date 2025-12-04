import style from "./login.module.scss";
import initLoginBg from "./init.ts";
import { useEffect, useState } from "react";
import { message, type RadioChangeEvent, Modal } from "antd";
const { confirm } = Modal;
import workDataAll from "../workdata";
import type { Work } from "../types/api";
import { SINGLE_QUIZ, MULTI_QUIZ, JUDGE_QUIZ } from "@/constant";

import {
  SettingOutlined,
  ExclamationCircleOutlined,
  FormOutlined,
} from "@ant-design/icons";
import Quiz from "../components/Quiz";
import Setting from "../components/Setting";
import {
  LIFE_ADD,
  LIFE_ERR,
  LIFE_INIT,
  QUIZ_PAGE,
  SETTING_PAGE,
} from "../constant";

const View = () => {
  // 加载完这个组件之后，加载背景
  useEffect(() => {
    initLoginBg();
    //window.onresize= function(){initLoginBg()};

    loadData();
  }, []);

  const getLifeInit = () => {
    return Math.ceil((LIFE_INIT * workDataAll[settingValue].length) / 150);
  };

  const msgSucess = (str: string) => {
    message.success(
      {
        content: str,
        className: "custom-class",
        style: {
          fontSize: "2rem",
          marginTop: "20vh",
        },
      },
      2,
    );
  };

  const msgError = (str: string) => {
    message.error(
      {
        content: str,
        className: "custom-class",
        style: {
          fontSize: "2rem",
          marginTop: "20vh",
        },
      },
      2,
    );
  };
  const saveData = () => {
    localStorage.setItem("value", value);
    localStorage.setItem("rightAnswer", rightAnswer);
    localStorage.setItem("workData", JSON.stringify(workData));
    localStorage.setItem("number", number.toString());
    localStorage.setItem("mulValue", JSON.stringify(mulValue));
    localStorage.setItem("quizType", quizType);
    localStorage.setItem("life", life.toString());
    localStorage.setItem("settingValue", settingValue.toString());
    localStorage.setItem("showAnswerBtn", showAnswerBtn.toString());
  };

  const loadData = () => {
    setValue(localStorage.getItem("value") || "");
    setRightAnswer(localStorage.getItem("rightAnswer") || "");

    if (localStorage.getItem("workData") !== "") {
      setWorkData(
        JSON.parse(localStorage.getItem("workData") as string) as Work,
      );
    }
    setNumber(parseInt(localStorage.getItem("number") || "1"));
    if (localStorage.getItem("mulValue") !== "") {
      setMulValue(JSON.parse(localStorage.getItem("mulValue") as string));
    }
    setLife(parseInt(localStorage.getItem("life") || getLifeInit().toString()));
    if (localStorage.getItem("quizType") !== "") {
      setQuizType(localStorage.getItem("quizType") as string);
    }

    if (localStorage.getItem("showAnswerBtn") !== "") {
      const tf = localStorage.getItem("showAnswerBtn") as string;
      if (tf === "true") {
        setShowAnswerBtn(true);
      } else if (tf === "false") {
        setShowAnswerBtn(false);
      }
    }
    setSettingValue(parseInt(localStorage.getItem("settingValue") || "0"));
  };

  const initData = () => {
    setValue("");
    setRightAnswer("");
    setWorkData(getRandomData(workDataAll[settingValue][0]));
    setNumber(1);
    setMulValue([""]);
    setLife(getLifeInit());
    setQuizType(SINGLE_QUIZ);
    setShowAnswerBtn(false);
    setSettingOpen(false);
  };

  const [value, setValue] = useState("");
  const [rightAnswer, setRightAnswer] = useState("");
  const [captchaImg, setCaptchImg] = useState("");

  const [workData, setWorkData] = useState<Work>(workDataAll[0][0]);
  const [number, setNumber] = useState(1);

  const [mulValue, setMulValue] = useState([""]);
  const [quizType, setQuizType] = useState(SINGLE_QUIZ);
  const [life, setLife] = useState(LIFE_INIT);
  const [lastSettingValue, setLastSettingValue] = useState(0);
  const [settingValue, setSettingValue] = useState(0);
  const [quizOrSetting, setQuizOrSetting] = useState(0);
  const [showAnswerBtn, setShowAnswerBtn] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);

  const getQuizType = () => {
    if (workDataAll[settingValue][number - 1].answer.length > 1) {
      if (workDataAll[settingValue][number - 1].answer.includes("J:")) {
        return JUDGE_QUIZ;
      }
      return MULTI_QUIZ;
    } else {
      return SINGLE_QUIZ;
    }
  };

  useEffect(() => {
    console.log("number 已更新为：", number, showAnswerBtn);
    setQuizType(getQuizType());
    saveData();
  }, [number, showAnswerBtn]);

  useEffect(() => {
    if (life <= 0) {
      msgError("游戏失败！");
      setNumber(1);
      setWorkData(getRandomData(workDataAll[settingValue][0]));
      setValue("");
      setMulValue([""]);
      setRightAnswer("");
      setLife(getLifeInit());
      setShowAnswerBtn(false);
    }
  }, [life, settingValue]);

  const onRadioChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    console.log(e.target.value);
  };

  const getMulRight = () => {
    let count = 0;

    if (mulValue.length !== workData.answer.length) return false;

    for (let i = 0; i < mulValue.length; i++) {
      if (workData.answer.includes(mulValue[i])) {
        count = count + 1;
      }
    }
    // console.log(count,workData.answer.length);
    if (count == workData.answer.length) {
      return true;
    }
    return false;
  };

  function shuffleArrayFisherYates(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // 随机选择一个索引交换位置
      [array[i], array[j]] = [array[j], array[i]]; // 通过解构赋值交换元素位置
    }
    return array;
  }

  const getRandomData = (input_data: Work): Work => {
    const data: Work = input_data;
    let answer_text: string[] = [];
    if (data.answer.includes("J:X") || data.answer.includes("J:O")) {
      return data;
    }

    if (data.answer.includes("A")) {
      answer_text.push(data.A);
    }
    if (data.answer.includes("B")) {
      answer_text.push(data.B);
    }
    if (data.answer.includes("C")) {
      answer_text.push(data.C);
    }
    if (data.answer.includes("D")) {
      answer_text.push(data.D);
    }
    //console.log(answer_text);
    const out: string[] = shuffleArrayFisherYates([
      data.A,
      data.B,
      data.C,
      data.D,
    ]);
    const out_data: Work = {
      A: out[0],
      B: out[1],
      C: out[2],
      D: out[3],
      answer: "",
      ask: data.ask,
    };

    for (let i = 0; i < answer_text.length; i++) {
      switch (answer_text[i]) {
        case out_data.A:
          out_data.answer += "A";
          break;
        case out_data.B:
          out_data.answer += "B";
          break;
        case out_data.C:
          out_data.answer += "C";
          break;
        case out_data.D:
          out_data.answer += "D";
          break;
      }
    }
    //console.log(out_data);
    out_data.answer = out_data.answer.split("").sort().join("");
    console.log(data);
    console.log(out_data);
    return out_data;
  };

  const judgeNext = () => {
    if (number < workDataAll[settingValue].length) {
      setRightAnswer("");
      setValue("");
      setMulValue([""]);

      if (number > 5 && number % 10 === 0) {
        setLife(life + LIFE_ADD);
        msgSucess("每过10关生命值 + " + LIFE_ADD.toString() + "，太棒了！");
      }
      setWorkData(getRandomData(workDataAll[settingValue][number]));
      setNumber(number + 1);
      setShowAnswerBtn(false);
      console.log("quizType", quizType, getQuizType());
      saveData();
    } else {
      msgSucess("太棒了，全部做完了!");
    }
  };

  const goNext = () => {
    //验证是否有空值
    if (getQuizType() === SINGLE_QUIZ) {
      console.log("本题目选择为：单选：", value);
      if (!value.trim()) {
        msgSucess("请选择!");
        return;
      }
      if (value !== workData.answer) {
        msgError("回答错误!");
        setLife(life - LIFE_ERR);
        setShowAnswerBtn(true);
        return;
      }

      judgeNext();
    }

    if (getQuizType() === MULTI_QUIZ) {
      console.log("本题目选择为：多选：", mulValue, mulValue.length);
      if (mulValue.length <= 1) {
        msgSucess("请选择!");
        return;
      }

      if (!getMulRight()) {
        msgError("回答错误!");
        setLife(life - LIFE_ERR);
        setShowAnswerBtn(true);
        return;
      }

      judgeNext();
    }

    if (getQuizType() === JUDGE_QUIZ) {
      console.log("本题目选择为：判断题：", mulValue);
      if (!value.trim()) {
        msgSucess("请选择!");
        return;
      }

      if (value !== workData.answer) {
        msgError("回答错误!");
        setLife(life - LIFE_ERR);
        setShowAnswerBtn(true);
        return;
      }

      judgeNext();
    }
  };
  const getAnswer = () => {
    console.log("答案是：", workData.answer);
    if (rightAnswer === "") {
      //setLife(life - LIFE_ERR)
      setRightAnswer(workData.answer);
    }
    setShowAnswerBtn(false);
  };
  const onCheckBoxChange: (checkedValues: string[]) => void = (
    checkedValues,
  ) => {
    console.log("checked = ", checkedValues);
    setMulValue(checkedValues as string[]);
  };

  const onSettingCheckBoxChange: (e: RadioChangeEvent) => void = (e) => {
    //console.log('checked = ', checkedValues);
    // setSettingData(e.target.value);
    setSettingValue(e.target.value);
    console.log(e.target.value);
  };
  const goBack = () => {
    if (settingValue !== lastSettingValue) {
      showConfirm();
    } else {
      setSettingValue(lastSettingValue);
      setQuizOrSetting(QUIZ_PAGE);
    }
  };
  const switchPage = () => {
    if (quizOrSetting === QUIZ_PAGE) {
      setQuizOrSetting(SETTING_PAGE);
      setSettingOpen(true);
      setLastSettingValue(settingValue);
    }
    if (quizOrSetting === SETTING_PAGE) {
      setSettingValue(lastSettingValue);
      setSettingOpen(false);
      setQuizOrSetting(QUIZ_PAGE);
    }
  };
  const showConfirm = () => {
    confirm({
      title: "要选择新的题库，重新开始吗?",
      icon: <ExclamationCircleOutlined />,
      content: "",
      okText: "是",
      cancelText: "否",
      style: {
        fontSize: "2rem",
        marginTop: "20vh",
      },
      onOk() {
        msgSucess("选择了新的题目，重新开始！");
        setLastSettingValue(settingValue);
        initData();
        setQuizOrSetting(QUIZ_PAGE);
      },
      onCancel() {
        console.log("Cancel");
        setSettingValue(lastSettingValue);
        setQuizOrSetting(QUIZ_PAGE);
      },
    });
  };
  return (
    <div className={style.loginPage}>
      {/* 登录盒子 */}
      <div className={style.loginBox}>
        <main className={style.main}>
          {/* 标题部分 */}
          <header className={style.title}>
            <div className={style.betweenBox}>
              <p className={style.quizName}>
                <FormOutlined />{" "}
                <span className={style.quizNameNumber}>{settingValue + 1}</span>
              </p>
              <SettingOutlined
                onClick={switchPage}
                className={style.settingIcon}
              />
            </div>
          </header>

          {/* 表单部分 */}
          <section>
            {
              <Quiz
                goNext={goNext}
                workData={workData}
                settingValue={settingValue}
                rightAnswer={rightAnswer}
                getAnswer={getAnswer}
                quizType={quizType}
                onRadioChange={onRadioChange}
                onCheckBoxChange={onCheckBoxChange}
                number={number}
                value={value}
                mulValue={mulValue}
                life={life}
                showAnswerBtn={showAnswerBtn}
              />
            }
            {
              <Setting
                onSettingCheckBoxChange={onSettingCheckBoxChange}
                settingValue={settingValue}
                goBack={goBack}
                settingOpen={settingOpen}
              />
            }
            {/*<div className='quiz'>*/}
          </section>

          {/*</div>*/}
        </main>
      </div>
    </div>
  );
};

export default View;
