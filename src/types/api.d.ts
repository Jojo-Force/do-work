// 这个文件转为定义请求参数的类型，和响应的类型
// {
//     "msg":"22",
//     "img":"22",
//     "code":200,
//     "captchaEnabled":true,
//     "uuid":"222",
// }

import type Password from "antd/es/input/Password";

// 验证码的响应类型约束
interface CaptchaAPIRes {
    msg: string;
    img: string;
    code: number;
    captchaEnabled: boolean;
    uuid: string;
  }

interface LoginAPIReq {
    username: string;
    password: string;
    code: string;
    uuid: string;
}

interface LoginAPIRes {
    msg: string;
    code: number;
    token: string;
}

interface Work {
    ask: string;
    A: string;
    B: string;
    C: string;
    D: string;
    answer: string;
}