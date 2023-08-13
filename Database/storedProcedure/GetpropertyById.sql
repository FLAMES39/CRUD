USE CRUDUI
GO

CREATE OR ALTER PROCEDURE sp_getPropertyById (@Propertyid INT)
AS
BEGIN
SELECT * FROM Properties WHERE IsDeleted=0 AND @Propertyid=Propertyid

END