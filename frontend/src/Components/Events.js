import React, { useEffect } from "react";
import axios from "axios"
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react'
import {Keyboard,Navigation, Pagination, Autoplay,Virtual} from 'swiper/modules'
import 'swiper/swiper-bundle.css'
import SwiperCore from 'swiper';
import { useState } from "react";

export default function Events(){
    // usestate to receive events and storing them
    const [Events,setEvents] = useState([])

    // api call to receive events
    const evie=async()=>{
        try{
            const temp=await axios({
                method: 'get',
                url: `${process.env.REACT_APP_BACKEND_URI}/events`
            }).then(
                (res)=>{
                    setEvents(res.data)
                    console.log(Events) 
                }
            )
        }catch(error){
            console.log(error)
        }

    }
    
    // when page renders we'll call the api to receive data
    useEffect(()=>{
        evie();
    },[])

    // creating a swiper module
    const swiper=useSwiper();

    // including keyboard for navigation
    SwiperCore.use([Keyboard]);

    // mapping events to be included in the swiper
    const eventselements=Events.map((event,index)=>{  
                          
        return <SwiperSlide key={event['id']} virtualIndex={index}>
                
                <div className="h-[550px] place-items-center bg-opacity-50 bg-black">
                    <img class="h-[500px] object-contain" src={event['url']}></img>
                    <p className="text-lg text-white self-center">{event['text']}</p>
                </div>
                
                
            </SwiperSlide>
        })
    return( 
        <div >
            <div>
                <Swiper modules={[Navigation,Pagination,Autoplay,Virtual]}  
                        keyboard={{enabled: true,onlyInViewport: false}}
                        pagination={{clickable: true}} 
                        navigation
                        autoplay={{delay: 3000}} 
                        centeredSlides={true} 
                        slidesPerView={2} 
                        zoom={true}
                        virtual={true}
                        spaceBetween={1}
                        > 
                
                    {/* Adding events into the swiper */}
                    {eventselements}
                    {/*<SwiperSlide>
                            <img  src="https://www.crogastudiobuilds.com/wp-content/uploads/2019/12/placeholder-16-9-26571_1080x675.jpg" alt="hiii" ></img>
                    </SwiperSlide>
                    <SwiperSlide >
                        <img  src="https://i.etsystatic.com/37268737/r/il/a27954/4356542192/il_570xN.4356542192_3j4g.jpg" alt="hiii" ></img>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://www.crogastudiobuilds.com/wp-content/uploads/2019/12/placeholder-16-9-26571_1080x675.jpg" alt="hiii" ></img>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://www.crogastudiobuilds.com/wp-content/uploads/2019/12/placeholder-16-9-26571_1080x675.jpg" alt="hiii" ></img>
                    </SwiperSlide>*/}
                </Swiper>
            </div>
        </div>
    )
}