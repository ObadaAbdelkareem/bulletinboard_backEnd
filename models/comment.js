module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      content: DataTypes.STRING
    },
    {
      freezeTableName: true,
    }
  );

  Comment.associate = (models) => {
    Comment.belongsTo(models.post);
  };

  return Comment;
}