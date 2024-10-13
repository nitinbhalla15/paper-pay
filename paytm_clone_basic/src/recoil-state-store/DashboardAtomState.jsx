import { atom, selector } from "recoil";

export const userDetailsAtom = atom({
    key:"userDetailsAtom",
    default:{
        currentBalance:undefined,
        userName:undefined,
        userEmail:undefined
    }
})

export const userList = atom({
    key:"userList",
    default:undefined
})

export const userNotFoundAtom = atom({
    key:"userNotFoundAtom",
    default:undefined
})

export const currentBalane = atom({
    key:"currentBalance",
    default:undefined
})