import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        key: "location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        key: "industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        key: "salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    // Track selected value for each filter type
    const [selected, setSelected] = useState({
        location: '',
        industry: '',
        salary: ''
    });
    // Track open/closed state for each filter group
    const [openGroups, setOpenGroups] = useState({
        location: true,
        industry: true,
        salary: true
    });
    const dispatch = useDispatch();

    // Handle change for each filter type
    const changeHandler = (key, value) => {
        setSelected(prev => ({ ...prev, [key]: value }));
    }

    // Toggle open/closed state for a group
    const toggleGroup = (key) => {
        setOpenGroups(prev => ({ ...prev, [key]: !prev[key] }));
    }

    // Combine selected filters into a single query string
    useEffect(() => {
        // Only include non-empty filters
        const queryParts = Object.entries(selected)
            .filter(([_, value]) => value)
            .map(([key, value]) => value);
        // Join with space for multi-criteria search
        const combinedQuery = queryParts.join(' ');
        dispatch(setSearchQuery(combinedQuery));
    }, [selected]);

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            {
                filterData.map((data, index) => (
                    <div key={data.key} className='mb-4'>
                        <div
                            className='flex items-center justify-between cursor-pointer select-none py-2'
                            onClick={() => toggleGroup(data.key)}
                        >
                            <h1 className='font-bold text-lg'>{data.filterType}</h1>
                            <span className='text-gray-500 text-xl'>{openGroups[data.key] ? '−' : '+'}</span>
                        </div>
                        {openGroups[data.key] && (
                            <RadioGroup value={selected[data.key]} onValueChange={value => changeHandler(data.key, value)}>
                                {/* All/Clear option */}
                                <div className='flex items-center space-x-2 my-2' key={`all-${data.key}`}>
                                    <RadioGroupItem value="" id={`all-${data.key}`} />
                                    <Label htmlFor={`all-${data.key}`}>All</Label>
                                </div>
                                {
                                    data.array.map((item, idx) => {
                                        const itemId = `id${index}-${idx}`
                                        return (
                                            <div className='flex items-center space-x-2 my-2' key={itemId}>
                                                <RadioGroupItem value={item} id={itemId} />
                                                <Label htmlFor={itemId}>{item}</Label>
                                            </div>
                                        )
                                    })
                                }
                            </RadioGroup>
                        )}
                    </div>
                ))
            }
        </div>
    )
}

export default FilterCard