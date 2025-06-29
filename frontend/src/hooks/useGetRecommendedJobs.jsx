import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const useGetRecommendedJobs = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchRecommendedJobs = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${JOB_API_END_POINT}/recommended`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                    setMessage(res.data.message);
                }
            } catch (error) {
                console.log(error);
                setError(error.response?.data?.message || 'Error fetching recommended jobs');
            } finally {
                setLoading(false);
            }
        }
        fetchRecommendedJobs();
    }, [dispatch]);

    return { loading, error, message };
}

export default useGetRecommendedJobs 