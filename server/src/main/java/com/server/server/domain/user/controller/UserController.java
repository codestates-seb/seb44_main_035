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
import com.server.server.global.security.auth.jwt.JwtTokenizer;
import com.server.server.global.security.auth.loginResolver.LoginMemberId;
import com.server.server.global.utils.EmailPasswordGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/register")
    public ResponseEntity postUser(@Valid @RequestBody UserDto.Post requestBody) {
        User user = userService.createUser(userMapper.postToUser(requestBody));
        return new ResponseEntity(new SingleResponseDto<>(userMapper.userToResponse(user)), HttpStatus.OK);
    }
    @PostMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        String jws = authorizationHeader.substring(7);    // "Bearer " 이후의 토큰 문자열 추출

        jwtTokenizer.addToTokenBlackList(jws);     //블랙리스트에 jws 추가, 접근 막음

        return ResponseEntity.ok().body("Successfully logged out");
    }
    @GetMapping("/guest")
    public ResponseEntity getGuestUser() {
        String email = EmailPasswordGenerator.generateRandomEmail();
        String password = EmailPasswordGenerator.generateRandomPassword();
        User user = new User(email, password);
        User savedUser = userService.createUser(user);
        savedUser.setPassword(password);

        return new ResponseEntity(new SingleResponseDto<>(
                userMapper.userToGuestResponse(savedUser)), HttpStatus.OK);
    }
    @GetMapping("/find/liked")
    public ResponseEntity getUserRecommend(@LoginMemberId Long userId,
                                           @RequestParam(value = "page", defaultValue = "1") int page,
                                           @RequestParam(value = "size", defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<Recipe> recipePage = userService.findUserRecommendRecipe(userId, pageable);
        List<RecipeDto.ListResponse> responseList = recipeMapper.recipesToResponseList(recipePage.getContent());

        return new ResponseEntity(new MultiResponseDto<>(responseList, recipePage),HttpStatus.OK );
    }
    @GetMapping("/find/recipe")
    public ResponseEntity getUserRecipe(@LoginMemberId Long userId,
                                        @RequestParam(value = "page", defaultValue = "1") int page,
                                        @RequestParam(value = "size", defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<Recipe> recipePage = userService.findUserRecipe(userId, pageable);
        List<RecipeDto.ListResponse> responseList = recipeMapper.recipesToResponseList(recipePage.getContent());

        return new ResponseEntity(new MultiResponseDto<>(responseList, recipePage),HttpStatus.OK );
    }
    @GetMapping("/find/comment")
    public ResponseEntity getUserComment(@LoginMemberId Long userId,
                                         @RequestParam(value = "page", defaultValue = "1") int page,
                                         @RequestParam(value = "size", defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<Recipe> recipePage = userService.findUserCommentRecipe(userId, pageable);
        List<RecipeDto.ListResponse> responseList = recipeMapper.recipesToResponseList(recipePage.getContent());
        return new ResponseEntity(new MultiResponseDto<>(responseList, recipePage), HttpStatus.OK);
    }
//    @GetMapping("verify/comment")
//    public ResponseEntity verifyUserComment(@LoginMemberId Long userId,
//                                            )
}

