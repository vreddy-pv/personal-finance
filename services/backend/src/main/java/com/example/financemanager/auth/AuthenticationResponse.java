package com.example.financemanager.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.example.financemanager.model.Role;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

        private String token;
    private Integer id;
    private String username;
    private String email;
    private Role role;
}
