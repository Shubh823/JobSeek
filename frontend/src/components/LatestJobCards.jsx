import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { motion } from 'framer-motion';

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <motion.div
            onClick={()=> navigate(`/description/${job._id}`)}
            className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <div className=''>
               <img className=' h-12 p-1 rounded-full object-cover border' src={job?.company?.logo} alt="" />
            </div>
                    
            <div>
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>{job?.location}</p>
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

        </motion.div>
    )
}

export default LatestJobCards