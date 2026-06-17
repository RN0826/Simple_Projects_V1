/*
====================================================
    Helios University Database
    Validation / Verification Queries
    ------------------------------------------------
    Used to confirm that schema and seed data
    were successfully created and populated.
====================================================
*/
DESC DEPARTMENTS;
DESC PROFESSORS;
DESC BATCHES;
DESC COURSES;
DESC COURSE_PREREQ;
DESC STUDENTS;
DESC ENROLLMENTS;
DESC FACULTY_COURSE_ALLOCATION;

/*
====================================================
    Checking the contents of table,
    As each update is made. 
====================================================
*/

SELECT * FROM DEPARTMENTS;
SELECT * FROM PROFESSORS;
SELECT * FROM BATCHES;
SELECT * FROM STUDENTS;
SELECT * FROM COURSES;
SELECT * FROM COURSE_PREREQ;
SELECT * FROM FACULTY_COURSE_ALLOCATION;
SELECT * FROM ENROLLMENTS;