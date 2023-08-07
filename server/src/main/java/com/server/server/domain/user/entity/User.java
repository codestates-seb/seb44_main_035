package com.server.server.domain.user.entity;

import com.server.server.domain.comment.entity.Comment;
import com.server.server.domain.ingredient.entity.Ingredient;
import com.server.server.domain.recipe.entity.Recipe;
import com.server.server.domain.recommend.entity.Recommend;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "USERS")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    @Column
    private String email;
    @Column
    private String password;
    @Column
    private String name;
    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();
    @OneToMany(mappedBy = "user", cascade = {CascadeType.ALL})
    private List<Recipe> recipeList = new ArrayList<>();
    @OneToMany(mappedBy = "user", cascade = {CascadeType.ALL})
    private List<Comment> commentList = new ArrayList<>();
    @OneToMany(mappedBy = "user", cascade = {CascadeType.ALL})
    private List<Recommend> recommendList = new ArrayList<>();
    @OneToMany(mappedBy = "user", cascade = {CascadeType.ALL})
    private List<Ingredient> ingredientList = new ArrayList<>();


    public void removeRecommend(Recommend recommend) {
        this.recommendList.remove(recommend);
        if (recommend.getUser() != this) {
            recommend.setUser(this);
        }
    }
    public void addRecommend(Recommend recommend) {
        this.recommendList.add(recommend);
        recommend.setUser(this);
    }

    public void addIngredient(Ingredient ingredient) {
        this.ingredientList.add(ingredient);
        ingredient.setUser(this);
    }
    public void addComment(Comment comment) {
        this.commentList.add(comment);
        comment.setUser(this);
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
  
    public void removeIngredient(Ingredient ingredient) {
        this.ingredientList.remove(ingredient);
        if (ingredient.getUser() != this) {
            ingredient.setUser(this);
        }
    }

    public void addRecipe(Recipe recipe) {
        this.recipeList.add(recipe);
        recipe.setUser(this);
    }
}
