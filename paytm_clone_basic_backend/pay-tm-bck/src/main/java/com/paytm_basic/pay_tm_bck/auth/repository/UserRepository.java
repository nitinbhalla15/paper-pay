package com.paytm_basic.pay_tm_bck.auth.repository;

import com.paytm_basic.pay_tm_bck.auth.entities.SignUpDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.OptionalInt;
import java.util.UUID;


@Repository
public interface UserRepository extends JpaRepository<SignUpDetails, UUID> {

    @Query(nativeQuery = true,value = "Select * from user_info where email_id = :userEmail")
    Optional<SignUpDetails> findUserBySubject(String userEmail);

    @Query(nativeQuery = true , value = "Select * from user_info where first_name LIKE %:keyword% or last_name LIKE %:keyword%")
    List<SignUpDetails> findUsersWithName(String keyword);

}
