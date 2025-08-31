import { useState, useEffect } from 'react';
import { userApi } from '../services/api';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await userApi.getAll();
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await userApi.delete(id);
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-gray-600">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">User List</h2>
      
      {users.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No users found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-lg shadow-sm p-6 flex justify-between items-center hover:shadow-md transition-shadow duration-200"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <button
                onClick={() => handleDelete(user._id)}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserList; 