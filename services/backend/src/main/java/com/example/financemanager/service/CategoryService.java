package com.example.financemanager.service;

import com.example.financemanager.model.Category;
import com.example.financemanager.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public Category addCategory(Category category) {
        if (category == null) {
            throw new IllegalArgumentException("Category cannot be null");
        }

        // If name is missing but ID exists, look up existing category by ID
        if ((category.getName() == null || category.getName().isBlank()) && category.getId() != null) {
            return categoryRepository.findById(category.getId())
                    .orElseThrow(() -> new IllegalArgumentException("Category with ID " + category.getId() + " not found"));
        }

        if (category.getName() == null || category.getName().isBlank()) {
            throw new IllegalArgumentException("Category name cannot be null or empty");
        }

        String upperCaseName = category.getName().toUpperCase();
        return categoryRepository.findByNameIgnoreCase(upperCaseName)
                .orElseGet(() -> {
                    category.setName(upperCaseName);
                    return categoryRepository.save(category);
                });
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}
