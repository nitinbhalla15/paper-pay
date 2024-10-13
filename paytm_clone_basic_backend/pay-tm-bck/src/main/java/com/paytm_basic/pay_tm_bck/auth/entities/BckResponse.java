package com.paytm_basic.pay_tm_bck.auth.entities;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BckResponse {

    private int http_status_code;
    private Object response;
}
