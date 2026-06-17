/*
====================================================
 Helios University Database
 Version : 1.0
 Author  : Rahul SP
====================================================
 Required Permissions
----------------------------------------------------
 This script grants the minimum privileges required
 for the Helios University schema to be created.

 NOTE:
 This script must be executed by a user with
 SYSDBA or DBA privileges.
====================================================
*/

GRANT CREATE TABLE TO ICHIHO;
-- Required to create schema tables

GRANT CREATE TRIGGER TO ICHIHO;
-- Required for schema triggers such as automatic
-- batch display label generation and allocation checks

GRANT CREATE VIEW TO ICHIHO;
-- Reserved for future schema extensions (analytics views)

GRANT CREATE PROCEDURE TO ICHIHO;
-- Reserved for future stored procedures

GRANT CREATE SEQUENCE TO ICHIHO;
-- Reserved for future ID generation mechanisms