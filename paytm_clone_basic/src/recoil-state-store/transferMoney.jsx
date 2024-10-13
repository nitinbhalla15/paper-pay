import { atom } from "recoil";

export const loggedInUser = atom({
    key:"loggedInUser",
    default:undefined
})

export const toMoneyAtom = atom({
    key:"toMoneyAtom",
    default:undefined
})

export const sendAmount = atom({
    key:"sendAmountAtom",
    default:undefined
})