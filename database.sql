-- CREATE TABLE person (
--     id SERIAL PRIMARY KEY,
--     username VARCHAR (80) UNIQUE NOT NULL,
--     password VARCHAR (1000) NOT NULL
-- );

CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" VARCHAR(80) UNIQUE NOT NULL,
	"password" VARCHAR(1000) NOT NULL,
	CONSTRAINT user_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "trip" (
	"id" serial NOT NULL,
	"location" VARCHAR(80) NOT NULL,
	"meetup_time" DATETIME,
	"meetup_spot" VARCHAR(200) NOT NULL,
	"meetup_coordinates" VARCHAR(100),
	"exit_time" DATETIME,
	"exit_spot" VARCHAR(100),
	"exit_coordinates" VARCHAR(100),
	"mapURL" VARCHAR(250),
	CONSTRAINT trip_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

insert into "trip" ("location", "meetup_spot", "exit_spot")
VALUES ('BWCA 2018', 'Downtown Ely', 'Entry 8');
insert into "trip" ("location", "meetup_spot", "exit_spot")
VALUES ('BWCA 2019', 'Duluth', 'Entry 20');

CREATE TABLE "user_trip_gear" (
	"quantity" DECIMAL(5) NOT NULL,
	"trip_id" integer NOT NULL,
	"gear_id" integer NOT NULL,
	"user_id" DECIMAL(5) NOT NULL
) WITH (
  OIDS=FALSE
);

CREATE TABLE "gear" (
	"id" serial NOT NULL,
	"description" VARCHAR(100) NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT gear_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "message" (
	"id" serial NOT NULL,
	"content" VARCHAR(200) NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT message_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "costItem" (
	"id" serial,
	"description" VARCHAR(80) NOT NULL,
	"quantity" DECIMAL(5) NOT NULL DEFAULT '1',
	"type" TEXT(20) NOT NULL DEFAULT 'group',
	CONSTRAINT costItem_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "user_trip" (
	"trip_id" integer NOT NULL,
	"user_id" serial NOT NULL
) WITH (
  OIDS=FALSE
);

CREATE TABLE "user_cost_trip" (
	"cost_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"trip_id" integer NOT NULL
) WITH (
  OIDS=FALSE
);

CREATE TABLE "user_message_trip" (
	"user_id" integer NOT NULL,
	"trip_id" integer NOT NULL,
	"message_id" integer NOT NULL
) WITH (
  OIDS=FALSE
);

ALTER TABLE "user_trip_gear" ADD CONSTRAINT "user_trip_gear_fk0" FOREIGN KEY ("trip_id") REFERENCES "trip"("id");
ALTER TABLE "user_trip_gear" ADD CONSTRAINT "user_trip_gear_fk1" FOREIGN KEY ("gear_id") REFERENCES "gear"("id");
ALTER TABLE "user_trip_gear" ADD CONSTRAINT "user_trip_gear_fk2" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "gear" ADD CONSTRAINT "gear_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "message" ADD CONSTRAINT "message_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");


ALTER TABLE "user_trip" ADD CONSTRAINT "user_trip_fk0" FOREIGN KEY ("trip_id") REFERENCES "trip"("id");
ALTER TABLE "user_trip" ADD CONSTRAINT "user_trip_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "user_cost_trip" ADD CONSTRAINT "user_cost_trip_fk0" FOREIGN KEY ("cost_id") REFERENCES "costItem"("id");
ALTER TABLE "user_cost_trip" ADD CONSTRAINT "user_cost_trip_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "user_cost_trip" ADD CONSTRAINT "user_cost_trip_fk2" FOREIGN KEY ("trip_id") REFERENCES "trip"("id");

ALTER TABLE "user_message_trip" ADD CONSTRAINT "user_message_trip_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "user_message_trip" ADD CONSTRAINT "user_message_trip_fk1" FOREIGN KEY ("trip_id") REFERENCES "trip"("id");
ALTER TABLE "user_message_trip" ADD CONSTRAINT "user_message_trip_fk2" FOREIGN KEY ("message_id") REFERENCES "message"("id");
