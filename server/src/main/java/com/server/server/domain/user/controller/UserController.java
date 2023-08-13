package com.server.server.domain.user.controller;

import com.server.server.domain.recipe.dto.RecipeDto;
import com.server.server.domain.recipe.entity.Recipe;
import com.server.server.domain.recipe.mapper.RecipeMapper;
import com.server.server.domain.user.dto.UserDto;
import com.server.server.domain.user.entity.User;
import com.server.server.domain.user.mapper.UserMapper;
import com.server.server.domain.user.service.UserService;
import com.server.server.global.response.MultiResponseDto;
import com.server.server.global.response.SingleResponseDto;
import com.server.server.global.security.auth.dto.LoginDto;
import com.server.server.global.security.auth.jwt.JwtTokenizer;
import com.server.server.global.security.auth.loginResolver.LoginMemberId;
import com.server.server.global.utils.EmailPasswordGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@RestController
@Validated
@RequestMapping("/members")
public class UserController {
    private final UserMapper userMapper;
    private final UserService userService;
    private final RecipeMapper recipeMapper;
    private final JwtTokenizer jwtTokenizer;
    private final RestTemplate restTemplate;

    // 회원가입
    @PostMapping("/register")
    public ResponseEntity postUser(@Valid @RequestBody UserDto.Post requestBody) {
        User user = userService.createUser(userMapper.postToUser(requestBody));
        return new ResponseEntity(new SingleResponseDto<>(userMapper.userToResponse(user)), HttpStatus.OK);
    }

    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        String jws = authorizationHeader.substring(7);    // "Bearer " 이후의 토큰 문자열 추출

        jwtTokenizer.addToTokenBlackList(jws);     //블랙리스트에 jws 추가, 접근 막음

        return ResponseEntity.ok().body("Successfully logged out");
    }

    // 게스트 계정생성 후 로그인 처리
    @GetMapping("/guest")
    public ResponseEntity getGuestUser() {
        String email = EmailPasswordGenerator.generateRandomEmail();
        String password = EmailPasswordGenerator.generateRandomPassword();
        User user = new User(email, password);
        User savedUser = userService.createUser(user);
        savedUser.setPassword(password);

        LoginDto loginDto = new LoginDto(email, password);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<LoginDto> requestEntity = new HttpEntity<>(loginDto, headers);

        ResponseEntity<String> loginResponseEntity = restTemplate.exchange(
                "https://port-0-seb44-main-035-rt92alkaxb0vy.sel4.cloudtype.app/members/login", HttpMethod.POST, requestEntity, String.class);

        HttpHeaders allHeaders = loginResponseEntity.getHeaders();

        return new ResponseEntity<>(allHeaders, HttpStatus.OK);
    }

    // 유저가 좋아요 누른 레시피 목록 조회
    @GetMapping("/find/liked")
    public ResponseEntity getUserRecommend(@LoginMemberId Long userId,
                                           @RequestParam(value = "page", defaultValue = "1") int page,
                                           @RequestParam(value = "size", defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<Recipe> recipePage = userService.findUserRecommendRecipe(userId, pageable);
        List<RecipeDto.ListResponse> responseList = recipeMapper.recipesToResponseList(recipePage.getContent());

        return new ResponseEntity(new MultiResponseDto<>(responseList, recipePage), HttpStatus.OK);
    }

    // 유저가 작성한 레시피 목록 조회
    @GetMapping("/find/recipe")
    public ResponseEntity getUserRecipe(@LoginMemberId Long userId,
                                        @RequestParam(value = "page", defaultValue = "1") int page,
                                        @RequestParam(value = "size", defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<Recipe> recipePage = userService.findUserRecipe(userId, pageable);
        List<RecipeDto.ListResponse> responseList = recipeMapper.recipesToResponseList(recipePage.getContent());

        return new ResponseEntity(new MultiResponseDto<>(responseList, recipePage), HttpStatus.OK);
    }

    // 유저가 댓글 작성한 레시피 목록 조회
    @GetMapping("/find/comment")
    public ResponseEntity getUserComment(@LoginMemberId Long userId,
                                         @RequestParam(value = "page", defaultValue = "1") int page,
                                         @RequestParam(value = "size", defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<Recipe> recipePage = userService.findUserCommentRecipe(userId, pageable);
        List<RecipeDto.ListResponse> responseList = recipeMapper.recipesToResponseList(recipePage.getContent());
        return new ResponseEntity(new MultiResponseDto<>(responseList, recipePage), HttpStatus.OK);
    }

    //레시피 삭제
    @DeleteMapping("/delete/{user-id}")
    public ResponseEntity deleteUser(@PathVariable("user-id") long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok().body("삭제 완료");
    }
}

