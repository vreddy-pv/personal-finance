-- Initialize categories
INSERT IGNORE INTO category (name) VALUES ('SALARY');
INSERT IGNORE INTO category (name) VALUES ('FOOD');
INSERT IGNORE INTO category (name) VALUES ('RENT');
INSERT IGNORE INTO category (name) VALUES ('TRAVEL');
INSERT IGNORE INTO category (name) VALUES ('SHOPPING');

-- Clean up corrupted data: must UPDATE transactions BEFORE DELETE on categories (FK constraint)
SET FOREIGN_KEY_CHECKS=0;
UPDATE transaction SET category_id = NULL WHERE category_id IN (
  SELECT id FROM (SELECT id FROM category WHERE name IS NULL OR TRIM(name) = '') AS tmp
);
DELETE FROM category WHERE name IS NULL OR TRIM(name) = '';
SET FOREIGN_KEY_CHECKS=1;

-- Passwords: admin=admin123, testpfuser1=test123, testpfuser2=test123
INSERT IGNORE INTO _user (username, email, password, role) VALUES ('admin', 'admin@vrgt.com', '$2a$10$xVSTImjxpB.0jcygnNE7Bujpa9jTNBAWQ5SxCreWGQGZUA8eGPV7q', 'ADMIN');
INSERT IGNORE INTO _user (username, email, password, role) VALUES ('testpfuser1', 'testpfuser1@vrgt.com', '$2a$10$oordF987oUgN4gEA1zO6TO0GMG2CbaVGux0O4cANlMfTMJVeMrcAm', 'USER');
INSERT IGNORE INTO _user (username, email, password, role) VALUES ('testpfuser2', 'testpfuser2@vrgt.com', '$2a$10$oordF987oUgN4gEA1zO6TO0GMG2CbaVGux0O4cANlMfTMJVeMrcAm', 'USER');
