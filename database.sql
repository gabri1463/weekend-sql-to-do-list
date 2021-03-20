CREATE TABLE "tasks" (
    "id" serial PRIMARY KEY,
    "task" varchar(50),
    "completed" boolean
);

INSERT INTO "tasks" (task, completed) VALUES ('get off my lawn', false);

SELECT * FROM "tasks"