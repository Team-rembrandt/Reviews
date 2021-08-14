# ETL Steps

## Extraction
- get the CSV files the existing db has

## Schema
- create a schema that matches the data from the db

## Load the data
- import csv files
  - brew instal postgresql
  - brew services start postgresql (start postgres)
  - psql (enter the db)
  - \du (show all users)
  - \q (quit db)
  - \c (select a db)
  - \l (list all the dbs)
  - sudo -u postgres psql < server/schema.sql (run the sql file)
  - \dt+ (show tables)
  - DROP TABLE (table name) (drop table)
  - TABLE (table name) (show data in table)