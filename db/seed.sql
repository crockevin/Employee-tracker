INSERT INTO department (name) VALUES
('HR Department'),
('IT Department'),
('Finance Department');

INSERT INTO role (title, salary, department_id) VALUES
('HR Manager', 70000.00, 1),
('HR Specialist', 50000.00, 1),
('IT Manager', 80000.00, 2),
('Software Engineer', 60000.00, 2),
('Finance Manager', 75000.00, 3),
('Financial Analyst', 55000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Mike', 'Johnson', 3, NULL),
('Sarah', 'Brown', 4, 3),
('David', 'Williams', 5, NULL),
('Emily', 'Davis', 6, 5);
