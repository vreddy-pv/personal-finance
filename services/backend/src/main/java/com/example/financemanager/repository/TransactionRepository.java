package com.example.financemanager.repository;

import com.example.financemanager.dto.SummaryDto;
import com.example.financemanager.model.Transaction;
import com.example.financemanager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

import com.example.financemanager.model.Transaction;
import com.example.financemanager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUser(User user);
    Optional<Transaction> findByIdAndUser(Long id, User user);

    @Query("SELECT new com.example.financemanager.dto.SummaryDto("
            + "COALESCE(SUM(CASE WHEN t.type = 'INCOME' THEN t.amount ELSE 0 END), 0) AS totalIncome, "
            + "COALESCE(SUM(CASE WHEN t.type = 'EXPENSE' THEN t.amount ELSE 0 END), 0) AS totalExpenses, "
            + "COALESCE(SUM(CASE WHEN t.type = 'INCOME' THEN t.amount ELSE -t.amount END), 0) AS netBalance) "
            + "FROM Transaction t WHERE t.user = :user")
    SummaryDto getSummary(@Param("user") User user);
}
