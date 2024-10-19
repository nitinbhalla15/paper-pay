import { atom, selector } from "recoil";

export const userList = atom({
    key:"userList",
    default:undefined
})

export const userNotFoundAtom = atom({
    key:"userNotFoundAtom",
    default:undefined
})

export const currentBalance = atom({
    key:"currentBalance",
    default:undefined
})
