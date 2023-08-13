package com.server.server.domain.recipe.service;

import com.server.server.domain.ingredient.entity.Ingredient;
import com.server.server.domain.ingredient.service.IngredientService;
import com.server.server.domain.recipe.repository.RecipeQueryRepository;
import com.server.server.domain.recommend.service.RecommendService;
import com.server.server.domain.user.entity.User;
import com.server.server.domain.user.service.UserService;
import com.server.server.domain.recipe.dto.RecipeDto;
import com.server.server.domain.recipe.entity.Recipe;
import com.server.server.domain.recipe.repository.RecipeRepository;
import com.server.server.domain.recommend.entity.Recommend;
import com.server.server.domain.recommend.repository.RecommendRepository;
import com.server.server.global.exception.BusinessLogicException;
import com.server.server.global.exception.ExceptionCode;
import com.server.server.global.s3.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class RecipeService {
    @Autowired
    private final RecipeRepository recipeRepository;
    private final UserService userService;
    private final RecommendRepository recommendRepository;
    private final RecommendService recommendService;
    private final IngredientService ingredientService;
    private final S3Uploader s3Uploader;
    private final RecipeQueryRepository recipeQueryRepository;

    //레시피 작성
    public Recipe createRecipe(Recipe recipe, MultipartFile recipeImage, List<MultipartFile> cookStepImage, long userId) {
       User user = userService.findUser(userId);
       List<Ingredient> ingredients = ingredientService.saveAll(recipe.getIngredients());
        for (Ingredient ingredient : recipe.getIngredients()) {
            ingredient.setRecipe(recipe);
        }
        recipe.setIngredients(ingredients);
        user.addRecipe(recipe);
        uploadImage(recipe, recipeImage, cookStepImage);
        return recipeRepository.save(recipe);
    }

    // 레시피에 들어가는 이미지를 S3에 업로드
    public void uploadImage(Recipe recipe, MultipartFile recipeImage, List<MultipartFile> cookStepImage) {
        String fileUrl = s3Uploader.upload(recipeImage);
        recipe.setRecipeImage(fileUrl);
        for (MultipartFile file : cookStepImage) {
            String url = s3Uploader.upload(file);
            recipe.addCookStepImage(url);
        }
    }

    // 레시피 수정
    public Recipe updateRecipe(Recipe recipe, MultipartFile recipeImage, List<MultipartFile> cookStepImage) {
        Recipe findRecipe = findRecipe(recipe.getRecipeId());

        Optional.ofNullable(recipe.getRecipeName())
                .ifPresent(name -> findRecipe.setRecipeName(name));
        Optional.ofNullable(recipe.getRecipeIntro())
                .ifPresent(intro -> findRecipe.setRecipeIntro(intro));
        if (recipe.getIngredients() != null) {
            List<Ingredient> ingredients = ingredientService.saveAll(recipe.getIngredients());
            for (Ingredient ingredient : recipe.getIngredients()) {
                ingredient.setRecipe(findRecipe);
            }
            for (Ingredient ingredient1 : findRecipe.getIngredients()) {
                ingredient1.setRecipe(null);
            }
            findRecipe.removeIngredient();
            findRecipe.setIngredients(ingredients);
        }
        if (recipe.getCookStepContent().size() != 0) {
            findRecipe.setCookStepContent(recipe.getCookStepContent());
        }
        if (recipeImage != null) {
            String url = findRecipe.getRecipeImage();
            s3Uploader.delete(url);
            String fileUrl = s3Uploader.upload(recipeImage);
            findRecipe.setRecipeImage(fileUrl);
        }
        if (cookStepImage != null) {
            for (String url : findRecipe.getCookStepImage()) {
                s3Uploader.delete(url);
            }
            findRecipe.setCookStepImage(new ArrayList<>());
            for (MultipartFile file : cookStepImage) {
                String url = s3Uploader.upload(file);
                findRecipe.addCookStepImage(url);
            }
        }

        return recipeRepository.save(findRecipe);
    }

    public Recipe incrementViewCount(Recipe recipe) {
        recipe.setViews(recipe.getViews()+1);
        recipeRepository.save(recipe);

        return recipe;
    }

    // 레시피 추천기능(토글 형식)
    public RecipeDto.RecommendResponse toggleRecipeRecommend(long userId, long recipeId) {
        User user = userService.findUser(userId);
        Recipe recipe = findRecipe(recipeId);
        List<Recommend> recommends = recipe.getRecommendList();

        Optional<Recommend> optionalRecommend = recommends.stream()
                .filter(recommend -> recommend.getUser().getUserId().equals(userId))
                .findFirst();
        RecipeDto.RecommendResponse response = new RecipeDto.RecommendResponse();
        response.setUserId(userId);
        response.setRecipeId(recipeId);

        if (optionalRecommend.isPresent()) {
            Recommend recommend = optionalRecommend.get();

            recommendService.deleteRecommend(user, recipe, userId, recipeId);

            recommendRepository.delete(recommend);

            response.setMessage("좋아요가 취소되었습니다.");
        } else {
            Recommend recommend = new Recommend(user, recipe);
            recipe.addRecommend(recommend);
            user.addRecommend(recommend);
            Recommend savedRecommend = recommendRepository.save(recommend);

            response.setRecommendId(savedRecommend.getRecommendId());
            response.setMessage("좋아요가 생성되었습니다.");
        }

        return response;
    }

    // 레시피 삭제
    public void deleteRecipe(long recipeId) {
        Recipe findRecipe = findRecipe(recipeId);
        String url = findRecipe.getRecipeImage();
        s3Uploader.delete(url);

        for (String fileUrl : findRecipe.getCookStepImage()) {
            s3Uploader.delete(fileUrl);
        }

        recipeRepository.delete(findRecipe);
    }

    public Recipe findRecipe(long recipeId) {
        return findVerifiedRecipe(recipeId);
    }

    public Recipe findVerifiedRecipe(long recipeId) {
        Optional<Recipe> optionalRecipe = recipeRepository.findById(recipeId);
        return optionalRecipe.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.RECIPE_NOT_FOUND));
    }

    // 레시피 수정 권한 확인을 위해 요청한 유저와 레시피 작성유저를 비교
    public void verifyRecipe(long recipeId, long userId) {
        Recipe recipe = findRecipe(recipeId);
        User user = userService.findUser(userId);
        long recipeUserId = recipe.getUser().getUserId();

        if (!user.getRoles().contains("ADMIN")) {
            if (recipeUserId != userId) {
                throw new BusinessLogicException(ExceptionCode.NO_PERMISSION_EDITING_RECIPE);
            }
        }
    }

    // 레시피 제목으로 검색
    public Page<Recipe> searchRecipesByName(String recipeName, Pageable pageable) {
        return recipeRepository.findByRecipeNameContainingIgnoreCase(recipeName, pageable);
    }

    // 전달받은 재료를 모두 포함하는 레시피 검색
    public Page<Recipe> searchAllRecipesByIngredients(List<String> ingredients, Pageable pageable) {
        return recipeQueryRepository.searchAllRecipesByIngredients(ingredients, pageable);
    }

    // 전달받은 재료중 하나라도 포함하는 레시피 검색
    public Page<Recipe> searchRecipesByIngredients(List<String> ingredients, Pageable pageable) {
        return recipeQueryRepository.searchRecipesByIngredients(ingredients, pageable);
    }

    //전체 레시피 조회(하단 바 클릭 시)
    public Page<Recipe> getAllRecipes(Pageable pageable) {
        return recipeRepository.findAll(pageable);
    }

}
