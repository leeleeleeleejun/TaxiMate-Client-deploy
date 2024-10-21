import { useRef } from 'react';
import 'react-spring-bottom-sheet/dist/style.css';
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet';

import reformatDate from '@/utils/reformatDate.ts';

import {
  PostListContainer,
  ActivePostListContainer,
} from '@/components/Home/PostList/PostList.style.ts';
import PostListItem from '@/components/common/PostListItem';
import { Post } from '@/types/post.ts';
import NoData from '@/components/common/NoData.tsx';

const PostList = ({
  activeMarker,
  data,
  setPostListHeight,
}: {
  activeMarker: string | null;
  data: Post[];
  setPostListHeight: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const sheetRef = useRef<BottomSheetRef | null>(null);

  if (activeMarker) {
    const targetData = data.filter((item) => item.id === activeMarker)[0];

    return (
      <ActivePostListContainer>
        <PostListItem
          id={targetData.id}
          title={targetData.title}
          currentParticipants={targetData.currentParticipants}
          maxParticipants={targetData.maxParticipants}
          departureTime={reformatDate(targetData.departureTime)}
          origin={targetData.origin}
          destination={targetData.destination}
          activePostList
        />
      </ActivePostListContainer>
    );
  }

  return (
    <BottomSheet
      open
      blocking={false}
      ref={sheetRef}
      defaultSnap={({ maxHeight }) => Math.floor(maxHeight * 0.2)}
      snapPoints={({ maxHeight }) => [
        Math.floor(maxHeight * 0.9),
        Math.floor(maxHeight * 0.2),
      ]}
      expandOnContentDrag
      onSpringEnd={() => setPostListHeight(sheetRef.current?.height || 0)}
    >
      {data.length > 0 ? (
        <PostListContainer>
          {data.map((post) => (
            <PostListItem
              key={post.id}
              id={post.id}
              title={post.title}
              currentParticipants={post.currentParticipants}
              maxParticipants={post.maxParticipants}
              departureTime={reformatDate(post.departureTime)}
              origin={post.origin}
              destination={post.destination}
            />
          ))}
        </PostListContainer>
      ) : (
        <NoData>주위 검색된 팟이 없습니다</NoData>
      )}
    </BottomSheet>
  );
};

export default PostList;
