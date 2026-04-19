package com.example.financemanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Map;

@Data
@AllArgsConstructor
public class AdminSummaryDto {
    private int totalUsers;
    private int totalTransactions;
    private BigDecimal totalIncome;
    private BigDecimal totalExpenses;
    private BigDecimal netBalance;
    private Map<String, BigDecimal> categoryBreakdown;
    private BigDecimal averageTransactionAmount;
}
