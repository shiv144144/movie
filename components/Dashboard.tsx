
import React, { useState } from 'react';
import { Upload, Play, Film, Search, LogOut, Sparkles, Home, User as UserIcon, TrendingUp, Bell, Share2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import VideoStudio from './VideoStudio';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('home');

  const [videos] = useState([
    {
      id: '1',
      title: 'Cinematic Action Sequence - Gear & Gadgets',
      thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800',
      duration: '2:15',
      views: '1.2M views',
      author: 'Ariel Vision'
    },
    {
      id: '2',
      title: 'Summer 2024 Fashion Collection Preview',
      thumbnail: 'https://images.unsplash.com/photo-1445205170230-053b830c6050?auto=format&fit=crop&q=80&w=800',
      duration: '5:42',
      views: '450K views',
      author: 'Luxe Global'
    },
    {
      id: '3',
      title: 'Professional Desktop Setup Showcase',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
      duration: '1:30',
      views: '890K views',
      author: 'TechStream'
    },
    {
      id: '4',
      title: 'Modern Architecture and Interior Elements',
      thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
      duration: '3:20',
      views: '120K views',
      author: 'DesignLab'
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
          setSelectedVideo(url);
          setIsUploading(false);
          setUploadProgress(0);
        }
      }, 300);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'MovieTube AI',
          text: 'Check out this AI-powered shoppable video platform!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white pb-24 md:pb-8">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-[#0f0f0f]/80 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2.5">
            <div className="bg-gradient-to-br from-red-500 to-red-700 p-2 rounded-xl shadow-lg shadow-red-600/20">
              <Play className="w-5 h-5 fill-white text-white" />
            </div>
            <h1 className="text-xl font-black tracking-tighter uppercase">MovieTube</h1>
          </div>
          
          <div className="hidden lg:flex items-center bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-2 w-[400px] group transition-all focus-within:bg-white/[0.05] focus-within:border-red-500/50">
            <Search className="w-4 h-4 text-gray-500 group-focus-within:text-red-500" />
            <input 
              type="text" 
              placeholder="Search trending products..." 
              className="bg-transparent border-none outline-none w-full px-4 text-sm font-medium placeholder:text-gray-600"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-5">
          <button 
            onClick={handleShare}
            className="p-2 text-gray-400 hover:text-white transition-colors flex items-center gap-2 md:bg-white/5 md:px-4 md:rounded-xl"
            title="Share Platform"
          >
            <Share2 className="w-5 h-5" />
            <span className="hidden md:inline text-xs font-bold uppercase tracking-wider">Share</span>
          </button>
          
          <button className="p-2 text-gray-400 hover:text-white transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full border-2 border-[#0f0f0f]"></span>
          </button>
          
          <label className="hidden md:flex cursor-pointer bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-2xl text-sm transition-all transform active:scale-95 items-center gap-2 shadow-lg shadow-red-600/10">
            <Upload className="w-4 h-4" />
            Publish Video
            <input type="file" accept="video/*" className="hidden" onChange={handleFileUpload} />
          </label>
          
          <div className="flex items-center gap-3 md:border-l md:border-white/10 md:pl-5">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold leading-none">{user?.username}</p>
              <p className="text-[10px] text-gray-500 mt-1 uppercase font-black tracking-tighter">Premium Member</p>
            </div>
            <button 
              onClick={logout}
              className="w-10 h-10 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center hover:bg-red-600/10 hover:text-red-500 transition-all"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-4 md:px-8 pt-6">
        {/* Featured Section */}
        <section className="mb-10 relative rounded-[2rem] overflow-hidden aspect-[16/9] md:aspect-[21/8] group">
          <img 
            src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&q=80&w=1200" 
            className="absolute inset-0 w-full h-full object-cover brightness-[0.4] group-hover:scale-105 transition-transform duration-[2s]" 
            alt="Hero" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f]/80 via-transparent to-transparent" />
          
          <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full md:w-3/4">
            <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 text-red-500 px-3 py-1 rounded-full mb-4 font-bold text-[10px] tracking-widest uppercase backdrop-blur-md animate-pulse">
              <Sparkles className="w-3 h-3" /> AI SHOPS LIVE
            </div>
            <h2 className="text-3xl md:text-6xl font-black mb-4 leading-[1.1] tracking-tighter uppercase">Discover <br/>Products <br/>In Motion</h2>
            <p className="text-gray-400 text-sm md:text-lg mb-8 max-w-xl leading-relaxed">
              Experience the first shoppable video engine powered by Gemini Vision. Pause any frame to instantly find every product on screen.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setSelectedVideo('https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')}
                className="bg-white text-black font-black px-8 py-3.5 rounded-2xl flex items-center gap-3 hover:bg-red-600 hover:text-white transition-all transform active:scale-95 shadow-xl"
              >
                <Play className="w-5 h-5 fill-current" /> EXPLORE NOW
              </button>
            </div>
          </div>
        </section>

        {/* Feed Headers */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-8 bg-red-600 rounded-full"></div>
            <h3 className="text-2xl font-black tracking-tighter uppercase">Trending Trailers</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          {videos.map((video) => (
            <div 
              key={video.id} 
              className="group cursor-pointer"
              onClick={() => setSelectedVideo(video.url || 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')}
            >
              <div className="relative aspect-video rounded-3xl overflow-hidden mb-4 shadow-2xl ring-1 ring-white/10">
                <img 
                  src={video.thumbnail} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" 
                  alt={video.title} 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="bg-white text-black p-5 rounded-3xl shadow-2xl transform translate-y-8 group-hover:translate-y-0 transition-all duration-500">
                    <Play className="w-8 h-8 fill-current" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-black tracking-widest border border-white/10">
                  {video.duration}
                </div>
                <div className="absolute top-4 left-4">
                   <span className="bg-red-600 text-[10px] font-black px-3 py-1.5 rounded-xl text-white flex items-center gap-2 shadow-xl ring-1 ring-white/20">
                     <Sparkles className="w-3 h-3" /> VISION ENABLED
                   </span>
                </div>
              </div>
              <div className="px-1">
                <h4 className="font-bold text-lg line-clamp-2 leading-snug group-hover:text-red-500 transition-colors tracking-tight uppercase">{video.title}</h4>
                <div className="flex items-center gap-3 mt-2 text-gray-500 text-xs font-bold uppercase tracking-wider">
                  <span>{video.author}</span>
                  <span className="w-1.5 h-1.5 bg-white/10 rounded-full" />
                  <span>{video.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Mobile Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0f0f0f]/90 backdrop-blur-2xl border-t border-white/5 px-8 py-4 flex items-center justify-between md:hidden z-50 safe-area-bottom">
        <button className="flex flex-col items-center gap-1.5 text-red-500">
          <Home className="w-6 h-6 fill-current" />
          <span className="text-[9px] font-black uppercase tracking-widest">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-gray-500">
          <TrendingUp className="w-6 h-6" />
          <span className="text-[9px] font-black uppercase tracking-widest">Global</span>
        </button>
        <label className="relative -top-6">
          <div className="bg-gradient-to-br from-red-500 to-red-700 text-white p-4 rounded-3xl shadow-[0_10px_30px_rgba(220,38,38,0.5)] border-4 border-[#0f0f0f]">
            <Upload className="w-7 h-7" />
          </div>
          <input type="file" accept="video/*" className="hidden" onChange={handleFileUpload} />
        </label>
        <button className="flex flex-col items-center gap-1.5 text-gray-500">
          <Search className="w-6 h-6" />
          <span className="text-[9px] font-black uppercase tracking-widest">Find</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-gray-500" onClick={handleShare}>
          <Share2 className="w-6 h-6" />
          <span className="text-[9px] font-black uppercase tracking-widest">Share</span>
        </button>
      </div>

      {selectedVideo && <VideoStudio videoUrl={selectedVideo} onClose={() => setSelectedVideo(null)} />}
    </div>
  );
};

export default Dashboard;
