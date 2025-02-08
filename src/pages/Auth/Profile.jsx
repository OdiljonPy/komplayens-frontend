import React, { useState, useEffect } from 'react';
import { Edit2, X, LogOut } from 'lucide-react';
import { sendRequest } from '../../utils/apiFunctions';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Get token from localStorage
  const getToken = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const { access_token } = JSON.parse(userData);
      return access_token;
    }
    return null;
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const token = getToken();
      const response = await sendRequest({
        method: 'GET',
        url: '/auth/me/',
        token: token
      });

      if (response.success) {
        setUser(response.data.result);
        // Fetch organization details
        fetchOrganization(response.data.result.organization, token);
      }
    };

    fetchUserData();
  }, []);

  // Fetch organization details
  const fetchOrganization = async (orgId, token) => {
    const response = await sendRequest({
      method: 'GET',
      url: '/services/organization/',
      token: token
    });

    if (response.success) {
      const org = response.data.result.content.find(org => org.id === orgId);
      setOrganization(org);
    }
  };

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = getToken();
    const response = await sendRequest({
      method: 'PATCH',
      url: '/auth/me/',
      data: {
        password: newPassword
      },
      token: token
    });

    setLoading(false);

    if (response.success) {
      setIsModalOpen(false);
      setNewPassword('');
    } else {
      setError(response.error.data?.detail || 'Parolni yangilashda xatolik yuz berdi');
    }
  };

  return (
    <div className="container mx-auto px-4 pt-16 md:pt-8 py-8 ">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Profil</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700"
            >
              <LogOut className="h-4 w-4" />
              <span>Chiqish</span>
            </button>
          </div>
        </div>

        {user && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Ism</label>
                <p className="font-medium">{user.first_name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Familiya</label>
                <p className="font-medium">{user.last_name}</p>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600">Tashkilot</label>
              <p className="font-medium">{organization?.name}</p>
            </div>

            <div>
              <label className="text-sm text-gray-600">Telefon raqam</label>
              <p className="font-medium">{user.phone_number}</p>
            </div>
          </div>
        )}
      </div>

      {/* Password Change Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Parolni o'zgartirish</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Yangi parol
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                  minLength={6}
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || newPassword.length < 6}
                className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                  ${loading || newPassword.length < 6
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {loading ? 'Saqlanmoqda...' : 'Saqlash'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
