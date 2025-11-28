--
-- PostgreSQL database dump
--

\restrict zDuR0sKGxHUHT5VzVVZkuSSEyAAbZk3WKQcOmQPL3Myx1rcpau0Fr9SMJWGXeId

-- Dumped from database version 17.7 (Postgres.app)
-- Dumped by pg_dump version 17.7 (Postgres.app)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: project_priority; Type: TYPE; Schema: public; Owner: cerenler
--

CREATE TYPE public.project_priority AS ENUM (
    'low',
    'medium',
    'heigh'
);


ALTER TYPE public.project_priority OWNER TO cerenler;

--
-- Name: project_status; Type: TYPE; Schema: public; Owner: cerenler
--

CREATE TYPE public.project_status AS ENUM (
    'planning',
    'active',
    'on_hold',
    'completed',
    'archived'
);


ALTER TYPE public.project_status OWNER TO cerenler;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: project_tags; Type: TABLE; Schema: public; Owner: cerenler
--

CREATE TABLE public.project_tags (
    project_id uuid NOT NULL,
    tag_id uuid NOT NULL
);


ALTER TABLE public.project_tags OWNER TO cerenler;

--
-- Name: projects; Type: TABLE; Schema: public; Owner: cerenler
--

CREATE TABLE public.projects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text,
    prefix text NOT NULL,
    user_id uuid,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now(),
    started_at timestamp with time zone,
    completed_at timestamp with time zone,
    archived_at timestamp with time zone,
    status public.project_status DEFAULT 'planning'::public.project_status,
    priority public.project_priority DEFAULT 'medium'::public.project_priority,
    color text,
    is_favorite boolean DEFAULT false
);


ALTER TABLE public.projects OWNER TO cerenler;

--
-- Name: tags; Type: TABLE; Schema: public; Owner: cerenler
--

CREATE TABLE public.tags (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    is_global boolean DEFAULT false,
    created_by uuid
);


ALTER TABLE public.tags OWNER TO cerenler;

--
-- Name: users; Type: TABLE; Schema: public; Owner: cerenler
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO cerenler;

--
-- Data for Name: project_tags; Type: TABLE DATA; Schema: public; Owner: cerenler
--

COPY public.project_tags (project_id, tag_id) FROM stdin;
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: cerenler
--

COPY public.projects (id, title, description, prefix, user_id, created_at, updated_at, started_at, completed_at, archived_at, status, priority, color, is_favorite) FROM stdin;
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: cerenler
--

COPY public.tags (id, name, created_at, is_global, created_by) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: cerenler
--

COPY public.users (id, email, password) FROM stdin;
af26509e-d513-4cc6-ad09-4960a3f2baa7	cihanerenler@outlook.com	$2b$10$TzCSBrX5sm7FIAXulbnHA.1AqHEl5.gIvtQjjFbWXrrr/TZZCpeMq
3e2bb5b9-d98c-4a90-a2cf-3eeb770c92f0	chnerenler@gmail.com	$2b$10$cbrwe8vLoYe0LBUdqqntZunHVsxKzeOXXRnCx.hfTWffDMGStI.t6
\.


--
-- Name: project_tags project_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: cerenler
--

ALTER TABLE ONLY public.project_tags
    ADD CONSTRAINT project_tags_pkey PRIMARY KEY (project_id, tag_id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: cerenler
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: cerenler
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: cerenler
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: cerenler
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: ux_tags_default_name; Type: INDEX; Schema: public; Owner: cerenler
--

CREATE UNIQUE INDEX ux_tags_default_name ON public.tags USING btree (lower(name)) WHERE (is_global = true);


--
-- Name: ux_tags_user_name; Type: INDEX; Schema: public; Owner: cerenler
--

CREATE UNIQUE INDEX ux_tags_user_name ON public.tags USING btree (created_by, lower(name)) WHERE (is_global = false);


--
-- Name: project_tags project_tags_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cerenler
--

ALTER TABLE ONLY public.project_tags
    ADD CONSTRAINT project_tags_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;


--
-- Name: project_tags project_tags_tag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cerenler
--

ALTER TABLE ONLY public.project_tags
    ADD CONSTRAINT project_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(id) ON DELETE CASCADE;


--
-- Name: projects projects_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cerenler
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: tags tags_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cerenler
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict zDuR0sKGxHUHT5VzVVZkuSSEyAAbZk3WKQcOmQPL3Myx1rcpau0Fr9SMJWGXeId

