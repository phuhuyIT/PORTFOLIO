import * as Tone from 'tone';
import { Howl } from 'howler';

// --- Types ---
export type SectionTheme = 'hero' | 'about' | 'projects' | 'experiments' | 'achievements' | 'contact';

interface ThemeConfig {
  droneNote: string;
  filterFreq: number;
  reverbDecay: number;
}

const sectionThemes: Record<SectionTheme, ThemeConfig> = {
  hero:         { droneNote: 'A2',  filterFreq: 800,  reverbDecay: 12 },
  about:        { droneNote: 'E2',  filterFreq: 1200, reverbDecay: 8  },
  projects:     { droneNote: 'D2',  filterFreq: 1600, reverbDecay: 6  },
  experiments:  { droneNote: 'G2',  filterFreq: 600,  reverbDecay: 14 },
  achievements: { droneNote: 'C3',  filterFreq: 2000, reverbDecay: 5  },
  contact:      { droneNote: 'A2',  filterFreq: 800,  reverbDecay: 12 },
};

// --- State ---
let audioEnabled = false;
let ambientStarted = false;
let isMobile = false;
let isInitialized = false;

// --- Tone.js Nodes ---
let reverb: Tone.Reverb;
let shimmerFilter: Tone.Filter;
let drone: Tone.Synth;
let shimmer: Tone.PolySynth;
let sub: Tone.Synth;
let mainGain: Tone.Gain;
let synthSfx: Tone.PolySynth; // Fallback for missing SFX files

// --- Howler SFX ---
export const sfx = new Howl({
  src: ['/audio/sfx-sprite.webm', '/audio/sfx-sprite.mp3'],
  sprite: {
    boot_beep:          [0, 80],
    access_granted:     [200, 600],
    ui_click:           [900, 120],
    ui_hover:           [1100, 60],
    card_open:          [1250, 400],
    card_close:         [1750, 250],
    nav_select:         [2100, 150],
    chip_tap:           [2350, 80],
    form_submit:        [2500, 800],
    section_transition: [3400, 350],
  },
  volume: 0.6,
  preload: false,
  pool: 5,
  html5: false,
});

interface BatteryManager extends EventTarget {
  level: number;
}

interface NavigatorWithBattery extends Navigator {
  getBattery: () => Promise<BatteryManager>;
}

// --- Initialization ---
export const initAudio = async () => {
  if (typeof window === 'undefined') return;
  
  if (isInitialized) {
    if (Tone.getContext().state !== 'running') {
      try {
        await Tone.start();
      } catch (e) {
        console.warn("Failed to resume Tone.js:", e);
      }
    }
    return;
  }

  isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  try {
    await Tone.start();
  } catch (e) {
    console.error("Tone.js initialization failed:", e);
    return;
  }
  
  if (!reverb) {
    try {
      reverb = new Tone.Reverb({ decay: 12, wet: 0.5 }).toDestination();
      await reverb.generate();

      shimmerFilter = new Tone.Filter(800, 'lowpass').connect(reverb);
      
      mainGain = new Tone.Gain(0).toDestination();

      drone = new Tone.Synth({
        oscillator: { type: 'sine' },
        envelope: { attack: 4, decay: 0, sustain: 1, release: 8 },
        volume: -28
      }).connect(mainGain);

      shimmer = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'triangle' },
        envelope: { attack: 2, decay: 3, sustain: 0.2, release: 6 },
        maxPolyphony: isMobile ? 2 : 4,
        volume: -35
      }).connect(shimmerFilter);
      shimmer.connect(mainGain);

      sub = new Tone.Synth({
        oscillator: { type: 'sine' },
        envelope: { attack: 0.1, decay: 0.2, sustain: 0, release: 1 },
        volume: -40
      }).connect(mainGain);

      // Fallback synth for SFX
      synthSfx = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'square' },
        envelope: { attack: 0.005, decay: 0.1, sustain: 0, release: 0.1 },
        maxPolyphony: 4,
        volume: -20
      }).toDestination();
      
      sfx.load();
      isInitialized = true;
      console.log("Audio system initialized (State:", Tone.getContext().state, ")");

      // Performance: Suspend context when tab is hidden to save CPU
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          Tone.getContext().suspend();
        } else if (audioEnabled) {
          Tone.getContext().resume();
        }
      });
    } catch (e) {
      console.error("Error creating audio nodes:", e);
    }
  }

  if ('getBattery' in navigator) {
    (navigator as unknown as NavigatorWithBattery).getBattery().then((battery) => {
      if (battery.level < 0.2) {
        toggleAudio(false);
      }
    });
  }
};

// --- Ambient Control ---
const scale = ['A2', 'C3', 'D3', 'E3', 'G3', 'A3', 'C4', 'D4'];

export const startAmbient = () => {
  if (ambientStarted || !isInitialized) return;
  
  try {
    new Tone.Loop((time) => {
      if (Math.random() > 0.4) return;
      const note = scale[3 + Math.floor(Math.random() * 4)];
      shimmer.triggerAttackRelease([note], '4n', time);
    }, '2m').start(0);

    new Tone.Loop((time) => {
      sub.triggerAttackRelease('A1', '8n', time);
    }, '1m').start(0);

    drone.triggerAttack('A2');
    
    Tone.getTransport().start();
    mainGain.gain.rampTo(1, 3);
    ambientStarted = true;
  } catch (e) {
    console.error("Error starting ambient music:", e);
  }
};

export const fadeOutAmbient = () => {
  if (!mainGain) return;
  mainGain.gain.rampTo(0, 1);
  setTimeout(() => {
    Tone.getTransport().stop();
    if (drone) drone.triggerRelease();
    ambientStarted = false;
  }, 1000);
};

export const setTheme = (section: SectionTheme) => {
  if (!drone || !shimmerFilter || !reverb) return;
  
  const theme = sectionThemes[section];
  drone.frequency.rampTo(Tone.Frequency(theme.droneNote).toFrequency(), 4);
  shimmerFilter.frequency.rampTo(theme.filterFreq, 4);
  reverb.decay = theme.reverbDecay;
};

// --- SFX Playback ---
export const playSound = (id: string, pitchRange = 0.1) => {
  if (!audioEnabled) return;
  if (id === 'ui_hover' && isMobile) return;
  
  // Try Howler first
  try {
    if (sfx.state() === 'loaded') {
      const soundId = sfx.play(id);
      if (typeof soundId === 'number') {
        sfx.rate(1.0 + (Math.random() - 0.5) * pitchRange, soundId);
        return;
      }
    }
  } catch (e) {
    // Silent fail to fallback
  }

  // Fallback to Synth if files are missing or failed to load
  if (synthSfx) {
    const pitchMap: Record<string, string> = {
      boot_beep: 'A5',
      access_granted: 'C6',
      ui_click: 'E5',
      ui_hover: 'A4',
      card_open: 'D5',
      card_close: 'A3',
      nav_select: 'G5',
      chip_tap: 'C5',
      form_submit: 'A5',
      section_transition: 'E4',
    };
    const note = pitchMap[id] || 'C5';
    synthSfx.triggerAttackRelease(note, '32n');
  }
};

export const toggleAudio = async (enabled: boolean) => {
  if (enabled) {
    await initAudio();
    if (Tone.getContext().state === 'running') {
      audioEnabled = true;
      startAmbient();
    } else {
      audioEnabled = false;
    }
  } else {
    audioEnabled = false;
    fadeOutAmbient();
  }
};

export const isAudioEnabled = () => audioEnabled;
