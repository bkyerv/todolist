require("dotenv").config();
const fastify = require("fastify")();
const nextjs = require("fastify-nextjs");

const { pool } = require("./db");

fastify.register(nextjs).after(() => {
  fastify.next("/");
});


// CRUD routes

// querry all users
fastify.get("/users", function (request, reply) {
  pool
    .connect()
    .then((client) => {
      return client
        .query("SELECT * FROM users")
        .then((res) => {
          client.release();
          reply.send(res.rows);
        })
        .catch((e) => {
          client.release();
          console.error(e);
        });
    })
    .catch((e) => console.error(e));
});

// INSERT USER
fastify.post("/users", function (request, reply) {
  const { name, email } = request.body;
  if (!name || !email) {
    console.error("empty string");
    return reply.send({ error: "empy ttring" });
  }
  pool
    .connect()
    .then((client) => {
      return client
        .query(
          "INSERT INTO users(name, email) values($1, $2) RETURNING name, email",
          [name, email]
        )
        .then((res) => {
          client.release();
          reply.send(res.rows);
        })
        .catch((e) => {
          client.release();
          console.error(e);
        });
    })
    .catch((e) => console.error("yo error", e));
});

fastify.delete("/users/:id", function (request, reply) {
  console.log(request.params);
  const { id } = request.params;

  pool
    .connect()
    .then((client) => {
      return client
        .query("DELETE FROM users WHERE id = $1 RETURNING name, email", [id])
        .then((res) => {
          client.release();
          reply.send(res.rows);
        })
        .catch((e) => {
          client.release();
          console.log(e);
        });
    })
    .catch((e) => console.error(e));
});

fastify.put("/users/:id", function (request, reply) {
  const { id } = request.params;
  const { name, email } = request.body;

  pool
    .connect()
    .then((client) => {
      return client
        .query(
          "UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING id, name, email",
          [name, email, id]
        )
        .then((res) => {
          client.release();
           reply.send(res.rows[0]);
        })
        .catch((e) => {
          client.release();
          console.log('put cl8ient relase', e);
        });
    })
    .catch((e) => console.error('yooo', e));
});

const port = process.env.PORT || 3000;

// starting up the server
fastify.listen(3000, '::', () =>
  console.log(`server is up and running on port ${port}`)
);
