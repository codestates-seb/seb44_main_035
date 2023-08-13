package com.server.server.domain.ingredient.entity;

import com.server.server.domain.user.entity.User;
import com.server.server.domain.recipe.entity.Recipe;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long ingredientId;
    @Column
    private String ingredientName;
    @Column
    private String quantity;
    @Column
    private Boolean includedRecipe = true;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public Ingredient(String ingredientName) {
        this.ingredientName = ingredientName;
    }

    public Ingredient(String ingredientName, boolean includedRecipe) {
        this.ingredientName = ingredientName;
        this.includedRecipe = includedRecipe;
    }
}
