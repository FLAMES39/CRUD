CREATE PROCEDURE sp_insertProperty(
@name VARCHAR (100),
@type VARCHAR (100),
@location VARCHAR (100),
@address VARCHAR (100),
@price INT,
@imageUrl VARCHAR (100),
@city VARCHAR (100),
@country VARCHAR (100)
)
AS
BEGIN

INSERT INTO Properties(name,type,location,address,price,imageUrl,city,country)
VALUES(@name,@type,@location,@address,@price,@imageUrl,@city,@country )

END