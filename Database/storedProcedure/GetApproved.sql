USE CRUDUI
GO
CREATE OR ALTER PROCEDURE getAdminStatus(@type VARCHAR (100))
AS
BEGIN
if @type ='approved'
BEGIN
SELECT * FROM LandLords WHERE approved=1 AND IsDeleted=0
END
ELSE
 
SELECT * FROM LandLords WHERE approved=0 AND IsDeleted=0
END