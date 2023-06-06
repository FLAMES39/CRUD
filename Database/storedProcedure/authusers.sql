CREATE OR ALTER PROCEDURE authenticateUsers (@email VARCHAR (100),@password VARCHAR (100) )
AS
BEGIN

SELECT email,password  FROM Users WHERE @email=email AND @password=password
END
DROP PROCEDURE authenticateUsers
