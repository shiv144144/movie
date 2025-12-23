
import React, { useState } from 'react';
import { Upload, Play, Film, Clock, Heart, Search, LogOut, Sparkles, Home, User as UserIcon, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import VideoStudio from './VideoStudio';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('home');

  // Mock initial data
  const [videos, setVideos] = useState([
    {
      id: '1',
      title: 'Action Movie Trailer 2024',
      thumbnail: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=800',
      duration: '2:15',
      views: '1.2M views',
      author: 'Universal Pictures'
    },
    {
      id: '2',
      title: 'Fashion Week Collection Highlight',
      thumbnail: 'https://images.unsplash.com/photo-1539109132382-381bb3f1cff6?auto=format&fit=crop&q=80&w=800',
      duration: '5:42',
      views: '450K views',
      author: 'Vogue'
    },
    {
      id: '3',
      title: 'Next Gen Smartphone Reveal',
      thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800',
      duration: '1:30',
      views: '890K views',
      author: 'Tech Giant'
    },
    {
      id: '4',
      title: 'Luxury Watch Craftsmanship',
      thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
      duration: '3:20',
      views: '120K views',
      author: 'Horology'
    }
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      let p = 0;
      const interval = setInterval(() => {
        p += 10;
        setUploadProgress(p);
        if (p >= 100) {
          clearInterval(interval);
          const url = URL.createObjectURL(file);
          const newVideo = {
            id: Date.now().toString(),
            title: file.name,
            thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800',
            duration: 'Local',
            views: '0 views',
            author: user?.username || 'You',
            url: url
          };
          setVideos([newVideo, ...videos]);
          setIsUploading(false);
          setUploadProgress(0);
        }
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white pb-20 md:pb-0">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-[#0f0f0f]/95 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 p-1.5 rounded-lg shadow-[0_0_15px_rgba(220,38,38,0.4)]">
              <Play className="w-5 h-5 fill-white text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">MovieTube</h1>
          </div>
          
          <div className="hidden lg:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5 w-96 group focus-within:border-red-500/50 transition-all">
            <Search className="w-4 h-4 text-gray-400 group-focus-within:text-red-500" />
            <input 
              type="text" 
              placeholder="Search trailers..." 
              className="bg-transparent border-none outline-none w-full px-3 text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="hidden sm:flex cursor-pointer bg-white text-black font-bold px-4 py-1.5 rounded-full text-sm hover:bg-gray-200 transition-colors items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload
            <input type="file" accept="video/*" className="hidden" onChange={handleFileUpload} />
          </label>
          
          <div className="flex items-center gap-3 border-l border-white/10 pl-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium">{user?.username}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
            <button 
              onClick={logout}
              className="p-2 bg-white/5 hover:bg-red-600/20 hover:text-red-500 rounded-full transition-all"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* Banner Section */}
        <section className="mb-8 md:mb-12 relative rounded-2xl md:rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/7] group cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=1200" 
            className="absolute inset-0 w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-700" 
            alt="Featured" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full md:w-2/3">
            <div className="flex items-center gap-2 text-red-500 mb-2 md:mb-4 font-bold tracking-wider uppercase text-[10px] md:text-xs">
              <Sparkles className="w-4 h-4" />
              Now Trending with AI Detection
            </div>
            <h2 className="text-2xl md:text-5xl lg:text-6xl font-black mb-2 md:mb-4 leading-tight">SHOP THE LOOK IN REAL-TIME</h2>
            <p className="text-gray-300 text-sm md:text-lg mb-4 md:mb-8 max-w-xl line-clamp-2 md:line-clamp-none">
              Watch your favorite movie trailers and discover the products they use. Powered by Gemini AI for real-time object detection.
            </p>
            <div className="flex gap-3 md:gap-4">
              <button 
                onClick={() => setSelectedVideo('https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')}
                className="bg-red-600 text-white font-bold px-6 md:px-8 py-2 md:py-3 rounded-full flex items-center gap-2 hover:bg-red-700 transition-all shadow-xl text-sm md:text-base"
              >
                <Play className="w-4 h-4 md:w-5 md:h-5 fill-white" /> Watch Now
              </button>
              <button className="hidden sm:block bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold px-8 py-3 rounded-full hover:bg-white/20 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Upload Status */}
        {isUploading && (
          <div className="mb-8 p-6 bg-[#1a1a1a] rounded-2xl border border-red-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-red-600 p-2 rounded-lg">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold">Uploading Video...</h3>
                  <p className="text-xs text-gray-400">Processing for MovieTube Studio</p>
                </div>
              </div>
              <span className="text-sm font-bold text-red-500">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-red-600 h-full transition-all duration-300" 
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Video Grid */}
        <section>
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h3 className="text-xl md:text-2xl font-bold flex items-center gap-3">
              <Film className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
              Recommended for You
            </h3>
            <div className="flex gap-2">
              <button className="bg-white text-black px-4 py-1 rounded-full text-xs md:text-sm font-bold transition-colors">Popular</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {videos.map((video) => (
              <div 
                key={video.id} 
                className="group cursor-pointer"
                onClick={() => setSelectedVideo(video.url || 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')}
              >
                <div className="relative aspect-video rounded-xl md:rounded-2xl overflow-hidden mb-2 md:mb-3 shadow-lg">
                  <img 
                    src={video.thumbnail} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    alt={video.title} 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-red-600 p-3 md:p-4 rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <Play className="w-5 h-5 md:w-6 md:h-6 fill-white text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-bold">
                    {video.duration}
                  </div>
                  <div className="absolute top-2 left-2 flex gap-1">
                     <span className="bg-red-600/90 text-[9px] font-bold px-2 py-0.5 rounded text-white flex items-center gap-1 backdrop-blur-sm shadow-lg">
                       <Sparkles className="w-2.5 h-2.5" /> AI SHOP
                     </span>
                  </div>
                </div>
                <div className="px-1">
                  <h4 className="font-bold text-sm md:text-base line-clamp-2 group-hover:text-red-500 transition-colors leading-snug">{video.title}</h4>
                  <div className="flex items-center gap-2 mt-1 text-gray-400 text-xs md:text-sm">
                    <span>{video.author}</span>
                    <span className="w-0.5 h-0.5 bg-gray-600 rounded-full" />
                    <span>{video.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0f0f0f]/95 backdrop-blur-lg border-t border-white/10 px-6 py-3 flex items-center justify-between md:hidden z-40">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-red-500' : 'text-gray-400'}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-bold">Home</span>
        </button>
        <button 
          onClick={() => setActiveTab('trending')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'trending' ? 'text-red-500' : 'text-gray-400'}`}
        >
          <TrendingUp className="w-6 h-6" />
          <span className="text-[10px] font-bold">Trending</span>
        </button>
        <label className="flex flex-col items-center gap-1 text-gray-400">
          <div className="bg-white text-black p-2 rounded-xl -mt-6 shadow-xl border-4 border-[#0f0f0f]">
            <Upload className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold mt-0.5">Upload</span>
          <input type="file" accept="video/*" className="hidden" onChange={handleFileUpload} />
        </label>
        <button 
          onClick={() => setActiveTab('search')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'search' ? 'text-red-500' : 'text-gray-400'}`}
        >
          <Search className="w-6 h-6" />
          <span className="text-[10px] font-bold">Search</span>
        </button>
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'profile' ? 'text-red-500' : 'text-gray-400'}`}
        >
          <UserIcon className="w-6 h-6" />
          <span className="text-[10px] font-bold">Profile</span>
        </button>
      </div>

      {/* Video Studio Overlay */}
      {selectedVideo && (
        <VideoStudio 
          videoUrl={selectedVideo} 
          onClose={() => setSelectedVideo(null)} 
        />
      )}
    </div>
  );
};

export default Dashboard;
