CREATE OR ALTER PROCEDURE getUserByEmail (@email  VARCHAR(100))
AS
BEGIN

SELECT* FROM Users WHERE  @email=email AND IsDelete=0
END
SELECT * FROM Users

CREATE OR ALTER PROCEDURE authenticateUsers (@email VARCHAR (100),@password VARCHAR (100) )
AS
BEGIN

SELECT email,password  FROM users WHERE @email=email AND @password=password 
END