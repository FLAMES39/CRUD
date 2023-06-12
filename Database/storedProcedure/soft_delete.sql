CREATE OR ALTER PROCEDURE sp_deleteUser(@email VARCHAR (100))
AS
BEGIN
UPDATE Users SET IsDelete = 1 WHERE @email=email
END