export default function LaunchCard({children}){
    return <div className="flex justify-center h-screen bg-slate-800">
    <div className="m-2 p-20 flex flex-col justify-center bg-slate-900 text-white rounded-2xl w-1/2 shadow-2xl shadow-indigo-500/50">
       {children}
    </div> 
</div>
}