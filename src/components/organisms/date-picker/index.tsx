// import { useRef, useState } from "react";
// import DatePicker, { DateObject } from "react-multi-date-picker";
// import persian from "react-date-object/calendars/persian";
// import persian_fa from "react-date-object/locales/persian_fa";
// import { Input } from "@/components/atoms";
// export type TypeDatePicker = DateObject;
// interface IProps {
//   dates?: string | number | Date | DateObject | undefined;
//   isError?: boolean;
//   onChange?: (date: TypeDatePicker) => void;
//   placeholder?: string;
//   pickerMode?: "multiple" | "fullDate" | "onlyYear" | "onlyMonth" | "onlyDay";
//   className?: string;
//   format?: string;
//   plugins?: any;
//   monthFormat?: string;
//   maxDate?: string | number | Date | DateObject | undefined;
//   minDate?: string | number | Date | DateObject | undefined;
//   render?: (value: string, openCalendar: () => void) => void;
//   onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
//   name?: string;
//   id?: string;
//   hideMonth?: boolean;
//   hideYear?: boolean;
//   onDateClear?: () => void;
//   errorMessage?: string;
//   value?: DateObject | string | "";
//   openFromParent?: boolean;
//   isReadOnly?: boolean;
// }

// export type DateType = DateObject;

// export const PersianDatePicker = (props: IProps) => {
//   const {
//     format,
//     plugins,
//     dates,
//     onChange = () => {},
//     isError,
//     placeholder = "انتخاب کنید",
//     pickerMode,
//     maxDate,
//     value,
//     minDate,
//     monthFormat,
//     render,
//     onBlur = () => {},
//     name = "",
//     id = "",
//     onDateClear = () => {},
//     isReadOnly = false,
//     hideMonth = false,
//     hideYear = false,
//   } = props;

//   let dateFormat = format || "YYYY/MM/DD";
//   switch (pickerMode) {
//     case "fullDate": {
//       dateFormat = "YYYY/MM/DD";
//       break;
//     }
//     case "multiple": {
//       dateFormat = "YYYY/MM/DD";
//       break;
//     }
//     case "onlyYear": {
//       dateFormat = "YYYY";
//       break;
//     }
//     case "onlyMonth": {
//       dateFormat = monthFormat ?? "MMMM YYYY";
//       break;
//     }
//     case "onlyDay": {
//       dateFormat = "DD";
//       break;
//     }
//     default:
//       break;
//   }
//   // const [value, setValue] = useState<TypeDatePicker | TypeDatePicker[] | null>();
//   const [open, setOpen] = useState<boolean>(false);
//   const [isResetValue, setIsResetValue] = useState<boolean>(false);

//   const datePickerRef = useRef<any>(null);

//   const handleCloseDatePicker = () => {
//     if (datePickerRef.current) datePickerRef.current.closeCalendar();
//   };

//   const onChangeDate = (selectedDates: TypeDatePicker) => {
//     if (!selectedDates) return;
//     const date = selectedDates as TypeDatePicker;
//     onChange(date);
//   };
//   // useEffect(() => {
//   //   if(openFromParent){
//   //     setOpen(true)
//   //     open
//   //   }
//   // }, [openFromParent])

//   const onRemoveDate = () => {
//     onDateClear();
//     setIsResetValue(true);
//     const timer = setTimeout(() => {
//       setIsResetValue(false);
//     }, 100);
//     return () => {
//       clearInterval(timer);
//     };
//   };
//   const calanderInputRef = useRef<HTMLInputElement>(null);
//   const dateValue = value ?? (isResetValue ? new Date("") : dates);

//   return (
//     <>
//       <span
//         className={`absolute inset-0 z-20 rounded-2xl transition-opacity duration-300 ${
//           open ? "opacity-100" : "opacity-0 pointer-events-none"
//         }`}
//         onClick={handleCloseDatePicker}
//       ></span>

//       <DatePicker
//         // animations={[opacity({ duration: 300 })]}
//         maxDate={maxDate}
//         minDate={minDate}
//         plugins={plugins}
//         calendar={persian}
//         locale={persian_fa}
//         onChange={(data: TypeDatePicker) => onChangeDate(data)}
//         containerClassName="w-full"
//         ref={datePickerRef}
//         multiple={pickerMode === "multiple"}
//         onlyYearPicker={pickerMode === "onlyYear"}
//         onlyMonthPicker={pickerMode === "onlyMonth"}
//         format={dateFormat}
//         readOnly={isReadOnly}
//         onClose={() => {
//           setOpen(false);
//         }}
//         hideMonth={hideMonth}
//         hideYear={hideYear}
//         numberOfMonths={1}
//         value={dateValue}
//         render={(textValue: string, openCalendar: () => void) => {
//           return render ? (
//             render(textValue, openCalendar)
//           ) : (
//             <div className="relative">
//               <Input
//                 ref={calanderInputRef}
//                 name={name}
//                 id={id}
//                 onBlur={onBlur}
//                 placeholder={placeholder}
//                 readOnly={true}
//                 value={pickerMode !== "multiple" ? textValue : ""}
//                 className={`cursor-pointer ${props.className}`}
//                 onClick={() => {
//                   openCalendar();
//                   setOpen(true);
//                 }}
//                 onKeyDown={(key) => {
//                   if (key === "Tab") handleCloseDatePicker();
//                 }}
//               />
//               <div className="absolute left-2 top-0 h-full flex items-center justify-center gap-1 cursor-pointer">
//                 {!isReadOnly && (dates || calanderInputRef.current?.value) && (
//                   <IoIosAdd
//                     fill="grey"
//                     size={20}
//                     onClick={onRemoveDate}
//                     className="rotate-45"
//                   />
//                 )}
//                 <div
//                   onClick={() => {
//                     openCalendar();
//                     setOpen(true);
//                   }}
//                 >
//                   <Icons.calendar />
//                 </div>
//               </div>
//             </div>
//           );
//         }}
//       />
//     </>
//   );
// };
