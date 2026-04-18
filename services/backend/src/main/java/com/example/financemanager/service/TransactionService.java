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
            Category managedCategory = categoryService.addCategory(transaction.getCategory());
            transaction.setCategory(managedCategory);
        }

        return transactionRepository.save(transaction);
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
                Category managedCategory = categoryService.addCategory(transaction.getCategory());
                existingTransaction.setCategory(managedCategory);
            }

            return transactionRepository.save(existingTransaction);
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
