INSERT INTO
    auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        recovery_sent_at,
        last_sign_in_at,
        raw_app_meta_data,
        raw_user_meta_data,
        created_at,
        updated_at,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
    )
VALUES
    (
        '00000000-0000-0000-0000-000000000000',
        '5ae1fa78-ae05-4817-a87c-c1d85cbb00d5',
        'authenticated',
        'authenticated',
        'resident@example.com',
        crypt('password', gen_salt('bf')),
        current_timestamp,
        current_timestamp,
        current_timestamp,
        '{"provider":"email","providers":["email"]}',
        '{}',
        current_timestamp,
        current_timestamp,
        '',
        '',
        '',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        'd247f785-882d-4cef-baff-5457e9a6a359',
        'authenticated',
        'authenticated',
        'admin@example.com',
        crypt('password', gen_salt('bf')),
        current_timestamp,
        current_timestamp,
        current_timestamp,
        '{"provider":"email","providers":["email"]}',
        '{}',
        current_timestamp,
        current_timestamp,
        '',
        '',
        '',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        '3a6b6a62-cfd9-4587-a871-96760e9a976f',
        'authenticated',
        'authenticated',
        'resident2@example.com',
        crypt('password', gen_salt('bf')),
        current_timestamp,
        current_timestamp,
        current_timestamp,
        '{"provider":"email","providers":["email"]}',
        '{}',
        current_timestamp,
        current_timestamp,
        '',
        '',
        '',
        ''
    );

INSERT INTO
    auth.identities (
        id,
        provider_id,
        user_id,
        identity_data,
        provider,
        last_sign_in_at,
        created_at,
        updated_at
    ) (
        SELECT
            uuid_generate_v4 (),
            id,
            id,
            format('{"sub":"%s","email":"%s"}', id::text, email)::jsonb,
            'email',
            current_timestamp,
            current_timestamp,
            current_timestamp
        FROM
            auth.users
    );

UPDATE public.users
SET role = 'admin', username = 'Admin 1'
WHERE user_id = 'd247f785-882d-4cef-baff-5457e9a6a359';

UPDATE public.users
SET role = 'resident', username = 'Resident 1', points = 100
WHERE user_id = '5ae1fa78-ae05-4817-a87c-c1d85cbb00d5';

UPDATE public.users
SET role = 'resident', username = 'Resident 2', points = 100
WHERE user_id = '3a6b6a62-cfd9-4587-a871-96760e9a976f';