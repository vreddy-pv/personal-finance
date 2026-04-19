-- Check categories with NULL names
SELECT * FROM category WHERE name IS NULL OR name = '';

-- Check transactions linked to categories
SELECT 
  t.id, 
  t.description, 
  t.amount, 
  t.category_id,
  c.name as category_name
FROM transaction t
LEFT JOIN category c ON t.category_id = c.id
ORDER BY t.id DESC;
