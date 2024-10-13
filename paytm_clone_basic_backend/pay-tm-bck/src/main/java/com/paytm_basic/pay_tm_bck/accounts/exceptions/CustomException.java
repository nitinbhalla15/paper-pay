package com.paytm_basic.pay_tm_bck.accounts.exceptions;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CustomException extends RuntimeException{

    private String errorMessage;
    private HttpStatus httpStatus;
}
