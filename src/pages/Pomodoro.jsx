import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Settings, Clock, Volume2, VolumeX } from 'lucide-react';

export default function Pomodoro() {
  // Timer states
  const [mode, setMode] = useState('work'); // 'work', 'shortBreak', 'longBreak'
  const [timeLeft, setTimeLeft] = useState(25 * 60); // in seconds
  const [isActive, setIsActive] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [muted, setMuted] = useState(false);
  
  // Timer settings
  const [settings, setSettings] = useState({
    workTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
    longBreakInterval: 4,
  });
  
  // Audio for timer completion
  const audioRef = useRef(null);
  
  // Initialize timer based on mode
  useEffect(() => {
    switch(mode) {
      case 'work':
        setTimeLeft(settings.workTime * 60);
        break;
      case 'shortBreak':
        setTimeLeft(settings.shortBreakTime * 60);
        break;
      case 'longBreak':
        setTimeLeft(settings.longBreakTime * 60);
        break;
      default:
        setTimeLeft(settings.workTime * 60);
    }
    // Stop timer when mode changes
    setIsActive(false);
  }, [mode, settings]);
  
  // Timer logic
  useEffect(() => {
    let interval = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Play sound when timer ends
      if (!muted && audioRef.current) {
        audioRef.current.play();
      }
      
      // Move to next mode
      if (mode === 'work') {
        const newCycles = cycles + 1;
        setCycles(newCycles);
        
        if (newCycles % settings.longBreakInterval === 0) {
          setMode('longBreak');
        } else {
          setMode('shortBreak');
        }
      } else {
        setMode('work');
      }
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, cycles, settings, muted]);
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Progress calculation as percentage
  const calculateProgress = () => {
    let totalTime;
    switch(mode) {
      case 'work':
        totalTime = settings.workTime * 60;
        break;
      case 'shortBreak':
        totalTime = settings.shortBreakTime * 60;
        break;
      case 'longBreak':
        totalTime = settings.longBreakTime * 60;
        break;
      default:
        totalTime = settings.workTime * 60;
    }
    
    return ((totalTime - timeLeft) / totalTime) * 100;
  };
  
  // Handle tab switching
  const changeMode = (newMode) => {
    setMode(newMode);
  };
  
  // Handle setting changes
  const handleSettingChange = (setting, value) => {
    setSettings({
      ...settings,
      [setting]: parseInt(value)
    });
  };
  
  // Reset the current timer
  const resetTimer = () => {
    setIsActive(false);
    
    switch(mode) {
      case 'work':
        setTimeLeft(settings.workTime * 60);
        break;
      case 'shortBreak':
        setTimeLeft(settings.shortBreakTime * 60);
        break;
      case 'longBreak':
        setTimeLeft(settings.longBreakTime * 60);
        break;
      default:
        setTimeLeft(settings.workTime * 60);
    }
  };
  
  // Get background color based on current mode
  const getModeBgColor = () => {
    switch(mode) {
      case 'work':
        return 'bg-red-100';
      case 'shortBreak':
        return 'bg-green-100';
      case 'longBreak':
        return 'bg-blue-100';
      default:
        return 'bg-gray-100';
    }
  };
  
  // Get timer border color based on current mode
  const getTimerColor = () => {
    switch(mode) {
      case 'work':
        return 'from-red-500 to-red-600';
      case 'shortBreak':
        return 'from-green-500 to-green-600';
      case 'longBreak':
        return 'from-blue-500 to-blue-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };
  
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 flex items-center justify-center">
        <Clock className="mr-2" />
        Pomodoro Timer
      </h1>
      
      {/* Mode Tabs */}
      <div className="flex rounded-lg overflow-hidden border mb-6">
        <button 
          className={`flex-1 py-2 text-center ${mode === 'work' ? 'bg-red-500 text-white' : 'bg-white'}`}
          onClick={() => changeMode('work')}
        >
          Focus
        </button>
        <button 
          className={`flex-1 py-2 text-center ${mode === 'shortBreak' ? 'bg-green-500 text-white' : 'bg-white'}`}
          onClick={() => changeMode('shortBreak')}
        >
          Short Break
        </button>
        <button 
          className={`flex-1 py-2 text-center ${mode === 'longBreak' ? 'bg-blue-500 text-white' : 'bg-white'}`}
          onClick={() => changeMode('longBreak')}
        >
          Long Break
        </button>
      </div>
      
      {/* Timer Display */}
      <div className={`rounded-full w-64 h-64 mx-auto mb-8 flex items-center justify-center relative ${getModeBgColor()}`}>
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div 
            className={`absolute bottom-0 w-full bg-gradient-to-t ${getTimerColor()}`} 
            style={{ height: `${calculateProgress()}%` }}
          ></div>
        </div>
        <div className="z-10 text-center">
          <div className="text-5xl font-bold">{formatTime(timeLeft)}</div>
          <div className="text-sm mt-2 capitalize">{mode.replace(/([A-Z])/g, ' $1').toLowerCase()}</div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex justify-center space-x-4 mb-6">
        <button 
          onClick={() => setIsActive(!isActive)} 
          className={`p-4 rounded-full ${isActive ? 'bg-red-500' : 'bg-green-500'} text-white`}
        >
          {isActive ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button 
          onClick={resetTimer}
          className="p-4 rounded-full bg-gray-200 text-gray-700"
        >
          <RotateCcw size={24} />
        </button>
        <button 
          onClick={() => setMuted(!muted)}
          className="p-4 rounded-full bg-gray-200 text-gray-700"
        >
          {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="p-4 rounded-full bg-gray-200 text-gray-700"
        >
          <Settings size={24} />
        </button>
      </div>
      
      {/* Progress Info */}
      <div className="text-center mb-6">
        <div className="text-sm text-gray-500">
          Completed: {cycles} {cycles === 1 ? 'cycle' : 'cycles'}
        </div>
      </div>
      
      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Timer Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Focus Time (minutes)</label>
              <input 
                type="number" 
                min="1" 
                max="60"
                value={settings.workTime}
                onChange={(e) => handleSettingChange('workTime', e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Short Break (minutes)</label>
              <input 
                type="number" 
                min="1" 
                max="30"
                value={settings.shortBreakTime}
                onChange={(e) => handleSettingChange('shortBreakTime', e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Long Break (minutes)</label>
              <input 
                type="number" 
                min="1" 
                max="60"
                value={settings.longBreakTime}
                onChange={(e) => handleSettingChange('longBreakTime', e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Long Break After (cycles)</label>
              <input 
                type="number" 
                min="1" 
                max="10"
                value={settings.longBreakInterval}
                onChange={(e) => handleSettingChange('longBreakInterval', e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Timer completion sound */}
      <audio ref={audioRef} preload="auto">
        <source src="/api/placeholder/400/320" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      
      {/* Tips */}
      <div className="bg-gray-50 rounded-lg p-4 mt-4">
        <h3 className="font-medium mb-2">How to use the Pomodoro Technique:</h3>
        <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
          <li>Work for 25 minutes (one "Pomodoro")</li>
          <li>Take a short 5-minute break</li>
          <li>After 4 Pomodoros, take a longer 15-30 minute break</li>
          <li>Repeat to maintain productivity while preventing burnout</li>
        </ol>
      </div>
    </div>
  );
}