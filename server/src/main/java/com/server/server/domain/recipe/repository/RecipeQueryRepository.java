package com.server.server.domain.recipe.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import static com.server.server.domain.ingredient.entity.QIngredient.*;
import static com.server.server.domain.recipe.entity.QRecipe.*;
import com.server.server.domain.recipe.entity.Recipe;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class RecipeQueryRepository {
    private final JPAQueryFactory queryFactory;

    // 전달받은 재료를 모두 포함하는 레시피 검색
    public Page<Recipe> searchAllRecipesByIngredients(List<String> ingredients, Pageable pageable) {
        Long totalCount = queryFactory
                .select(recipe)
                .from(recipe)
                .innerJoin(recipe.ingredients, ingredient)
                .where(ingredient.ingredientName.in(ingredients))
                .groupBy(recipe)
                .having(ingredient.ingredientName.count().eq((long) ingredients.size()))
                .fetchCount();

        List<Recipe> resultList = queryFactory
                .selectFrom(recipe)
                .innerJoin(recipe.ingredients, ingredient)
                .where(ingredient.ingredientName.in(ingredients))
                .groupBy(recipe)
                .having(ingredient.ingredientName.count().eq((long) ingredients.size()))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(resultList, pageable, totalCount);
    }

    // 전달받은 재료중 하나라도 포함하는 레시피 검색
    public Page<Recipe> searchRecipesByIngredients(List<String> ingredients, Pageable pageable) {
        BooleanExpression ingredientNameInList = ingredient.ingredientName.in(ingredients);

        long totalCount = queryFactory
                .select(recipe)
                .from(recipe)
                .innerJoin(recipe.ingredients, ingredient)
                .where(ingredientNameInList)
                .fetchCount();

        List<Recipe> resultList = queryFactory
                .select(recipe)
                .distinct()
                .from(recipe)
                .innerJoin(recipe.ingredients, ingredient)
                .where(ingredientNameInList)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(resultList, pageable, totalCount);
    }
}
