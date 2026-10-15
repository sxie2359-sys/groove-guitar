import { AudioEngine } from './audio-engine.js';
import { mountChordLibrary } from './chord-library.js';

const $ = (selector) => document.querySelector(selector);
const defaults = {
  bpm: 90, meter: 4, subdivision: 1, swing: 50, clickEnabled: true, clickSound: 'digital', preset: 'rock',
  clickVolume: 80, voiceVolume: 88, drumVolume: 78,
  beatEnabled: [true, true, true, true, true, true, true],
  pattern: {
    kick: [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
    snare:[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
    hat:  [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
  },
};
function readSavedState() {
  try {
    const value = JSON.parse(localStorage.getItem('groove-guitar-state') || 'null');
    return value && typeof value === 'object' && !Array.isArray(value) ? value : null;
  } catch {
    localStorage.removeItem('groove-guitar-state');
    return null;
  }
}
const saved = readSavedState();
const state = { ...defaults, ...(saved || {}) };
state.bpm = Math.max(40, Math.min(220, Number(state.bpm) || defaults.bpm));
state.meter = [2,3,4,5,6,7].includes(Number(state.meter)) ? Number(state.meter) : defaults.meter;
state.subdivision = [1,2,3,4].includes(Number(state.subdivision)) ? Number(state.subdivision) : defaults.subdivision;
state.swing = Math.max(50, Math.min(70, Number(state.swing) || defaults.swing));
state.clickSound = ['digital','woodblock','mechanical','clave','bell','rim','count-zh','count-zh-rock'].includes(state.clickSound) ? state.clickSound : defaults.clickSound;
state.preset = ['rock','pop','blues','empty','custom'].includes(state.preset) ? state.preset : defaults.preset;
state.clickEnabled = state.clickEnabled !== false;
['clickVolume','voiceVolume','drumVolume'].forEach(key => { const value = Number(state[key]); state[key] = Math.max(0, Math.min(100, Number.isFinite(value) ? value : defaults[key])); });
const stepCount = () => Number(state.meter) * 4;
function resizePattern(pattern, length = stepCount()) {
  return Object.fromEntries(['kick','snare','hat'].map(voice => {
    const source = Array.isArray(pattern?.[voice]) && pattern[voice].length ? pattern[voice].map(value => value ? 1 : 0) : defaults.pattern[voice];
    return [voice, Array.from({ length }, (_, index) => source[index % source.length] || 0)];
  }));
}
state.pattern = resizePattern(saved?.pattern || defaults.pattern);
state.beatEnabled = Array.from({ length: 7 }, (_, index) => saved?.beatEnabled?.[index] ?? true);
const engine = new AudioEngine({ onTick: showBeat, onDrumStep: showDrumStep });
let tapTimes = [];
let trainerTimer = null;
let trainerState = null;

function persist() { localStorage.setItem('groove-guitar-state', JSON.stringify(state)); }
function syncBarWaveDuration() {
  const beats = Math.max(1, Number(state.meter) || 4);
  const bpm = Math.max(1, Number(state.bpm) || 90);
  $('#beatLights').style.setProperty('--bar-wave-duration', `${beats * 60 / bpm}s`);
}
function showBeat(beat) {
  const lights = [...document.querySelectorAll('.beat-light')];
  lights.forEach((light, i) => light.classList.toggle('active', i === beat));
  const downbeat = document.querySelector('.beat-light.downbeat');
  if (!downbeat) return;
  if (beat === 0 && state.clickEnabled && state.beatEnabled[0] !== false) {
    downbeat.classList.remove('bar-wave');
    void downbeat.offsetWidth;
    downbeat.classList.add('bar-wave');
  } else if (beat < 0 || beat === 0) {
    downbeat.classList.remove('bar-wave');
  }
}
function showDrumStep(step) {
  document.querySelectorAll('.step.current').forEach(cell => cell.classList.remove('current'));
  if (step < 0) return;
  document.querySelectorAll(`.step[data-step="${step}"]`).forEach(cell => cell.classList.add('current'));
  window.setTimeout(() => document.querySelectorAll(`.step[data-step="${step}"]`).forEach(cell => cell.classList.remove('current')), 110);
}
function renderLights() {
  $('#beatLights').innerHTML = Array.from({ length: Number(state.meter) }, (_, i) => {
    const enabled = state.beatEnabled[i] !== false;
    return `<button type="button" class="beat-light ${i === 0 ? 'downbeat' : ''} ${enabled ? '' : 'muted'}" data-beat="${i}" aria-label="第 ${i + 1} 拍提示音 ${enabled ? '开启' : '已关闭'}，点击切换" aria-pressed="${enabled}" title="第 ${i + 1} 拍提示音：${enabled ? '开启' : '关闭'}"><span class="beat-wave" aria-hidden="true"></span></button>`;
  }).join('');
}
function renderSequencer() {
  const root = $('#sequencer');
  const labels = [['kick','KICK'],['snare','SNARE'],['hat','HI-HAT']];
  const steps = stepCount();
  root.style.setProperty('--steps', steps);
  root.setAttribute('aria-label', `鼓机 ${steps} 步音序器`);
  $('#stepCaption').textContent = `${steps} STEP · ${state.meter} BEATS`;
  root.innerHTML = `<span></span>${Array.from({length:steps},(_,i)=>`<span class="step-number ${i%4===0?'bar-start':''}">${i%4===0?String(i/4+1).padStart(2,'0'):''}</span>`).join('')}`;
  labels.forEach(([voice,label]) => {
    root.insertAdjacentHTML('beforeend', `<span class="row-label ${voice}"><i></i>${label}</span>`);
    state.pattern[voice].forEach((on, index) => root.insertAdjacentHTML('beforeend', `<button class="step ${voice} ${on?'on':''}" data-voice="${voice}" data-step="${index}" aria-label="${label} 第 ${index+1} 步" aria-pressed="${Boolean(on)}"></button>`));
  });
}
function syncControls() {
  $('#bpmValue').value = state.bpm; $('#bpmSlider').value = state.bpm;
  $('#meter').value = state.meter; $('#subdivision').value = state.subdivision;
  $('#swing').value = state.swing; $('#swingValue').textContent = `${state.swing}%`;
  $('#preset').value = state.preset;
  $('#clickSound').value = state.clickSound || 'digital';
  $('#clickVolume').value = state.clickVolume; $('#clickVolumeValue').textContent = `${state.clickVolume}%`;
  $('#voiceVolume').value = state.voiceVolume; $('#voiceVolumeValue').textContent = `${state.voiceVolume}%`;
  $('#drumVolume').value = state.drumVolume; $('#drumVolumeValue').textContent = `${state.drumVolume}%`;
  syncClickMute();
  renderLights(); syncBarWaveDuration(); renderSequencer(); updateEngine();
}
function syncClickMute() {
  const button = $('#clickMute');
  button.classList.toggle('sound-off', !state.clickEnabled);
  button.setAttribute('aria-pressed', String(!state.clickEnabled));
  button.setAttribute('aria-label', state.clickEnabled ? '静音节拍提示音' : '开启节拍提示音');
  button.title = state.clickEnabled ? '静音节拍提示音' : '开启节拍提示音';
}
function updateEngine() { engine.configure({ bpm: Number(state.bpm), beatsPerBar: Number(state.meter), subdivision: Number(state.subdivision), swing: Number(state.swing), clickEnabled: state.clickEnabled, clickSound: state.clickSound || 'digital', beatEnabled: state.beatEnabled, pattern: state.pattern, clickVolume: state.clickVolume / 100, voiceVolume: state.voiceVolume / 100, drumVolume: state.drumVolume / 100 }); }
async function toggleMetronome() {
  const next = !engine.metronomePlaying;
  try {
    if (next) await engine.ensureAudio();
    updateEngine(); engine.setMetronomePlaying(next); syncPlaybackButtons(); syncTrainerStatus();
  }
  catch (error) { alert(error.message); }
}
async function toggleDrums() {
  const next = !engine.drumEnabled;
  try {
    if (next) await engine.ensureAudio();
    updateEngine();
    if (next) engine.setMetronomePlaying(false);
    engine.setDrumPlaying(next); syncPlaybackButtons();
  }
  catch (error) { alert(error.message); }
}
function syncPlaybackButtons() {
  const metro = engine.metronomePlaying;
  const drums = engine.drumEnabled;
  $('#playButton').classList.toggle('is-playing', metro);
  $('#playButton').querySelector('.play-icon').textContent = metro ? '■' : '▶';
  $('#playButton').querySelector('span:last-child').textContent = metro ? '停止节拍器' : '开始练习';
  $('#drumToggle').classList.toggle('is-playing', drums);
  $('#drumToggle').innerHTML = `${drums ? '■' : '▶'} ${drums ? '停止鼓机' : '播放鼓机'}`;
}
function setBpm(value) { state.bpm = Math.max(40, Math.min(220, Math.round(Number(value) || 90))); $('#bpmValue').value = state.bpm; $('#bpmSlider').value = state.bpm; syncBarWaveDuration(); updateEngine(); persist(); }
function setPattern(name) {
  const length = stepCount();
  const patterns = {
    rock: { kick:Array.from({length},(_,i)=>i%4===0?1:0), snare:Array.from({length},(_,i)=>i%8===4?1:0), hat:Array.from({length},(_,i)=>i%2===0?1:0) },
    pop: { kick:Array.from({length},(_,i)=>i%8===0||i%8===6?1:0), snare:Array.from({length},(_,i)=>i%8===4?1:0), hat:Array.from({length},(_,i)=>i%2===0?1:0) },
    blues: { kick:Array.from({length},(_,i)=>i%4===0||i%8===3?1:0), snare:Array.from({length},(_,i)=>i%8===4?1:0), hat:Array.from({length},(_,i)=>i%4===0||i%4===2?1:0) },
    empty: { kick:Array(length).fill(0), snare:Array(length).fill(0), hat:Array(length).fill(0) },
  };
  state.preset = name;
  state.pattern = structuredClone(patterns[name]); renderSequencer(); updateEngine(); persist();
}
$('#playButton').addEventListener('click', toggleMetronome);
$('#drumToggle').addEventListener('click', toggleDrums);
$('#bpmSlider').addEventListener('input', e => setBpm(e.target.value));
$('#bpmDown').addEventListener('click', () => setBpm(state.bpm - 1));
$('#bpmUp').addEventListener('click', () => setBpm(state.bpm + 1));
$('#meter').addEventListener('change', e => { state.meter = Number(e.target.value); state.pattern = resizePattern(state.pattern); renderLights(); renderSequencer(); syncBarWaveDuration(); persist(); updateEngine(); });
$('#subdivision').addEventListener('change', e => { state.subdivision = Number(e.target.value); persist(); updateEngine(); });
$('#swing').addEventListener('input', e => { state.swing = Number(e.target.value); $('#swingValue').textContent = `${state.swing}%`; persist(); updateEngine(); });
[['clickVolume','clickVolumeValue'],['voiceVolume','voiceVolumeValue'],['drumVolume','drumVolumeValue']].forEach(([inputId, valueId]) => {
  $(`#${inputId}`).addEventListener('input', event => { state[inputId] = Number(event.target.value); $(`#${valueId}`).textContent = `${state[inputId]}%`; persist(); updateEngine(); });
});
$('#clickMute').addEventListener('click', () => { state.clickEnabled = !state.clickEnabled; syncClickMute(); persist(); updateEngine(); });
$('#clickSound').addEventListener('change', async (event) => {
  const previousSound = state.clickSound;
  state.clickSound = event.target.value;
  persist(); updateEngine();
  try {
    await engine.ensureAudio();
    if (state.clickEnabled && !engine.metronomePlaying) engine.playClick(engine.context.currentTime + 0.01, true);
  } catch (error) {
    state.clickSound = previousSound;
    $('#clickSound').value = previousSound;
    persist(); updateEngine();
    alert(error.message);
  }
});
$('#beatLights').addEventListener('click', e => {
  const light = e.target.closest('.beat-light'); if (!light) return;
  const beat = Number(light.dataset.beat);
  state.beatEnabled[beat] = state.beatEnabled[beat] === false;
  const enabled = state.beatEnabled[beat];
  light.classList.toggle('muted', !enabled);
  light.classList.remove('changed');
  void light.offsetWidth;
  light.classList.add('changed');
  window.setTimeout(() => light.classList.remove('changed'), 420);
  light.setAttribute('aria-pressed', String(enabled));
  light.setAttribute('aria-label', `第 ${beat + 1} 拍提示音 ${enabled ? '开启' : '已关闭'}，点击切换`);
  light.title = `第 ${beat + 1} 拍提示音：${enabled ? '开启' : '关闭'}`;
  engine.ensureAudio().then(() => engine.playToggleFeedback(enabled)).catch(() => {});
  persist(); updateEngine();
});
$('#tapTempo').addEventListener('click', () => {
  const now = performance.now(); tapTimes = [...tapTimes.filter(t => now - t < 2500), now];
  if (tapTimes.length > 1) { const intervals = tapTimes.slice(1).map((t,i) => t - tapTimes[i]); setBpm(60000 / (intervals.reduce((a,b)=>a+b,0) / intervals.length)); }
});
$('#preset').addEventListener('change', e => setPattern(e.target.value));
$('#clearPattern').addEventListener('click', () => { $('#preset').value = 'empty'; setPattern('empty'); });
$('#sequencer').addEventListener('click', e => {
  const cell = e.target.closest('.step'); if (!cell) return;
  const voice = cell.dataset.voice; const step = Number(cell.dataset.step);
  state.preset = 'custom'; $('#preset').value = 'custom';
  state.pattern[voice][step] = state.pattern[voice][step] ? 0 : 1;
  cell.classList.toggle('on', Boolean(state.pattern[voice][step])); cell.setAttribute('aria-pressed', String(Boolean(state.pattern[voice][step]))); updateEngine(); persist();
  if (state.pattern[voice][step]) {
    engine.ensureAudio().then(() => engine.playDrum(voice, engine.context.currentTime + 0.015)).catch(error => alert(error.message));
  }
});
function syncTrainerStatus() {
  if (!trainerState) return;
  const remaining = Math.max(0, 120 - Math.floor(trainerState.accumulated / 1000));
  $('#trainerStatus').textContent = engine.metronomePlaying ? `当前 ${state.bpm} BPM · ${remaining} 秒后 +5` : `当前 ${state.bpm} BPM · 等待节拍器开始`;
}
function stopTrainer(label = '训练已暂停') {
  if (trainerTimer) clearInterval(trainerTimer);
  trainerTimer = null; trainerState = null;
  $('#trainerToggle').textContent = '开始计划'; $('#trainerStatus').textContent = label;
}
$('#trainerToggle').addEventListener('click', () => {
  const button = $('#trainerToggle');
  if (trainerState) { stopTrainer(); return; }
  const start = Math.max(40, Math.min(220, Number($('#startBpm').value) || 70));
  const target = Math.max(start, Math.min(220, Number($('#targetBpm').value) || 120));
  setBpm(start); button.textContent = '结束计划';
  const intervalMs = 2 * 60 * 1000;
  trainerState = { target, accumulated: 0, lastTick: performance.now() };
  syncTrainerStatus();
  trainerTimer = setInterval(() => {
    const now = performance.now();
    if (engine.metronomePlaying) trainerState.accumulated += now - trainerState.lastTick;
    trainerState.lastTick = now;
    if (trainerState.accumulated >= intervalMs) {
      trainerState.accumulated -= intervalMs;
      const next = Math.min(target, state.bpm + 5); setBpm(next);
      if (next >= target) { stopTrainer(`已达到目标 ${target} BPM！`); button.textContent = '重新开始'; return; }
    }
    syncTrainerStatus();
  }, 250);
});
window.addEventListener('keydown', e => {
  if (e.code !== 'Space' || /INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) return;
  e.preventDefault(); toggleMetronome();
});
syncControls();
syncPlaybackButtons();
mountChordLibrary();
