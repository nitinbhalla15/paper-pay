package com.paytm_basic.pay_tm_bck.auth.repository;

import com.paytm_basic.pay_tm_bck.accounts.entity.BankDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.OptionalInt;
import java.util.UUID;

@Repository
public interface BankRepository extends JpaRepository<BankDetails, UUID> {

    @Query(nativeQuery = true,value = "Select balance from bank_details where email=:emailId")
    Long findBankDetailsByEmailId(String emailId);
}
