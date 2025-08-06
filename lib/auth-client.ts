export interface User {
  id: number;
  name?: string;
  email?: string;
  role?: string;
}

export interface AuthResult {
  user: User | null;
  token?: string;
  error?: string;
}

/**
 * Get current user from localStorage or session (client-side only)
 * Handles both normal login users and Google OAuth users
 */
export async function getCurrentUser(): Promise<AuthResult> {
  try {
    console.log('getCurrentUser: Starting authentication check...');
    
    // First try to get from localStorage (for regular users)
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      console.log('getCurrentUser: localStorage user found:', !!storedUser);
      
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          const token = localStorage.getItem('token');
          
          console.log('getCurrentUser: Parsed user data:', userData);
          
          return {
            user: {
              id: userData.id || userData.userId,
              name: userData.name,
              email: userData.email,
              role: userData.role || 'client'
            },
            token: token || undefined
          };
        } catch {
          console.error('getCurrentUser: Failed to parse user data from localStorage');
          localStorage.removeItem('user');
        }
      }
    }

    // If no localStorage user, try to get from session (for NextAuth users)
    console.log('getCurrentUser: Trying to get session data...');
    try {
      const sessionRes = await fetch('/api/auth/session');
      console.log('getCurrentUser: Session response status:', sessionRes.status);
      
      if (sessionRes.ok) {
        const sessionData = await sessionRes.json();
        console.log('getCurrentUser: Session data:', sessionData);
        
        if (sessionData.user) {
          console.log('getCurrentUser: Found user in session:', sessionData.user);
          return {
            user: {
              id: sessionData.user.id,
              name: sessionData.user.name,
              email: sessionData.user.email,
              role: 'client'
            },
            token: sessionData.token
          };
        }
      }
    } catch (error) {
      console.error('getCurrentUser: Failed to get session:', error);
    }

    // If neither works, user is not authenticated
    console.log('getCurrentUser: No authenticated user found');
    return {
      user: null,
      error: 'No authenticated user found'
    };

  } catch (error) {
    console.error('getCurrentUser: Error getting current user:', error);
    return {
      user: null,
      error: 'Failed to get user authentication'
    };
  }
}

/**
 * Create a JWT token for API authentication (client-side)
 */
export async function createAuthToken(user: User): Promise<string | null> {
  try {
    console.log('createAuthToken: Creating token for user:', user.id);
    
    const response = await fetch('/api/auth/create-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role || 'client'
      })
    });

    console.log('createAuthToken: Response status:', response.status);

    if (response.ok) {
      const data = await response.json();
      console.log('createAuthToken: Token created successfully');
      return data.token;
    }

    console.log('createAuthToken: Failed to create token');
    return null;
  } catch (error) {
    console.error('createAuthToken: Failed to create auth token:', error);
    return null;
  }
}

/**
 * Get or create authentication token for API calls (client-side)
 */
export async function getAuthToken(): Promise<string | null> {
  try {
    console.log('getAuthToken: Starting token retrieval...');
    
    // First try to get existing token
    if (typeof window !== 'undefined') {
      const existingToken = localStorage.getItem('token');
      if (existingToken) {
        console.log('getAuthToken: Found existing token in localStorage');
        return existingToken;
      }
    }

    console.log('getAuthToken: No existing token, getting user and creating one...');
    
    // If no token exists, get user and create one
    const authResult = await getCurrentUser();
    if (authResult.user) {
      const token = await createAuthToken(authResult.user);
      if (token && typeof window !== 'undefined') {
        localStorage.setItem('token', token);
        console.log('getAuthToken: Created and stored new token');
      }
      return token;
    }

    console.log('getAuthToken: No user found, cannot create token');
    return null;
  } catch (error) {
    console.error('getAuthToken: Failed to get auth token:', error);
    return null;
  }
}

/**
 * Clear all authentication data (client-side)
 */
export function clearAuth(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    console.log('clearAuth: Cleared all authentication data');
  }
}

/**
 * Check if user is authenticated (client-side)
 */
export async function isAuthenticated(): Promise<boolean> {
  const authResult = await getCurrentUser();
  return authResult.user !== null;
}

/**
 * Get user ID for API calls (client-side)
 */
export async function getUserId(): Promise<number | null> {
  const authResult = await getCurrentUser();
  return authResult.user?.id || null;
} 