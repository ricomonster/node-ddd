module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      emailVerifiedAt: {
        type: DataTypes.STRING,
        field: 'email_verified_at',
      },
      password: DataTypes.STRING,
    },
    {
      tableName: 'users',
      timestamps: true,
      underscored: true,
    }
  );
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
