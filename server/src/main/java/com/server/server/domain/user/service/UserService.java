package com.server.server.domain.user.service;


import com.server.server.domain.comment.entity.Comment;
import com.server.server.domain.recipe.entity.Recipe;
import com.server.server.domain.recommend.entity.Recommend;
import com.server.server.domain.user.entity.User;
import com.server.server.domain.user.repository.UserRepository;
import com.server.server.global.exception.BusinessLogicException;
import com.server.server.global.exception.ExceptionCode;
import com.server.server.global.security.auth.jwt.JwtTokenizer;
import com.server.server.global.security.auth.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    @Autowired
    private final JwtTokenizer jwtTokenizer;

    public User createUser(User user) {
        verifyExistEmail(user.getEmail());
        user.setName(verifyExistName(user.getName()));   //중복되는 이름 확인 후 중복되는 이름이 있을 시 뒤에 0~9999까지 번호를 붙여서 이름 저장

        // (3) 추가: Password 암호화
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);

        // (4) 추가: DB에 User Role 저장
        List<String> roles = authorityUtils.createRoles(user.getEmail());
        user.setRoles(roles);

        User savedUser = userRepository.save(user);

        return savedUser;
    }

    public User createUserOAuth2(User user) {

        List<String> roles = authorityUtils.createRoles(user.getEmail());
        user.setRoles(roles);
        String newName = verifyExistName(user.getName());
        user.setName(newName);

        return userRepository.save(user);
    }

    public User findUser(long userId) {
        return findVerifiedUser(userId);
    }

    public User findVerifiedUser(long userId) {
        Optional<User> optionalUser =  userRepository.findById(userId);
        User findUser = optionalUser.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return findUser;
    }

    public User findVerifiedUser(String email) {
        Optional<User> optionalUser =  userRepository.findByEmail(email);
        User findUser = optionalUser.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return findUser;
    }

    private void verifyExistEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

    public Boolean existsByEmail(String email) {
        return userRepository.existsUsersByEmail(email);
    }

    private String verifyExistName(String name){     // oauth2로 로그인 했을 때 같은 이름이 있을 때 1~1000까지의 랜덤숫자를 붙임
        String newName = name;
        Optional<User> optionalUser = userRepository.findByName(name);
        if(optionalUser.isPresent()){
            Random random = new Random();
            int randomNumber = random.nextInt(10000) + 1;
            newName = name + randomNumber;
        }

        return newName;
    }

    public String delegateAccessToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getUserId());
        claims.put("roles", user.getRoles());

        String subject = user.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }


    public String delegateRefreshToken(User user) {


        String subject = user.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    public Page<Recipe> findUserRecommendRecipe(long userId, Pageable pageable) {
        User user = findUser(userId);
        List<Recipe> recipeList = new ArrayList<>();

        for (Recommend recommend : user.getRecommendList()) {
            recipeList.add(recommend.getRecipe());
        }
        return convertToPage(recipeList, pageable);
    }

    public Page<Recipe> findUserRecipe(long userId, Pageable pageable) {
        User user = findUser(userId);
        List<Recipe> recipeList = new ArrayList<>();

        for (Recipe recipe : user.getRecipeList()) {
            recipeList.add(recipe);
        }
        return convertToPage(recipeList, pageable);
    }
    public Page<Recipe> findUserCommentRecipe(long userId, Pageable pageable) {
        User user = findUser(userId);
        List<Recipe> recipeList = new ArrayList<>();

        for (Comment comment : user.getCommentList()) {
            recipeList.add(comment.getRecipe());
        }
        return convertToPage(recipeList, pageable);
    }
    public Page<Recipe> convertToPage(List<Recipe> recipeList, Pageable pageable) {
        int pageSize = pageable.getPageSize();
        int currentPage = pageable.getPageNumber();
        int startItem = currentPage * pageSize;

        List<Recipe> pagedRecipes;

        if (recipeList.size() < startItem) {
            pagedRecipes = new ArrayList<>();
        } else {
            int toIndex = Math.min(startItem + pageSize, recipeList.size());
            pagedRecipes = recipeList.subList(startItem, toIndex);
        }

        return new PageImpl<>(pagedRecipes, pageable, recipeList.size());
    }
    public void deleteUser(long userId) {
        User user = findUser(userId);
        userRepository.delete(user);
    }
}
