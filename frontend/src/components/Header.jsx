import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Header = () => {
  const queryClient = useQueryClient();

  const { data: authUser } = useQuery({
    queryKey: ['authUser'],
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch('/api/auth/logout', {
          method: 'POST',
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error || 'Failed to logout');
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['authUser'],
      });
      toast.success('Logout successful');
    },
    onError: () => {
      toast.error('Failed to logout');
    },
  });

  return (
    <div className='bg-blue-800 py-6'>
      <div className='container mx-auto flex justify-between'>
        <span className='text-3xl text-white font-bold tracking-tight'>
          <Link to='/'>Booking</Link>
        </span>
        <span className='flex space-x-2'>
          {authUser ? (
            <>
              <Link
                className='flex items-center text-white px-3 font-bold hover:bg-blue-600'
                to={'/my-bookings'}
              >
                My Bookings
              </Link>
              <Link
                className='flex items-center text-white px-3 font-bold hover:bg-blue-600'
                to={'/my-hotels'}
              >
                My Hotels
              </Link>
              <button
                className='text-blue-600 px-3 font-bold bg-white hover:bg-gray-100'
                onClick={() => {
                  mutate();
                }}
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              to='/login'
              className='flex items-center bg-white text-blue-600 px-3 font-bold hover:bg-gray-100'
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
