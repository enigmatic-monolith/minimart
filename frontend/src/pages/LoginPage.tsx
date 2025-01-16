import { jwtDecode } from "jwt-decode";
import { supabase } from "../services/supabaseClient";
import { useEffect, useState } from "react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Auth } from "@supabase/auth-ui-react";
import { useDispatch } from "react-redux";
import { AppRole, setAuth } from "../redux/slices/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, AlertTitle } from "@mui/material";

type JwtPayload = {
  user_role: string;
}

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);

  const queryParams = new URLSearchParams(location.search);
  const redirectTo = queryParams.get('redirectTo') || '/';

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        const { access_token, user } = session;
        const jwt = jwtDecode<JwtPayload>(access_token);
        fetch(`${import.meta.env.VITE_API_BASE_URL}/user_info`, {
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        })
          .then((res) => {
            if (res.status === 403) {
              setError("User is banned");
            } else {
              dispatch(setAuth({ accessToken: access_token, role: jwt.user_role as AppRole, user }));
              navigate(redirectTo);  
            }
          });
      }
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
        }}
        providers={[]}
        theme="dark"
        showLinks
      />
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
    </div>
  );
}
