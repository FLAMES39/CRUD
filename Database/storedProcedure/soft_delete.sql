CREATE OR ALTER PROCEDURE sp_deleteUser(@userid VARCHAR (100))
AS
BEGIN
UPDATE Users SET IsDelete = 1 WHERE @userid=userid
END