CREATE OR ALTER PROCEDURE sp_insertUser (

@name VARCHAR (200) ,
@password VARCHAR (100),
@email VARCHAR (100) 


)
AS
BEGIN
INSERT INTO Users(name,password,email)
VALUES(

@name,
@password,
@email
)
END