CREATE TABLE "tasks" (
    "id" serial PRIMARY KEY,
    "task" varchar(50),
    "completed" boolean,
    "timecompleted" varchar(20)
);

INSERT INTO "tasks" (task, completed, timecompleted) VALUES ('get off my lawn', false, '');

SELECT * FROM "tasks"