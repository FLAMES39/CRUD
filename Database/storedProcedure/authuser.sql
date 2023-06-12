CREATE OR ALTER PROCEDURE AuthenticateUser
    @email VARCHAR(100),
    @password VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the user with the given email exists
    IF EXISTS (SELECT 1 FROM Users WHERE email = @email)
    BEGIN
        -- Verify the password for the user
        IF EXISTS (SELECT 1 FROM Users WHERE email = @email AND password = @password)
        BEGIN
            -- User credentials are valid
            SELECT 'Success' AS Status;
        END
        ELSE
        BEGIN
            -- Invalid password
            SELECT 'InvalidPassword' AS Status;
        END
    END
    ELSE
    BEGIN
        -- User not found
        SELECT 'UserNotFound' AS Status;
    END
END
