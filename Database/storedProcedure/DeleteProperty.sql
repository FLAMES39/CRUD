
USE CRUDUI
GO
CREATE OR ALTER PROCEDURE sp_deleteProperty(@Propertyid INT)
AS
BEGIN
DELETE FROM Properties WHERE @Propertyid=Propertyid AND IsDeleted=0
END