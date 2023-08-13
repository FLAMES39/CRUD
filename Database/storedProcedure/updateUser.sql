CREATE OR ALTER PROCEDURE sp_updateUser (
@userid INT ,
@name VARCHAR (200) ,
@password VARCHAR (100),
@email VARCHAR (100) ,
@role VARCHAR (100) 

)
AS
BEGIN
UPDATE Users SET name=@name,password=@password,emaiL=@email,role=@role
WHERE

IsDelete=0 AND @userid=userid
END