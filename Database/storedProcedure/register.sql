CREATE PROCEDURE RegisterUser(@name VARCHAR (100), @email VARCHAR (100), @password VARCHAR (100))
AS
BEGIN

INSERT INTO Users (name,email,password)
VALUES (@name,@email,@password)
END