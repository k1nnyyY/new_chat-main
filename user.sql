PGDMP     $                    {            korpu    14.5 (Debian 14.5-2.pgdg110+2)    15.3 $    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16384    korpu    DATABASE     p   CREATE DATABASE korpu WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    DROP DATABASE korpu;
                korpu    false            �           0    0    korpu    DATABASE PROPERTIES     G   ALTER DATABASE korpu SET search_path TO '$user', 'public', 'topology';
                     korpu    false            �            1259    17844    users    TABLE     �  CREATE TABLE public.users (
    id integer NOT NULL,
    phone_number text,
    email text,
    apple_id text,
    type public.user_type DEFAULT 'REGULAR'::public.user_type,
    firstname text,
    lastname text,
    birthday date,
    about_me text,
    height smallint,
    weight smallint,
    alcohol text,
    children text,
    education text,
    eyes text,
    gender text,
    hairs text,
    interests text[],
    languages text[],
    marital_status text,
    physique text,
    religion text,
    smoking text,
    dating_purpose text,
    living text,
    income_from integer,
    greeting character varying(140),
    movies text[],
    serials text[],
    "position" text,
    specialization text,
    geo_location public.geometry(Point,4326),
    push_token text,
    last_time_dialog_online timestamp with time zone DEFAULT now(),
    city text,
    country text,
    base boolean GENERATED ALWAYS AS (
CASE
    WHEN (num_nulls(firstname, lastname, birthday, email, geo_location) = 0) THEN true
    ELSE false
END) STORED,
    details boolean GENERATED ALWAYS AS (
CASE
    WHEN (num_nulls(languages, about_me, dating_purpose, movies, serials, interests, smoking, alcohol, height, weight, eyes, physique, hairs, education, "position", specialization, income_from, living, children, marital_status, religion) = 0) THEN true
    ELSE false
END) STORED,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.users;
       public         heap    korpu    false            �            1259    17843    users_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          korpu    false    226            7           2606    17861    users users_apple_id_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_apple_id_key UNIQUE (apple_id);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_apple_id_key;
       public            korpu    false    226            9           2606    17859    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            korpu    false    226            ;           2606    17857    users users_phone_number_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_phone_number_key UNIQUE (phone_number);
 F   ALTER TABLE ONLY public.users DROP CONSTRAINT users_phone_number_key;
       public            korpu    false    226            =           2606    17855    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            korpu    false    226            !           1259    17871    alcohol_users_idx    INDEX     F   CREATE INDEX alcohol_users_idx ON public.users USING btree (alcohol);
 %   DROP INDEX public.alcohol_users_idx;
       public            korpu    false    226            "           1259    17866    birthday_users_idx    INDEX     H   CREATE INDEX birthday_users_idx ON public.users USING btree (birthday);
 &   DROP INDEX public.birthday_users_idx;
       public            korpu    false    226            #           1259    17872    children_users_idx    INDEX     H   CREATE INDEX children_users_idx ON public.users USING btree (children);
 &   DROP INDEX public.children_users_idx;
       public            korpu    false    226            $           1259    17870    city_users_idx    INDEX     @   CREATE INDEX city_users_idx ON public.users USING btree (city);
 "   DROP INDEX public.city_users_idx;
       public            korpu    false    226            %           1259    17880    dating_purpose_users_idx    INDEX     T   CREATE INDEX dating_purpose_users_idx ON public.users USING btree (dating_purpose);
 ,   DROP INDEX public.dating_purpose_users_idx;
       public            korpu    false    226            &           1259    17882    education_users_idx    INDEX     J   CREATE INDEX education_users_idx ON public.users USING btree (education);
 '   DROP INDEX public.education_users_idx;
       public            korpu    false    226            '           1259    17873    eyes_users_idx    INDEX     @   CREATE INDEX eyes_users_idx ON public.users USING btree (eyes);
 "   DROP INDEX public.eyes_users_idx;
       public            korpu    false    226            (           1259    17862    firstname_users_idx    INDEX     [   CREATE INDEX firstname_users_idx ON public.users USING btree (firstname text_pattern_ops);
 '   DROP INDEX public.firstname_users_idx;
       public            korpu    false    226            )           1259    17869    geo_location_users_idx    INDEX     O   CREATE INDEX geo_location_users_idx ON public.users USING gist (geo_location);
 *   DROP INDEX public.geo_location_users_idx;
       public            korpu    false    226            *           1259    17874    hairs_users_idx    INDEX     B   CREATE INDEX hairs_users_idx ON public.users USING btree (hairs);
 #   DROP INDEX public.hairs_users_idx;
       public            korpu    false    226            +           1259    17865    height_users_idx    INDEX     D   CREATE INDEX height_users_idx ON public.users USING btree (height);
 $   DROP INDEX public.height_users_idx;
       public            korpu    false    226            ,           1259    17867    interests_users_idx    INDEX     H   CREATE INDEX interests_users_idx ON public.users USING gin (interests);
 '   DROP INDEX public.interests_users_idx;
       public            korpu    false    226            -           1259    17868    languages_users_idx    INDEX     H   CREATE INDEX languages_users_idx ON public.users USING gin (languages);
 '   DROP INDEX public.languages_users_idx;
       public            korpu    false    226            .           1259    17863    lastname_users_idx    INDEX     Y   CREATE INDEX lastname_users_idx ON public.users USING btree (lastname text_pattern_ops);
 &   DROP INDEX public.lastname_users_idx;
       public            korpu    false    226            /           1259    17881    living_users_idx    INDEX     D   CREATE INDEX living_users_idx ON public.users USING btree (living);
 $   DROP INDEX public.living_users_idx;
       public            korpu    false    226            0           1259    17875    marital_status_users_idx    INDEX     T   CREATE INDEX marital_status_users_idx ON public.users USING btree (marital_status);
 ,   DROP INDEX public.marital_status_users_idx;
       public            korpu    false    226            1           1259    17876    physique_users_idx    INDEX     H   CREATE INDEX physique_users_idx ON public.users USING btree (physique);
 &   DROP INDEX public.physique_users_idx;
       public            korpu    false    226            2           1259    17877    position_users_idx    INDEX     J   CREATE INDEX position_users_idx ON public.users USING btree ("position");
 &   DROP INDEX public.position_users_idx;
       public            korpu    false    226            3           1259    17878    religion_users_idx    INDEX     H   CREATE INDEX religion_users_idx ON public.users USING btree (religion);
 &   DROP INDEX public.religion_users_idx;
       public            korpu    false    226            4           1259    17879    smoking_users_idx    INDEX     F   CREATE INDEX smoking_users_idx ON public.users USING btree (smoking);
 %   DROP INDEX public.smoking_users_idx;
       public            korpu    false    226            5           1259    17883    type_users_idx    INDEX     @   CREATE INDEX type_users_idx ON public.users USING btree (type);
 "   DROP INDEX public.type_users_idx;
       public            korpu    false    226            >           1259    17864    weight_users_idx    INDEX     D   CREATE INDEX weight_users_idx ON public.users USING btree (weight);
 $   DROP INDEX public.weight_users_idx;
       public            korpu    false    226            ?           2620    18455    users update_status_base    TRIGGER     �   CREATE TRIGGER update_status_base AFTER UPDATE ON public.users FOR EACH ROW WHEN ((new.base IS DISTINCT FROM old.base)) EXECUTE FUNCTION public.update_status_base();
 1   DROP TRIGGER update_status_base ON public.users;
       public          korpu    false    226    226            @           2620    18457    users update_status_details    TRIGGER     �   CREATE TRIGGER update_status_details AFTER UPDATE ON public.users FOR EACH ROW WHEN ((new.details IS DISTINCT FROM old.details)) EXECUTE FUNCTION public.update_status_details();
 4   DROP TRIGGER update_status_details ON public.users;
       public          korpu    false    226    226            A           2620    18451    users user_init    TRIGGER     h   CREATE TRIGGER user_init AFTER INSERT ON public.users FOR EACH ROW EXECUTE FUNCTION public.user_init();
 (   DROP TRIGGER user_init ON public.users;
       public          korpu    false    226           