import { Button, Input, Textarea } from '@/components/atoms';
import { Combobox, Select } from '@/components/molecules';
// import { PersianDatePicker } from '@/components/organisms';
import { Controller, useForm } from 'react-hook-form';
interface IFormExample {
  provinceName: string;
  fullName: string;
  licenseState: string;
  description: string;
  birthDate: Date;
}
export const ExampleForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormExample>();

  console.log(watch('provinceName'));
  const provinces = [
    { name: 'مازندران', id: '1' },
    { name: 'اصفهان', id: '2' },
    { name: 'تهران', id: '3' },
    { name: 'مرکزی', id: '4' },
  ];
  const onSubmit = () => {
    console.log('Submitted');
  };
  return (
    <>
      <div className="flex flex-col gap-4">
        <Input
          label="نام"
          placeholder="نام خود را وارد کنید"
          required
          {...register('fullName')}
          error={errors.fullName?.message}
        />
        <Textarea label="توضیحات" placeholder="توضیحات" {...register('description')} />
        <Controller
          name="provinceName"
          control={control}
          render={({ field, fieldState }) => (
            <Select
              items={[
                { name: 'مازندران', itemId: '1' },
                { name: 'اصفهان', itemId: '2' },
                { name: 'تهران', itemId: '3' },
                { name: 'مرکزی', itemId: '4' },
              ]}
              getLabel={(item) => item.name}
              getValue={(item) => item.itemId}
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
              error={fieldState.error?.message}
              label="استان"
              multiple
            />
          )}
        />
        <Controller
          name="provinceName"
          control={control}
          render={({ field, fieldState }) => (
            <Combobox
              items={provinces}
              getItemLabel={(item) => item.name}
              getItemValue={(item) => item.id}
              value={field.value}
              onValueChange={(id) => field.onChange(id ?? '')}
              label="استان"
              placeholder="استان را انتخاب کنید"
              error={fieldState.error?.message}
            />
          )}
        />
        {/* <Controller
          name="birthDate"
          control={control}
          rules={{ required: 'تاریخ تولد الزامی است' }}
          render={({ field, fieldState }) => (
            <PersianDatePicker
              onChange={field.onChange}
              
            />
          )}
        /> */}
        <div className="flex items-center justify-end gap-2">
          <Button>بستن</Button>
          <Button onClick={() => handleSubmit(onSubmit)}>ثبت</Button>
        </div>
      </div>
    </>
  );
};
