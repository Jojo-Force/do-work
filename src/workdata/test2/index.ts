import workDataSigle from './single.ts'
import workDataMulti from './multi.ts'
import workDataJudge from './judge.ts'
import type {Work} from "../../types/api";


const workData:Work[] = [
     ...workDataSigle,
     ...workDataMulti,
    ...workDataJudge,
]

export default workData