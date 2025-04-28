const openSearchClient = require('../db/OSclient');

// ====== OpenSearch ======
const OSgetUsers = async (req, res) => {
  const indexName = 'user';

  try {
    const { data } = await openSearchClient.get(`/${indexName}/_search`);

    if (data.hits.total.value === 0) {
      return res.status(404).json({ error: 'No users found' });
    }

    // Include the user ID (_id) along with the user data (_source)
    const users = data.hits.hits.map(hit => ({
      id: hit._id,      // Add the user ID
      ...hit._source    // Include the user data
    }));

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users from OpenSearch:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const OSgetUserByID = async (req, res) => {
  const id = req.params.id;
  const indexName = 'user';

  try {
    const { data } = await openSearchClient.get(`/${indexName}/_doc/${id}`);

    if (data.found === false) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(data._source);
  } catch (error) {
    console.error('Error fetching user from OpenSearch:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const OScreateUser = async (req, res) => {
  const { name, age } = req.body;
  const indexName = 'user';

  // Check to see if name and age are always provided
  if (!name || !age) {
    return res.status(400).json({ error: 'Name and age are required' });
  }

  try {
    // Check if user already exists
    const searchResponse = await openSearchClient.post(`/${indexName}/_search`, {
      query: {
        match: { name }
      }
    });

    if (searchResponse.data.hits.total.value > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Create new user
    const { data } = await openSearchClient.post(`/${indexName}/_doc`, {
      name,
      age,
    });

    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating user in OpenSearch:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const OSdeleteUserByID = async (req, res) => {
  const id = req.params.id;
  const indexName = 'user';

  try {
    const { data } = await openSearchClient.delete(`/${indexName}/_doc/${id}`);

    if (data.result !== 'deleted') {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user from OpenSearch:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const OSpatchUserByID = async (req, res) => {
  const id = req.params.id;
  const { name, age } = req.body;
  const indexName = 'user';

  // Check to see if name and age are always provided
  if (!name || !age) {
    return res.status(400).json({ error: 'Name and age are required' });
  }

  try {
    // Update user
    const { data } = await openSearchClient.post(`/${indexName}/_update/${id}`, {
      doc: {
        name,
        age,
      }
    });

    if (data.result !== 'updated') {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', data });
  } catch (error) {
    console.error('Error updating user in OpenSearch:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { OSgetUserByID, OSgetUsers, OScreateUser, OSdeleteUserByID, OSpatchUserByID};