SELECT last_name FROM employee;
SELECT DISTINCT last_name FROM employee;
SELECT * FROM employee WHERE last_name = 'Pérez';
SELECT * FROM employee WHERE last_name IN ('Pérez', 'López');
SELECT e.* FROM employee e JOIN departamento d ON e.Departament = d.Id WHERE d.name = 'Contabilidad';

SELECT e.* FROM employee e 
JOIN departamento d ON e.Departament = d.Id 
WHERE d.name = 'Contabilidad' OR d.name = 'Gerencial General';

SELECT * FROM employee WHERE last_name LIKE 'P%';

SELECT SUM(budget) AS 'budget Total' FROM departamento;

SELECT d.name, COUNT(e.Dpi) AS 'Número de employees' 
FROM departamento d 
LEFT JOIN employee e ON d.Id = e.Departament 
GROUP BY d.name;

SELECT e.*, d.name, d.budget 
FROM employee e 
JOIN departamento d ON e.Departament = d.Id;

SELECT e.nombre, e.last_name, d.name, d.budget 
FROM employee e 
JOIN departamento d ON e.Departament = d.Id 
ORDER BY e.last_name DESC;


SELECT e.nombre, e.last_name FROM employee e 
JOIN departamento d ON e.Departament = d.Id 
WHERE d.budget > 60000;

SELECT * FROM departamento 
WHERE budget > (SELECT AVG(budget) FROM departamento);

SELECT d.name FROM departamento d 
JOIN employee e ON d.Id = e.Departament 
GROUP BY d.name 
HAVING COUNT(e.Dpi) > 2;

INSERT INTO departamento (Id, name, budget) VALUES (11, 'Control de Calidad', 40000);
INSERT INTO employee (Dpi, nombre, last_name, Departament) VALUES (28948238, 'Esther', 'Vásquez', 11);
