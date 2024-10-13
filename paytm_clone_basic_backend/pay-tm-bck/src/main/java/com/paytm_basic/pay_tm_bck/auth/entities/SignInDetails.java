package com.paytm_basic.pay_tm_bck.auth.entities;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignInDetails {

    @NonNull
    @NotNull
    @Email
    private String email;
    @NotNull
    @NotBlank
    @NotEmpty
    private String password;
}
