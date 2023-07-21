USE CRUDUI
GO

create table Users(
userid VARCHAR (100) PRIMARY KEY,
name VARCHAR (100),
password VARCHAR (100),
email VARCHAR (100) UNIQUE ,
role VARCHAR (100),
IsDelete INT DEFAULT 0
);
DROP TABLE Users





        

