import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Chat, ChatPage, Followers, GroupCreate, Home, ProfileCreation, ProfileView, SignUp, Welcome } from "../screens";
import { AppRoutes } from "./routes";
import PrivateRouter from "./privaterouter";

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes?.welcome} element={<Welcome />} />
        <Route path={AppRoutes?.register} element={<SignUp />} />
        <Route path={AppRoutes?.profile_create} element={<ProfileCreation />} />
        <Route
          path={AppRoutes?.chat}
          element={
            <PrivateRouter path={AppRoutes?.chat}>
              <Chat />
            </PrivateRouter>
          }
        />   
        <Route
          path={AppRoutes?.home}
          element={
            <PrivateRouter path={AppRoutes?.home}>
              <Home />
            </PrivateRouter>
          }
        />           <Route
          path={AppRoutes?.chatpage}
          element={
            <PrivateRouter path={AppRoutes?.chatpage}>
              <ChatPage />
            </PrivateRouter>
          }
        />
        <Route
          path={AppRoutes?.profile_view}
          element={
            <PrivateRouter path={AppRoutes?.profile_view}>
              <ProfileView />
            </PrivateRouter>
          }
        />
        <Route
          path={AppRoutes?.followers}
          element={
            <PrivateRouter path={AppRoutes?.followers}>
              <Followers />
            </PrivateRouter>
          }
        />

<Route
          path={AppRoutes?.group_create}
          element={
            <PrivateRouter path={AppRoutes?.group_create}>
              <GroupCreate />
            </PrivateRouter>
          }
        />


      </Routes >
    </BrowserRouter >
  );
}

export default RouterApp;











