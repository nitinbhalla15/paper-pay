package com.paytm_basic.pay_tm_bck.accounts.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdatedUserDetails {

    private String firstName;
    private String lastName;
    private String password;
}
