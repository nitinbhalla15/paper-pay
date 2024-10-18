import { useRecoilValue } from "recoil"
import { ErrorAtom } from "../recoil-state-store/ErrorAtom"

export default function ErrorComponent({ children }) {
    const getAllErrors = useRecoilValue(ErrorAtom);
    return (<div className="bg-slate-400">
        {children}
        {getAllErrors != undefined && (
            <div className="w-1/3 fixed top-4 right-4 bg-red-400 font-bold p-10 m-4 rounded-md shadow-lg shadow-indigo-500/50 ">
                <div className="text-4xl">Error !!</div>
                {getAllErrors.map(key => {
                    return <div className="uppercase text-2xl">{key}</div>
                })}
            </div>)}
    </div>)
}