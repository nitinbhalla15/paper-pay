package com.paytm_basic.pay_tm_bck.auth.controller;
import com.paytm_basic.pay_tm_bck.auth.entities.SignInDetails;
import com.paytm_basic.pay_tm_bck.auth.entities.SignUpDetails;
import com.paytm_basic.pay_tm_bck.auth.exceptionHandler.UserAlreadyExistException;
import com.paytm_basic.pay_tm_bck.auth.service.AuthenticationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authService;

    @PostMapping(value = "/signup" )
    public ResponseEntity<?> signUpUser(@RequestBody @Valid SignUpDetails signupDetails) throws UserAlreadyExistException {
        return new ResponseEntity<>(authService.createAccount(signupDetails), HttpStatus.CREATED);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<?> signInUser(@RequestBody @Valid SignInDetails signInDetails){
        return new ResponseEntity<>(authService.loginUser(signInDetails),HttpStatus.OK);
    }
}
