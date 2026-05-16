import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Heart, Smile, Meh, Frown, Edit3, Trash2, Save, Sparkles, Clock } from 'lucide-react';

export const FocusTimer = () => {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      clearInterval(interval);
      // Play a gentle sound?
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="cozy-card bg-white h-full flex flex-col items-center justify-center space-y-6 relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-sage-50 rounded-full opacity-50 blur-2xl"></div>
      
      <div className="flex items-center gap-2 text-sage-400 font-bold uppercase tracking-widest text-[10px]">
        <Clock size={14} /> Focus Session
      </div>

      <div className="relative">
        <svg className="w-48 h-48 transform -rotate-90">
          <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-sage-50" />
          <motion.circle
            cx="96" cy="96" r="88"
            stroke="currentColor" strokeWidth="8" fill="transparent"
            strokeDasharray={552.9}
            strokeDashoffset={552.9 - (552.9 * (time / (25 * 60)))}
            className="text-sage-400 transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-heading font-bold text-sage-900">{formatTime(time)}</span>
        </div>
      </div>

      <div className="flex gap-4">
        <button 
          onClick={() => setIsActive(!isActive)}
          className="w-12 h-12 rounded-2xl bg-sage-900 text-white flex items-center justify-center hover:bg-sage-800 transition-colors shadow-soft"
        >
          {isActive ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
        </button>
        <button 
          onClick={() => { setTime(25 * 60); setIsActive(false); }}
          className="w-12 h-12 rounded-2xl bg-sage-50 text-sage-600 flex items-center justify-center hover:bg-sage-100 transition-colors"
        >
          <RotateCcw size={20} />
        </button>
      </div>
    </div>
  );
};

export const MoodTracker = () => {
  const [mood, setMood] = useState(null);
  const moods = [
    { icon: <Smile size={28} />, label: 'Happy', color: 'text-green-500 bg-green-50' },
    { icon: <Heart size={28} />, label: 'Loved', color: 'text-rose-500 bg-rose-50' },
    { icon: <Meh size={28} />, label: 'Okay', color: 'text-amber-500 bg-amber-50' },
    { icon: <Frown size={28} />, label: 'Low', color: 'text-blue-500 bg-blue-50' },
  ];

  return (
    <div className="cozy-card bg-white h-full space-y-6">
      <h4 className="font-heading font-bold text-sage-900">How are you feeling?</h4>
      <div className="grid grid-cols-2 gap-4">
        {moods.map((m, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMood(m.label)}
            className={`p-4 rounded-3xl flex flex-col items-center justify-center gap-2 border-2 transition-all ${
              mood === m.label ? 'border-sage-400 bg-sage-50' : 'border-transparent bg-white shadow-soft'
            }`}
          >
            <div className={m.color + " p-2 rounded-xl"}>{m.icon}</div>
            <span className="text-xs font-bold text-sage-600">{m.label}</span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {mood && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-center text-xs font-medium text-sage-500 italic"
          >
            "Sending you good vibes! 🌿"
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export const QuickNotes = () => {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('taskora_quick_notes');
    return saved ? JSON.parse(saved) : 'Stay hydrated and take breaks! 💧';
  });
  const [isEditing, setIsEditing] = useState(false);

  const saveNotes = () => {
    localStorage.setItem('taskora_quick_notes', JSON.stringify(notes));
    setIsEditing(false);
  };

  return (
    <div className="cozy-card bg-sage-900 text-white h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-sage-300 font-bold uppercase tracking-widest text-[10px]">
          <Edit3 size={14} /> Quick Notes
        </div>
        <button onClick={() => isEditing ? saveNotes() : setIsEditing(true)} className="text-sage-300 hover:text-white transition-colors">
          {isEditing ? <Save size={18} /> : <Edit3 size={18} />}
        </button>
      </div>
      
      {isEditing ? (
        <textarea
          autoFocus
          className="flex-1 bg-transparent border-none focus:ring-0 text-sage-100 placeholder-sage-500 text-sm font-medium resize-none"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Jot down anything..."
        />
      ) : (
        <p className="flex-1 text-sage-100 text-sm font-medium leading-relaxed font-handwritten text-lg">
          {notes}
        </p>
      )}
      
      {!isEditing && (
        <div className="text-[10px] text-sage-400 font-bold">Updated just now</div>
      )}
    </div>
  );
};
