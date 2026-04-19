package com.example.financemanager.controller;

import com.example.financemanager.dto.AdminSummaryDto;
import com.example.financemanager.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/summary")
    @PreAuthorize("hasRole('ADMIN')")
    public AdminSummaryDto getAdminSummary() {
        return adminService.getAdminSummary();
    }
}
