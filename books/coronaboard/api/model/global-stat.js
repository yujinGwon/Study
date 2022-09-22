const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define(
    'GlobalStat',
    {
      id: { // ID
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED, // 부호 없는 정수(양의 정수)
        allowNull: false,
        primaryKey: true,
      },
      cc: { // 국가코드(country code 의 약자)
        type: DataTypes.CHAR(2),
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      confirmed: { // 확진자 수
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      death: { // 사망자 수
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      released: { // 완치자 수
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      tested: { // 총 검사자 수
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      testing: { // 검사중 수
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      negative: { // 결과 음성 수
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'GlobalStat',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          fields: [{ name: 'id' }],
        },
        {
          name: 'ccWithDate',
          unique: true,
          fields: [{ name: 'cc' }, { name: 'date' }],
        },
      ],
    },
  );
};