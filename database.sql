CREATE TABLE "tasks" (
    "id" serial PRIMARY KEY,
    "task" varchar(50),
    "completed" boolean
);

INSERT INTO "tasks" (task) VALUES ('get off my lawn');

SELECT * FROM "tasks"