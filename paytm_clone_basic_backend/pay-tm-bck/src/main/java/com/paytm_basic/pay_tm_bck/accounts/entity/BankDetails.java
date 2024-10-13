package com.paytm_basic.pay_tm_bck.accounts.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.paytm_basic.pay_tm_bck.auth.entities.SignUpDetails;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BankDetails {


    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID bnk_id;
    private String email;
    private Long balance;
    private Date lastTransactionDateTime;
    @JsonIgnore
    @OneToOne(mappedBy = "bnkDetails")
    private SignUpDetails userDetails;

}
