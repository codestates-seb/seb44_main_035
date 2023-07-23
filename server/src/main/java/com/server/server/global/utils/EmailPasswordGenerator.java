package com.server.server.global.utils;

import java.util.UUID;

public class EmailPasswordGenerator {

    public static String generateRandomEmail() {
        // UUID를 사용하여 랜덤한 이메일 생성
        String randomUUID = UUID.randomUUID().toString();

        // 이메일 형식에 맞게 조합
        String email = "guest" + randomUUID.substring(0, 8) + "@example.com";

        return email;
    }

    public static String generateRandomPassword() {
        String password = UUID.randomUUID().toString().substring(0,8);
        return password;
    }
}
