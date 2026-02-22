import styled from 'styled-components';

/**
 * Multi-line text with ellipsis
 * Used for displaying message content with max 2 lines
 */
export const MessageContent = styled.p`
  line-height: 1.2;
  overflow: hidden;

  display: -webkit-box;
  display: -ms-flexbox;
  white-space: normal;
  text-overflow: ellipsis;

  word-break: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
