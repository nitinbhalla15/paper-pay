package com.paytm_basic.pay_tm_bck.auth.exceptionHandler;

public class UserAlreadyExistException extends Exception{

    public UserAlreadyExistException(String msg){
        super(msg);
    }
}
