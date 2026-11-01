import { Calendar, type CalendarProps, DateObject } from 'react-multi-date-picker';

import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';

interface IProps extends CalendarProps {
  value?: DateObject;
  isTimePicker?: boolean;
  onChange?: (date: DateObject) => void;
  isDatePanel?: boolean;
  isMultiple?: boolean;
}

const CalendarInline = (props: IProps) => {
  const { onChange = () => {}, value, isDatePanel, isMultiple } = props;
  return (
    <Calendar
      multiple={isMultiple}
      shadow={false}
      calendar={persian}
      locale={persian_fa}
      value={value}
      className="border-0 md:mx-5"
      onChange={(d: DateObject) => {
        onChange(d);
      }}
      plugins={
        props.isTimePicker
          ? [<TimePicker hideSeconds />]
          : isDatePanel
            ? [<DatePanel position="left" />]
            : [<TimePicker hideSeconds />]
      }
      {...props}
    />
  );
};

export default CalendarInline;
