import { Outlet } from 'react-router-dom';
import { useMessageSubscription } from '@/hooks/useMessageSubscription.ts';
import InAppNotification from '@/components/common/InAppNotification/index.tsx';
import useInAppNotificationHandler from '@/hooks/useInAppNotificationHandler.ts';

const InAppNotificationLayout = () => {
  const {
    notification,
    showNotification,
    setShowNotification,
    handleNewMessage,
  } = useInAppNotificationHandler();

  useMessageSubscription(handleNewMessage);

  const partyTitle = notification?.partyTitle || '';
  const partyId = notification?.partyId || '0';
  const message = notification?.message || '';

  return (
    <>
      {showNotification && notification && (
        <InAppNotification
          setShowNotification={() => {
            setShowNotification(false);
          }}
          id={notification.id}
          showNotification={showNotification}
          partyTitle={partyTitle}
          partyId={partyId}
          message={message}
          sender={{
            profileImage: notification.sender.profileImage || '',
            nickname: notification.sender.nickname || '',
            id: notification.sender.id,
          }}
          type={'MESSAGE'}
          createdAt={''}
        />
      )}
      <Outlet />
    </>
  );
};

export default InAppNotificationLayout;
