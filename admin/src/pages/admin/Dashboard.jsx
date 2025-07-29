import { useState, useEffect } from 'react';
import { userApi } from '../../services/api';

function Dashboard() {
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

  const StatCard = ({ title, value, description }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="text-gray-500 text-sm font-medium">{title}</div>
      <div className="mt-2 text-3xl font-bold text-gray-900">{value}</div>
      {description && (
        <div className="mt-1 text-sm text-gray-600">{description}</div>
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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          description="Registered users in the system"
        />
        <StatCard
          title="Active Users"
          value="Coming Soon"
          description="Feature to be implemented"
        />
        <StatCard
          title="System Status"
          value="Online"
          description="All systems operational"
        />
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => window.location.href = '/admin/users'}
            className="flex items-center justify-center px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Manage Users
          </button>
          <button
            onClick={() => window.location.href = '/admin/statistics'}
            className="flex items-center justify-center px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            View Statistics
          </button>
        </div>
      </div>

      {/* Future Features */}
      <div className="mt-12">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Coming Soon</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <ul className="space-y-2 text-gray-600">
            <li>• User activity monitoring</li>
            <li>• Advanced analytics</li>
            <li>• Role management</li>
            <li>• System logs</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 