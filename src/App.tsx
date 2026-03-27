/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Train, 
  Utensils, 
  MapPin, 
  Hotel, 
  Clock, 
  ChevronRight, 
  ShoppingBag, 
  Camera,
  Coffee,
  Waves,
  Star,
  Heart,
  Sparkles,
  Cloud,
  Smile
} from 'lucide-react';

// --- Types ---

interface Activity {
  id: string; // Added ID for tracking images
  time: string;
  title: string;
  location?: string;
  address?: string;
  description?: string;
  type: 'transport' | 'food' | 'hotel' | 'sightseeing' | 'shopping' | 'delivery';
  color: string;
}

interface DayPlan {
  id: number;
  date: string;
  dayName: string;
  title: string;
  themeColor: string;
  bgColor: string;
  activities: Activity[];
  mascotMessage: string;
}

// --- Data ---

const travelData: DayPlan[] = [
  {
    id: 1,
    date: '3/4',
    dayName: 'Day 1',
    title: '抵達汕頭 & 小公園漫步',
    themeColor: '#FF9AA2', // Pastel Pink
    bgColor: '#FFF0F1',
    mascotMessage: "耶！終於到汕頭啦！快去吃牛肉火鍋吧！",
    activities: [
      {
        id: 'd1-1',
        time: '10:30',
        title: '深圳羅湖出發',
        description: '搭乘高鐵 G6476 車次',
        type: 'transport',
        color: '#FF9AA2'
      },
      {
        id: 'd1-2',
        time: '12:09',
        title: '到達汕頭站',
        description: '打車前往美食店',
        type: 'transport',
        color: '#FF9AA2'
      },
      {
        id: 'd1-3',
        time: '14:00',
        title: '偉記牛肉 (金鴻公路店)',
        location: '偉記牛肉',
        address: '汕頭市金鴻公路',
        description: '品嚐正宗潮汕牛肉火鍋',
        type: 'food',
        color: '#FFB7B2'
      },
      {
        id: 'd1-4',
        time: '15:30',
        title: '酒店 Check-in',
        location: '汕頭米格美居酒店',
        address: '萬象城龍眼南路美食街店',
        type: 'hotel',
        color: '#FFDAC1'
      },
      {
        id: 'd1-5',
        time: '16:30',
        title: '汕頭小公園',
        description: '漫步老城區，感受民國風情建築',
        type: 'sightseeing',
        color: '#E2F0CB'
      },
      {
        id: 'd1-6',
        time: '18:00',
        title: '非遺·萬隆即煮砂鍋粥',
        description: '建議預先網上取票，品嚐鮮甜砂鍋粥',
        type: 'food',
        color: '#FFB7B2'
      },
      {
        id: 'd1-7',
        time: '20:00',
        title: '回酒店休息',
        type: 'hotel',
        color: '#FFDAC1'
      }
    ]
  },
  {
    id: 2,
    date: '4/4',
    dayName: 'Day 2',
    title: '南澳島海島風情',
    themeColor: '#B5EAD7', // Mint Green
    bgColor: '#F1FAF6',
    mascotMessage: "南澳島的海超美的！記得擦防曬喔！",
    activities: [
      {
        id: 'd2-1',
        time: '07:00',
        title: '伊早豆漿 (金園店)',
        description: '外賣早餐，開啟元氣一天',
        type: 'delivery',
        color: '#B5EAD7'
      },
      {
        id: 'd2-2',
        time: '09:00',
        title: '出發前往南澳島',
        description: '跨海大橋，欣賞絕美海景',
        type: 'transport',
        color: '#C7CEEA'
      },
      {
        id: 'd2-3',
        time: '12:00',
        title: '胖哥有炸·海鮮小炒',
        description: '海島特色午餐',
        type: 'food',
        color: '#B5EAD7'
      },
      {
        id: 'd2-4',
        time: '16:00',
        title: '離開南澳島',
        type: 'transport',
        color: '#C7CEEA'
      },
      {
        id: 'd2-5',
        time: '18:30',
        title: '潮鹵道非遺鹵水火鍋',
        location: '總店',
        description: '特色鹵水火鍋晚餐',
        type: 'food',
        color: '#B5EAD7'
      },
      {
        id: 'd2-6',
        time: '20:30',
        title: '回酒店休息',
        type: 'hotel',
        color: '#E2F0CB'
      }
    ]
  },
  {
    id: 3,
    date: '5/4',
    dayName: 'Day 3',
    title: '潮州古城文化之旅',
    themeColor: '#FFDAC1', // Peach
    bgColor: '#FFF8F1',
    mascotMessage: "潮州古城很有文化氣息，我們去牌坊街逛逛！",
    activities: [
      {
        id: 'd3-1',
        time: '08:00',
        title: '小吳腸粉',
        description: '外賣早餐，汕頭必吃腸粉',
        type: 'delivery',
        color: '#FFDAC1'
      },
      {
        id: 'd3-2',
        time: '10:30',
        title: '前往潮州古城',
        description: '打車前往，約1小時車程',
        type: 'transport',
        color: '#FFB7B2'
      },
      {
        id: 'd3-3',
        time: '12:00',
        title: '潮鎮老尾牛雜',
        location: '環城西路店',
        description: '古城超人氣牛雜店',
        type: 'food',
        color: '#FFDAC1'
      },
      {
        id: 'd3-4',
        time: '14:00',
        title: '潮州古城行街',
        description: '廣濟橋、牌坊街、開元寺',
        type: 'sightseeing',
        color: '#E2F0CB'
      },
      {
        id: 'd3-5',
        time: '17:30',
        title: '劉卜鹵鵝 (全國首店)',
        description: '地道潮汕鹵鵝晚餐',
        type: 'food',
        color: '#FFDAC1'
      },
      {
        id: 'd3-6',
        time: '21:00',
        title: '打車回汕頭',
        type: 'transport',
        color: '#FFB7B2'
      }
    ]
  },
  {
    id: 4,
    date: '6/4',
    dayName: 'Day 4',
    title: '汕頭美食探索 & 購物',
    themeColor: '#C7CEEA', // Lavender
    bgColor: '#F5F6FA',
    mascotMessage: "今天要去買肉丸手信！沈振興丸店很有名喔！",
    activities: [
      {
        id: 'd4-1',
        time: '08:00',
        title: '海記豬血湯 (龍眼園店)',
        description: '汕頭特色早餐',
        type: 'food',
        color: '#C7CEEA'
      },
      {
        id: 'd4-2',
        time: '10:37',
        title: '送別親友 (D7106)',
        description: '7叔7嬸搭車回深圳 (10:37-13:21)',
        type: 'transport',
        color: '#B5EAD7'
      },
      {
        id: 'd4-3',
        time: '11:30',
        title: '龍眼南路 / 萬象城 / 潤街',
        description: '自由行街，探索汕頭現代化一面',
        type: 'sightseeing',
        color: '#C7CEEA'
      },
      {
        id: 'd4-4',
        time: '15:00',
        title: '沈振興丸店',
        description: '購買地道潮汕肉丸手信',
        type: 'shopping',
        color: '#B5EAD7'
      },
      {
        id: 'd4-5',
        time: '18:00',
        title: '添旺牛店·潮汕鮮烤牛肉',
        location: '高鐵站店',
        description: '鮮烤牛肉晚餐',
        type: 'food',
        color: '#C7CEEA'
      }
    ]
  },
  {
    id: 5,
    date: '7/4',
    dayName: 'Day 5',
    title: '最後早餐 & 賦歸',
    themeColor: '#E2F0CB', // Pale Lime
    bgColor: '#F9FFF0',
    mascotMessage: "最後一天啦，吃個粿汁再走吧！",
    activities: [
      {
        id: 'd5-1',
        time: '08:30',
        title: '良心腸粉·粿汁',
        location: '萬象城店',
        description: '最後一頓潮汕特色早餐',
        type: 'food',
        color: '#E2F0CB'
      },
      {
        id: 'd5-2',
        time: '10:00',
        title: '辦理退房',
        description: '打車前往汕頭站',
        type: 'hotel',
        color: '#FFDAC1'
      },
      {
        id: 'd5-3',
        time: '11:03',
        title: '搭乘高鐵 D7414',
        description: '汕頭站 -> 深圳北 (11:03-13:39)',
        type: 'transport',
        color: '#E2F0CB'
      },
      {
        id: 'd5-4',
        time: '13:39',
        title: '抵達深圳北',
        description: '行程圓滿結束',
        type: 'transport',
        color: '#FFB7B2'
      }
    ]
  }
];

// --- Components ---

const ActivityIcon = ({ type }: { type: Activity['type'] }) => {
  switch (type) {
    case 'transport': return <Train size={24} />;
    case 'food': return <Utensils size={24} />;
    case 'hotel': return <Hotel size={24} />;
    case 'sightseeing': return <Camera size={24} />;
    case 'shopping': return <ShoppingBag size={24} />;
    case 'delivery': return <Coffee size={24} />;
    default: return <MapPin size={24} />;
  }
};

const FloatingSticker = ({ color, delay, x, y, children, isImage, src }: { color?: string, delay: number, x: string, y: string, children?: React.ReactNode, isImage?: boolean, src?: string }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: isImage ? 0.8 : 0.6, 
        scale: 1,
        y: [0, -20, 0],
        rotate: [0, 15, -15, 0]
      }}
      transition={{ 
        opacity: { duration: 1, delay },
        scale: { duration: 1, delay },
        y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" }
      }}
      className="fixed pointer-events-none z-0"
      style={{ left: x, top: y, color }}
    >
      {isImage && !hasError ? (
        <img 
          src={src} 
          alt="sticker" 
          className="w-24 h-24 object-contain drop-shadow-lg" 
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
        />
      ) : (
        children || <Smile size={48} />
      )}
    </motion.div>
  );
};

const Mascot = ({ message, color, status }: { message: string, color: string, status: 'idle' | 'happy' | 'thinking' }) => {
  const [hasError, setHasError] = useState(false);

  const variants = {
    idle: {
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0],
      scale: 1,
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    },
    happy: {
      y: [0, -30, 0, -20, 0],
      rotate: [0, 10, -10, 10, 0],
      scale: [1, 1.2, 1.1, 1.2, 1],
      transition: { duration: 0.6, ease: "easeOut" }
    },
    thinking: {
      x: [0, -5, 5, -5, 5, 0],
      rotate: [0, -5, 5, -5, 5, 0],
      scale: 0.95,
      transition: { duration: 0.5, repeat: Infinity }
    }
  };

  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      key={message}
      className="fixed bottom-36 right-4 z-40 flex flex-col items-end"
    >
      <AnimatePresence mode="wait">
        {status !== 'thinking' && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 10 }}
            className="bg-white p-4 rounded-3xl shadow-xl border-4 border-pink-100 mb-4 max-w-[200px] relative"
          >
            <div className="text-xs font-black text-slate-700 font-hand leading-relaxed">
              {status === 'happy' ? "太棒了！我們出發吧！✨" : message}
            </div>
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r-4 border-b-4 border-pink-100 rotate-45" />
          </motion.div>
        )}
        {status === 'thinking' && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border-2 border-pink-200 mb-4 flex gap-1"
          >
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 bg-pink-400 rounded-full" />
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-pink-400 rounded-full" />
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-pink-400 rounded-full" />
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div 
        variants={variants}
        animate={status}
        className="relative"
      >
        {/* Crayon Shin-chan Mascot */}
        <div className="w-24 h-24 relative flex items-center justify-center">
          {!hasError ? (
            <img 
              src="https://upload.wikimedia.org/wikipedia/zh/thumb/e/e0/Crayon_Shin-chan.png/220px-Crayon_Shin-chan.png" 
              alt="Shin-chan" 
              className="w-full h-full object-contain drop-shadow-xl"
              referrerPolicy="no-referrer"
              onError={() => setHasError(true)}
            />
          ) : (
            <div className="w-20 h-20 bg-pink-400 rounded-full border-4 border-white shadow-lg flex items-center justify-center relative overflow-hidden">
              <Smile size={40} className="text-white" />
            </div>
          )}
          <div className="absolute -top-2 -left-2">
            <Sparkles size={24} className={`text-yellow-400 ${status === 'happy' ? 'animate-bounce' : 'animate-pulse'}`} />
          </div>
          {status === 'happy' && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
              className="absolute inset-0 pointer-events-none"
            >
              <Heart size={48} className="text-pink-400 absolute top-0 left-0" />
              <Star size={32} className="text-yellow-400 absolute bottom-0 right-0" />
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [activeDay, setActiveDay] = useState(0);
  const [mascotStatus, setMascotStatus] = useState<'idle' | 'happy' | 'thinking'>('idle');
  const [activityImages, setActivityImages] = useState<Record<string, string>>({});

  const currentDay = travelData[activeDay];

  const handleImageUpload = (activityId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setActivityImages(prev => ({
          ...prev,
          [activityId]: reader.result as string
        }));
        setMascotStatus('happy');
        setTimeout(() => setMascotStatus('idle'), 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDayChange = (index: number) => {
    if (index === activeDay) return;
    
    setMascotStatus('thinking');
    
    // Simulate a brief loading/thinking period
    setTimeout(() => {
      setActiveDay(index);
      setMascotStatus('happy');
      
      // Return to idle after the happy animation
      setTimeout(() => {
        setMascotStatus('idle');
      }, 1500);
    }, 600);
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 bg-[#FFF9F9] pb-36 overflow-x-hidden selection:bg-pink-200">
      {/* Background Decorations */}
      <FloatingSticker color="#FFB7B2" delay={0.2} x="10%" y="15%">
        <Star size={40} fill="currentColor" />
      </FloatingSticker>
      <FloatingSticker color="#B5EAD7" delay={0.5} x="85%" y="20%">
        <Heart size={48} fill="currentColor" />
      </FloatingSticker>
      
      {/* Shin-chan Stickers */}
      <FloatingSticker delay={0.7} x="5%" y="40%" isImage src="https://img.icons8.com/color/512/shin-chan.png" />
      <FloatingSticker delay={1.2} x="75%" y="55%" isImage src="https://img.icons8.com/color/512/shin-chan.png" />
      <FloatingSticker delay={1.5} x="20%" y="80%" isImage src="https://img.icons8.com/color/512/shin-chan.png" />

      <FloatingSticker color="#C7CEEA" delay={0.8} x="5%" y="65%">
        <Cloud size={64} fill="currentColor" />
      </FloatingSticker>
      <FloatingSticker color="#FFDAC1" delay={1.1} x="80%" y="75%">
        <Sparkles size={40} />
      </FloatingSticker>
      <FloatingSticker color="#E2F0CB" delay={1.4} x="40%" y="5%">
        <Smile size={32} />
      </FloatingSticker>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-2xl border-b-4 border-pink-100 px-6 py-6">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 bg-pink-200 rounded-[22px] flex items-center justify-center text-pink-600 shadow-lg border-2 border-white"
            >
              <Camera size={24} />
            </motion.div>
            <h1 className="text-2xl font-black tracking-tighter text-slate-900 font-sans uppercase">
              潮汕<span className="text-pink-500">遊記</span> 
              <span className="text-[10px] bg-yellow-400 text-slate-900 px-2 py-1 rounded-lg ml-2 align-middle shadow-sm">2026</span>
            </h1>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="flex items-center gap-2 text-[11px] font-black text-pink-600 bg-white px-4 py-2 rounded-2xl border-2 border-pink-100 shadow-md"
          >
            <MapPin size={12} />
            SHANTOU
          </motion.div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 pt-12 relative z-10">
        {/* Day Summary Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDay.id}
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.8 }}
            transition={{ type: 'spring', damping: 12, stiffness: 100 }}
            className="rounded-[48px] p-10 mb-12 shadow-2xl shadow-pink-200/40 border-8 border-white overflow-hidden relative"
            style={{ backgroundColor: currentDay.bgColor }}
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, 0]
              }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute -top-12 -right-12 w-48 h-48 opacity-10 pointer-events-none"
              style={{ color: currentDay.themeColor }}
            >
              <Sparkles size={192} />
            </motion.div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <motion.span 
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="px-6 py-2 rounded-3xl text-sm font-black uppercase tracking-widest text-white shadow-xl"
                  style={{ backgroundColor: currentDay.themeColor }}
                >
                  {currentDay.dayName}
                </motion.span>
                <span className="text-slate-500 font-black text-sm bg-white/80 px-4 py-1.5 rounded-2xl border-2 border-white shadow-sm font-hand">
                  {currentDay.date}
                </span>
              </div>
              <h2 className="text-4xl font-black mb-4 text-slate-900 leading-[1.1] tracking-tight">{currentDay.title}</h2>
              <div className="flex items-center gap-3 text-slate-600 text-sm font-black bg-white/40 w-fit px-4 py-2 rounded-2xl">
                <Clock size={16} className="text-pink-400" />
                {currentDay.activities.length} STOPS TODAY!
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Timeline */}
        <div className="space-y-10 relative">
          {/* Vertical Line */}
          <div className="absolute left-[27px] top-6 bottom-6 w-2 bg-pink-100/50 rounded-full" />

          <AnimatePresence mode="popLayout">
            {currentDay.activities.map((activity, index) => (
              <motion.div
                key={`${currentDay.id}-${index}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, type: 'spring', bounce: 0.4 }}
                className="flex gap-8 group"
              >
                {/* Time & Dot */}
                <div className="flex flex-col items-center flex-shrink-0 pt-2">
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: -10 }}
                    className="w-14 h-14 rounded-[24px] flex items-center justify-center text-white shadow-2xl z-10 border-4 border-white"
                    style={{ backgroundColor: activity.color }}
                  >
                    <ActivityIcon type={activity.type} />
                  </motion.div>
                  <span className="mt-4 text-[11px] font-black text-slate-500 font-mono bg-white border-2 border-slate-100 px-3 py-1 rounded-xl shadow-sm">
                    {activity.time}
                  </span>
                </div>

                {/* Content Card */}
                <motion.div 
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex-grow bg-white rounded-[40px] p-8 shadow-lg border-4 border-slate-50 transition-all hover:shadow-2xl hover:shadow-pink-100/50 hover:border-pink-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-black text-xl text-slate-900 tracking-tight leading-tight">{activity.title}</h3>
                    <motion.div 
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-8 h-8 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400"
                    >
                      <ChevronRight size={18} />
                    </motion.div>
                  </div>
                  
                  {activity.location && (
                    <div className="flex items-center gap-2 text-xs text-pink-500 font-black mb-4 bg-pink-50 w-fit px-4 py-1.5 rounded-2xl border border-pink-100">
                      <MapPin size={14} />
                      {activity.location}
                    </div>
                  )}

                  {activity.description && (
                    <p className="text-sm text-slate-600 leading-relaxed font-bold font-hand text-lg">
                      {activity.description}
                    </p>
                  )}

                  {activity.address && (
                    <div className="mt-6 pt-6 border-t-4 border-dotted border-slate-100 flex items-start gap-3 text-[11px] text-slate-400 font-black">
                      <div className="w-5 h-5 bg-slate-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin size={12} />
                      </div>
                      <span className="leading-snug">{activity.address}</span>
                    </div>
                  )}

                  {/* Image Display & Upload */}
                  <div className="mt-6 space-y-4">
                    {activityImages[activity.id] && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative rounded-[32px] overflow-hidden border-4 border-pink-50 shadow-md aspect-video"
                      >
                        <img 
                          src={activityImages[activity.id]} 
                          alt="Activity" 
                          className="w-full h-full object-cover"
                        />
                        <button 
                          onClick={() => setActivityImages(prev => {
                            const next = { ...prev };
                            delete next[activity.id];
                            return next;
                          })}
                          className="absolute top-2 right-2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-pink-500 shadow-sm hover:bg-pink-500 hover:text-white transition-colors"
                        >
                          ×
                        </button>
                      </motion.div>
                    )}
                    
                    <label className="flex items-center gap-3 cursor-pointer group/upload">
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handleImageUpload(activity.id, e)}
                      />
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover/upload:bg-pink-50 group-hover/upload:text-pink-500 transition-all border-2 border-dashed border-slate-200 group-hover/upload:border-pink-200">
                        <Camera size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-slate-500 group-hover/upload:text-pink-600">上傳景點照片</span>
                        <span className="text-[10px] text-slate-400">讓小新幫你記錄美景吧！</span>
                      </div>
                    </label>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Mascot */}
      <Mascot message={currentDay.mascotMessage} color={currentDay.themeColor} status={mascotStatus} />

      {/* Tab Bar */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-md bg-white/90 backdrop-blur-3xl border-8 border-white rounded-[56px] shadow-2xl p-3 z-50">
        <div className="flex justify-between items-center gap-2">
          {travelData.map((day, index) => (
            <button
              key={day.id}
              onClick={() => handleDayChange(index)}
              className={`relative flex flex-col items-center justify-center flex-1 py-5 rounded-[40px] transition-all duration-500 ${
                activeDay === index ? 'text-slate-900' : 'text-slate-400 hover:text-pink-400'
              }`}
            >
              {activeDay === index && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-[36px] z-0 shadow-inner border-4 border-white"
                  style={{ backgroundColor: day.bgColor }}
                  transition={{ type: 'spring', bounce: 0.4, duration: 0.8 }}
                />
              )}
              <span className={`relative z-10 text-sm font-black ${activeDay === index ? 'scale-125' : 'opacity-70 scale-90'} transition-transform`}>
                {day.date}
              </span>
              <span className={`relative z-10 text-[9px] font-black uppercase tracking-[0.2em] mt-1.5 ${activeDay === index ? 'opacity-100' : 'opacity-30'}`}>
                {day.dayName}
              </span>
              {activeDay === index && (
                <motion.div 
                  layoutId="activeDot"
                  className="absolute -bottom-1 w-2 h-2 rounded-full shadow-sm"
                  style={{ backgroundColor: day.themeColor }}
                />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Extra Cartoon Shapes */}
      <div className="fixed top-1/4 -left-10 w-40 h-40 bg-pink-100 rounded-full blur-[100px] opacity-20 -z-10" />
      <div className="fixed bottom-1/4 -right-10 w-60 h-60 bg-yellow-100 rounded-full blur-[120px] opacity-20 -z-10" />
    </div>
  );
}
