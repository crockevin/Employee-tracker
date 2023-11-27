INSERT INTO department (id, name) VALUES
(1, 'HR Department'),
(2, 'IT Department'),
(3, 'Finance Department');

INSERT INTO role (id, title, salary, department_id) VALUES
(1, 'HR Manager', 70000.00, 1),
(2, 'HR Specialist', 50000.00, 1),
(3, 'IT Manager', 80000.00, 2),
(4, 'Software Engineer', 60000.00, 2),
(5, 'Finance Manager', 75000.00, 3),
(6, 'Financial Analyst', 55000.00, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
(1, 'John', 'Doe', 1, NULL),
(2, 'Jane', 'Smith', 2, 1),
(3, 'Mike', 'Johnson', 3, NULL),
(4, 'Sarah', 'Brown', 4, 3),
(5, 'David', 'Williams', 5, NULL),
(6, 'Emily', 'Davis', 6, 5);