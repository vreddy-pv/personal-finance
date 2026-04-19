package com.example.financemanager.service;

import com.example.financemanager.dto.SummaryDto;
import com.example.financemanager.model.Category;
import com.example.financemanager.model.Transaction;
import com.example.financemanager.model.User;
import com.example.financemanager.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final CategoryService categoryService;

    public Transaction addTransaction(Transaction transaction) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        transaction.setUser(user);

        // Ensure the category is managed
        if (transaction.getCategory() != null) {
            System.out.println("DEBUG: Adding transaction with category: " + transaction.getCategory().getName() + " (ID: " + transaction.getCategory().getId() + ")");
            Category managedCategory = categoryService.addCategory(transaction.getCategory());
            transaction.setCategory(managedCategory);
            System.out.println("DEBUG: Managed category: " + managedCategory.getName() + " (ID: " + managedCategory.getId() + ")");
        } else {
            System.out.println("DEBUG: Adding transaction with NULL category");
        }

        Transaction saved = transactionRepository.save(transaction);
        System.out.println("DEBUG: Saved transaction with category: " + (saved.getCategory() != null ? saved.getCategory().getName() : "NULL"));
        return saved;
    }

    public List<Transaction> getAllTransactions() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return transactionRepository.findByUser(user);
    }

    public Transaction getTransactionById(Long id) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return transactionRepository.findByIdAndUser(id, user).orElse(null);
    }

    public Transaction updateTransaction(Long id, Transaction transaction) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return transactionRepository.findByIdAndUser(id, user).map(existingTransaction -> {
            existingTransaction.setDate(transaction.getDate());
            existingTransaction.setDescription(transaction.getDescription());
            existingTransaction.setAmount(transaction.getAmount());
            existingTransaction.setType(transaction.getType());

            // Ensure the category is managed
            if (transaction.getCategory() != null) {
                System.out.println("DEBUG: Updating transaction ID " + id + " with category: " + transaction.getCategory().getName() + " (ID: " + transaction.getCategory().getId() + ")");
                Category managedCategory = categoryService.addCategory(transaction.getCategory());
                existingTransaction.setCategory(managedCategory);
                System.out.println("DEBUG: Updated to managed category: " + managedCategory.getName() + " (ID: " + managedCategory.getId() + ")");
            } else {
                System.out.println("DEBUG: Updating transaction ID " + id + " with NULL category");
                existingTransaction.setCategory(null);
            }

            Transaction saved = transactionRepository.save(existingTransaction);
            System.out.println("DEBUG: Saved updated transaction with category: " + (saved.getCategory() != null ? saved.getCategory().getName() : "NULL"));
            return saved;
        }).orElse(null);
    }

    public void deleteTransaction(Long id) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        transactionRepository.findByIdAndUser(id, user).ifPresent(transaction -> transactionRepository.deleteById(id));
    }

    public SummaryDto getSummary() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return transactionRepository.getSummary(user);
    }
}
