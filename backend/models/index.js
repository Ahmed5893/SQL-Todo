const db = require("../config/db");
const userModelFactory = require("./userModal");
const taskModelFactory = require("./taskModal");

const userModal = require("./userModal");
 const taskModal = require("./taskModal");

 const userModel = userModelFactory(db);

const taskModel = taskModelFactory(db,userModel);

const association=async()=>{
  // await userModel.sync({ force: true });
  // await userModel.hasMany(taskModel, {
  //   foreignKey: "userId",
  // });
//   const count = await userModel.count();
// await taskModel.sync({ force: true })
await db.sync();
await taskModel.belongsTo(userModel, { foreignKey: "userId", onDelete: "CASCADE" });



};
association()

// db.sync();
console.log("Database connected and models synchronized.");

module.exports = { userModel, taskModel };
