package com.paytm_basic.pay_tm_bck.accounts.controller;

import com.paytm_basic.pay_tm_bck.accounts.entity.UpdatedUserDetails;
import com.paytm_basic.pay_tm_bck.accounts.service.UserService;
import com.paytm_basic.pay_tm_bck.auth.entities.BckResponse;
import com.paytm_basic.pay_tm_bck.auth.exceptionHandler.UserAlreadyExistException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping(value = "/api/v1")
public class UserController {

    @Autowired
    private UserService usrSevice;

//    @PutMapping(value = "/updateInfo/{user_id}")
//    public ResponseEntity<?> updateUserInfo(@PathVariable("user_id") UUID user_id, @RequestBody UpdatedUserDetails usrDetailsUpdt){
//        return new ResponseEntity<>(new BckResponse(200,usrSevice.updateUserDetails(user_id,usrDetailsUpdt)), HttpStatus.OK);
//    }


    @PostMapping(value = "/transferMoney/{from}/{to}/{amount}")
    public ResponseEntity<?> transferMoney(@PathVariable("from") String fromEmailId , @PathVariable("to") String toEmailId,
                                           @PathVariable("amount") Long amount) throws UserAlreadyExistException {
        return new ResponseEntity<>(usrSevice.transfeMoney(fromEmailId,toEmailId,amount),HttpStatus.OK);
    }

    @GetMapping(value = "/checkBalance/{user_email}")
    public ResponseEntity<?> checkBalance(@PathVariable("user_email") String user_email){
        return new ResponseEntity<>(usrSevice.fetchBalanceDetails(user_email),HttpStatus.OK);
    }

    @GetMapping(value = "/searchUsers/{keyword}/{currentUserEmail}")
    public ResponseEntity<?> findFriends(@PathVariable("keyword") String keyword,@PathVariable("currentUserEmail") String currentUserEmail){
        return new ResponseEntity<>(usrSevice.serachUsers(keyword,currentUserEmail),HttpStatus.OK);
    }

}
