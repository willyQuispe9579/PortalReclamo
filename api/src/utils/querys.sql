CREATE TABLE claim (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	openingdate timestamp NULL,
	endingdate timestamp NULL,
	CONSTRAINT claim_pkey PRIMARY KEY (id)
);

CREATE TABLE claim_count (
	person_id uuid NOT NULL,
	"date" date NULL DEFAULT CURRENT_DATE,
	insert_count int4 NULL DEFAULT 0,
	CONSTRAINT claim_count_pkey PRIMARY KEY (person_id)
);

CREATE TABLE claim_detail (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	claim_id uuid NULL,
	claim_body text NULL,
	type_id uuid NULL,
	"level" varchar NULL,
	CONSTRAINT claim_detail_pkey PRIMARY KEY (id),
	CONSTRAINT claim_id_unique UNIQUE (claim_id)
);

CREATE TABLE claim_file (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	claim_id uuid NULL,
	url varchar NULL,
	public_id varchar(20) NULL,
	CONSTRAINT claim_file_pkey PRIMARY KEY (id)
);

CREATE TABLE claim_person (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	claim_id uuid NULL,
	person_id uuid NULL,
	CONSTRAINT claim_id_unique_constraint UNIQUE (claim_id),
	CONSTRAINT claim_person_pkey PRIMARY KEY (id)
);

CREATE TABLE claim_status (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	claim_id uuid NULL,
	status varchar NULL,
	CONSTRAINT claim_status_pkey PRIMARY KEY (id),
	CONSTRAINT unique_claim_status_id UNIQUE (claim_id)
);

CREATE TABLE persona (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	rut varchar(12) NULL,
	"name" varchar(100) NULL,
	paternallastname varchar(100) NULL,
	maternallastname varchar(100) NULL,
	email varchar(100) NULL,
	phone varchar(20) NULL,
	CONSTRAINT persona_pkey PRIMARY KEY (id),
	CONSTRAINT persona_rut_key UNIQUE (rut)
);

CREATE TABLE typeclaim (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	typename varchar(50) NULL,
	CONSTRAINT typeclaim_pkey PRIMARY KEY (id)
);

CREATE TABLE "user" (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	hash varchar NULL,
	person_id uuid NULL,
	photo varchar NULL,
	CONSTRAINT user_pkey PRIMARY KEY (id)
);


CREATE OR REPLACE FUNCTION app.fn_get_all_claims()
 RETURNS TABLE(claim_data jsonb)
 LANGUAGE plpgsql
AS $function$
DECLARE  
    resultado JSONB;
BEGIN 
    SELECT jsonb_agg(
        jsonb_build_object(
            'claim_id', cd.claim_id ,
            'type_claim', tc.typename,
            'type_claim_id', tc.id ,
            'endingDate', clm.openingdate,
            'body_claim', cd.claim_body,
            'person_id', cp.person_id,
            'status', cs.status,
            'level',cd."level",
            'person_data', (
                SELECT jsonb_build_object(
                    'id', p.id ,
                    'rut', p.rut ,
                    'name', p."name" ,
                    'paternallastname', p.paternallastname ,
                    'maternallastname', p.maternallastname ,
                    'email', p.email ,
                    'phone', p.phone 
                )
                FROM app.persona p
                WHERE p.id = cp.person_id
            ),
            'claim_file_data', (
                SELECT jsonb_agg(jsonb_build_object(
                    'id', fc.id ,
                    'claim_id', fc.claim_id,
                    'url', fc.url,
                    'public_id', fc.public_id 
                ))
                FROM app.claim_file fc
                WHERE fc.claim_id = cd.claim_id 
            )
        )
    )
    INTO resultado
    FROM app.claim_detail cd 
    INNER JOIN app.typeclaim tc ON cd.type_id = tc.id
    INNER JOIN app.claim clm ON cd.claim_id = clm.id  
    INNER JOIN app.claim_person cp ON cd.claim_id = cp.claim_id
    inner join app.claim_status cs on cd.claim_id = cs.claim_id;
    
    RETURN QUERY SELECT resultado;
END;
$function$
;

CREATE OR REPLACE FUNCTION app.fn_get_by_id_claim(_claim_id uuid)
 RETURNS TABLE(data jsonb)
 LANGUAGE plpgsql
AS $function$
DECLARE  
    resultado JSONB;
    person_data JSONB;
BEGIN 
    SELECT jsonb_build_object(
        'claim_id', cd.claim_id ,
        'type_claim', tc.typename,
        'type_claim_id', tc.id ,
        'endingDate', clm.openingdate,
        'body_claim', cd.claim_body,
        'person_id', cp.person_id,
        'status', cs.status,
        'level',cd."level",
        'person_data', (
            SELECT jsonb_build_object(
                'id', p.id ,
                'rut', p.rut ,
                'name', p."name" ,
                'paternallastname', p.paternallastname ,
                'maternallastname', p.maternallastname ,
                'email', p.email ,
                'phone', p.phone 
            )
            FROM app.persona p
            WHERE p.id = cp.person_id
        ),
        'claim_file_data', (
            SELECT jsonb_agg(jsonb_build_object(
                'id', fc.id ,
                'claim_id', fc.claim_id,
                'url', fc.url,
                'public_id', fc.public_id 
            ))
            FROM app.claim_file fc
            WHERE fc.claim_id = _claim_id 
        )
    )
    INTO resultado
    FROM app.claim_detail cd 
    INNER JOIN app.typeclaim tc ON cd.type_id = tc.id
    INNER JOIN app.claim clm ON cd.claim_id = clm.id  
    INNER JOIN app.claim_person cp ON cd.claim_id = cp.claim_id
    inner join app.claim_status cs on cd.claim_id = cs.claim_id 
    WHERE cd.claim_id = _claim_id;

    RETURN QUERY SELECT resultado;
END;
$function$
;
