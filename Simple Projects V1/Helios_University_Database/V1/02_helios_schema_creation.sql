/*
====================================================
    Helios University Database Schema Creation Script
    Version : 1.0
    Author  : Rahul SP
    Started : March 3rd 2026
    Finished: June 16th 2026
====================================================

    This script defines the initial database schema for
    Helios University and establishes the core academic
    entities used throughout the system.

    Version 1.0 includes:
        - Departments
        - Professors
        - Batches
        - Courses
        - Course Prerequisites
        - Students
        - Enrollments
        - Faculty Course Allocations

    The schema emphasizes relational integrity through
    primary keys, foreign keys, constraints, and triggers
    to support consistent academic data management.

====================================================
*/

/* Table Creation File */

CREATE TABLE DEPARTMENTS(

    DEPT_ID NUMBER(3) PRIMARY KEY
        CONSTRAINT CHECK_DEPT_ID_POSITIVE
        CHECK (DEPT_ID > 0),

    DEPT_NAME VARCHAR2(50 CHAR) NOT NULL
        CONSTRAINT UK_DEPT_NAME UNIQUE,

    DEPT_STATUS VARCHAR2(10 CHAR) NOT NULL
        CONSTRAINT CHECK_DEPT_STATUS
        CHECK (DEPT_STATUS IN ('ACTIVE','INACTIVE','CLOSED')),
        
    DEPT_BUDGET NUMBER(8,2) NOT NULL
        CONSTRAINT CHECK_DEPT_BUDGET_NONEG
        CHECK (DEPT_BUDGET >= 0),

    HOD_ID NUMBER(5),
    
    CREATED_DATE DATE DEFAULT SYSDATE NOT NULL    
);

/*
    Clarifications:

    DEPT_ID NUMBER(3)
        -> Unique internal identifier for each department.
           Restricted to positive values to maintain controlled ID allocation.

    DEPT_NAME VARCHAR2(50)
        -> Official department name.
           Must be unique to prevent duplicate departmental records.

    DEPT_STATUS VARCHAR2(10)
        -> Indicates operational status of the department.
           Restricted to ('ACTIVE','INACTIVE','CLOSED')
           to maintain administrative consistency.
           
    DEPT_BUDGET NUMBER(8,2)
        -> Represents the allocated annual budget of the department.
           Enforced to be non-negative.
           Supports financial precision up to two decimal places.

    HOD_ID NUMBER(5)
        -> Stores the professor currently assigned as Head of Department.
           Foreign key constraint will be added after PROFESSORS table creation
           to avoid circular dependency.
           
    CREATED_DATE DATE
        -> Records the creation date of the department entry.
           Defaults to system date if not explicitly provided.
*/

/* 2. Professors Table */

CREATE TABLE PROFESSORS(

    PROF_ID NUMBER(5) PRIMARY KEY
        CONSTRAINT CHECK_PROF_ID_POSITIVE
        CHECK (PROF_ID > 0),

    FNAME VARCHAR2(50 CHAR) NOT NULL,
    MNAME VARCHAR2(50 CHAR),
    LNAME VARCHAR2(50 CHAR) NOT NULL,

    EMAIL VARCHAR2(255 CHAR) NOT NULL UNIQUE
        CONSTRAINT CHECK_EMAIL_FORMAT
        /* 
           Version 1 Restriction:
           Only institutional emails allowed (@helios.edu)
    
           Previous generic validation (retained for Version 2 expansion):
           CHECK (REGEXP_LIKE(EMAIL, 
           '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')) 
        */
        CHECK (REGEXP_LIKE(EMAIL,
        '^[A-Za-z0-9._%+-]+@helios\.edu$')),

    PH_NUM VARCHAR2(20 CHAR)
        CONSTRAINT CHECK_PHONE_FORMAT
        CHECK (REGEXP_LIKE(PH_NUM, '^[0-9+() -]+$')),

    HIRE_DATE DATE DEFAULT SYSDATE NOT NULL,

    DEPT_ID NUMBER(3)    
        CONSTRAINT FK_DEPT_ID
        REFERENCES DEPARTMENTS(DEPT_ID),
        
    SPECIALIZATION VARCHAR2(100 CHAR),
    QUALIFICATION VARCHAR2(100 CHAR)
);

/*
    Clarifications:

    PROF_ID NUMBER(5)
        -> Unique internal identifier for each professor.
           Restricted to positive values to maintain structured ID allocation.

    FNAME, MNAME, LNAME
        -> Stores professor’s legal name components.
           First and Last names are mandatory.
           Middle name is optional to accommodate naming variations.

    EMAIL VARCHAR2(255)
        -> Unique institutional email issued by Helios University.
           Restricted to '@helios.edu' domain using REGEXP validation.
           Ensures controlled and standardized communication format.

    PH_NUM VARCHAR2(20)
        -> Stores professor contact number.
           Restricted to numeric characters and standard phone symbols
           using REGEXP validation.

    HIRE_DATE DATE
        -> Records the professor’s official joining date.
           Defaults to system date if not explicitly provided.
           
    SPECIALIZATION
        -> Denotes the primary academic field of expertise
           of the professor within the institution.
    
    QUALIFICATION
        -> Indicates the highest academic degree or
           professional qualification earned by the professor.
*/

/* 
    Linking the HOD FK Constraint which was held back during the
    Departments Table creation.
*/

ALTER TABLE DEPARTMENTS
ADD CONSTRAINT FK_DEPT_HOD
FOREIGN KEY (HOD_ID)
REFERENCES PROFESSORS(PROF_ID);

/*
    Enforces that a professor may head at most one department at a time.
    Multiple NULL values are allowed to support departments without assigned HOD.
*/

ALTER TABLE DEPARTMENTS
ADD CONSTRAINT UK_HOD_UNIQUE
UNIQUE (HOD_ID);

/* 3. BATCHES TABLE */
CREATE TABLE BATCHES(

    BATCH_ID NUMBER(3) PRIMARY KEY
        CONSTRAINT CHECK_BATCH_ID_VALID
        CHECK (BATCH_ID > 0),
        
    DEPT_ID NUMBER(3) NOT NULL
        CONSTRAINT FK_BATCH_DEPT_ID
        REFERENCES DEPARTMENTS(DEPT_ID),
        
    COHORT_YEAR NUMBER(4) NOT NULL
        CONSTRAINT CHECK_COHORT_YEAR_VALID
        CHECK (COHORT_YEAR BETWEEN 2000 AND 2100),
        
    SECTION_LETTER VARCHAR2(1 CHAR) NOT NULL
        CONSTRAINT CHECK_SECTION_VALID
        CHECK (REGEXP_LIKE (SECTION_LETTER, '^[A-Z]$')),
    
    CURRENT_YEAR NUMBER(1) NOT NULL
        CONSTRAINT CHECK_CURRENT_YEAR_VALID
        CHECK (CURRENT_YEAR BETWEEN 1 AND 4),
        
    DISPLAY_LABEL VARCHAR2(10) NOT NULL,
        
    BATCH_STATUS VARCHAR2(10 CHAR) NOT NULL
        CONSTRAINT CHECK_BATCH_STATUS
        CHECK (BATCH_STATUS IN ('ACTIVE', 'COMPLETED')),
        
    CONSTRAINT UK_BATCH_UNIQUE
        UNIQUE (DEPT_ID, COHORT_YEAR, SECTION_LETTER)
);

/*
    Clarifications:

    BATCH_ID NUMBER(3)
        -> Unique internal identifier for each cohort batch.
           Restricted to positive values.

    DEPT_ID
        -> Identifies the department to which the batch belongs.
           Establishes a foreign key relationship with DEPARTMENTS.
           Each batch is associated with exactly one department.

    COHORT_YEAR
        -> Represents the year in which the batch was admitted.
           Used to identify the intake cohort (e.g., 2026).
           Remains constant throughout the cohort’s academic lifecycle.

    SECTION_LETTER
        -> Alphabetical subdivision within a department intake
           (e.g., A, B, C).
           Restricted to uppercase letters for standardized formatting.

    CURRENT_YEAR
        -> Indicates the current academic year of the cohort
           (1 through 4).
           Updated annually to reflect academic progression.

    DISPLAY_LABEL
        -> Human-readable batch identifier (e.g., 3A26).
           Derived from:
               CURRENT_YEAR + SECTION_LETTER + last two digits of COHORT_YEAR.
           Maintained for display and readability purposes only.
           Not used for relational logic or foreign key references.

    BATCH_STATUS
        -> Indicates operational status of the batch.
           'ACTIVE'     : Cohort currently progressing.
           'COMPLETED'  : Cohort has graduated.

    UK_BATCH_UNIQUE (DEPT_ID, COHORT_YEAR, SECTION_LETTER)
        -> Ensures that a department cannot have duplicate
           section letters within the same intake year.
*/

/*  TRIGGER For Auto-Generating DISPLAY_LABEL   */
CREATE OR REPLACE TRIGGER TRG_BATCH_DISPLAY_LABEL
BEFORE INSERT OR UPDATE ON BATCHES
FOR EACH ROW
DECLARE
    v_expected_label VARCHAR2(6);
BEGIN
    -- Generate expected label:
    -- CURRENT_YEAR + SECTION_LETTER + last 2 digits of COHORT_YEAR
    v_expected_label :=
          TO_CHAR(:NEW.CURRENT_YEAR)
       || :NEW.SECTION_LETTER
       || SUBSTR(TO_CHAR(:NEW.COHORT_YEAR), -2);

    -- If DISPLAY_LABEL is NULL → auto-generate
    IF :NEW.DISPLAY_LABEL IS NULL THEN
        :NEW.DISPLAY_LABEL := v_expected_label;

    ELSE
        -- Enforce format: 1 digit (1-4), 1 uppercase letter, 2 digits
        IF NOT REGEXP_LIKE(:NEW.DISPLAY_LABEL, '^[1-4][A-Z][0-9]{2}$') THEN
            RAISE_APPLICATION_ERROR(
                -20010,
                'Invalid DISPLAY_LABEL format. Expected format: '
                || v_expected_label
            );
        END IF;

        -- Enforce match with structured fields
        IF :NEW.DISPLAY_LABEL <> v_expected_label THEN
            RAISE_APPLICATION_ERROR(
                -20011,
                'DISPLAY_LABEL does not match structured fields. '
                || 'Did you mean "' || v_expected_label || '" ?'
            );
        END IF;
    END IF;
END;
/

/* 4. Courses Table */

CREATE TABLE COURSES(
    
    COURSE_ID NUMBER(5) PRIMARY KEY
        CONSTRAINT CHECK_COURSE_ID_POSITIVE
        CHECK (COURSE_ID > 0),
        
    COURSE_CODE VARCHAR2(10 CHAR) NOT NULL
        CONSTRAINT UK_COURSE_CODE UNIQUE
        CONSTRAINT CHECK_COURSE_CODE_FORMAT
        CHECK (REGEXP_LIKE(COURSE_CODE, '^[A-Z]{2,4}[0-9]{3}$')),
    
    COURSE_NAME VARCHAR2(100 CHAR) NOT NULL,
    
    COURSE_LEVEL VARCHAR2(2 CHAR) NOT NULL
        CONSTRAINT CHECK_LEVEL
        CHECK (COURSE_LEVEL IN ('UG','PG')),
        
    CREDITS NUMBER(2) NOT NULL
        CONSTRAINT CHECK_CREDITS_VALID
        CHECK (CREDITS BETWEEN 1 AND 10),
    
    TOTAL_HOURS NUMBER(3) NOT NULL
        CONSTRAINT CHECK_TOTAL_HOURS
        CHECK (TOTAL_HOURS > 0),
        
    DEPT_ID NUMBER(3) NOT NULL
        CONSTRAINT FK_COURSE_DEPT_ID
        REFERENCES DEPARTMENTS(DEPT_ID),
        
    COURSE_STATUS VARCHAR2(10 CHAR) NOT NULL
        CONSTRAINT CHECK_COURSE_STATUS
        CHECK (COURSE_STATUS IN ('ACTIVE','INACTIVE')),
                    
    CONSTRAINT UK_COURSE_DEPT_NAME 
        UNIQUE (COURSE_NAME, DEPT_ID)
);

/*
    Clarifications:

    COURSE_ID NUMBER(5)
        -> Unique internal identifier for each course.
           Restricted to positive values to maintain structured ID allocation.

    COURSE_CODE VARCHAR2(10)
        -> Human-readable alphanumeric course code (e.g., CS101, MATH204).
           Must be unique across the university.
           Enforced format: 2–4 uppercase letters followed by 3 digits.

    COURSE_NAME VARCHAR2(100)
        -> Official course title.
           Must be unique within a department to prevent duplicate naming
           conflicts in the same academic unit.

   COURSE_LEVEL
        -> Academic classification of the course.
           Used to differentiate undergraduate (UG)
           and postgraduate (PG) programs.
           
    CREDITS NUMBER(2)
        -> Academic credit value assigned to the course.
           Restricted to a range between 1 and 10.
           
    TOTAL_HOURS
        -> Total number of instructional hours assigned
           to the course within a semester or term.
           Enforced as a positive numeric value.

    DEPT_ID NUMBER(3)
        -> Identifies the owning department of the course.
           Establishes a foreign key relationship with DEPARTMENTS.
           Ensures each course belongs to exactly one department (Version 1 model).

    COURSE_STATUS VARCHAR2(10)
        -> Indicates whether the course is currently active or inactive.
           Restricted to ('ACTIVE','INACTIVE') for controlled lifecycle management.

    UK_COURSE_DEPT_NAME (COURSE_NAME, DEPT_ID)
        -> Ensures no two courses within the same department share the same name.
           Allows identical course names across different departments if required.
*/

/* 5. Course Prerequisites Table */

CREATE TABLE COURSE_PREREQ(

    COURSE_ID NUMBER(5) NOT NULL
        CONSTRAINT FK_CP_MAIN_COURSE
        REFERENCES COURSES(COURSE_ID),

    PREREQ_COURSE_ID NUMBER(5) NOT NULL
        CONSTRAINT FK_CP_REQUIRED_COURSE
        REFERENCES COURSES(COURSE_ID),

    CONSTRAINT PK_COURSE_PREREQ
        PRIMARY KEY (COURSE_ID, PREREQ_COURSE_ID),

    CONSTRAINT CHECK_NO_SELF_PREREQ
        CHECK (COURSE_ID <> PREREQ_COURSE_ID)
);

/*
    Clarifications:

    COURSE_ID
        -> Represents the course that requires prerequisite(s).
           References COURSES table.

    PREREQ_COURSE_ID
        -> Identifies the course that must be successfully completed
           prior to enrolling in COURSE_ID.
           References COURSES table.

    PK_COURSE_PREREQ (COURSE_ID, PREREQ_COURSE_ID)
        -> Composite primary key ensuring that the same prerequisite
           cannot be assigned multiple times to the same course.

    CHECK_NO_SELF_PREREQ
        -> Prevents a course from being defined as its own prerequisite.
           Enforced using the inequality operator (<>).
*/

/* 6. Students Table */

CREATE TABLE STUDENTS(

    STUDENT_ID NUMBER(7) PRIMARY KEY
        CONSTRAINT CHECK_STUDENT_ID_POSITIVE
        CHECK (STUDENT_ID > 0),
        
    FNAME VARCHAR2(50 CHAR) NOT NULL,
    MNAME VARCHAR2(50 CHAR),
    LNAME VARCHAR2(50 CHAR) NOT NULL,
    
    GENDER VARCHAR2(6 CHAR) NOT NULL
        CONSTRAINT CHECK_GENDER
        CHECK (GENDER IN ('MALE','FEMALE')),
    
    DATE_OF_BIRTH DATE NOT NULL,
    
    EMAIL VARCHAR2(255 CHAR) NOT NULL UNIQUE
        CONSTRAINT CHECK_STUDENT_EMAIL_FORMAT
        CHECK (REGEXP_LIKE(EMAIL,
        '^[A-Za-z0-9._%+-]+@helios\.edu$')),
        
    PH_NUM VARCHAR2(20 CHAR)
        CONSTRAINT CHECK_STUDENT_PHONE_FORMAT
        CHECK (REGEXP_LIKE(PH_NUM, '^[0-9+() -]+$')),

    ADMISSION_DATE DATE DEFAULT SYSDATE NOT NULL,

    BATCH_ID NUMBER(3) NOT NULL
        CONSTRAINT FK_STUDENT_BATCH_ID
        REFERENCES BATCHES(BATCH_ID),

    CGPA NUMBER(3,2)
        CONSTRAINT CHECK_CGPA_VALID
        CHECK (CGPA BETWEEN 0 AND 10),
    
    STUDENT_STATUS VARCHAR2(12 CHAR) NOT NULL
        CONSTRAINT CHECK_STUDENT_STATUS
        CHECK (STUDENT_STATUS IN ('ACTIVE','GRADUATED','DROPPED'))
);

/*
    Clarifications:

    STUDENT_ID NUMBER(7)
        -> Unique internal identifier for each student.
           Restricted to positive values.

    FNAME, MNAME, LNAME
        -> Student’s legal name components.
           First and Last names are mandatory.
           Middle name is optional.

    GENDER
        -> Indicates student gender.
           Restricted to controlled values ('MALE','FEMALE')
           for standardized reporting.
           
    DATE_OF_BIRTH
        -> Stores student's date of birth.
        
    EMAIL VARCHAR2(255)
        -> Institutional email issued by Helios University.
           Restricted to '@helios.edu' domain using REGEXP validation.
           Must be unique across students.
           
    PH_NUM
        -> Student contact number.
           Validated using the same pattern rules defined in PROFESSORS table.

    ADMISSION_DATE
        -> Records the official admission date.
           Defaults to system date if not explicitly provided.

    BATCH_ID
        -> Identifies the batch the student is enrolled in.
           Establishes a foreign key relationship with table BATCHES.

    CGPA
        -> Cumulative Grade Point Average.
           Restricted to values between 0 and 10.

    STUDENT_STATUS
        -> Indicates academic standing of the student.
           Restricted to ('ACTIVE','GRADUATED','DROPPED').
*/

/* 7. Enrollments Table */

CREATE TABLE ENROLLMENTS(

    ENROLLMENT_ID NUMBER(10) PRIMARY KEY
        CONSTRAINT CHECK_ENROLLMENT_ID_POSITIVE
        CHECK (ENROLLMENT_ID > 0),

    STUDENT_ID NUMBER(7) NOT NULL
        CONSTRAINT FK_ENROLL_STUDENT
        REFERENCES STUDENTS(STUDENT_ID),

    COURSE_ID NUMBER(5) NOT NULL
        CONSTRAINT FK_ENROLL_COURSE
        REFERENCES COURSES(COURSE_ID),

    SEMESTER VARCHAR2(6 CHAR) NOT NULL
        CONSTRAINT CHECK_SEMESTER_VALID
        CHECK (SEMESTER IN ('SPRING','SUMMER','FALL','WINTER')),

    ACADEMIC_YEAR NUMBER(4) NOT NULL
        CONSTRAINT CHECK_ACAD_YEAR_VALID
        CHECK (ACADEMIC_YEAR BETWEEN 2000 AND 2100),

    ENROLLMENT_DATE DATE DEFAULT SYSDATE NOT NULL,

    GRADE VARCHAR2(2 CHAR)
        CONSTRAINT CHECK_GRADE_PATTERN
        CHECK (REGEXP_LIKE(GRADE, '^([A-E][+-]?|F)$')),

    ENROLLMENT_STATUS VARCHAR2(12 CHAR) NOT NULL
        CONSTRAINT CHECK_ENROLL_STATUS
        CHECK (ENROLLMENT_STATUS IN ('ENROLLED','COMPLETED','DROPPED')),

    CONSTRAINT UK_ENROLL_UNIQUE
        UNIQUE (STUDENT_ID, COURSE_ID, SEMESTER, ACADEMIC_YEAR)
);

/*
    Clarifications:

    ENROLLMENT_ID
        -> Unique internal identifier for each enrollment record.
           Restricted to positive values.

    STUDENT_ID
        -> Identifies the student enrolling in a course.
           References STUDENTS table.

    COURSE_ID
        -> Identifies the course being enrolled in.
           References COURSES table.

    SEMESTER
        -> Academic term in which the course is taken.
           Restricted to ('SPRING','SUMMER','FALL','WINTER').

    ACADEMIC_YEAR
        -> Academic year corresponding to the enrollment.
           Restricted to realistic institutional range.

    ENROLLMENT_DATE
        -> Date when enrollment was recorded.
           Defaults to system date if not explicitly provided.

    GRADE
        -> Final grade awarded upon course completion.
           Nullable until course completion.
           Validated using REGEXP to allow:
               - Grades A through E with optional '+' or '-' modifiers.
               - Grade F without modifiers.

    ENROLLMENT_STATUS
        -> Indicates lifecycle stage of enrollment.
           Restricted to ('ENROLLED','COMPLETED','DROPPED').

    UK_ENROLL_UNIQUE (STUDENT_ID, COURSE_ID, SEMESTER, ACADEMIC_YEAR)
        -> Prevents duplicate enrollment of the same student
           in the same course during the same academic term.
*/

/* 8. Faculty Course Allocation Table */

CREATE TABLE FACULTY_COURSE_ALLOCATION(

    ALLOCATION_ID NUMBER(10) PRIMARY KEY
        CONSTRAINT CHECK_ALLOC_ID_POSITIVE
        CHECK (ALLOCATION_ID > 0),

    PROF_ID NUMBER(5) NOT NULL
        CONSTRAINT FK_FCA_PROF
        REFERENCES PROFESSORS(PROF_ID),

    COURSE_ID NUMBER(5) NOT NULL
        CONSTRAINT FK_FCA_COURSE
        REFERENCES COURSES(COURSE_ID),

    BATCH_ID NUMBER(3) NOT NULL
        CONSTRAINT FK_FCA_BATCH
        REFERENCES BATCHES(BATCH_ID),

    SEMESTER VARCHAR2(6 CHAR) NOT NULL
        CONSTRAINT CHECK_FCA_SEMESTER
        CHECK (SEMESTER IN ('SPRING','SUMMER','FALL','WINTER')),

    ACADEMIC_YEAR NUMBER(4) NOT NULL
        CONSTRAINT CHECK_FCA_YEAR
        CHECK (ACADEMIC_YEAR BETWEEN 2000 AND 2100),

    CONSTRAINT UK_FCA_UNIQUE
        UNIQUE (PROF_ID, COURSE_ID, BATCH_ID, SEMESTER, ACADEMIC_YEAR)
);

/*
    Clarifications:

    ALLOCATION_ID
        -> Unique internal identifier for each teaching assignment.

    PROF_ID
        -> Identifies the professor teaching the course.
           References PROFESSORS table.

    COURSE_ID
        -> Identifies the course being taught.
           References COURSES table.

    BATCH_ID
        -> Identifies the batch receiving instruction.
           References BATCHES table.

    SEMESTER
        -> Academic term of instruction.
           Restricted to ('SPRING','SUMMER','FALL','WINTER').

    ACADEMIC_YEAR
        -> Academic year of instruction.

    UK_FCA_UNIQUE
        -> Prevents duplicate assignment of the same professor
           to the same course, batch, and academic term.
*/

/*
    TRIGGER: 

    Purpose:
        Enforces a maximum of two professors assigned
        to teach the same course to the same batch
        within a specific academic term.

    Rationale:
        Supports controlled team-teaching structure
        while preventing over-assignment of faculty
        to a single course-batch-term combination.

    Scope:
        - Allows professors to teach multiple batches.
        - Allows multiple professors (up to two)
          per course, batch, and term.
*/

CREATE OR REPLACE TRIGGER TRG_LIMIT_TWO_PROFS
BEFORE INSERT ON FACULTY_COURSE_ALLOCATION
FOR EACH ROW
DECLARE
    v_count NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO v_count
    FROM FACULTY_COURSE_ALLOCATION
    WHERE COURSE_ID = :NEW.COURSE_ID
      AND BATCH_ID = :NEW.BATCH_ID
      AND SEMESTER = :NEW.SEMESTER
      AND ACADEMIC_YEAR = :NEW.ACADEMIC_YEAR;

    IF v_count >= 2 THEN
        RAISE_APPLICATION_ERROR(
            -20020,
            'Maximum of 2 professors allowed for this course, batch, and term.'
        );
    END IF;
END;
/

/*
    Trigger: TRG_LIMIT_TWO_PROFS

    Purpose:
        Enforces a maximum of two professors teaching
        the same course to the same batch within
        a specific academic term.

    Behavior:
        Before insertion, counts existing assignments
        matching COURSE_ID, BATCH_ID, SEMESTER, and ACADEMIC_YEAR.

        If two assignments already exist,
        insertion is blocked with an error.

    Design Rationale:
        Maintains controlled team-teaching structure
        while allowing up to two instructors per batch.
*/


COMMIT;
-- Not required for DDL operations (Oracle auto-commits).
-- Included only as a conventional script terminator.