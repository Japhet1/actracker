import React from 'react';
// import { AppDispatch, allCategories } from '../stores/store';
// import { useDispatch, useSelector } from 'react-redux';
import { BsX } from 'react-icons/bs'
// import { removeCategoryAsync } from '../features/categorySlice';
// import { useEffect, useState } from 'react';
// import { setCategory } from '../features/todoSlice';
// import { useToast } from "../components/ui/use-toast"
import { categories } from '@/constant';

interface Category {
  _id: string;
  category: string;
}


const SearchCategory: React.FC  = () => {

    // const { toast } = useToast()
    // const [ filter, setFilter ] = useState<string>('')
    // const dispatch = useDispatch<AppDispatch>();
    // const categories = useSelector(allCategories)
    

    // const handleRemoveCategory = (_id: string) => {
    //     const dispatchData: any = dispatch(removeCategoryAsync(_id))
    //     if (dispatchData) {
    //       toast({
    //         title: "Successfull!!",
    //         description: "Category deleted",
    //         })
    //     } else {
    //       toast({
    //         title: "OOPS!!",
    //         description: "Category not deleted",
    //         })
    //     }
    // };

    // useEffect(() => {
    //     dispatch(setCategory(filter))
    // }, [filter, dispatch])

  return (

    <main className='flex items-center space-x-5'>
        <div>
            <button className='text-sm'>
                All
            </button>
        </div>
        {categories.map((category) => (
            <div key={category.id} className="flex justify-between items-center rounded-md space-x-2 text-black group px-2 py-1">
                <button
                    onClick={(e) => {
                    e.preventDefault();
                    // setFilter(category.category);
                    }}
                    className="flex-grow text-left text-sm"
                >
                    {category.category}
                </button>
                <div className="">
                    <BsX
                    className="text-base cursor-pointer"
                    // onClick={(event) => {
                    //     event.stopPropagation();
                    //     handleRemoveCategory(category._id);
                    // }}
                    />
                </div>
            </div>
        ))}
    </main>
  )
}

export default SearchCategory