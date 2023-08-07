package com.server.server.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    RECIPE_NOT_FOUND(404, "Recipe not found"),
    RECOMMEND_NOT_FOUND(404, "Recommend not found"),
    COMMENT_NOT_FOUND(404, "해당 댓글을 찾을 수 없습니다."),
    INGREDIENT_NOT_FOUND(404,"Ingredient not found"),
    INGREDIENT_EXISTS(409, "Ingredient exists"),
    JWT_TOKEN_EXPIRED(404, "토큰이 만료되었습니다"),
    NO_PERMISSION_EDITING_COMMENT(403,"작성자만 수정 또는 삭제 할 수 있습니다"),
    NO_PERMISSION_EDITING_RECIPE(403,"작성자만 수정 또는 삭제 할 수 있습니다");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}