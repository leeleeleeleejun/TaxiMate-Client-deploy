export interface SearchPlace {
  id: string;
  place_name: string;
  x: string;
  y: string;
  road_address_name?: string;
  address_name: string;
}

export type SelectionKey = 'meridiem' | 'hour' | 'minute';

export interface RegisterData {
  title: string;
  departureTime: string;
  explanation: string;
  originLocation: { longitude: number; latitude: number };
  destinationLocation: { longitude: number; latitude: number };
  maxParticipants: string;
}

export type RegisterDataKey =
  | 'title'
  | 'departureTime'
  | 'explanation'
  | 'originLocation'
  | 'destinationLocation'
  | 'maxParticipants';

export type StepType =
  | 'main'
  | 'time'
  | 'origin'
  | 'destination'
  | 'searchOrigin'
  | 'searchDestination'
  | 'originMap'
  | 'destinationMap';

export type SetStep = React.Dispatch<React.SetStateAction<StepType>>;

export type SetRegisterDataFunc = (
  name: RegisterDataKey,
  data: string | { latitude: number; longitude: number }
) => void;

export type SetActiveMarker = React.Dispatch<
  React.SetStateAction<string | null>
>;
