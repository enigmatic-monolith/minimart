import { useEffect, useState } from 'react'
import './App.css'
import { User } from '@supabase/supabase-js';
import { supabase } from './services/supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { jwtDecode } from 'jwt-decode';

type JwtPayload = {
  user_role: string;
}

function App() {
  const [user, setUser] = useState<User>();
  const [role, setRole] = useState<string>();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session?.user);
      }
      if (session) {
        const jwt = jwtDecode<JwtPayload>(session.access_token);
        setRole(jwt.user_role);
      }
    });
  }, []);

  return user ?  `${user.email} ${role}` : <Auth
    supabaseClient={supabase}
    appearance={{
      theme: ThemeSupa,
    }}
    providers={[]}
    theme="dark"
    redirectTo="/"
    showLinks
  />
}

export default App
