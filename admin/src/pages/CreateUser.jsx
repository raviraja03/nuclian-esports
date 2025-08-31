import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../services/api';

function CreateUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await userApi.create(formData);
      navigate('/users');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Create New User</h2>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 ${
            isLoading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Creating...' : 'Create User'}
        </button>
      </form>
    </div>
  );
}

export default CreateUser; 