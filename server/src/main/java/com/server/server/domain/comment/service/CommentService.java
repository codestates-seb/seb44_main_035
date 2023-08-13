package com.server.server.domain.comment.service;

import com.server.server.domain.comment.entity.Comment;
import com.server.server.domain.comment.repository.CommentRepository;
import com.server.server.domain.recipe.entity.Recipe;
import com.server.server.domain.recipe.service.RecipeService;
import com.server.server.domain.user.entity.User;
import com.server.server.domain.user.service.UserService;
import com.server.server.global.exception.ExceptionCode;
import com.server.server.global.exception.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final RecipeService recipeService;
    private final UserService userService;

    // 댓글 작성
    public Comment createComment(Comment comment, Long recipeId, Long userId) {
        Recipe recipe = recipeService.findRecipe(recipeId);
        User user = userService.findUser(userId);
        recipe.addComment(comment);
        user.addComment(comment);
        return commentRepository.save(comment);
    }

    // 댓글 수정
    public Comment updateComment(Comment comment) {
        Comment foundComment = findComment(comment.getCommentId());
        foundComment.setCommentContent(comment.getCommentContent());

        return commentRepository.save(foundComment);
    }

    public Comment findComment(long commentId) {
        Optional<Comment> commentOptional = commentRepository.findById(commentId);

        return commentOptional.orElseThrow(()-> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }

    // 댓글 삭제
    public void deleteComment(long commentId) {
        Comment foundComment = findComment(commentId);

        commentRepository.delete(foundComment);
    }

    // 댓글 수정, 삭제를 위한 작성자 검증
    public void verifyComment(long commentId, long userId) {
        Comment comment = findComment(commentId);
        User user = userService.findUser(userId);
        long commentUserId = comment.getUser().getUserId();
        if (!user.getRoles().contains("ADMIN")) {
            if (commentUserId != userId) {
                throw new BusinessLogicException(ExceptionCode.NO_PERMISSION_EDITING_COMMENT);
            }
        }
    }
}