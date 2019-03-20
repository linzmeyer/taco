CREATE TABLE "items" (
	"id" serial primary key,
	"title" varchar(250),
  "author" varchar(100),
	"published" date
);

INSERT INTO "items" ("title", "author", "published")
VALUES ('WORDS', 'Chase Linzmeyer', '1-1-1992');

INSERT INTO "items" ("title", "author", "published")
VALUES ('THOUGHTS', 'Laura Linzmeyer', '1-1-1992');
