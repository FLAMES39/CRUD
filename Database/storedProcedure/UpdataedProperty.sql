USE CRUDUI
GO

CREATE OR ALTER PROCEDURE sp_updateProperty (
@Propertyid INT ,
@name VARCHAR (200) ,
@type VARCHAR (100),
@location VARCHAR (100),
@address VARCHAR (100) ,
@city VARCHAR (100) ,
@price INT,
@imageUrl VARCHAR (100),
@country VARCHAR (100)
)
AS
BEGIN
UPDATE Properties SET  name=@name,type=@type,location=@location, address=@address, city=@city,@price=price,@imageUrl=imageUrl, @country= country
WHERE IsDeleted=0 AND @Propertyid=Propertyid
END