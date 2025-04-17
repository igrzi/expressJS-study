const getUsers = (req, res) => {
  res.json([
    { id: 1, name: 'Igor' },
    { id: 2, name: 'Vianaz' },
    { id: 3, name: 'Marcelo' },
    { id: 4, name: 'Leandro' },
  ]);
};

module.exports = { getUsers };