/* eslint-disable react/prop-types */
import { FormProvider, useForm } from 'react-hook-form';
import DetailsSection from '../DetailsSection';
import TypesSection from '../TypesSection';
import Facilities from '../Facilities';
import Guest from '../Guest';
import Images from '../Images';

const ManageHotelForm = ({ onSave, isLoading }) => {
  const formMethods = useForm();
  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((formDataJson) => {
    const formData = new FormData();
    formData.append('name', formDataJson.name);
    formData.append('city', formDataJson.city);
    formData.append('country', formDataJson.country);
    formData.append('description', formDataJson.description);
    formData.append('type', formDataJson.type);
    formData.append('pricePerNight', formDataJson.pricePerNight?.toString());
    formData.append('starRating', formDataJson.starRating?.toString());
    formData.append('adultCount', formDataJson.adultCount?.toString());
    formData.append('childCount', formDataJson.childCount?.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append('imageFiles', imageFile);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit} className='flex flex-col gap-10'>
        <DetailsSection />
        <TypesSection />
        <Facilities />
        <Guest />
        <Images />

        <span className='flex justify-end'>
          <button
            disabled={isLoading}
            className='bg-blue-600 text-white p-2 font-bold hover:bg-opacity-85 text-xl disabled:bg-gray-500 disabled:cursor-not-allowed'
            type='submit'
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
