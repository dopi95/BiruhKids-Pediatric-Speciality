// Helper functions for authentication and role management

export const getUserRoleRedirect = (userRole) => {
  const redirectPaths = {
    'user': '/user-dashboard',
    'admin': '/admin',
    'super_admin': '/admin'
  };
  return redirectPaths[userRole] || '/';
};

// Utility function to check if user has specific permission
export const checkPermission = (user, permission) => {
  if (!user) return false;
  if (user.role === 'super_admin') return true;
  return user.permissions && user.permissions[permission];
};

// Utility function to format user display name
export const getUserDisplayName = (user) => {
  if (!user) return 'Guest';
  return user.name || user.email || 'User';
};