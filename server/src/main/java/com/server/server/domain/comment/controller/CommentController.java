package com.server.server.domain.comment.controller;

import com.server.server.domain.comment.dto.CommentDto;
import com.server.server.domain.comment.entity.Comment;
import com.server.server.domain.comment.mapper.CommentMapper;
import com.server.server.domain.comment.service.CommentService;
import com.server.server.global.response.MultiResponseDto;
import com.server.server.global.response.SingleResponseDto;
import com.server.server.global.security.auth.loginResolver.LoginMemberId;
import com.server.server.global.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/recipes/comment")
public class CommentController {
    private final CommentService commentService;
    private final CommentMapper commentMapper;

    //댓글 등록
    @PostMapping("/create/{recipe-id}")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity postComment(@Valid @RequestBody CommentDto.Post post,
                                      @PathVariable("recipe-id") long recipeId,
                                      @LoginMemberId Long userId) {
        Comment comment = commentMapper.commentPostToComment(post);
        Comment response = commentService.createComment(comment, recipeId, userId);

        return new ResponseEntity(new SingleResponseDto<>(commentMapper.commentToCommentResponseDto(response)),
                HttpStatus.CREATED);
    }
    //댓글 수정
    @PatchMapping("/update/{comment-id}")
    public ResponseEntity patchComment(@Valid @RequestBody CommentDto.Patch patch,
                                       @Positive @PathVariable("comment-id") long commentId) {    //댓글 수정
        patch.setCommentId(commentId);
        Comment updatedComment = commentService.updateComment(commentMapper.commentPatchToComment(patch));

        return new ResponseEntity<>(new SingleResponseDto<>(commentMapper.commentToCommentResponseDto(updatedComment)), HttpStatus.OK);
    }
    //댓글 삭제
    @DeleteMapping("/delete/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") @Positive long commentId) {
        commentService.deleteComment(commentId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
    //작성자 검증
    @GetMapping("/verify/{comment-id}")
    public ResponseEntity verifyCommentUser(@LoginMemberId Long userId,
                                            @PathVariable("comment-id") Long commentId) {
        commentService.verifyComment(commentId, userId);

        return ResponseEntity.ok().body("작성 유저 검증을 통과하였습니다.");
    }
}