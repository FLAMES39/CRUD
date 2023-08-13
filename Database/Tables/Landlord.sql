USE CRUDUI
GO

CREATE TABLE Landlords(
landLordid INT IDENTITY  (1,1) PRIMARY KEY,
name VARCHAR (100),
email VARCHAR (100) UNIQUE,
propertyDocs VARCHAR (100) UNIQUE,
approved INT DEFAULT 0,
role VARCHAR (100)DEFAULT 'landlord',
password VARCHAR (100),
IsDeleted INT DEFAULT 0,
emailSent INT DEFAULT 0,
userid INT FOREIGN KEY REFERENCES Users(userid),
Propertyid INT FOREIGN KEY REFERENCES Properties(Propertyid)
)