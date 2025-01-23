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

  return (
    <>
      {showNotification && notification && (
        <InAppNotification
          setShowNotification={() => {
            setShowNotification(false);
          }}
          showNotification={showNotification}
          notification={notification}
        />
      )}
      <Outlet />
    </>
  );
};

export default InAppNotificationLayout;
