const {  DataTypes } = require("sequelize");
// const db =require( "../config/db");
// const taskModal =require( "./taskModal");

const userModalFactory = (db) => {
const userModal = db.define("users", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: true,
  },
  hashed_password: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },

},
{
  freezeTableName: true,
}
);
// userModal.hasMany(taskModal, {
//   foreignKey: "userId",
// });
// userModal.sync({force:true});

// console.log('User table created');
return userModal;

}
module.exports = userModalFactory;



// userModal.sync();

// console.log('User table created');

// module.exports= userModal;
