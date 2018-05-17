# STACK B - [NODE.JS-POSTGRESQL]


## Refer to the digital ocean tut https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-16-04 for postgres admin

## Create the table

CREATE TABLE nzcrime2017 
(
"Crime Type" varchar,
"Area Unit" varchar,
"Location Type" varchar, 
"Locn Type Division" varchar ,
"Occurrence Day Of Week" varchar, 
"Occurrence Hour Of Day" varchar,
"Territorial Authority" varchar,
"Victimisations" varchar,
"Weapon" varchar,
"Year Month" varchar
);

##use this in psql cmd to copy csv into table

	$ COPY nzcrime2017 FROM '/home/user/Stack-B/crime-2017.csv' DELIMITER ',' CSV HEADER;







