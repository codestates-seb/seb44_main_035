package com.server.server.global.security.auth.dto;

import lombok.Getter;

@Getter
public class LoginDto {
    private String email;
    private String password;
}
