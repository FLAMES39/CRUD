CREATE OR ALTER PROCEDURE getallUserByEmail (@email  VARCHAR(100))
AS
BEGIN

SELECT * FROM Users WHERE  @email=email AND IsDelete=0
END
EXECUTE getallUserByEmail @email= 'chrilYUEReY@gmail.com'