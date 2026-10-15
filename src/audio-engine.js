/** Audio primitives and look-ahead scheduling, kept independent of the UI. */
const COUNT_VOICES = { 'count-zh': 'count-zh-female', 'count-zh-rock': 'count-zh-rock' };
export class AudioEngine {
  constructor({ onTick = () => {}, onDrumStep = () => {} } = {}) {
    this.context = null;
    this.master = null;
    this.clickBus = null;
    this.voiceBus = null;
    this.drumBus = null;
    this.timer = null;
    this.onTick = onTick;
    this.onDrumStep = onDrumStep;
    this.bpm = 90;
    this.beatsPerBar = 4;
    this.subdivision = 1;
    this.swing = 50;
    this.clickEnabled = true;
    this.clickSound = 'digital';
    this.beatEnabled = [true, true, true, true];
    this.metronomePlaying = false;
    this.drumEnabled = false;
    this.pattern = null;
    this.nextTime = 0;
    this.tick = 0;
    this.nextClickTime = 0;
    this.clickIndex = 0;
    this.stepsPerBar = 16;
    this.clickVolume = 0.8;
    this.voiceVolume = 0.88;
    this.drumVolume = 0.78;
    this.countBuffers = new Map();
    this.countLoading = new Map();
    this.countSources = new Set();
    this.scheduledNodes = { click: new Set(), drum: new Set() };
    this.scheduledTimers = { click: new Set(), drum: new Set() };
  }
  async ensureAudio() {
    if (!this.context) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) throw new Error('当前浏览器不支持 Web Audio。');
      this.context = new AudioContextClass();
      this.master = this.context.createGain();
      this.master.gain.value = 0.75;
      this.master.connect(this.context.destination);
      this.clickBus = this.context.createGain();
      this.voiceBus = this.context.createGain();
      this.drumBus = this.context.createGain();
      this.clickBus.gain.value = this.clickVolume;
      this.voiceBus.gain.value = this.voiceVolume;
      this.drumBus.gain.value = this.drumVolume;
      this.clickBus.connect(this.master); this.voiceBus.connect(this.master); this.drumBus.connect(this.master);
    }
    if (this.context.state === 'suspended') await this.context.resume();
    if (COUNT_VOICES[this.clickSound]) await this.loadChineseCounts(this.clickSound);
  }
  configure(values = {}) {
    Object.assign(this, values);
    this.stepsPerBar = Math.max(1, Number(this.beatsPerBar) || 4) * 4;
    if (this.clickBus) this.clickBus.gain.value = this.clickVolume;
    if (this.voiceBus) this.voiceBus.gain.value = this.voiceVolume;
    if (this.drumBus) this.drumBus.gain.value = this.drumVolume;
  }
  setMetronomePlaying(playing) {
    this.metronomePlaying = playing;
    if (!playing) { this.cancelGroup('click'); this.onTick(-1); }
    this.syncTransport();
  }
  setDrumPlaying(playing) {
    this.drumEnabled = playing;
    if (!playing) { this.cancelGroup('drum'); this.onDrumStep(-1); }
    this.syncTransport();
  }
  syncTransport() {
    if (this.metronomePlaying || this.drumEnabled) this.start();
    else this.stop();
  }
  start() {
    if (this.timer) return;
    this.tick = 0;
    this.nextTime = this.context.currentTime + 0.06;
    this.clickIndex = 0;
    this.nextClickTime = this.nextTime;
    this.timer = window.setInterval(() => this.scheduleAhead(), 25);
    this.scheduleAhead();
  }
  stop() {
    if (this.timer) window.clearInterval(this.timer);
    this.timer = null;
    this.cancelGroup('click'); this.cancelGroup('drum');
    this.onTick(-1);
    this.onDrumStep(-1);
  }
  trackNode(node, group) {
    const nodes = this.scheduledNodes[group];
    nodes.add(node);
    node.addEventListener('ended', () => nodes.delete(node), { once: true });
    return node;
  }
  scheduleUi(callback, delay, group) {
    const timers = this.scheduledTimers[group];
    const id = window.setTimeout(() => { timers.delete(id); callback(); }, delay);
    timers.add(id);
  }
  cancelGroup(group) {
    this.scheduledNodes[group].forEach(node => { try { node.stop(); } catch {} });
    this.scheduledNodes[group].clear();
    this.scheduledTimers[group].forEach(id => window.clearTimeout(id));
    this.scheduledTimers[group].clear();
    if (group === 'click') this.countSources.clear();
  }
  scheduleAhead() {
    if (!this.context) return;
    const horizon = this.context.currentTime + 0.12;
    const subdivision = Math.max(1, this.subdivision);
    const clickInterval = 60 / Math.max(1, this.bpm) / subdivision;
    while (this.nextClickTime < horizon) {
      const beat = Math.floor(this.clickIndex / subdivision) % Math.max(1, this.beatsPerBar);
      const swung = this.clickIndex % 2 === 1 ? ((this.swing - 50) / 100) * clickInterval : 0;
      const clickTime = this.nextClickTime + swung;
      if (this.metronomePlaying) {
        const beatIsEnabled = this.beatEnabled?.[beat] !== false;
        if (this.clickEnabled && beatIsEnabled) {
          this.playClick(clickTime, beat === 0 && this.clickIndex % subdivision === 0, beat, this.clickIndex % subdivision === 0);
        }
        if (this.clickIndex % subdivision === 0) {
          this.scheduleUi(() => this.onTick(beat), Math.max(0, (clickTime - this.context.currentTime) * 1000), 'click');
        }
      }
      this.clickIndex += 1;
      this.nextClickTime += clickInterval;
    }
    while (this.nextTime < horizon) {
      const step = this.tick % this.stepsPerBar;
      const beatDuration = 60 / Math.max(1, this.bpm);
      const stepDuration = beatDuration / 4;
      const swingDelay = step % 4 === 2 ? ((this.swing - 50) / 100) * stepDuration : 0;
      const time = this.nextTime + swingDelay;
      if (this.drumEnabled && this.pattern) {
        ['kick', 'snare', 'hat'].forEach((voice) => {
          if (this.pattern[voice]?.[step]) this.playDrum(voice, time);
        });
        this.scheduleUi(() => this.onDrumStep(step), Math.max(0, (time - this.context.currentTime) * 1000), 'drum');
      }
      this.tick += 1;
      this.nextTime += stepDuration;
    }
  }
  playClick(time, accent = false, beat = 0, isBeat = true) {
    if (!this.context || !this.master) return;
    if (COUNT_VOICES[this.clickSound]) {
      if (isBeat) this.playChineseCount(time, beat);
      return;
    }
    const tone = (frequency, level, duration, type = 'sine') => {
      const osc = this.context.createOscillator();
      const gain = this.context.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, time);
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(level, time + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
      osc.connect(gain).connect(this.clickBus);
      this.trackNode(osc, 'click');
      osc.start(time); osc.stop(time + duration + 0.005);
    };
    const noise = (duration, level, filterType, frequency) => {
      const buffer = this.context.createBuffer(1, Math.ceil(this.context.sampleRate * duration), this.context.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
      const source = this.context.createBufferSource(); source.buffer = buffer;
      const filter = this.context.createBiquadFilter(); filter.type = filterType; filter.frequency.setValueAtTime(frequency, time);
      const gain = this.context.createGain();
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(level, time + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
      source.connect(filter).connect(gain).connect(this.clickBus);
      this.trackNode(source, 'click');
      source.start(time); source.stop(time + duration + 0.005);
    };
    const sound = this.clickSound || 'digital';
    switch (sound) {
      case 'woodblock': {
        const fundamental = accent ? 760 : 570;
        tone(fundamental, accent ? 0.22 : 0.16, 0.075, 'triangle');
        tone(fundamental * 2.35, 0.045, 0.035, 'sine');
        break;
      }
      case 'mechanical':
        noise(0.018, accent ? 0.15 : 0.11, 'highpass', 2500);
        tone(accent ? 1480 : 1080, 0.075, 0.035, 'square');
        break;
      case 'clave': {
        const frequency = accent ? 2180 : 1720;
        tone(frequency, accent ? 0.18 : 0.14, 0.03, 'triangle');
        tone(frequency * 1.48, 0.035, 0.018, 'sine');
        break;
      }
      case 'bell': {
        const fundamental = accent ? 1320 : 990;
        tone(fundamental, accent ? 0.16 : 0.12, 0.19, 'sine');
        tone(fundamental * 2.01, 0.035, 0.12, 'sine');
        tone(fundamental * 3.02, 0.014, 0.075, 'sine');
        break;
      }
      case 'rim':
        noise(0.055, accent ? 0.18 : 0.13, 'bandpass', 1650);
        tone(accent ? 760 : 560, 0.065, 0.045, 'sine');
        break;
      case 'digital':
      default:
        tone(accent ? 1500 : 980, accent ? 0.28 : 0.19, 0.045, 'sine');
        break;
    }
  }
  playChineseCount(time, beat = 0) {
    const buffers = this.countBuffers.get(this.clickSound);
    const buffer = buffers?.[beat % buffers.length];
    if (!buffer) return;
    const source = this.context.createBufferSource();
    source.buffer = buffer;
    // Keep the original pitch. At very fast tempos, fade only the tail before the next beat.
    source.playbackRate.value = 1;
    const available = 60 / this.bpm * 0.92;
    const duration = Math.min(buffer.duration, available);
    const gain = this.context.createGain();
    gain.gain.value = beat === 0 ? 0.9 : 0.8;
    if (buffer.duration > available) {
      gain.gain.setValueAtTime(gain.gain.value, time + Math.max(0, duration - 0.035));
      gain.gain.linearRampToValueAtTime(0.0001, time + duration);
    }
    source.connect(gain).connect(this.voiceBus);
    this.countSources.add(source);
    this.trackNode(source, 'click');
    source.onended = () => { this.countSources.delete(source); source.disconnect(); gain.disconnect(); };
    source.start(time);
    if (buffer.duration > available) source.stop(time + duration);
  }
  async loadChineseCounts(sound = this.clickSound) {
    if (this.countBuffers.has(sound)) return;
    if (!COUNT_VOICES[sound]) return;
    if (!this.countLoading.has(sound)) {
      this.countLoading.set(sound, Promise.all(Array.from({ length: 7 }, async (_, index) => {
        const url = new URL(`../assets/${COUNT_VOICES[sound]}/${index + 1}.wav`, import.meta.url);
        if (sound === 'count-zh-rock') url.searchParams.set('v', 'roar-2');
        const response = await fetch(url);
        if (!response.ok) throw new Error('人声提示音加载失败，请刷新后重试。');
        return this.context.decodeAudioData(await response.arrayBuffer());
      })).then(buffers => { this.countBuffers.set(sound, buffers); }).catch(error => {
        this.countLoading.delete(sound);
        throw error;
      }));
    }
    await this.countLoading.get(sound);
  }
  playToggleFeedback(enabled) {
    if (!this.context || !this.master) return;
    const time = this.context.currentTime;
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(enabled ? 1120 : 560, time);
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.11, time + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.075);
    osc.connect(gain).connect(this.clickBus);
    this.trackNode(osc, 'click');
    osc.start(time); osc.stop(time + 0.08);
  }
  playDrum(voice, time) {
    if (voice === 'kick') {
      const osc = this.context.createOscillator(); const gain = this.context.createGain();
      osc.type = 'sine'; osc.frequency.setValueAtTime(145, time); osc.frequency.exponentialRampToValueAtTime(46, time + 0.12);
      gain.gain.setValueAtTime(0.9, time); gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);
      osc.connect(gain).connect(this.drumBus); this.trackNode(osc, 'drum'); osc.start(time); osc.stop(time + 0.19); return;
    }
    const duration = voice === 'hat' ? 0.045 : 0.13;
    const buffer = this.context.createBuffer(1, Math.ceil(this.context.sampleRate * duration), this.context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
    const source = this.context.createBufferSource(); source.buffer = buffer;
    const filter = this.context.createBiquadFilter(); filter.type = voice === 'hat' ? 'highpass' : 'lowpass'; filter.frequency.value = voice === 'hat' ? 7600 : 1800;
    const gain = this.context.createGain(); gain.gain.setValueAtTime(voice === 'hat' ? 0.2 : 0.48, time); gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
    source.connect(filter).connect(gain).connect(this.drumBus); this.trackNode(source, 'drum'); source.start(time); source.stop(time + duration);
  }
}
