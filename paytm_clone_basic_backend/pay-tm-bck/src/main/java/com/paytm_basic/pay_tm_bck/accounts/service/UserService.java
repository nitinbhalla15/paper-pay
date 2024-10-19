package com.paytm_basic.pay_tm_bck.accounts.service;


import com.paytm_basic.pay_tm_bck.accounts.entity.BankDetails;
import com.paytm_basic.pay_tm_bck.accounts.entity.FriendsPojo;
import com.paytm_basic.pay_tm_bck.accounts.entity.UpdatedUserDetails;
import com.paytm_basic.pay_tm_bck.accounts.exceptions.CustomException;
import com.paytm_basic.pay_tm_bck.auth.entities.BckResponse;
import com.paytm_basic.pay_tm_bck.auth.entities.SignUpDetails;
import com.paytm_basic.pay_tm_bck.auth.exceptionHandler.UserAlreadyExistException;
import com.paytm_basic.pay_tm_bck.auth.repository.BankRepository;
import com.paytm_basic.pay_tm_bck.auth.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class UserService {

    @Autowired
    private UserRepository usrRepo;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private BankRepository bnkRepo;

    public String updateUserDetails(UUID user_id,UpdatedUserDetails usrDetails){
        String response ;
        try{
            log.info("Updating user details...");
            SignUpDetails usrFromDb = usrRepo.findById(user_id).get();
            if(usrFromDb!=null){
                if(usrDetails.getFirstName()!=null && !usrDetails.getFirstName().equals(usrFromDb.getFirstName())){
                    usrFromDb.setFirstName(usrDetails.getFirstName());
                }
                if(usrDetails.getLastName()!=null && !usrDetails.getLastName().equals(usrFromDb.getLastName())){
                    usrFromDb.setLastName(usrDetails.getLastName());
                }
                String newPassword = encoder.encode(usrDetails.getPassword());
                if(usrDetails.getPassword()!=null && newPassword!=usrFromDb.getPassword()){
                    usrFromDb.setPassword(newPassword);
                }
            }
            usrRepo.save(usrFromDb);
            response="User details have been updated successfully";
        }catch (Exception e){
            log.error("Error while updating user details");
            response = "Not able to update the userDetails";
        }
        return response;
    }


    public BckResponse fetchBalanceDetails(String user_email){
        BckResponse bckResponseData = new BckResponse();
        Map<String,Object> resData = new HashMap<>();
        Long accBalance = bnkRepo.findBankDetailsByEmailId(user_email);
        SignUpDetails userDetails = usrRepo.findUserBySubject(user_email).orElse(null);
        bckResponseData.setHttp_status_code(200);
        resData.put("accBalance",accBalance);
        resData.put("userName",userDetails.getFirstName()+" "+userDetails.getLastName());
        bckResponseData.setResponse(resData);
        return bckResponseData;
    }

    public BckResponse serachUsers(String keyword,String currentUserEmail){
        BckResponse bckResponse = new BckResponse();
        Map<String,Object> resData = new HashMap<>();
        List<FriendsPojo> allUserList = null;
        try{
            List<SignUpDetails> userList = usrRepo.findUsersWithName(keyword);
            allUserList =
                    userList.stream().filter(usr -> !usr.getEmailId().equalsIgnoreCase(currentUserEmail)).map(usr -> new FriendsPojo(usr.getEmailId(),usr.getFirstName()+" "+usr.getLastName())).collect(Collectors.toList());
            bckResponse.setHttp_status_code(200);
            resData.put("userList",allUserList);
            bckResponse.setResponse(resData);
        }catch (Exception e){
            log.error("Error while fetching the users");
        }
        return bckResponse;
    }

    @Transactional
    public BckResponse transfeMoney(String fromEmail,String toEmail,Long amount) throws UserAlreadyExistException {
        BckResponse bckResponse = new BckResponse();
        Map<String,Object> resData = new HashMap<>();
        SignUpDetails fromUser = usrRepo.findUserBySubject(fromEmail).orElse(null);
        SignUpDetails toUser = usrRepo.findUserBySubject(toEmail).orElse(null);
        if(fromUser!=null && toUser!=null){
            if(fromUser.getBnkDetails().getBalance()>=amount){
                BankDetails fromBankDetails = fromUser.getBnkDetails();
                fromBankDetails.setBalance(fromBankDetails.getBalance()-amount);
                fromUser.setBnkDetails(fromBankDetails);
                BankDetails toBankDetails = toUser.getBnkDetails();
                toBankDetails.setBalance(toBankDetails.getBalance()+amount);
                toUser.setBnkDetails(toBankDetails);
                usrRepo.save(fromUser);
                usrRepo.save(toUser);
                resData.put("message","Money Transfered !");
                resData.put("avl_balance",fromBankDetails.getBalance().toString());
                bckResponse.setHttp_status_code(200);
                bckResponse.setResponse(resData);
            }else{
                throw new UserAlreadyExistException("Not Enough Balance :(");
            }
        }else{
            throw new CustomException("User Does not exist",HttpStatus.NOT_FOUND);
        }
        return bckResponse;
    }


}
