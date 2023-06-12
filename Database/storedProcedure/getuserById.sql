CREATE PROCEDURE sp_getuserById (@userid VARCHAR (100))
AS
BEGIN
SELECT name FROM Users WHERE IsDelete=0 AND @userid=userid

END