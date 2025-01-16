import styled from 'styled-components';
import MarkerContainerStyle from '@/components/common/MarkerContainer/MarkerContainer.style.ts';
import UserCurrentLocationMarkerStyle from '@/components/common/UserCurrentLocationMarker/UserCurrentLocationMarker.style.ts';

export const Main = styled.main`
  position: relative;
  .map-wrapper {
    width: 100%;
    height: calc(100vh - (var(--header-height) + var(--footer-height)));
  }
  ${MarkerContainerStyle}

  ${UserCurrentLocationMarkerStyle}
`;
