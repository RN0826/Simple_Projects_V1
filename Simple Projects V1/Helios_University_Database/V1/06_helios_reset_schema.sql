/*
    =====================================================
    Helios University
    Schema Reset Script
    =====================================================
    Drops all tables so the schema can be recreated cleanly.
*/

/* =========================
   Drop Tables in Safe Order
========================= */

DROP TABLE FACULTY_COURSE_ALLOCATION CASCADE CONSTRAINTS;

DROP TABLE ENROLLMENTS CASCADE CONSTRAINTS;

DROP TABLE STUDENTS CASCADE CONSTRAINTS;

DROP TABLE COURSE_PREREQ CASCADE CONSTRAINTS;

DROP TABLE COURSES CASCADE CONSTRAINTS;

DROP TABLE BATCHES CASCADE CONSTRAINTS;

DROP TABLE PROFESSORS CASCADE CONSTRAINTS;

DROP TABLE DEPARTMENTS CASCADE CONSTRAINTS;

PURGE RECYCLEBIN;