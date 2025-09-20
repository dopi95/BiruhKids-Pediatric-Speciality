import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ArrowLeft, Heart, Stethoscope } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function NotFound() {
  const { user, isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('404 Page accessed for route:', location.pathname);
    setLoading(false);
  }, [location.pathname]);

  const handleNavigation = () => {
    if (!user) {
      navigate('/');
    } else if (isAdmin()) {
      navigate('/admin');
    } else {
      navigate('/user-dashboard');
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <main className="h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Floating background elements - constrained to viewport */}
      <div className="absolute inset-4 sm:inset-8 pointer-events-none">
        <div className="absolute top-4 left-4 sm:top-8 sm:left-8 animate-pulse opacity-20" style={{ animationDuration: '3s' }}>
          <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
        </div>
        <div className="absolute top-8 right-4 sm:top-12 sm:right-8 animate-pulse opacity-20" style={{ animationDelay: '1s', animationDuration: '3s' }}>
          <Stethoscope className="w-5 h-5 sm:w-7 sm:h-7 text-blue-600" />
        </div>
        <div className="absolute bottom-12 left-4 sm:bottom-16 sm:left-8 animate-pulse opacity-20" style={{ animationDelay: '2s', animationDuration: '3s' }}>
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm sm:text-base">+</span>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 animate-pulse opacity-20" style={{ animationDelay: '0.5s', animationDuration: '3s' }}>
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <div className="w-4 h-0.5 sm:w-5 sm:h-1 bg-white rounded"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
        {/* Hero Section */}
        <div className="mb-4 sm:mb-6 relative">
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto pt-4 sm:pt-6">
            <img
              src="/404.png"
              alt="404 Error - BiruhKids"
              className="w-full h-auto rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl"
              style={{ 
                animation: 'gentle-float 4s ease-in-out infinite',
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback if image doesn't exist */}
            <div className="hidden w-full h-40 sm:h-48 md:h-56 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl items-center justify-center">
              <div className="text-center">
                <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-blue-600 mb-2 sm:mb-4">404</div>
                <Heart className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-blue-500 mx-auto" />
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 sm:top-2 sm:right-2 bg-blue-600 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-full text-sm sm:text-lg font-bold" style={{ animation: 'gentle-bounce 2s ease-in-out infinite' }}>
            404
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 px-2">
            Oops! Lost in the{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Pediatric Ward
            </span>
          </h1>

          <div className="bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg sm:shadow-xl inline-block mx-4 border border-blue-100 max-w-md">
            <div className="flex items-center justify-center gap-2 sm:gap-3 text-blue-600 mb-2">
              <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-semibold text-sm sm:text-base">BiruhKids Diagnosis:</span>
            </div>
            <div className="space-y-1 text-gray-700 text-xs sm:text-sm">
              <p><strong>Status:</strong> Page not found in our care system</p>
              <p><strong>Recommendation:</strong> Return to a safe, child-friendly area</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-4 sm:mb-6 px-4">
          <button
            onClick={handleNavigation}
            className="w-full sm:w-auto flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {user ? (
              isAdmin() ? (
                <>
                  <Home className="mr-2 sm:mr-3" size={18} />
                  <span className="text-sm sm:text-base">Back to Admin Dashboard</span>
                </>
              ) : (
                <>
                  <Home className="mr-2 sm:mr-3" size={18} />
                  <span className="text-sm sm:text-base">Back to My Dashboard</span>
                </>
              )
            ) : (
              <>
                <Home className="mr-2 sm:mr-3" size={18} />
                <span className="text-sm sm:text-base">Return to BiruhKids Home</span>
              </>
            )}
          </button>
          
          <button
            onClick={handleGoBack}
            className="w-full sm:w-auto flex items-center justify-center border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <ArrowLeft className="mr-2 sm:mr-3" size={18} />
            <span className="text-sm sm:text-base">Go Back Safely</span>
          </button>
        </div>

        {/* Footer Message */}
        <div className="text-gray-500 px-4">
          <p className="text-xs sm:text-sm max-w-2xl mx-auto">
            Need help finding your way? Our BiruhKids team is always here to provide the best care and guidance for you and your child.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes gentle-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </main>
  );
}