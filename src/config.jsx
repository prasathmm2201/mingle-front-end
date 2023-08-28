export const config = {
    api_url: import.meta.env.VITE_BACKEND_URL,
    googleMapApiKey: import.meta.env.VITE_GOOGLE_API,
    client_id: import.meta.env.VITE_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_REDIRECT_URL,
    google_account: import.meta.env.VITE_REDIRECT_URL,
    REACT_APP_FIREBASE_API_KEY:import.meta.env.VITE_FIREBASE_API_KEY,
    REACT_APP_FIREBASE_AUTH_DOMAIN:import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    REACT_APP_FIREBASE_PROJECT_ID:import.meta.env.VITE_FIREBASE_PROJECT_ID,
    REACT_APP_FIREBASE_STORAGE_BUCKET:import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID:import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    REACT_APP_FIREBASE_APP_ID:import.meta.env.VITE_FIREBASE_APP_ID,
    REACT_APP_FIREBASE_MEASUREMENT_ID:import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    REACT_APP_FIREBASE_VAPIDKEY:import.meta.env.VITE_FIREBASE_VAPIDKEY
}

console.log(import.meta.env.VITE_BACKEND_URL , 's')