
USE CRUDUI
GO
CREATE OR ALTER PROCEDURE RegisterLandLord(
@email VARCHAR (100),
@name VARCHAR (100),
@password VARCHAR (100),
@propertyDocs VARCHAR (100)
)
AS
BEGIN
INSERT INTO LandLords (name,email,password, propertyDocs)
VALUES (@name,@email,@password,@propertyDocs) 

END