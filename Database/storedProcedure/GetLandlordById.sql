USE CRUDUI
GO

CREATE OR ALTER PROCEDURE sp_getLandlordById (@landLordid INT )
AS
BEGIN
SELECT * FROM Landlords WHERE IsDeleted=0 AND @landLordid=landLordid

END