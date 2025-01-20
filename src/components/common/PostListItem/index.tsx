import { Link } from 'react-router-dom';

import {
  AddressWrapper,
  PostBodyContainer,
  PostHeaderContainer,
  PostListItemContainer,
} from '@/components/common/PostListItem/PostListItem.style.ts';
import PeopleCountTag, {
  PeopleCountTagProps,
} from '@/components/common/PeopleCountTag';

import ClockIcon from '@/assets/icons/postList/clock-icon.svg?react';
import ArrowRightIcon from '@/assets/icons/common/arrow-right-icon.svg?react';
import LocationIcon from '@/assets/icons/postList/location-dot-icon.svg?react';
import CaretRightIcon from '@/assets/icons/postList/caret-right-icon.svg?react';

interface PostHeaderProps {
  title: string;
  activePostList?: boolean;
}

interface PostBodyProps {
  departureTime: string;
  origin: string;
  destination: string;
}

interface PostListItemProps extends PostHeaderProps, PostBodyProps {
  id: string;
}
const PostListItem = ({
  id,
  title,
  currentParticipants,
  maxParticipants,
  departureTime,
  origin,
  destination,
  activePostList,
  isClose,
}: PostListItemProps & PeopleCountTagProps) => {
  return (
    <PostListItemContainer>
      <Link to={'/posts/' + id}>
        <PostHeader
          title={title}
          currentParticipants={currentParticipants}
          maxParticipants={maxParticipants}
          activePostList={activePostList}
          isClose={isClose}
        />
        <PostBody
          departureTime={departureTime}
          origin={origin}
          destination={destination}
        />
      </Link>
    </PostListItemContainer>
  );
};

export default PostListItem;

const PostHeader = ({
  title,
  currentParticipants,
  maxParticipants,
  activePostList,
  isClose,
}: PostHeaderProps & PeopleCountTagProps) => {
  return (
    <PostHeaderContainer>
      <div>
        <h2>{title}</h2>
        <PeopleCountTag
          currentParticipants={currentParticipants}
          maxParticipants={maxParticipants}
          isClose={isClose}
        />
      </div>
      {activePostList && <ArrowRightIcon />}
    </PostHeaderContainer>
  );
};

export const PostBody = ({
  departureTime,
  origin,
  destination,
}: PostBodyProps) => {
  return (
    <PostBodyContainer>
      <div>
        <ClockIcon />
        {departureTime}
      </div>
      <div>
        <LocationIcon />
        <AddressWrapper>{origin}</AddressWrapper>
        <CaretRightIcon />
        <AddressWrapper>{destination}</AddressWrapper>
      </div>
    </PostBodyContainer>
  );
};
