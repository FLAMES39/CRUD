CREATE OR ALTER PROCEDURE sp_insertUser (
@userid VARCHAR (200),
@name VARCHAR (200) ,
@password VARCHAR (100),
@email VARCHAR (100) ,
@role VARCHAR (100) 

)
AS
BEGIN
INSERT INTO Users(userid,name,password,email,role)
VALUES(
@userid,
@name,
@password,
@email,
@role
)
END