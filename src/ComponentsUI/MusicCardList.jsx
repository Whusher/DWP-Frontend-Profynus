
import { useNavigate } from 'react-router';
import {formatFileSize} from '../Utils/FIleSizeHelper'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Heart, Disc3, Play, Download } from 'lucide-react';
import { div } from 'framer-motion/client';

// First, define your responsive breakpoints
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
};

const MusicCard = ({ song }) => {
  const [name,] = song.name.split(".");
  const navigate = useNavigate();
  const handleClick = () => {
    // Navigate to the player page with song details
    navigate('/player', { 
      state: { 
        song: {
          title: song.title,
          downloadURL: song.downloadURL,
          name: song.name,
          metadata: song.metadata
        } 
      } 
    });
  }

  return (
    <div
    onClick={handleClick}
      className="bg-black cursor-pointer h-[200px] border m-15 border-cyan-500 text-cyan-300 rounded-lg
       transition-all duration-300 hover:bg-blue-500/40 hover:border-cyan-300 hover:scale-105 p-4 mx-2"
    >
      <div className="flex items-center justify-evenly mb-3">
        <h3 className="text-lg font-bold truncate">{song.title}</h3>
        <Heart
          className="text-cyan-500 hover:text-cyan-300 cursor-pointer transition-colors"
          size={20}
        />
        <Download
          className="text-cyan-500 hover:text-cyan-300 cursor-pointer transition-colors"
          size={20}
        />
      </div>
      <div className="flex items-center space-x-4">
        <div
          className="w-20 h-20 bg-cyan-900 rounded-lg flex items-center justify-center"
        >
          <Disc3 className="text-cyan-500" size={40} />
        </div>
        <div className="flex-grow">
          <p className="text-sm text-cyan-400">{name}</p>
          {/* <p className="text-xs text-cyan-600">{song.album}</p> */}
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-cyan-500">{formatFileSize(song.metadata.size)}</span>
            <button
              className="bg-cyan-500 text-black rounded-full p-2
               hover:bg-cyan-300 transition-colors"
            >
              <Play size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MusicCardCarousel = ({songs = []}) => {
  return (
     <div className='w-full p-8 m-4 min-h-[600px]'>
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          centerMode={false}
          containerClass="carousel-container"
          itemClass="carousel-item-padding-40-px"
        >
          {songs && songs.length >0 &&
          songs.map((song,idx) => (
            <MusicCard key={idx} song={song} />
          ))}
        </Carousel>

     </div>
  );
};

export default MusicCardCarousel;
