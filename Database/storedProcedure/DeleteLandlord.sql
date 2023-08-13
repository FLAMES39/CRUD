USE CRUDUI
GO
CREATE OR ALTER PROCEDURE DeleteLandLord(@landLordid INT )
AS
BEGIN
UPDATE Landlords SET IsDeleted=1 WHERE landLordid= @landLordid

END