export default function CustomButton({ btnName, clickFunction, isDisable }) {
    return <div className={`${isDisable ? `cursor-not-allowed bg-red-600 text-white` : `cursor-pointer bg-black text-white`} p-4 w-1/2 mt-5 rounded-2xl flex justify-center w-full`} disabled={isDisable} onClick={isDisable ? null : clickFunction}>
            {btnName}
        </div>
}