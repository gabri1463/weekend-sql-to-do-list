CREATE TABLE "tasks" (
    "id" serial PRIMARY KEY,
    "task" varchar(50)
);

INSERT INTO "tasks" (task) VALUES ('get off my lawn');

SELECT * FROM "tasks"