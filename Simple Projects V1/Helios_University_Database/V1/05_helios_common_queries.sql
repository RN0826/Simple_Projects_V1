/*
====================================================
     Helios University Database
     Common Queries
    ------------------------------------------------
     Demonstrates typical queries performed on the
     Helios University relational database.
====================================================
*/

/*
====================================================
    1. Basic Retrieval Queries
====================================================
*/


-- Q1. List all departments in the university.

SELECT 
    DEPT_ID,
    DEPT_NAME,
    HOD_ID AS HOD_PROF_ID,
    DEPT_STATUS
FROM DEPARTMENTS;


-- Q2. Display all professors along with their specialization.

SELECT 
    PROF_ID,
    FNAME, LNAME,
    SPECIALIZATION
FROM PROFESSORS;


-- Q3. Show all students currently marked as ACTIVE.

SELECT 
    STUDENT_ID,
    FNAME, LNAME,
    BATCH_ID
FROM STUDENTS
WHERE STUDENT_STATUS = 'ACTIVE';


-- Q4. List all courses offered by Helios University.

SELECT 
    COURSE_ID,
    COURSE_CODE,
    COURSE_NAME
FROM COURSES;


/*
====================================================
    2. Relationship Queries (JOIN)
====================================================
*/


-- Q5. List each student along with the batch they belong to.

SELECT 
    S1.STUDENT_ID,
    S1.FNAME,
    S1.LNAME,
    B1.DISPLAY_LABEL AS BATCH
FROM STUDENTS S1
JOIN BATCHES B1
    ON S1.BATCH_ID = B1.BATCH_ID;
    
    
-- Q6. Show each professor and the department they work in.

SELECT 
    P1.PROF_ID,
    P1.FNAME,
    P1.LNAME,
    D1.DEPT_NAME
FROM PROFESSORS P1
JOIN DEPARTMENTS D1
    ON P1.DEPT_ID = D1.DEPT_ID;


-- Q7. Display all courses offered by the Computer Science Engineering department.

SELECT 
    D2.DEPT_NAME,
    C1.COURSE_ID,
    C1.COURSE_NAME
FROM COURSES C1
JOIN DEPARTMENTS D2
    ON C1.DEPT_ID = D2.DEPT_ID
WHERE D2.DEPT_NAME = 'Computer Science Engineering';
    
    
/*
====================================================
    3. Teaching Queries
====================================================
*/


-- Q8. List which professors are teaching which courses.

SELECT 
    P2.PROF_ID,
    P2.FNAME,
    P2.LNAME,
    C2.COURSE_NAME
FROM PROFESSORS P2
JOIN FACULTY_COURSE_ALLOCATION FCA1
    ON P2.PROF_ID = FCA1.PROF_ID 
JOIN COURSES C2
    ON FCA1.COURSE_ID = C2.COURSE_ID
ORDER BY P2.PROF_ID ASC;


-- Q9. Display all courses being taught in Fall 2026.

SELECT DISTINCT
    C3.COURSE_ID,
    C3.COURSE_NAME,
    FCA2.SEMESTER,
    FCA2.ACADEMIC_YEAR
FROM COURSES C3
JOIN FACULTY_COURSE_ALLOCATION FCA2
    ON C3.COURSE_ID = FCA2.COURSE_ID
WHERE 
    FCA2.SEMESTER = 'FALL'
AND FCA2.ACADEMIC_YEAR = 2026;


-- Q10. Show which professors are teaching Programming with C.

SELECT DISTINCT
    P3.PROF_ID,
    P3.FNAME,
    P3.LNAME,
    C4.COURSE_NAME
FROM PROFESSORS P3
JOIN FACULTY_COURSE_ALLOCATION FCA3
    ON P3.PROF_ID = FCA3.PROF_ID
JOIN COURSES C4
    ON FCA3.COURSE_ID = C4.COURSE_ID
WHERE C4.COURSE_NAME = 'Programming with C';


/*
====================================================
    4. Enrollment Queries
====================================================
*/


-- Q11. List all students enrolled in Programming with C.

SELECT 
    S2.STUDENT_ID,
    S2.FNAME,
    S2.LNAME,
    E.COURSE_ID,
    C5.COURSE_NAME
FROM STUDENTS S2
JOIN ENROLLMENTS E
    ON S2.STUDENT_ID = E.STUDENT_ID
JOIN COURSES C5
    ON E.COURSE_ID = C5.COURSE_ID
WHERE C5.COURSE_NAME = 'Programming with C';


-- Q12. Display the courses taken by Barry Allen.

SELECT 
    S3.STUDENT_ID,
    S3.FNAME,
    S3.LNAME,
    E2.COURSE_ID,
    C6.COURSE_NAME
FROM STUDENTS S3
JOIN ENROLLMENTS E2
    ON S3.STUDENT_ID = E2.STUDENT_ID
JOIN COURSES C6
    ON E2.COURSE_ID = C6.COURSE_ID
WHERE S3.FNAME = 'Barry'
AND S3.LNAME = 'Allen';


-- Q13. List all students enrolled in Fall 2026.

SELECT DISTINCT
    S4.STUDENT_ID,
    S4.FNAME,
    S4.LNAME,
    E3.SEMESTER,
    E3.ACADEMIC_YEAR
FROM STUDENTS S4
JOIN ENROLLMENTS E3
    ON S4.STUDENT_ID = E3.STUDENT_ID
WHERE E3.SEMESTER = 'FALL'
AND E3.ACADEMIC_YEAR = 2026;

-- Q13V2. 

SELECT
    S4.STUDENT_ID,
    S4.FNAME,
    S4.LNAME
FROM STUDENTS S4
WHERE EXISTS (
    SELECT 1
    FROM ENROLLMENTS E3
    WHERE E3.STUDENT_ID = S4.STUDENT_ID
      AND E3.SEMESTER = 'FALL'
      AND E3.ACADEMIC_YEAR = 2026
);


/*
====================================================
    5. Aggregate Queries
====================================================
*/


-- Q14. How many students are enrolled in each course?

SELECT 
    C1.COURSE_ID,
    C1.COURSE_NAME,
    COUNT(E1.STUDENT_ID) AS NUMBER_OF_ENROLLED_STUDENTS
FROM COURSES C1
LEFT JOIN ENROLLMENTS E1
    ON C1.COURSE_ID = E1.COURSE_ID
GROUP BY
    C1.COURSE_ID,
    C1.COURSE_NAME
ORDER BY
    C1.COURSE_ID;


-- Q15. How many students belong to each batch?

SELECT 
    S1.BATCH_ID,
    COUNT(S1.BATCH_ID) AS NUMBER_OF_STUDENTS
FROM STUDENTS S1
GROUP BY
    S1.BATCH_ID;
    
-- Q15. V2

SELECT 
    B1.DISPLAY_LABEL,
    COUNT(S1.STUDENT_ID) AS NUMBER_OF_STUDENTS
FROM BATCHES B1
LEFT JOIN STUDENTS S1
    ON S1.BATCH_ID = B1.BATCH_ID
GROUP BY
    B1.DISPLAY_LABEL;


-- Q16. How many courses does each department offer?

SELECT 
   C2.DEPT_ID,
   D1.DEPT_NAME,
   COUNT(C2.COURSE_ID) AS NUMBER_OF_COURSES_OFFERED
FROM COURSES C2
LEFT JOIN DEPARTMENTS D1
    ON D1.DEPT_ID = C2.DEPT_ID
GROUP BY 
     C2.DEPT_ID,
     D1.DEPT_NAME;

/* Q16 v1 hides departments that currently have no courses. */

-- Q16. V2
-- Includes departments even if they currently offer zero courses.
SELECT 
    D1.DEPT_ID,
    D1.DEPT_NAME,
    COUNT(C2.COURSE_ID) AS NUMBER_OF_COURSES_OFFERED
FROM DEPARTMENTS D1
LEFT JOIN COURSES C2
    ON D1.DEPT_ID= C2.DEPT_ID 
GROUP BY
    D1.DEPT_ID,
    D1.DEPT_NAME;

    
/*
====================================================
    6. Prerequisite Queries
====================================================
*/

-- 17. Display the prerequisite chain for each course.

SELECT   
    C1.COURSE_NAME AS MUST_KNOW,
    C2.COURSE_NAME AS FOR_COURSE
FROM COURSE_PREREQ CP
JOIN COURSES C1
    ON CP.PREREQ_COURSE_ID = C1.COURSE_ID
JOIN COURSES C2
    ON CP.COURSE_ID = C2.COURSE_ID;
    

-- 18. Which courses have no prerequisites?

SELECT 
    C1.COURSE_ID,
    C1.COURSE_NAME AS COURSE_WITH_NO_PREREQUISITES
FROM COURSES C1
LEFT JOIN COURSE_PREREQ CP
    ON C1.COURSE_ID = CP.COURSE_ID
WHERE CP.PREREQ_COURSE_ID IS NULL;


-- 19. How many prerequisites does each course have?

SELECT 
    C1.COURSE_ID,
    C1.COURSE_NAME,
    COUNT(CP.PREREQ_COURSE_ID) AS REQUIRED_NUMBER_OF_PREREQ_COURSES
FROM COURSES C1
LEFT JOIN COURSE_PREREQ CP
    ON C1.COURSE_ID = CP.COURSE_ID
LEFT JOIN COURSES C2
    ON CP.COURSE_ID = C2.COURSE_ID
GROUP BY
    C1.COURSE_NAME,
    C1.COURSE_ID
ORDER BY
    C1.COURSE_ID ASC;


-- 20. List all courses that require Programming with C.

SELECT 

    C1.COURSE_NAME,
    C2.COURSE_NAME AS REQUIRED_BY

FROM COURSES C1
JOIN COURSE_PREREQ CP
    ON C1.COURSE_ID = CP.PREREQ_COURSE_ID
JOIN COURSES C2
    ON CP.COURSE_ID = C2.COURSE_ID
WHERE C1.COURSE_NAME = 'Programming with C';


/*
====================================================
    7. Insight Queries (Advanced)
====================================================
*/


-- 21. Which professors are teaching more than one course?

SELECT 
    P.PROF_ID,
    P.FNAME,
    P.LNAME,
    COUNT(FCA.COURSE_ID) AS NUMBER_OF_COURSES_TAUGHT
FROM PROFESSORS P
LEFT JOIN faculty_course_allocation FCA
    ON P.PROF_ID = FCA.PROF_ID 
GROUP BY 
    P.PROF_ID,
    P.FNAME,
    P.LNAME
HAVING 
    COUNT(FCA.COURSE_ID )> 1;


-- 22. Which students are enrolled in more than one course?

SELECT 
    S.STUDENT_ID,
    S.FNAME,
    S.LNAME,
    COUNT (E.COURSE_ID) AS NUMBER_OF_COURSES_ENROLLED
FROM STUDENTS S
LEFT JOIN ENROLLMENTS E
    ON S.STUDENT_ID = E.STUDENT_ID
GROUP BY
    S.STUDENT_ID,
    S.FNAME,
    S.LNAME
HAVING 
    COUNT(E.COURSE_ID) > 1;
    
    
-- 23. List all courses that have prerequisites.

SELECT 
    C.COURSE_ID,
    C.COURSE_NAME AS COURSES_HAVING_A_PREREQUISITE_COURSE
    --COUNT(CP.COURSE_ID) AS COURSES_HAVING_A_PREREQUISITE_COURSE
FROM COURSES C
LEFT JOIN COURSE_PREREQ CP
    ON C.COURSE_ID = CP.COURSE_ID
GROUP BY
    C.COURSE_ID,
    C.COURSE_NAME
HAVING 
    COUNT(CP.COURSE_ID) >= 1;
    
    
/*
====================================================
    8. Optional
====================================================
*/


-- 24. List courses with no students enrolled.

SELECT
    C1.COURSE_ID,
    C1.COURSE_NAME AS COURSE_WITH_NO_STUDENTS_ENROLLED
FROM COURSES C1
LEFT JOIN ENROLLMENTS E1
    ON C1.COURSE_ID = E1.COURSE_ID
WHERE E1.STUDENT_ID IS NULL;


-- 25. List professors not teaching any course.

SELECT 
    P1.PROF_ID,
    P1.FNAME,
    P1.LNAME
FROM PROFESSORS P1
LEFT JOIN FACULTY_COURSE_ALLOCATION FCA
    ON P1.PROF_ID = FCA.PROF_ID
WHERE FCA.PROF_ID IS NULL;
