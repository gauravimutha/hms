-- PostgreSQL Database Schema for HMS Week 1
-- Keep this file as a reference for manually creating tables in your local PostgreSQL database.

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Create the patients table
CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    gender VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- Example Queries for Testing your Database
-- ==========================================

-- 2. Sample INSERT Query
/* 
INSERT INTO patients (name, age, gender, phone) 
VALUES ('John Doe', 45, 'male', '1234567890');
*/

-- 3. Sample SELECT Query
/*
SELECT id, name, age, gender, phone, created_at 
FROM patients 
ORDER BY created_at DESC;
*/