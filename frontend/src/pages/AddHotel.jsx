import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import * as apiClient from '../api-client';

import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm/ManageHotelForm';

const AddHotel = () => {
  const { mutate: addHotel, isPending } = useMutation({
    mutationFn: apiClient.addHotel,
    onSuccess: () => {
      toast.success('Hotel added successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSave = (hotelFormData) => {
    addHotel(hotelFormData);
  };

  return <ManageHotelForm onSave={handleSave} isLoading={isPending} />;
};

export default AddHotel;
