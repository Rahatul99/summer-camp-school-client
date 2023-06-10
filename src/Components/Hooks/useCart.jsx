import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useCart = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { refetch, data: carts = [] } = useQuery({
    queryKey: ['carts', user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/carts?email=${user?.email}`)
      return res.data;
    },
  })
  return [carts, refetch]
};

export default useCart;