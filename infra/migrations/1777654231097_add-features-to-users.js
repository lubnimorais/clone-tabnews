exports.up = (pgm) => {
  pgm.addColumn("users", {
    features: {
      type: "varchar[]",
      notNull: true,
      default: "{}", // representa o valor de um array em branco
    },
  });
};

exports.down = false;
