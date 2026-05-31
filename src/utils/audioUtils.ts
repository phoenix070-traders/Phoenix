// Premium Web Audio Synthesizer for "Phoenix & Quill Digital"
// Provides atmospheric luxury sound feedback with 100% offline self-containment.

let audioCtx: AudioContext | null = null;
let ambientOscillator: OscillatorNode | null = null;
let ambientGainNode: GainNode | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// 1. Play high-end metallic hover sound (Acoustic golden ping)
export function playMetallicPing(enabled: boolean) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Primary metallic osc
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc1.type = "sine";
    osc2.type = "triangle";
    
    // Inharmonic frequencies recreate the metallic strike of bronze or gold
    osc1.frequency.setValueAtTime(1200, now);
    osc1.frequency.exponentialRampToValueAtTime(300, now + 0.15);
    
    osc2.frequency.setValueAtTime(1840, now);
    osc2.frequency.exponentialRampToValueAtTime(450, now + 0.12);
    
    gainNode.gain.setValueAtTime(0.06, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    
    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.4);
    osc2.stop(now + 0.4);
  } catch (err) {
    // Fail silently to prevent interrupting user actions if audio is blocked
  }
}

// 2. Play golden chime sound (For successful actions or chatbot replies)
export function playGoldenChime(enabled: boolean) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Arpeggio chord: C6 -> E6 -> G6 -> C7
    const freqs = [1046.50, 1318.51, 1567.98, 2093.00];
    
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const delay = idx * 0.05;
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + delay);
      
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.04, now + delay + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.4);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start(now + delay);
      osc.stop(now + delay + 0.5);
    });
  } catch (err) {}
}

// 3. Play electronic error or click sound
export function playSoftClick(enabled: boolean) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = "triangle";
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.setValueAtTime(110, now + 0.02);
    
    gainNode.gain.setValueAtTime(0.04, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.07);
  } catch (err) {}
}

// 4. Start/Stop the continuous Ambient Cinema hum
export function toggleAmbientCinemaHum(enabled: boolean) {
  try {
    if (!enabled) {
      if (ambientOscillator) {
        ambientOscillator.stop();
        ambientOscillator.disconnect();
        ambientOscillator = null;
      }
      if (ambientGainNode) {
        ambientGainNode.disconnect();
        ambientGainNode = null;
      }
      return;
    }
    
    // Return if already running
    if (ambientOscillator) return;
    
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Create dual oscillators for a rich, celestial analog chorus warmth
    ambientOscillator = ctx.createOscillator();
    ambientOscillator.type = "sine";
    ambientOscillator.frequency.value = 55.0; // Low fundamental A1
    
    // Low-pass filter to make it incredibly gentle, felt rather than heard
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 100;
    
    ambientGainNode = ctx.createGain();
    // Start very softly, fade in gently
    ambientGainNode.gain.setValueAtTime(0, now);
    ambientGainNode.gain.linearRampToValueAtTime(0.02, now + 2.0);
    
    ambientOscillator.connect(filter);
    filter.connect(ambientGainNode);
    ambientGainNode.connect(ctx.destination);
    
    ambientOscillator.start(now);
  } catch (err) {
    console.error("Could not run ambient cinema hum:", err);
  }
}
