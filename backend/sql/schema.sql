--
-- All SQL statements must be on a single line and end in a semicolon.
--

DROP TABLE IF EXISTS people;
DROP TABLE IF EXISTS workspace;
CREATE TABLE people(id UUID PRIMARY KEY DEFAULT gen_random_uuid(), email VARCHAR(255) NOT NULL UNIQUE, userinfo jsonb);
CREATE TABLE workspace(id UUID PRIMARY KEY DEFAULT gen_random_uuid(), person UUID REFERENCES people(id) NOT NULL, info jsonb);
CREATE TABLE channel(id UUID PRIMARY KEY DEFAULT gen_random_uuid(), workspace UUID REFERENCES workspace(id) NOT NULL, info jsonb);
CREATE TABLE convo(id UUID PRIMARY KEY DEFAULT gen_random_uuid(), channel UUID REFERENCES channel(id) NOT NULL, person UUID REFERENCES people(id) NOT NULL, info json);
-- Your database schema goes here --
