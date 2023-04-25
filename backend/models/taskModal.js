const {  DataTypes } = require("sequelize");
// const userModal = require("./userModal");
// const db = require("../config/db");

const taskModalFactory = (db,userModal) => {

const taskModal = db.define("tasks", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: userModal,
      key: "id",
    },
  },
  task: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  dueDate: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
},{
  freezeTableName: true
});
//  taskModal.belongsTo(userModal, { foreignKey: "userId", onDelete: "CASCADE" });
//  taskModal.sync({force:true});
//  console.log("task table created");
return taskModal;
}
module.exports = taskModalFactory;

// taskModal.sync();
// console.log("task table created");

// module.exports = taskModal;
