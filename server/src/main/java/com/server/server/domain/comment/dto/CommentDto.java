package com.server.server.domain.comment.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class CommentDto {
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post {
        @NotBlank
        private String commentContent;
    }
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Patch {
        private long commentId;
        private String commentContent;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private long recipeId;
        private long userId;
        private long commentId;
        private String commentContent;
        private String createdAt;
        private String modifiedAt;
    }

    @Getter
    @AllArgsConstructor
    public class CommentResponseDtoForUser {
        private long commentId;
        private String commentContent;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private String createdBy;
    }
}