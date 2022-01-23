INSERT INTO department (name)
VALUES
    ('Managment'),
    ('Engineering'),
    ('Data'),
    ('Public Relations');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Manager', 200000, 1),
    ('Assistant Manager', 100000, 1),
    ('Software Engineer', 200000, 2),
    ('Developer', 150000, 2),
    ('Data Scientist', 200000, 3),
    ('Data Analyst', 175000, 3),
    ('Social Media', 100000, 4),
    ('Receptionist', 50000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Gary', 'Newman', 1, 1),
    ('Tony', 'Zamboni', 2, 1),
    ('Barry', 'Tompkins', 3, 2),
    ('Bill', 'Jim', 4, 2),
    ('Harry', 'Reed', 5, 3),
    ('Taylor', 'Fish', 6, 3),
    ('Bob', 'Lechard', 7, 4),
    ('Joey', 'Lee', 8, 4);