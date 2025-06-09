import { useState } from "react";

export default function VideoPlayer() {
    const [currentvid,usecurrentvid] = useState("https://www.youtube.com/embed/EfmVRQjoNcY");
    const videos = [
      { id: "PawMv7iMPkM"}, // lesson links here
      { id: "KztSf9ODzhw" },
      { id: "HTvJl71zmf4" },
    ];
   const handlevidClick= (id)=>{
    usecurrentvid(`https://www.youtube.com/embed/${id}`);
   }
    return (
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-100 min-h-screen">
        {/* video player */}
        <div className="flex-1 bg-white p-4 rounded-2xl shadow-md">
       {/* video link */}
        <iframe width="805" height="342" src={currentvid} title="Iron Man 2 | Welcome home sir (Workshop scene)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          <div className="mt-4 p-2 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-bold">Description</h2>
            <p className="text-gray-600">
              it is just a sample vidieo for it explains itself...
            </p>
          </div>
        </div>
  
        {/* sidebar */}
        <div className="w-full md:w-1/4 bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">Next Videos</h2>
          <ul> 
            {/* accord to any ai suggesition we do it slice the video */}
            {videos.map((video) => (
               <img
               src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
               alt={`${video.id}`}
               className="w-full h-auto rounded-xl shadow-md mb-2"
               onClick={()=>handlevidClick(video.id)} 
             />
             
            ))}
          </ul>
        </div>
      </div>
    );
  }
  