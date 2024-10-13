package com.paytm_basic.pay_tm_bck.auth.service;


import com.paytm_basic.pay_tm_bck.accounts.entity.BankDetails;
import com.paytm_basic.pay_tm_bck.auth.entities.BckResponse;
import com.paytm_basic.pay_tm_bck.auth.entities.SignInDetails;
import com.paytm_basic.pay_tm_bck.auth.entities.SignUpDetails;
import com.paytm_basic.pay_tm_bck.auth.exceptionHandler.UserAlreadyExistException;
import com.paytm_basic.pay_tm_bck.auth.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@Slf4j
public class AuthenticationService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passEncoder;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;


    public BckResponse createAccount(SignUpDetails userDetails) throws UserAlreadyExistException {
        BckResponse resDataBck = new BckResponse();
        Map<String,Object> resData = new HashMap<>();
        log.info("Creating user account ...");
        SignUpDetails existingUser = userRepo.findUserBySubject(userDetails.getEmailId()).orElse(null);
        if(existingUser==null) {
            SignUpDetails newUser = SignUpDetails.builder()
                    .user_id(UUID.randomUUID())
                    .emailId(userDetails.getEmailId())
                    .firstName(userDetails.getFirstName())
                    .lastName(userDetails.getLastName())
                    .password(passEncoder.encode(userDetails.getPassword())).build();
            log.info("Creating bank account ...");
            BankDetails bnkDetails = BankDetails.builder().bnk_id(UUID.randomUUID())
                    .email(newUser.getEmailId())
                    .balance((long) (Math.random() * 10000))
                    .lastTransactionDateTime(new Date()).build();
            newUser.setBnkDetails(bnkDetails);
            userRepo.save(newUser);
            String jwtToken = jwtService.generateToken(userDetails.getEmailId());
            resDataBck.setHttp_status_code(200);
            resData.put("token",jwtToken);
            resData.put("userBalance",bnkDetails.getBalance());
            resData.put("userEmail",userDetails.getEmailId());
            resData.put("userName",userDetails.getFirstName()+" "+userDetails.getLastName());
            resDataBck.setResponse(resData);
            log.info("User created successfully");
            return resDataBck;
        }else {
            throw new UserAlreadyExistException("User with same email already exist");
        }
    }

    public BckResponse loginUser(SignInDetails loginDetails){
        BckResponse resDataBck = new BckResponse();
        Map<String,Object> resData = new HashMap<>();
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDetails.getEmail(),loginDetails.getPassword())
        );
        SignUpDetails userDetails = userRepo.findUserBySubject(loginDetails.getEmail()).orElse(null);
        String jwtToken = jwtService.generateToken(userDetails.getEmailId());
        resDataBck.setHttp_status_code(200);
        resData.put("token",jwtToken);
        resData.put("userBalance",userDetails.getBnkDetails().getBalance());
        resData.put("userEmail",userDetails.getEmailId());
        resData.put("userName",userDetails.getFirstName()+" "+userDetails.getLastName());
        resDataBck.setResponse(resData);
        return resDataBck;
    }


}
