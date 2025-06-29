import { setSavedJobs, addSavedJob, removeSavedJob } from '@/redux/authSlice'
import { USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const useSavedJobs = () => {
    const dispatch = useDispatch();
    const { savedJobs, savedJobIds } = useSelector(store => store.auth);
    const [loading, setLoading] = useState(false);

    // Fetch saved jobs - memoized with useCallback
    const fetchSavedJobs = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${USER_API_END_POINT}/saved-jobs`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setSavedJobs(res.data.savedJobs));
            }
        } catch (error) {
            toast.error("Error loading saved jobs");
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    // Save a job
    const saveJob = async (job) => {
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/save-job`, 
                { jobId: job._id }, 
                { withCredentials: true }
            );
            if (res.data.success) {
                dispatch(addSavedJob(job));
                toast.success("Job saved successfully!");
            }
        } catch (error) {
            if (error.response?.data?.message === "Job is already saved") {
                toast.info("Job is already saved");
            } else {
                toast.error("Error saving job");
            }
        } finally {
            setLoading(false);
        }
    };

    // Unsave a job
    const unsaveJob = async (jobId) => {
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/unsave-job`, 
                { jobId }, 
                { withCredentials: true }
            );
            if (res.data.success) {
                dispatch(removeSavedJob(jobId));
                toast.success("Job removed from saved jobs");
            }
        } catch (error) {
            toast.error("Error removing job");
        } finally {
            setLoading(false);
        }
    };

    // Check if a job is saved
    const isJobSaved = useCallback((jobId) => {
        return savedJobIds && Array.isArray(savedJobIds) && savedJobIds.includes(jobId);
    }, [savedJobIds]);

    return {
        savedJobs: savedJobs || [],
        savedJobIds: savedJobIds || [],
        loading,
        fetchSavedJobs,
        saveJob,
        unsaveJob,
        isJobSaved
    };
};

export default useSavedJobs; 