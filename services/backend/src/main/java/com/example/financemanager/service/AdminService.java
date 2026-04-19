package com.example.financemanager.service;

import com.example.financemanager.dto.AdminSummaryDto;
import com.example.financemanager.model.Transaction;
import com.example.financemanager.repository.TransactionRepository;
import com.example.financemanager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;

    public AdminSummaryDto getAdminSummary() {
        List<Transaction> allTransactions = transactionRepository.findAll();

        BigDecimal totalIncome = BigDecimal.ZERO;
        BigDecimal totalExpenses = BigDecimal.ZERO;
        Map<String, BigDecimal> categoryBreakdown = new HashMap<>();

        for (Transaction t : allTransactions) {
            BigDecimal amount = t.getAmount();
            String type = t.getType() != null ? t.getType().name() : "EXPENSE";
            String categoryName = t.getCategory() != null ? t.getCategory().getName() : "Uncategorized";

            if ("INCOME".equalsIgnoreCase(type)) {
                totalIncome = totalIncome.add(amount);
            } else {
                totalExpenses = totalExpenses.add(amount);
            }

            categoryBreakdown.put(
                categoryName,
                categoryBreakdown.getOrDefault(categoryName, BigDecimal.ZERO).add(amount)
            );
        }

        BigDecimal netBalance = totalIncome.subtract(totalExpenses);
        BigDecimal averageAmount = BigDecimal.ZERO;

        if (!allTransactions.isEmpty()) {
            BigDecimal sum = allTransactions.stream()
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
            averageAmount = sum.divide(BigDecimal.valueOf(allTransactions.size()), 2, BigDecimal.ROUND_HALF_UP);
        }

        return new AdminSummaryDto(
            (int) userRepository.count(),
            allTransactions.size(),
            totalIncome,
            totalExpenses,
            netBalance,
            categoryBreakdown,
            averageAmount
        );
    }
}
