import React from 'react';

const JobCardShimmer = () => {
    return (
        <div className="animate-pulse rounded-2xl shadow-md p-6 bg-white dark:bg-zinc-900 space-y-4">
            <div className="h-5 w-3/4 bg-gradient-to-r from-zinc-300 via-zinc-200 to-zinc-300 rounded-md"></div>
            <div className="h-4 w-1/2 bg-gradient-to-r from-zinc-300 via-zinc-200 to-zinc-300 rounded-md"></div>
            <div className="flex space-x-2 mt-4">
                <div className="h-8 w-16 bg-gradient-to-r from-zinc-300 via-zinc-200 to-zinc-300 rounded-full"></div>
                <div className="h-8 w-20 bg-gradient-to-r from-zinc-300 via-zinc-200 to-zinc-300 rounded-full"></div>
            </div>
        </div>
    );
};

export default JobCardShimmer;
