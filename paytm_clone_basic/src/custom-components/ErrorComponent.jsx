import { useRecoilValue } from "recoil"
import { ErrorAtom } from "../recoil-state-store/ErrorAtom"

export default function ErrorComponent({ children }) {
    const getAllErrors = useRecoilValue(ErrorAtom);
    return (<div className="bg-slate-400">
        {children}
        {getAllErrors != undefined && (
            <div className="w-1/3 fixed top-4 text-red-400 right-4 bg-black p-4 rounded-md ">
                <div className="text-2xl">Error !!</div>
                {getAllErrors.map(key => {
                    return <div className="uppercase">{key}</div>
                })}
            </div>)}
    </div>)
}