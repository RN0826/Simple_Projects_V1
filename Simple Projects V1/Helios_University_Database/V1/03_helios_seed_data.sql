-- Version: 1.0
-- Author: Rahul SP
-- Description: Helios University Database Seed Data
-- Date: March 4th, 2026

/* 
===========================
   DEPARTMENTS
=========================== 
*/

INSERT INTO DEPARTMENTS(
    DEPT_ID,
    DEPT_NAME,
    DEPT_STATUS,
    DEPT_BUDGET,
    HOD_ID
)
VALUES(
    101,
    'Computer Science Engineering',
    'ACTIVE',
    750000.00,
    NULL
);

/* 
===========================
   PROFESSORS
=========================== 
*/

INSERT INTO PROFESSORS(
    PROF_ID, 
    FNAME, MNAME, LNAME, 
    EMAIL, PH_NUM, 
    HIRE_DATE, 
    DEPT_ID, 
    SPECIALIZATION, 
    QUALIFICATION
)
VALUES(
    10001, 
    'Max', 'Andrew', 'Harrison', 
    'max.harrison@helios.edu', '+91-9876543210', 
    DATE '2020-06-15', 
    101, 
    'Systems Programming', 
    'PhD Computer Science'
);

INSERT INTO PROFESSORS(
    PROF_ID, 
    FNAME, MNAME, LNAME, 
    EMAIL, PH_NUM, 
    HIRE_DATE, 
    DEPT_ID, 
    SPECIALIZATION, 
    QUALIFICATION
)
VALUES(
    10002, 
    'Mia', NULL, 'Rodriguez', 
    'mia.rodriguez@helios.edu', '+91-9876543211', 
    DATE '2021-01-10', 
    101, 
    'Object Oriented Programming', 
    'M.Tech Computer Science'
);

INSERT INTO PROFESSORS(
    PROF_ID, 
    FNAME, MNAME, LNAME, 
    EMAIL, PH_NUM, 
    HIRE_DATE, 
    DEPT_ID, 
    SPECIALIZATION, 
    QUALIFICATION
)
VALUES(
    10003, 
    'David', 'Lee', 'Walker', 
    'david.walker@helios.edu', '+91-9876543212', 
    DATE '2019-03-20', 
    101, 
    'Software Engineering', 
    'PhD Software Engineering'
);

INSERT INTO PROFESSORS(
    PROF_ID, 
    FNAME, MNAME, LNAME, 
    EMAIL, PH_NUM, 
    HIRE_DATE, 
    DEPT_ID, 
    SPECIALIZATION, 
    QUALIFICATION
)
VALUES(
    10004, 
    'Amy', NULL, 'Thompson', 
    'amy.thompson@helios.edu', '+91-9876543213', 
    DATE '2022-08-01', 
    101, 
    'Programming Languages', 
    'M.Tech Computer Science'
);

INSERT INTO PROFESSORS(
    PROF_ID,
    FNAME,
    MNAME,
    LNAME,
    EMAIL,
    PH_NUM,
    HIRE_DATE,
    DEPT_ID,
    SPECIALIZATION,
    QUALIFICATION
)
VALUES(
    10005,
    'Bruce',
    NULL,
    'Wayne',
    'bruce.wayne@helios.edu',
    '+91-9876543214',
    DATE '2024-01-01',
    101,
    'Cyber Security',
    'PhD Information Security'
);
/*
===========================
    Assigning HOD
===========================
*/

UPDATE DEPARTMENTS
SET HOD_ID = 10001
WHERE DEPT_ID = 101;

/* 
===========================
   BATCHES
=========================== 
*/

INSERT INTO BATCHES(
    BATCH_ID, DEPT_ID, 
    COHORT_YEAR, 
    SECTION_LETTER, 
    CURRENT_YEAR, 
    DISPLAY_LABEL, 
    BATCH_STATUS
)
VALUES(
    1, 101, 
    2026, 'A', 
    1, 
    NULL, 
    'ACTIVE'
);

/* 
===========================
   STUDENTS
=========================== 
*/

INSERT INTO STUDENTS(
    STUDENT_ID, 
    FNAME, MNAME, LNAME, 
    GENDER, DATE_OF_BIRTH, 
    EMAIL, PH_NUM,
    ADMISSION_DATE, BATCH_ID, 
    CGPA, 
    STUDENT_STATUS
)
VALUES(
    2000001, 
    'Barry', NULL, 'Allen', 
    'MALE', DATE '2008-02-14',
    'barry.allen@helios.edu', '+91-9000000001',
    DATE '2026-07-01', 1, 
    NULL, 
    'ACTIVE'
 );

INSERT INTO STUDENTS(
    STUDENT_ID, 
    FNAME, MNAME, LNAME, 
    GENDER, DATE_OF_BIRTH, 
    EMAIL, PH_NUM,
    ADMISSION_DATE, BATCH_ID, 
    CGPA, 
    STUDENT_STATUS
)
VALUES(
    2000002, 
    'Iris', 'Marie', 'West', 
    'FEMALE', DATE '2008-05-21',
    'iris.west@helios.edu', '+91-9000000002',
    DATE '2026-07-01', 1, 
    NULL, 
    'ACTIVE'
 );

INSERT INTO STUDENTS(
    STUDENT_ID, 
    FNAME, MNAME, LNAME, 
    GENDER, DATE_OF_BIRTH, 
    EMAIL, PH_NUM,
    ADMISSION_DATE, BATCH_ID, 
    CGPA, 
    STUDENT_STATUS
)
VALUES(
    2000003, 
    'Clark', NULL, 'Kent', 
    'MALE', DATE '2008-01-10',
    'clark.kent@helios.edu', '+91-9000000003',
    DATE '2026-07-01', 1, 
    NULL, 
    'ACTIVE'
 );

INSERT INTO STUDENTS(
    STUDENT_ID, 
    FNAME, MNAME, LNAME, 
    GENDER, DATE_OF_BIRTH, 
    EMAIL, PH_NUM,
    ADMISSION_DATE, BATCH_ID, 
    CGPA, 
    STUDENT_STATUS
)
VALUES(
    2000004, 
    'Diana', NULL, 'Prince', 
    'FEMALE', DATE '2008-11-18',
    'diana.prince@helios.edu', '+91-9000000004',
    DATE '2026-07-01', 1, 
    NULL, 
    'ACTIVE'
 );

INSERT INTO STUDENTS(
    STUDENT_ID, 
    FNAME, MNAME, LNAME, 
    GENDER, DATE_OF_BIRTH, 
    EMAIL, PH_NUM,
    ADMISSION_DATE, BATCH_ID, 
    CGPA, 
    STUDENT_STATUS
)
VALUES(
    2000005, 
    'Peter', 'Benjamin', 'Parker', 
    'MALE', DATE '2008-08-10',
    'peter.parker@helios.edu', '+91-9000000005',
    DATE '2026-07-01', 1, 
    NULL, 
    'ACTIVE'
 );

/* 
===========================
   COURSES
=========================== 
*/

INSERT INTO COURSES(
    COURSE_ID, COURSE_CODE, COURSE_NAME, 
    COURSE_LEVEL, CREDITS,TOTAL_HOURS, 
    DEPT_ID, 
    COURSE_STATUS
)
VALUES(
    301, 'CSE101', 'Programming with C', 
    'UG', 4, 60, 
    101, 
    'ACTIVE'
);

INSERT INTO COURSES(
    COURSE_ID, COURSE_CODE, COURSE_NAME, 
    COURSE_LEVEL, CREDITS,TOTAL_HOURS, 
    DEPT_ID, 
    COURSE_STATUS
)
VALUES(
    302, 'CSE201', 'Programming with Java', 
    'UG', 4, 60, 
    101, 
    'ACTIVE'
);

INSERT INTO COURSES(
    COURSE_ID, COURSE_CODE, COURSE_NAME, 
    COURSE_LEVEL, CREDITS,TOTAL_HOURS, 
    DEPT_ID, 
    COURSE_STATUS
)
VALUES(
    303, 'CSE301', 'Programming with Python', 
    'UG', 4, 60, 
    101, 
    'ACTIVE'
);

INSERT INTO COURSES(
    COURSE_ID,
    COURSE_CODE,
    COURSE_NAME,
    COURSE_LEVEL,
    CREDITS,
    TOTAL_HOURS,
    DEPT_ID,
    COURSE_STATUS
)
VALUES(
    304,
    'CSE401',
    'Operating Systems',
    'UG',
    4,
    60,
    101,
    'ACTIVE'
);

/* 
===========================
    COURSE_PREREQ
=========================== 
*/

INSERT ALL
    INTO COURSE_PREREQ (COURSE_ID, PREREQ_COURSE_ID)
        VALUES (302, 301)
    INTO COURSE_PREREQ (COURSE_ID, PREREQ_COURSE_ID)
        VALUES (303, 302)
SELECT * FROM DUAL;

/* 
===========================
    FACULTY_COURSE_ALLOCATION
=========================== 
*/

-- C taught by Max and Mia
INSERT INTO FACULTY_COURSE_ALLOCATION(
    ALLOCATION_ID, PROF_ID, COURSE_ID, BATCH_ID,
    SEMESTER, ACADEMIC_YEAR
)
VALUES(
    40001, 10001, 301, 1, 
    'FALL', 2026
);


INSERT INTO FACULTY_COURSE_ALLOCATION(
    ALLOCATION_ID, PROF_ID, COURSE_ID, BATCH_ID,
    SEMESTER, ACADEMIC_YEAR
)
VALUES(
    40002, 10002, 301, 1, 
    'FALL', 2026
);

-- Java taught by David and Amy
INSERT INTO FACULTY_COURSE_ALLOCATION(
    ALLOCATION_ID, PROF_ID, COURSE_ID, BATCH_ID,
    SEMESTER, ACADEMIC_YEAR
)
VALUES(
    40003, 10003, 302, 1, 
    'FALL', 2026
);

INSERT INTO FACULTY_COURSE_ALLOCATION(
    ALLOCATION_ID, PROF_ID, COURSE_ID, BATCH_ID,
    SEMESTER, ACADEMIC_YEAR
)
VALUES(
    40004, 10004, 302, 1, 
    'FALL', 2026
);

-- Python taught by Max and David
INSERT INTO FACULTY_COURSE_ALLOCATION(
    ALLOCATION_ID, PROF_ID, COURSE_ID, BATCH_ID,
    SEMESTER, ACADEMIC_YEAR
)
VALUES(
    40005, 10001, 303, 1, 
    'FALL', 2026
);

INSERT INTO FACULTY_COURSE_ALLOCATION(
    ALLOCATION_ID, PROF_ID, COURSE_ID, BATCH_ID,
    SEMESTER, ACADEMIC_YEAR
)
VALUES(
    40006, 10003, 303, 1, 
    'FALL', 2026
);

/*
===========================
   ENROLLMENTS
=========================== 
*/


INSERT INTO ENROLLMENTS(
    ENROLLMENT_ID, STUDENT_ID, COURSE_ID,
    SEMESTER, ACADEMIC_YEAR,
    ENROLLMENT_DATE,
    GRADE,
    ENROLLMENT_STATUS
)
VALUES(
    50001, 2000001, 301, 
    'FALL', 2026, 
    SYSDATE, 
    NULL, 
    'ENROLLED'
);

INSERT INTO ENROLLMENTS(
    ENROLLMENT_ID, STUDENT_ID, COURSE_ID,
    SEMESTER, ACADEMIC_YEAR,
    ENROLLMENT_DATE,
    GRADE,
    ENROLLMENT_STATUS
)
VALUES(
    50002, 2000002, 301, 
    'FALL', 2026, 
    SYSDATE, 
    NULL, 
    'ENROLLED'
);

INSERT INTO ENROLLMENTS(
    ENROLLMENT_ID, STUDENT_ID, COURSE_ID,
    SEMESTER, ACADEMIC_YEAR,
    ENROLLMENT_DATE,
    GRADE,
    ENROLLMENT_STATUS
)
VALUES(
    50003, 2000003, 301, 
    'FALL', 2026, 
    SYSDATE, 
    NULL, 
    'ENROLLED'
);

INSERT INTO ENROLLMENTS(
    ENROLLMENT_ID, STUDENT_ID, COURSE_ID,
    SEMESTER, ACADEMIC_YEAR,
    ENROLLMENT_DATE,
    GRADE,
    ENROLLMENT_STATUS
)
VALUES(
    50004, 2000004, 301, 
    'FALL', 2026, 
    SYSDATE, 
    NULL, 
    'ENROLLED'
);

INSERT INTO ENROLLMENTS(
    ENROLLMENT_ID, STUDENT_ID, COURSE_ID,
    SEMESTER, ACADEMIC_YEAR,
    ENROLLMENT_DATE,
    GRADE,
    ENROLLMENT_STATUS
)
VALUES(
    50005, 2000005, 301, 
    'FALL', 2026, 
    SYSDATE, 
    NULL, 
    'ENROLLED'
);

INSERT INTO ENROLLMENTS(
    ENROLLMENT_ID, STUDENT_ID, COURSE_ID,
    SEMESTER, ACADEMIC_YEAR,
    ENROLLMENT_DATE,
    GRADE,
    ENROLLMENT_STATUS
)
VALUES(
    50006, 2000001, 302,
    'FALL', 2026,
    SYSDATE,
    NULL,
    'ENROLLED'
);

INSERT INTO ENROLLMENTS(
    ENROLLMENT_ID, STUDENT_ID, COURSE_ID,
    SEMESTER, ACADEMIC_YEAR,
    ENROLLMENT_DATE,
    GRADE,
    ENROLLMENT_STATUS
)
VALUES(
    50007, 2000002, 302,
    'FALL', 2026,
    SYSDATE,
    NULL,
    'ENROLLED'
);

COMMIT;