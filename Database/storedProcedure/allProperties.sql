USE CRUDUI
GO
CREATE PROCEDURE getProperties
AS
BEGIN
SELECT * FROM Properties WHERE IsDeleted=0
END