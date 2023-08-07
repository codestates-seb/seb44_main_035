package com.server.server.domain.recommend.service;

import com.server.server.domain.recipe.entity.Recipe;
import com.server.server.domain.recommend.entity.Recommend;
import com.server.server.domain.recommend.repository.RecommendRepository;
import com.server.server.domain.user.entity.User;
import com.server.server.global.exception.BusinessLogicException;
import com.server.server.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class RecommendService {
    private final RecommendRepository recommendRepository;

    public void deleteRecommend(User user, Recipe recipe,long userId, long recipeId ){
        Recommend findRecommend = findVerifiedRecommend(userId, recipeId);

        user.removeRecommend(findRecommend);
        recipe.removeRecommend(findRecommend);
    }

    public Recommend findVerifiedRecommend(long userId, long recipeId) {
        Optional<Recommend> optionalRecommend = recommendRepository.findByUserUserIdAndRecipeRecipeId(userId, recipeId);

        return optionalRecommend.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.RECOMMEND_NOT_FOUND));
    }
}




