import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useState} from 'react';
import axios from 'axios';


export default function About(){

    const [Bout,setAbout]=useState([]);
    // console.log(`this is ${process.env.REACT_APP_BACKEND_URI}`)
    
   
    const abou=async()=>{
        try {
            await axios({
                method: 'get',
                url: `${process.env.REACT_APP_BACKEND_URI}/about`
            }).then(
                (res)=>{
                    setAbout(res.data)
                    console.log(Bout)
                }
            )
        } catch (error) {
            console.log(error)  
        }
    }

    // useeffect to call tha function when the page is rendered
    useEffect(()=>{
        abou();
        console.log(Bout)
    },[]);


    const aboutelements=Bout.map((bouts)=>{
        return(
            <div className='pb-1'>
                <Card variant="outlined">
                    <CardContent>
                        <div className='flex gap-4 divide-x divide-gray-300'>
                            <div className='h-[250px] w-[250px] rounded-full justify-center'>
                                <img className='rounded-full h-[250px] w-[250px] object-cover' src={bouts['url']} alt="hello"></img>
                            </div>
                            <div className='pl-[20px]'>
                                <p className='font-bold text-lg'>{bouts['name']}</p>
                                <p>{bouts['desc']}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>)})

    return(
        <div className='min-w-[900px]'>
            {aboutelements}
            {/* <Card variant="outlined">
                <CardContent>
                    <div className='flex gap-4 divide-x divide-gray-300'>
                        <div className='h-[250px] w-[250px]'>
                            <img className='rounded-full' src="https://simplyilm.com/wp-content/uploads/2017/08/temporary-profile-placeholder-1.jpg"></img>
                        </div>
                        <div className='pl-[20px]'>
                            <p className='font-bold text-lg'>Name</p>
                            <p>Description</p>
                        </div>
                    </div>
                    
                </CardContent>
            </Card> */}
        </div>
    );
}
