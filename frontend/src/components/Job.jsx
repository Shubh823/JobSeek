import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useSavedJobs from '../hooks/useSavedJobs'

const Job = ({job}) => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    const { saveJob, unsaveJob, isJobSaved, loading } = useSavedJobs();
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (user && job && job._id) {
            setIsSaved(isJobSaved(job._id));
        } else {
            setIsSaved(false);
        }
    }, [user, job, isJobSaved]);

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }

    const handleSaveJob = async () => {
        if (!user) {
            // Redirect to login if user is not authenticated
            navigate('/login');
            return;
        }

        if (!job || !job._id) {
            return;
        }

        if (isSaved) {
            await unsaveJob(job._id);
        } else {
            await saveJob(job);
        }
    }
    
    return (
        <div
         onClick={()=> navigate(`/description/${job._id}`)}
         className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button 
                    variant="outline" 
                    className="rounded-full" 
                    size="icon"
                    onClick={handleSaveJob}
                    disabled={loading}
                >
                    {isSaved ? <BookmarkCheck className="h-4 w-4 text-purple-600 fill-current" /> : <Bookmark className="h-4 w-4" />}
                </Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={()=> navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
                <Button 
                    onClick={handleSaveJob}
                    className={isSaved ? "bg-gray-500 hover:bg-gray-600" : "bg-[#7209b7] hover:bg-[#5b30a6]"}
                    disabled={loading}
                >
                    {isSaved ? "Saved" : "Save For Later"}
                </Button>
            </div>
        </div>
    )
}

export default Job