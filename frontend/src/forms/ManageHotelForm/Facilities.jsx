import { useFormContext } from 'react-hook-form';
import { hotelFacilities } from '../../config/hotel-config';

const Facilities = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <h2 className='text-2xl font-bold mb-3'>Facilities</h2>

      <div className='grid grid-cols-5 gap-3'>
        {hotelFacilities?.map((facility, index) => (
          <label key={index} className='text-sm flex gap-1 text-gray-700'>
            <input
              type='checkbox'
              value={facility}
              {...register('facilities', {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return 'Please select at least one facility';
                  }
                },
              })}
            />
            <span>{facility}</span>
          </label>
        ))}
      </div>

      {errors.facilities && (
        <span className='text-red-500 text-sm font-bold'>
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default Facilities;
