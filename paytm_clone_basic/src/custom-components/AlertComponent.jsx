import { useRecoilValue } from "recoil"
import { AlertAtom, isAlert} from "../recoil-state-store/AlertAtom"

export default function AlertComponent({ children }) {
    const getAllErrors = useRecoilValue(AlertAtom);
    const getIsAlert = useRecoilValue(isAlert);
    return (<div className="bg-slate-400">
        {children}
        {getAllErrors != undefined && (
            <div className={`w-1/3 fixed text-white right-4 ${getIsAlert==false?'bg-red-700 top-4':'bg-green-700 bottom-4'} p-4 rounded-md`}>
                <div className="text-2xl">{getIsAlert==false?"Error !!":"Success !!"}</div>
                {getAllErrors.map(key => {
                    return <div className="uppercase">{key}</div>
                })}
            </div>)}
    </div>)
}