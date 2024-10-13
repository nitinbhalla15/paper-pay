package com.paytm_basic.pay_tm_bck.auth.exceptionHandler;

import com.paytm_basic.pay_tm_bck.accounts.exceptions.CustomException;
import com.paytm_basic.pay_tm_bck.accounts.service.UserService;
import com.paytm_basic.pay_tm_bck.auth.entities.BckResponse;
import com.paytm_basic.pay_tm_bck.auth.entities.ErrorResonse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.HandlerAdapter;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<?> handleAuthException(AuthenticationException exception){
            List<String> errList = new ArrayList<>();
            errList.add(exception.getMessage());
            Map<String,Object> errData = new HashMap<>();
            errData.put("errList",errList);
            BckResponse errResponse = BckResponse.builder().http_status_code(403).
            response(errData)
            .build();
        return new ResponseEntity<>(errResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(UserAlreadyExistException.class)
    public ResponseEntity<?> handleAlreadyExistingUser(UserAlreadyExistException exception){
        List<String> errList = new ArrayList<>();
        errList.add(exception.getMessage());
        Map<String,Object> errData = new HashMap<>();
        errData.put("errList",errList);
        BckResponse errResponse = BckResponse.builder().http_status_code(208).response(errData).build();
        return new ResponseEntity<>(errResponse,HttpStatus.ALREADY_REPORTED);
    }

    @Override
    public ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request){
        BckResponse errResponse = new BckResponse();
        List<String> errList = new ArrayList<>();
        Map<String,Object> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach((err)->{
            errList.add(err.getField()+" --> "+err.getDefaultMessage());
        });
        errors.put("errList",errList);
        errResponse.setHttp_status_code(400);
        errResponse.setResponse(errors);
        return new ResponseEntity<>(errResponse,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> handleUserNotFound(CustomException exception){
        BckResponse errResponse = new BckResponse();
        List<String> errList = new ArrayList<>();
        Map<String,Object> errData = new HashMap<>();
        errList.add(exception.getMessage());
        errData.put("errList",errList);
        errResponse.setHttp_status_code(400);
        errResponse.setResponse(errData);
        return new ResponseEntity<>(errResponse,HttpStatus.NOT_FOUND);
    }


}
