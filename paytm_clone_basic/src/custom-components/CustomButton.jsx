export default function CustomButton({ btnName, clickFunction, isDisable }) {
    console.log("IS disable: ",isDisable)
    return <div className="flex justify-center">
        <div className={`${isDisable ? `cursor-not-allowed bg-red-600 text-white` : `cursor-pointer bg-white text-black`} p-4 w-1/2 mt-5 rounded-2xl flex justify-center`} disabled={isDisable} onClick={isDisable ? null : clickFunction}>
            {btnName}
        </div>
    </div>
}