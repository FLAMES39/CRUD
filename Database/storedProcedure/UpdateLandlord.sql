USE CRUDUI
GO
CREATE OR ALTER PROCEDURE sp_updateLandlord (
@landLordid INT ,
@name VARCHAR (200) ,
@password VARCHAR (100),
@propertyDocs VARCHAR (100),
@email VARCHAR (100) 

)
AS
BEGIN
UPDATE landLords SET  name=@name,password=@password,emaiL=@email, propertyDocs=@propertyDocs
WHERE IsDeleted=0 AND @landLordid=landLordid
END