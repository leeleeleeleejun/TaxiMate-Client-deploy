import { selections } from '@/constants';
import { SelectionKey } from '@/types';
import Picker from 'react-mobile-picker';

const TimePickerWrap = ({
  time,
  setTime,
}: {
  time: { meridiem: string; hour: string; minute: string };
  setTime: React.Dispatch<
    React.SetStateAction<{ meridiem: string; hour: string; minute: string }>
  >;
}) => {
  return (
    <Picker value={time} onChange={setTime} height={90}>
      {(Object.keys(selections) as SelectionKey[]).map((name) => (
        <Picker.Column key={name} name={name}>
          {selections[name].map((option) => (
            <Picker.Item key={option} value={option}>
              {option}
            </Picker.Item>
          ))}
        </Picker.Column>
      ))}
    </Picker>
  );
};

export default TimePickerWrap;
