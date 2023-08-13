USE CRUDUI
GO
CREATE TABLE Properties(
    Propertyid INT IDENTITY (1,1) PRIMARY KEY,
    name VARCHAR (100) ,
    type VARCHAR (100) ,
    location  VARCHAR (100),
    address VARCHAR (100) UNIQUE ,
    city VARCHAR (100),
    price INT NOT NULL ,
    imageUrl VARCHAR (100) ,
    country VARCHAR (100) ,
	userid INT FOREIGN KEY  REFERENCES Users(userid),
	IsDeleted INT DEFAULT 0

)


DROP TABLE Properties