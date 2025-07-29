import { useState, useEffect } from 'react';
import { userApi } from '../../services/api';

function Statistics() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await userApi.getAll();
        setStats({
          totalUsers: response.data.length,
          loading: false,
          error: null
        });
      } catch (error) {
        setStats({
          totalUsers: 0,
          loading: false,
          error: 'Failed to fetch statistics'
        });
      }
    };

    fetchStats();
  }, []);

  const StatBox = ({ title, value, description, trend }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-3xl font-semibold text-gray-900">{value}</p>
        {trend && (
          <p className={`ml-2 flex items-baseline text-sm font-semibold ${
            trend.type === 'increase' ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend.value}
          </p>
        )}
      </div>
      {description && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );

  if (stats.loading) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-600">Loading statistics...</div>
      </div>
    );
  }

  if (stats.error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <p className="text-red-700">{stats.error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatBox
          title="Total Users"
          value={stats.totalUsers}
          description="Total registered users"
          trend={{ type: 'increase', value: '+12% from last month' }}
        />
        <StatBox
          title="Active Users"
          value="Coming Soon"
          description="Feature to be implemented"
        />
        <StatBox
          title="New Users (30 days)"
          value="Coming Soon"
          description="Feature to be implemented"
        />
      </div>

      {/* Placeholder for Charts */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">User Growth</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">Chart coming soon</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Overview</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">Chart coming soon</p>
          </div>
        </div>
      </div>

      {/* Future Enhancements */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Coming Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded">
            <h4 className="font-medium text-gray-900">User Analytics</h4>
            <p className="mt-1 text-sm text-gray-500">Detailed user behavior analysis</p>
          </div>
          <div className="p-4 bg-gray-50 rounded">
            <h4 className="font-medium text-gray-900">Performance Metrics</h4>
            <p className="mt-1 text-sm text-gray-500">System performance tracking</p>
          </div>
          <div className="p-4 bg-gray-50 rounded">
            <h4 className="font-medium text-gray-900">Custom Reports</h4>
            <p className="mt-1 text-sm text-gray-500">Generate custom analytics reports</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics; 