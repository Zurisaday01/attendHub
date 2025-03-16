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
-- Name: Departments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Departments" (
    "Id" uuid NOT NULL,
    "Name" text
);


ALTER TABLE public."Departments" OWNER TO postgres;

--
-- Name: Employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Employees" (
    "Id" uuid NOT NULL,
    "FullName" text,
    "DepartmentId" uuid NOT NULL,
    "RoleId" uuid NOT NULL,
    "DateOfJoining" timestamp with time zone NOT NULL,
    "DateOfLeaving" timestamp with time zone,
    "Status" text,
    "CreatedAt" timestamp with time zone NOT NULL,
    "UpdatedAt" timestamp with time zone NOT NULL,
    email character varying(255),
    "Email" text
);


ALTER TABLE public."Employees" OWNER TO postgres;

--
-- Name: Roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Roles" (
    "Id" uuid NOT NULL,
    "Name" text
);


ALTER TABLE public."Roles" OWNER TO postgres;

--
-- Name: __EFMigrationsHistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL
);


ALTER TABLE public."__EFMigrationsHistory" OWNER TO postgres;

--
-- Data for Name: Departments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Departments" ("Id", "Name") FROM stdin;
019506b4-0786-7f3d-a448-c69f5bcf4860	IT
01951570-1104-7d08-b165-63d820caf332	Tech Support
019506b4-0789-75a2-a821-a82cbdc0a26e	Human Resources
\.


--
-- Data for Name: Employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Employees" ("Id", "FullName", "DepartmentId", "RoleId", "DateOfJoining", "DateOfLeaving", "Status", "CreatedAt", "UpdatedAt", email, "Email") FROM stdin;
019528a9-e376-72cc-acfb-921a8176e5a2	Pamela Espadas Martinez	019506b4-0789-75a2-a821-a82cbdc0a26e	019506b4-0763-7383-a0a6-97c379385387	2025-10-17 18:00:00-06	\N	Active	2025-02-21 07:19:37.320215-06	2025-02-21 07:19:37.320215-06	\N	pamelaespadas@example.com
01952ae9-5c50-797c-b82e-2db7c530c1c4	Carlos Garcia López	019506b4-0786-7f3d-a448-c69f5bcf4860	019506b4-0753-7e0d-b2c6-615bbe75d22d	2025-07-09 18:00:00-06	\N	Active	2025-02-21 17:48:11.453588-06	2025-02-21 17:48:11.453588-06	\N	carlosgarcia@example.com
01952ae9-b7fd-76ee-b166-d398a30b9a0e	Luis Hernández Ramírez	019506b4-0786-7f3d-a448-c69f5bcf4860	019506b4-0753-7e0d-b2c6-615bbe75d22d	2025-07-09 18:00:00-06	\N	Active	2025-02-21 17:48:34.938767-06	2025-02-21 17:48:34.938767-06	\N	carlosgarcia@example.com
019532a2-1790-78be-9bf0-2a5ff2abeefe	Javier Lopez García	019506b4-0789-75a2-a821-a82cbdc0a26e	019506b4-0763-7383-a0a6-97c379385387	2024-10-23 00:00:00-06	\N	Inactive	2025-02-23 05:47:18.542434-06	2025-02-23 05:47:18.542434-06	\N	javierlopez@example.com
0195197b-9429-7db4-951a-7da3417a8693	Zurisaday Espadas Martinez	019506b4-0786-7f3d-a448-c69f5bcf4860	019506b4-0753-7e0d-b2c6-615bbe75d22d	2025-02-17 18:00:00-06	\N	Active	2025-02-18 08:34:44.121937-06	2025-02-18 08:34:44.121937-06	\N	zuriespadas@example.com
01953da1-52ea-779a-ac38-e71832181546	Marco Estrada	01951570-1104-7d08-b165-63d820caf332	019506b4-0753-7e0d-b2c6-615bbe75d22d	2025-02-25 00:00:00-06	\N	Active	2025-02-25 09:02:17.567023-06	2025-02-25 09:02:17.567023-06	\N	marcoes@example.com
01953dba-f8bb-7cc3-b9ed-8d68ca42dee4	Alejandro Martínez	01951570-1104-7d08-b165-63d820caf332	019506b4-0753-7e0d-b2c6-615bbe75d22d	2024-10-08 00:00:00-06	\N	Active	2025-02-25 09:30:18.422838-06	2025-02-25 09:30:18.422839-06	\N	aleja@example.com
\.


--
-- Data for Name: Roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Roles" ("Id", "Name") FROM stdin;
019506b4-0753-7e0d-b2c6-615bbe75d22d	Developer
019506b4-0763-7383-a0a6-97c379385387	Manager
01951961-9a37-7153-bb4c-3c03967fd4e6	Designer
\.


--
-- Data for Name: __EFMigrationsHistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."__EFMigrationsHistory" ("MigrationId", "ProductVersion") FROM stdin;
20250214200206_InitialCreate	9.0.2
20250218151317_Data change	9.0.2
20250218152439_Adding new column email	9.0.2
\.


--
-- Name: Departments PK_Departments; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Departments"
    ADD CONSTRAINT "PK_Departments" PRIMARY KEY ("Id");


--
-- Name: Employees PK_Employees; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Employees"
    ADD CONSTRAINT "PK_Employees" PRIMARY KEY ("Id");


--
-- Name: Roles PK_Roles; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "PK_Roles" PRIMARY KEY ("Id");


--
-- Name: __EFMigrationsHistory PK___EFMigrationsHistory; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."__EFMigrationsHistory"
    ADD CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId");


--
-- Name: IX_Employees_DepartmentId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Employees_DepartmentId" ON public."Employees" USING btree ("DepartmentId");


--
-- Name: IX_Employees_RoleId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Employees_RoleId" ON public."Employees" USING btree ("RoleId");


--
-- Name: Employees FK_Employees_Departments_DepartmentId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Employees"
    ADD CONSTRAINT "FK_Employees_Departments_DepartmentId" FOREIGN KEY ("DepartmentId") REFERENCES public."Departments"("Id") ON DELETE CASCADE;


--
-- Name: Employees FK_Employees_Roles_RoleId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Employees"
    ADD CONSTRAINT "FK_Employees_Roles_RoleId" FOREIGN KEY ("RoleId") REFERENCES public."Roles"("Id") ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: zuryespadas
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

