import mysql2 from "mysql";

const dbConfigs = {
  rohan: {
    host: "localhost",
    user: "rohan",
    password: "357951",
    database: "byway",
  },
  haseena: {
    host: "localhost",
    user: "root",
    password: "nothing",
    database: "Byway",
  },
  bipasha: {
    host: "localhost",
    user: "root",
    password: "12345",
    database: "byway",
  },
  aabrity: {
    host: "localhost",
    user: "root",
    password: "A@brity0916",
    database: "byway",
    authPlugins: {
      mysql_native_password: 'deprecated',
    },
  },
  
  
  anup: {
    host: "localhost",
    user: "anup",
    password: "15akc#",
    database: "byway",
  },
  
  
};

export default async function connectToDatabase() {
  // Try each user in the dbConfigs object
  for (let user in dbConfigs) {
    try {
      // Try to create a connection
      let connection = mysql2.createConnection(dbConfigs[user]);
      await new Promise((resolve, reject) => {
        connection.connect((error) => {
         
          if (error) {
            console.error(`Error connecting as ${user}: ${error.message}`);
            connection.end();
            reject(error);
          } else {
            console.log(`Connected as ${user}`);
            resolve(connection);
          }
        });
      });
      return connection;
    } catch (error) {
      // Continue to the next iteration if the connection fails
      continue;
    }
  }

  // If no connection could be established, throw an error
  throw new Error("Could not establish a database connection");
}

