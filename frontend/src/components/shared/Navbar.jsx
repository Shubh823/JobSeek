import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger, Button } from "shadcn"
const Navbar = () => {
    const user=false;
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Job <span className='text-[#f83002]'>Portal</span></h1>
                </div>
                <div className='flex item-center gap-12'>
                    <ul className='flex font-medium item-center gap-5'>
                        <li>Home</li>
                        <li>Jobs</li>
                        <li>Browse</li>
                    </ul>
                    {
                    !user ? ( 
                        <div className='flex item-center gap-2'>
                            <Link to="/login"><Button variant="outline">Login</Button></Link>
                            <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                        </div>
                    ):
                    (
                        <Popover>
                        <PopoverTrigger asChild>
                            <Avatar className="cursor-pointer">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div>
                                <div className='flex gap-4 space-y-2'>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    </Avatar>
                                    <div>
                                        <h4 className='font-medium'>Patil Shubham</h4>
                                        <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit amet consectetur.</p>
                                    </div>
                                </div>
                                <div className='flex flex-col my-2 text-gray-600'>

                                    <div className='flex w-fit item-ceter gap-2 cursor-pointer'>
                                        <User2/>
                                        <Button varient="link">View Profile</Button>
                                    </div>
                                    <div className='flex w-fit item-ceter gap-2 cursor-pointer'>
                                        <LogOut/>
                                        <Button varient="link">LogOut</Button>
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                    )}
                    
                </div>

            </div>
        </div>
    )
}

export default Navbar