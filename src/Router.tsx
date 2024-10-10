import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { CLIENT_PATH } from '@/constants/path.ts';
import useStompClient from '@/hooks/useStompClient.ts';
import AuthChecker from '@/AuthChecker.tsx';
import Layout from '@/components/common/Layout';
import LoadingIcon from '@/components/common/LoadingIcon';
import InAppNotificationLayout from '@/components/common/InAppNotification/InAppNotificationLayout.tsx';

const HomePage = lazy(() => import('@/pages/HomePage'));
const SearchPage = lazy(() => import('@/pages/SearchPage'));
const PostDetailPage = lazy(() => import('@/pages/PostDetailPage'));
const CreatePostPage = lazy(() => import('@/pages/CreatePostPage'));
const ChatListPage = lazy(() => import('@/pages/ChatListPage'));
const ChatRoomPage = lazy(() => import('@/pages/ChatRoomPage'));
const UsageHistoryPage = lazy(() => import('@/pages/UsageHistoryPage'));
const MyProfilePage = lazy(() => import('@/pages/MyProfilePage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const LoginLoadingPage = lazy(() => import('@/pages/LoginLoadingPage'));

const Router = () => {
  const client = useStompClient();

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingIcon />}>
        <Routes>
          <Route element={<Layout />}>
            <Route element={<InAppNotificationLayout />}>
              <Route path={'/'} element={<HomePage />} />
              <Route path={CLIENT_PATH.SEARCH} element={<SearchPage />} />
              <Route
                path={CLIENT_PATH.POST_DETAIL}
                element={<PostDetailPage />}
              />
              <Route
                path={CLIENT_PATH.UPDATE_POST}
                element={<CreatePostPage />}
              />
              <Route path={CLIENT_PATH.LOGIN} element={<LoginPage />} />
              <Route
                path={CLIENT_PATH.LOGIN_LOADING}
                element={<LoginLoadingPage />}
              />
              {/*유저 로그인 상태 체크 필요 페이지*/}
              <Route element={<AuthChecker />}>
                <Route
                  path={CLIENT_PATH.MY_PROFILE}
                  element={<MyProfilePage />}
                />
                <Route
                  path={CLIENT_PATH.USAGE_HISTORY}
                  element={<UsageHistoryPage />}
                />
                <Route
                  path={CLIENT_PATH.CREATE_POST}
                  element={<CreatePostPage />}
                />
                <Route
                  path={CLIENT_PATH.CHAT_LISTS}
                  element={<ChatListPage />}
                />
              </Route>
            </Route>
            <Route element={<AuthChecker />}>
              <Route
                path={CLIENT_PATH.CHAT_ROOM}
                element={
                  <ChatRoomPage
                    sendMessage={client.sendMessage}
                    checkReceive={client.checkReceive}
                  />
                }
              />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
