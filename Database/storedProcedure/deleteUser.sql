

CREATE OR ALTER PROCEDURE deleteUser(@id VARCHAR(200))
AS
BEGIN

UPDATE Users SET isDeleted=1 WHERE id=@id AND isDeleted =0

END