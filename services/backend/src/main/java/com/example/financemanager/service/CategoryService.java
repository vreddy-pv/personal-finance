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
