import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { CLIENT_PATH } from '@/constants/path.ts';
import useStompClient from '@/hooks/useStompClient.ts';
import AuthChecker from '@/AuthChecker.tsx';
import Layout from '@/components/common/Layout';
import LoadingIcon from '@/components/common/LoadingIcon';
import InAppNotificationLayout from '@/components/common/InAppNotification/InAppNotificationLayout.tsx';
import ForwardHandler from '@/ForwardHandler.tsx';

const HomePage = lazy(() => import('@/domains/Home/Page'));
const ChatListPage = lazy(() => import('@/domains/ChatRoomList/Page'));
const ChatRoomPage = lazy(() => import('@/domains/ChatRoom/Page'));
const LoginPage = lazy(() => import('@/domains/Login/Page'));
const LoginLoadingPage = lazy(
  () => import('@/domains/Login/Page/LoginLoadingPage.tsx')
);
const SearchPage = lazy(() => import('@/domains/Search/Page'));
const CreatePostPage = lazy(() => import('@/domains/CreatePost/Page'));
const MyProfilePage = lazy(() => import('@/domains/MyProfile/Page'));
const PostDetailPage = lazy(() => import('@/domains/PostDetail/Page'));
const UsageHistoryPage = lazy(() => import('@/domains/UsageHistory/Page'));

const Router = () => {
  const client = useStompClient();

  return (
    <BrowserRouter>
      <ForwardHandler />
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
                element={<ChatRoomPage client={client} />}
              />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
