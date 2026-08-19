SELECT COUNT(id) AS students_with_code FROM students WHERE biometric_code IS NOT NULL AND biometric_code != '';
SELECT COUNT(id) AS teachers_with_code FROM teachers WHERE biometric_code IS NOT NULL AND biometric_code != '';
