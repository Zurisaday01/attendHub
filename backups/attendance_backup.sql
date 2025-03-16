--
-- PostgreSQL database dump
--

-- Dumped from database version 14.15 (Homebrew)
-- Dumped by pg_dump version 16.6 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;



--
-- Name: public; Type: SCHEMA; Schema: -; Owner: zuryespadas
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO zuryespadas;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Attendances; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Attendances" (
    "Id" uuid NOT NULL,
    "EmployeeId" uuid NOT NULL,
    "ArriveTime" timestamp with time zone,
    "LeaveTime" timestamp with time zone,
    "Date" timestamp with time zone NOT NULL,
    "Status" text NOT NULL
);


ALTER TABLE public."Attendances" OWNER TO postgres;

--
-- Name: __EFMigrationsHistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL
);


ALTER TABLE public."__EFMigrationsHistory" OWNER TO postgres;

--
-- Data for Name: Attendances; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Attendances" ("Id", "EmployeeId", "ArriveTime", "LeaveTime", "Date", "Status") FROM stdin;
01953315-ec02-7273-a36a-4757b49ff8d9	0195197b-9429-7db4-951a-7da3417a8693	2025-02-21 09:00:00-06	2025-02-21 14:30:00-06	2025-02-20 18:00:00-06	Confirmed
01953315-ec9d-7406-8e84-fa49a2d2c949	01952ae9-5c50-797c-b82e-2db7c530c1c4	2025-02-21 09:00:00-06	2025-02-21 14:30:00-06	2025-02-20 18:00:00-06	Confirmed
01953315-ed2e-7ecb-9d4e-3a4a2d48dfaa	01952ae9-b7fd-76ee-b166-d398a30b9a0e	2025-02-21 09:00:00-06	2025-02-21 14:30:00-06	2025-02-20 18:00:00-06	Absent
01952abe-d0ca-7489-b6dd-23495ebce1d7	0195197b-9429-7db4-951a-7da3417a8693	2025-02-20 08:30:00-06	2025-02-20 14:00:00-06	2025-02-19 18:00:00-06	Absent
01953555-4945-77cc-bac8-67174f90869e	0195197b-9429-7db4-951a-7da3417a8693	2025-02-23 08:00:00-06	2025-02-23 17:00:00-06	2025-02-22 18:00:00-06	Absent
01953555-499b-71a7-b93b-aad3ce9f2f29	01952ae9-5c50-797c-b82e-2db7c530c1c4	2025-02-23 08:00:00-06	2025-02-23 17:00:00-06	2025-02-22 18:00:00-06	Confirmed
01953555-49e2-7da0-8127-e62c0d11bd82	01952ae9-b7fd-76ee-b166-d398a30b9a0e	2025-02-23 08:00:00-06	2025-02-23 17:00:00-06	2025-02-22 18:00:00-06	Pending
01953556-ec60-7453-8366-cb1fbb6f17e7	019532a2-1790-78be-9bf0-2a5ff2abeefe	2025-02-23 08:00:00-06	2025-02-23 17:00:00-06	2025-02-22 18:00:00-06	Confirmed
01953a56-960e-73da-a3a0-05e11ec9b933	0195197b-9429-7db4-951a-7da3417a8693	2025-02-24 08:00:00-06	2025-02-24 17:00:00-06	2025-02-23 18:00:00-06	Confirmed
01953a56-97e7-7c6d-8fd8-278081344a24	01952ae9-5c50-797c-b82e-2db7c530c1c4	2025-02-24 08:00:00-06	2025-02-24 17:00:00-06	2025-02-23 18:00:00-06	Confirmed
01953d45-9c50-717d-8165-0e49d0e859e4	019528a9-e376-72cc-acfb-921a8176e5a2	2025-02-04 08:00:00-06	2025-02-04 17:00:00-06	2025-02-03 18:00:00-06	Confirmed
01953d49-9a78-774f-a034-f703004c5db5	01952ae9-5c50-797c-b82e-2db7c530c1c4	2025-02-02 08:00:00-06	2025-02-03 17:00:00-06	2025-02-01 18:00:00-06	Confirmed
01953d49-9ab9-7390-bb0a-92f19272c942	01952ae9-b7fd-76ee-b166-d398a30b9a0e	2025-02-02 08:00:00-06	2025-02-03 17:00:00-06	2025-02-01 18:00:00-06	Confirmed
01953dbb-4750-7409-a383-d9de91fd663c	01953da1-52ea-779a-ac38-e71832181546	2025-02-25 08:00:00-06	2025-02-25 17:00:00-06	2025-02-24 18:00:00-06	Confirmed
01953dbb-4852-7a9e-9b5a-6bcd70e494eb	01953dba-f8bb-7cc3-b9ed-8d68ca42dee4	2025-02-25 08:00:00-06	2025-02-25 17:00:00-06	2025-02-24 18:00:00-06	Confirmed
01953a56-995f-7668-befe-4d48688f37af	01952ae9-b7fd-76ee-b166-d398a30b9a0e	2025-02-24 08:00:00-06	2025-02-24 17:00:00-06	2025-02-23 18:00:00-06	Absent
\.


--
-- Data for Name: __EFMigrationsHistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."__EFMigrationsHistory" ("MigrationId", "ProductVersion") FROM stdin;
20250219190819_InitialCreate	9.0.2
20250219220656_Ready	9.0.2
20250220154604_DroppingDetails	9.0.2
\.


--
-- Name: Attendances PK_Attendances; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Attendances"
    ADD CONSTRAINT "PK_Attendances" PRIMARY KEY ("Id");


--
-- Name: __EFMigrationsHistory PK___EFMigrationsHistory; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."__EFMigrationsHistory"
    ADD CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: zuryespadas
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

