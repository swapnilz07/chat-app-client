import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";
// import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignupPage from "./pages/auth/signup/SignupPage";
import ProfilePage from "./pages/profile/ProfilePage";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner";
import Sidebar from "./components/common/Sidebar";
import { getMe } from "./api/authAPI";
import ChatPage from "./pages/chat/ChatPage";
import GroupChat from "./pages/chat/GroupChat";

function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: getMe,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <div className="flex mx-8">
        {authUser && <Sidebar />}
        <Routes>
          <Route
            path="/"
            element={<Navigate to={authUser ? "/chats" : "/login"} />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignupPage /> : <Navigate to="/" />}
          />
          <Route
            path="/profile/:name"
            element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/chats"
            element={authUser ? <ChatPage /> : <Navigate to="/login" />}
          />
          {/* <Route path="/chat/:name" element={<ChatWithUser />} /> */}
          <Route
            path="/group-chat"
            element={authUser ? <GroupChat /> : <Navigate to="/login" />}
          />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </>
  );
}

export default App;
