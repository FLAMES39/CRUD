USE CRUDUI
GO

create table Users(
userid INT IDENTITY(1,1) PRIMARY KEY,
name VARCHAR (100),
password VARCHAR (100),
email VARCHAR (100) UNIQUE ,
role VARCHAR (100) DEFAULT 'User',
IsDelete INT DEFAULT 0, 
emailSent INT DEFAULT 0

);
DROP TABLE Users 




        

