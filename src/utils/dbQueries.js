const QUERIES = {
  auth: {
    getUserByEmail: "SELECT * FROM users WHERE email = $1 LIMIT 1",
    getUserById: "SELECT * FROM users WHERE id = $1 LIMIT 1",
    createUser:
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
  },
  project: {
    createProject:
      "INSERT INTO projects (title, description, prefix, userId) VALUES ($1, $2, $3, $4) RETURNING id, title, description, prefix",
    getProjectById: "SELECT * FROM projects WHERE id = $1, userId = $2",
  },
};

export default QUERIES;
