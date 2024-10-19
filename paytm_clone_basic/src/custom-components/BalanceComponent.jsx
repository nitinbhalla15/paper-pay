export default function BalanceComponent({currentBalance}){
    return <div className="p-2 text-lg bg-black text-white  max-w-52 mt-4 rounded-md text-center">
            Your Balance : $ {currentBalance}
    </div>
}