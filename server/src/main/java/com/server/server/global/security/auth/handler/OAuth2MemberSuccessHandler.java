package com.server.server.global.security.auth.handler;


import com.server.server.domain.user.entity.User;
import com.server.server.domain.user.service.UserService;
import com.server.server.global.security.auth.jwt.JwtTokenizer;
import com.server.server.global.security.auth.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Slf4j
public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String name = (String) oAuth2User.getAttributes().get("name");
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));

        // 얻은 email 주소로 권한 List 만들기
        List<String> authorities = authorityUtils.createRoles(email);

        User user = buildOAuth2Member(name, email);

        if(!userService.existsByEmail(user.getEmail())) {
            User savedUser = saveUser(user);
            redirect(request, response, savedUser, authorities); // 리다이렉트를 하기위한 정보들을 보내줌
        } else {
            User findUser = userService.findVerifiedUser(user.getEmail());
            redirect(request, response, findUser, authorities);
        }

    }

    private User buildOAuth2Member(String name, String email) {
        User user = new User();
        user.setName(name);
        user.setEmail(email+"1");

        return user;
    }


    private User saveUser(User user) {
        return userService.createUserOAuth2(user);
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, User user, List<String> authorities) throws IOException {
        String accessToken = delegateAccessToken(user, authorities);
        String refreshToken = delegateRefreshToken(user);

        String uri = createURI(request, accessToken, refreshToken).toString();

        String headerValue = "Bearer " + accessToken;
        response.setHeader("Authorization", headerValue);
        response.setHeader("Refresh", refreshToken);

        getRedirectStrategy().sendRedirect(request, response, uri);

    }

    private String delegateAccessToken(User user, List<String> authorities) {

        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getUserId());
        claims.put("roles", authorities);

        String subject = user.getEmail();

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(User user) {


        String subject = user.getEmail();

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    private URI createURI(HttpServletRequest request, String accessToken, String refreshToken) {

        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);

        String serverName = request.getServerName();

        return UriComponentsBuilder
                .newInstance()
                .scheme("https")
                .host("port-0-seb44-main-035-rt92alkaxb0vy.sel4.cloudtype.app")
                .port(443)
                //.port(80)   -> aws로 배포했을 때 싸용
//                .port(3000)   //-> local 테스트용
                .path("/oauthloading")            //리다이렉트 주소 (토큰이 포함된 url 을 받는 주소)
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}


