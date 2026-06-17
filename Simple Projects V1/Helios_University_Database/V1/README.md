# **Helios University Database (Version 1\)**

## **Project Overview**

Helios University Database is a relational database project developed using Oracle SQL.

The goal of this project is to model the core academic operations of a university, including:

* Departments  
* Professors  
* Student Batches (Cohorts)  
* Courses  
* Course Prerequisites  
* Student Enrollments  
* Faculty Course Allocations

The project focuses on proper relational database design, normalization principles, data integrity enforcement, and practical SQL querying.

---

## **Features**

### **Entity Relationship Design**

The database models the following academic entities:

* Departments  
* Professors  
* Batches (Student Cohorts)  
* Courses  
* Course Prerequisites  
* Students  
* Enrollments  
* Faculty Course Allocations

### **Data Integrity**

Implemented using:

* Primary Keys  
* Foreign Keys  
* Unique Constraints  
* Check Constraints  
* NOT NULL Constraints

### **Triggers**

#### **TRG\_BATCH\_DISPLAY\_LABEL**

Automatically generates a human-readable batch identifier.

Example:

| Current Year | Section | Cohort |
| ----- | ----- | ----- |
| 3 | A | 2026 |

Generated Display Label:

3A26

#### **TRG\_LIMIT\_TWO\_PROFS**

Ensures that a maximum of two professors may be assigned to teach a specific course for a specific batch during a specific academic term.

---

## **Database Structure**

### **Tables**

| Table Name | Purpose |
| ----- | ----- |
| DEPARTMENTS | Stores department information |
| PROFESSORS | Stores professor records |
| BATCHES | Represents student cohorts |
| COURSES | Stores course catalog information |
| COURSE\_PREREQ | Defines prerequisite relationships between courses |
| STUDENTS | Stores student records |
| ENROLLMENTS | Stores course enrollment information |
| FACULTY\_COURSE\_ALLOCATION | Maps professors to courses and batches |

---

## **Sample Academic Model**

Department:

Computer Science Engineering

Courses:

Programming with C  
Programming with Java  
Programming with Python

Prerequisite Chain:

Programming with C  
        ↓  
Programming with Java  
        ↓  
Programming with Python

---

## **Included SQL Files**

### **01\_necessary\_permissions.sql**

Grants required Oracle permissions used by the project.

### **02\_schema\_creation.sql**

Creates all tables, constraints, foreign keys, and triggers.

### **03\_seed\_data.sql**

Populates the database with sample academic data.

### **04\_verify\_data.sql**

Verification queries used to confirm successful schema creation and data insertion.

### **05\_common\_queries.sql**

Collection of SQL queries demonstrating:

* Retrieval Queries  
* Relationship Queries  
* Teaching Queries  
* Enrollment Queries  
* Aggregate Queries  
* Prerequisite Queries  
* Insight Queries

### **06\_reset\_schema.sql**

Drops all project objects to allow clean re-deployment.

---

## **Execution Order**

Run the scripts in the following order:

01\_necessary\_permissions.sql  
02\_schema\_creation.sql  
03\_seed\_data.sql  
04\_verify\_data.sql  
05\_common\_queries.sql

Use:

06\_reset\_schema.sql

when a full schema reset is required.

---

## **SQL Concepts Demonstrated**

This project demonstrates:

* Table Creation  
* Data Modeling  
* Normalization  
* Constraints  
* Foreign Keys  
* Triggers  
* Inner Joins  
* Left Joins  
* Aggregations  
* GROUP BY  
* HAVING  
* NULL Handling  
* Self-Referencing Relationships

---

## **Future Enhancements (Version 2\)**

Planned additions include:

* Views  
* Stored Procedures  
* Sequences  
* Academic Terms Table  
* Attendance Tracking  
* Examination Management  
* Automated Academic Progression

---

## **Author**

Rahul SP

Helios University Database was developed as a hands-on database design and SQL learning project focused on building a realistic university management system using Oracle SQL.

