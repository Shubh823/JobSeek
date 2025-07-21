import React, { useState, useEffect } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, Sparkles, ArrowRight, Bookmark, Loader2 } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import useSavedJobs from '@/hooks/useSavedJobs'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const tips=["kjdnsihdsnfijfndsfkjnfkjdnfkjsd","jdfnufbnsduhbsdhbsdashbd","kjdnsihdsnfijfndsfkjnfkjdnfkjsd","jdfnufbnsduhbsdhbsdashbd","kjdnsihdsnfijfndsfkjnfkjdnfkjsd","jdfnufbnsduhbsdhbsdashbd"]
const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const { savedJobs, fetchSavedJobs } = useSavedJobs();
    const navigate = useNavigate();

    // AI Resume Tips State
    const [aiLoading, setAiLoading] = useState(false);
    const [aiTips, setAiTips] = useState([]);

    const handleGetAiTips = async () => {
        console.log("Clicked AI tips");
        try {
            setAiLoading(true);
            const res = await axios.get("http://localhost:3000/api/v1/user/get-tips", {
                withCredentials: true,
            });

            const result = res.data.Tips; // Make sure `Tips` is an array in your backend response
            setAiTips(result);
        } catch (error) {
            console.error("Failed to fetch AI tips:", error);
            setAiTips([]);
        } finally {
            setAiLoading(false);
        }
    };


    useEffect(() => {
        if (user) {
            fetchSavedJobs();
        }
    }, [user, fetchSavedJobs]);

    const goToRecommendedJobs = () => {
        navigate("/recommended");
    }

    const goToSavedJobs = () => {
        navigate("/saved");
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>

                {/* Saved Jobs Section */}
                <div className='mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-100'>
                    <div className='flex items-center gap-3 mb-4'>
                        <div className='p-2 bg-green-100 rounded-full'>
                            <Bookmark className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                            <h3 className='font-semibold text-lg text-gray-900'>Saved Jobs</h3>
                            <p className='text-sm text-gray-600'>Jobs you've bookmarked for later</p>
                        </div>
                    </div>

                    <div className='mb-4'>
                        <p className='text-sm text-gray-700 mb-3'>You have {savedJobs.length} saved job{savedJobs.length !== 1 ? 's' : ''}.</p>
                        <Button onClick={goToSavedJobs} className="bg-green-600 hover:bg-green-700">
                            <Bookmark className="h-4 w-4 mr-2" />
                            View Saved Jobs
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                    </div>
                </div>

                {/* Recommendation Section */}
                <div className='mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100'>
                    <div className='flex items-center gap-3 mb-4'>
                        <div className='p-2 bg-purple-100 rounded-full'>
                            <Sparkles className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                            <h3 className='font-semibold text-lg text-gray-900'>Get Personalized Job Recommendations</h3>
                            <p className='text-sm text-gray-600'>Based on your skills and experience</p>
                        </div>
                    </div>

                    {(!user?.profile?.skills || user?.profile?.skills.length === 0) ? (
                        <div className='mb-4'>
                            <p className='text-sm text-gray-700 mb-3'>Add your skills to get better job recommendations!</p>
                            <Button onClick={() => setOpen(true)} variant="outline" size="sm">
                                <Pen className="h-4 w-4 mr-2" />
                                Update Skills
                            </Button>
                        </div>
                    ) : (
                        <div className='mb-4'>
                            <p className='text-sm text-gray-700 mb-3'>We found {user?.profile?.skills.length} skills in your profile. Get personalized job recommendations!</p>
                            <Button onClick={goToRecommendedJobs} className="bg-purple-600 hover:bg-purple-700">
                                <Sparkles className="h-4 w-4 mr-2" />
                                View Recommended Jobs
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </div>
                    )}
                </div>

                {/* AI Resume Improvement Section */}
                <div className='mt-8 p-6 bg-gradient-to-r from-yellow-50 to-blue-50 rounded-lg border border-yellow-100'>
                    <div className='flex items-center gap-3 mb-4'>
                        <div className='p-2 bg-yellow-100 rounded-full'>
                            <Sparkles className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                            <h3 className='font-semibold text-lg text-gray-900'>AI-based Recommendation of Improvements in Your Resume</h3>
                            <p className='text-sm text-gray-600'>Get AI-powered suggestions to make your resume stand out</p>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <Button onClick={handleGetAiTips} disabled={aiLoading} className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold">
                            {aiLoading ? <><Loader2 className="animate-spin h-4 w-4 mr-2" />Generating Tips...</> : <>Get AI Resume Tips</>}
                        </Button>
                        {aiTips && aiTips.length > 0 && (
                            <div className="mt-4 p-4 bg-white rounded-xl shadow-md border border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-700 mb-2">AI Resume Suggestions:</h2>
                                <ul className="list-disc list-inside space-y-2 text-gray-700">
                                    {aiTips.map((tip, idx) => (
                                        <li key={idx} className="leading-relaxed">{tip}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {!aiTips && !aiLoading && (
                            <p className='text-sm text-gray-700 mt-3'>This feature will analyze your resume and provide personalized improvement tips.</p>
                        )}
                    </div>
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                {/* Applied Job Table   */}
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
            
        </div>
    )
}

export default Profile