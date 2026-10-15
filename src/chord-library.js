const CHORDS = {
  C: { name: 'C', frets: [-1,3,2,0,1,0], fingers: [0,3,2,0,1,0], hint: '开放 C 大三和弦' },
  Cadd9: { name: 'Cadd9', frets: [-1,3,2,0,3,3], fingers: [0,2,1,0,3,4], hint: 'Cadd9 · 开放弦与高音叠色' },
  Cmaj7: { name: 'Cmaj7', frets: [-1,3,2,0,0,0], fingers: [0,3,2,0,0,0], hint: 'Cmaj7 · 温暖的开放音色' },
  D: { name: 'D', frets: [-1,-1,0,2,3,2], fingers: [0,0,0,1,3,2], hint: '开放 D 大三和弦' },
  D7: { name: 'D7', frets: [-1,-1,0,2,1,2], fingers: [0,0,0,2,1,3], hint: 'D7 · 属七和弦' },
  Dsus4: { name: 'Dsus4', frets: [-1,-1,0,2,3,3], fingers: [0,0,0,1,3,4], hint: 'Dsus4 · 悬挂音色' },
  Dm: { name: 'Dm', frets: [-1,-1,0,2,3,1], fingers: [0,0,0,2,3,1], hint: '开放 D 小三和弦' },
  Dm7: { name: 'Dm7', frets: [-1,-1,0,2,1,1], fingers: [0,0,0,2,1,1], hint: 'Dm7 · 柔和的小七和弦' },
  E: { name: 'E', frets: [0,2,2,1,0,0], fingers: [0,2,3,1,0,0], hint: '开放 E 大三和弦' },
  E5: { name: 'E5', frets: [0,2,2,-1,-1,-1], fingers: [0,1,3,0,0,0], hint: 'E5 · 摇滚强力和弦' },
  E7: { name: 'E7', frets: [0,2,0,1,0,0], fingers: [0,2,0,1,0,0], hint: 'E7 · 开放属七和弦' },
  Em: { name: 'Em', frets: [0,2,2,0,0,0], fingers: [0,2,3,0,0,0], hint: '开放 E 小三和弦' },
  Em7: { name: 'Em7', frets: [0,2,2,0,3,3], fingers: [0,1,2,0,3,4], hint: 'Em7 · 开放低音与高音固定音' },
  F: { name: 'F', frets: [-1,3,3,2,1,1], fingers: [0,3,4,2,1,1], hint: 'F · 食指横按高音两弦' },
  Fmaj7: { name: 'Fmaj7', frets: [-1,-1,3,2,1,0], fingers: [0,0,3,2,1,0], hint: 'Fmaj7 · 轻柔的开放和弦' },
  G: { name: 'G', frets: [3,2,0,0,3,3], fingers: [2,1,0,0,3,4], hint: '开放 G 大三和弦 · 保留高音共鸣' },
  G7: { name: 'G7', frets: [3,2,0,0,0,1], fingers: [3,2,0,0,0,1], hint: 'G7 · 明亮属七和弦' },
  A: { name: 'A', frets: [-1,0,2,2,2,0], fingers: [0,0,1,2,3,0], hint: '开放 A 大三和弦' },
  A7: { name: 'A7', frets: [-1,0,2,0,2,0], fingers: [0,0,2,0,3,0], hint: 'A7 · 开放属七和弦' },
  Am: { name: 'Am', frets: [-1,0,2,2,1,0], fingers: [0,0,2,3,1,0], hint: '开放 A 小三和弦' },
  Am7: { name: 'Am7', frets: [-1,0,2,0,1,0], fingers: [0,0,2,0,1,0], hint: 'Am7 · 温暖开放音色' },
  B7: { name: 'B7', frets: [-1,2,1,2,0,2], fingers: [0,2,1,3,0,4], hint: 'B7 · 布鲁斯常用属七和弦' },
  Bm: { name: 'Bm', frets: [2,2,4,4,3,2], fingers: [1,1,3,4,2,1], hint: 'Bm · 五弦根音横按' },
  C7: { name: 'C7', frets: [-1,3,2,3,1,0], fingers: [0,3,2,4,1,0], hint: 'C7 · 属七和弦' },
  F7: { name: 'F7', frets: [1,3,1,2,1,1], fingers: [1,3,1,2,1,1], hint: 'F7 · 可移动横按属七和弦' },
  Bb: { name: 'Bb', frets: [-1,1,3,3,3,1], fingers: [0,1,3,3,3,1], hint: 'Bb · 五弦根音横按' },
  Eb: { name: 'Eb', frets: [-1,6,8,8,8,6], fingers: [0,1,3,3,3,1], hint: 'Eb · 可移动横按大三和弦' },
  Gm: { name: 'Gm', frets: [3,5,5,3,3,3], fingers: [1,3,4,1,1,1], hint: 'Gm · 六弦根音小横按' },
  Cm: { name: 'Cm', frets: [-1,3,5,5,4,3], fingers: [0,1,3,4,2,1], hint: 'Cm · 五弦根音小横按' },
  Gm7: { name: 'Gm7', frets: [3,5,3,3,3,3], fingers: [1,3,1,1,1,1], hint: 'Gm7 · 小七和弦横按形状' },
  Cm7: { name: 'Cm7', frets: [-1,3,5,3,4,3], fingers: [0,1,3,1,2,1], hint: 'Cm7 · 五弦根音小七和弦' },
  Bbmaj7: { name: 'Bbmaj7', frets: [-1,1,3,2,3,1], fingers: [0,1,3,2,4,1], hint: 'Bbmaj7 · 大七和弦' },
  Gmaj7: { name: 'Gmaj7', frets: [3,2,0,0,0,2], fingers: [2,1,0,0,0,3], hint: 'Gmaj7 · 开放大七和弦' },
  FsharpM7: { name: 'F#m7', frets: [2,4,2,2,2,2], fingers: [1,3,1,1,1,1], hint: 'F#m7 · 六弦根音小七横按' },
  D9: { name: 'D9', frets: [-1,5,4,5,5,5], fingers: [0,2,1,3,3,3], hint: 'D9 · 属九和弦吉他按法' },
  A9: { name: 'A9', frets: [-1,0,2,4,2,3], fingers: [0,0,1,3,1,2], hint: 'A9 · 开放属九和弦' },
  E9: { name: 'E9', frets: [0,2,0,1,0,2], fingers: [0,2,0,1,0,3], hint: 'E9 · 开放属九和弦' },
  C9: { name: 'C9', frets: [-1,3,2,3,3,3], fingers: [0,1,2,3,3,3], hint: 'C9 · 属九和弦' },
  A5: { name: 'A5', frets: [-1,0,2,2,-1,-1], fingers: [0,0,1,3,0,0], hint: 'A5 · 五度强力和弦' },
  B5: { name: 'B5', frets: [-1,2,4,4,-1,-1], fingers: [0,1,3,4,0,0], hint: 'B5 · 五弦根音强力和弦' },
  C5: { name: 'C5', frets: [-1,3,5,5,-1,-1], fingers: [0,1,3,4,0,0], hint: 'C5 · 五弦根音强力和弦' },
  D5: { name: 'D5', frets: [-1,5,7,7,-1,-1], fingers: [0,1,3,4,0,0], hint: 'D5 · 五弦根音强力和弦' },
  G5: { name: 'G5', frets: [3,5,5,-1,-1,-1], fingers: [1,3,4,0,0,0], hint: 'G5 · 六弦根音强力和弦' },
  F5: { name: 'F5', frets: [1,3,3,-1,-1,-1], fingers: [1,3,4,0,0,0], hint: 'F5 · 六弦根音强力和弦' },
  Fsharp5: { name: 'F#5', frets: [2,4,4,-1,-1,-1], fingers: [1,3,4,0,0,0], hint: 'F#5 · 六弦根音强力和弦' },
  Bb5: { name: 'Bb5', frets: [-1,1,3,3,-1,-1], fingers: [0,1,3,4,0,0], hint: 'Bb5 · 五弦根音强力和弦' },
  Dsus2: { name: 'Dsus2', frets: [-1,-1,0,2,3,0], fingers: [0,0,0,1,2,0], hint: 'Dsus2 · 开放悬挂和弦' },
  Asus4: { name: 'Asus4', frets: [-1,0,2,2,3,0], fingers: [0,0,1,2,3,0], hint: 'Asus4 · 适合与 A / A7 交替' },
  C6: { name: 'C6', frets: [-1,3,2,2,1,0], fingers: [0,3,2,1,1,0], hint: 'C6 · 大六和弦的开放把位' },
  Am9: { name: 'Am9', frets: [-1,0,5,5,5,7], fingers: [0,0,1,2,3,4], hint: 'Am9 · 小九和弦，保留根音与色彩音' },
  Dm9: { name: 'Dm9', frets: [-1,5,3,5,5,5], fingers: [0,3,1,2,2,2], hint: 'Dm9 · 小九和弦吉他把位' },
  G9: { name: 'G9', frets: [3,2,3,2,3,3], fingers: [2,1,3,1,4,4], hint: 'G9 · 属九和弦横按把位' },
  Cmaj9: { name: 'Cmaj9', frets: [-1,3,2,4,3,-1], fingers: [0,2,1,4,3,0], hint: 'Cmaj9 · 大七和弦加入九度音' },
  Ebmaj7: { name: 'Ebmaj7', frets: [-1,6,5,3,3,3], fingers: [0,4,3,1,1,1], hint: 'Ebmaj7 · 可移动大七和弦' },
  A7sus4: { name: 'A7sus4', frets: [-1,0,2,0,3,3], fingers: [0,0,1,0,3,4], hint: 'A7sus4 · 保留高音 D / G 的悬挂色彩' },
  Fm: { name: 'Fm', frets: [1,3,3,1,1,1], fingers: [1,3,4,1,1,1], hint: 'Fm · 与 F 大和弦形成平行小调色彩' },
  'G/F#': { name: 'G/F#', frets: [2,-1,0,0,3,3], fingers: [1,0,0,0,3,4], hint: 'G/F# · 低音 F# 的下行连接' },
  'G/E': { name: 'G/E', frets: [0,-1,0,0,3,3], fingers: [0,0,0,0,3,4], hint: 'G/E · 低音 E 的经过和弦色彩' },
};

const GENRES = [
  {
    id: 'jrock', name: '日系摇滚', english: 'J-ROCK', note: '旋律推进 · 开放弦 · 高潮感',
    description: '从王道进行到开放弦摇滚：先练顺滑的四和弦循环，再把右手节奏加进去。',
    progressions: [
      { title: '王道进行 · 4536', roman: 'IV — V — iii — vi', key: 'C 大调示例', ids: ['F','G','Em','Am'], note: '明亮推进后落在小调，常见于日系流行摇滚与动画歌曲。' },
      { title: '青春四和弦', roman: 'I — V — vi — IV', key: 'G 大调示例', ids: ['G','D','Em','C'], note: '熟悉的流行摇滚循环，适合练习稳定扫弦和强弱拍。' },
      { title: '开放弦摇滚', roman: 'I — V — vi — IV', key: 'G 大调示例', ids: ['G','D','Em7','Cadd9'], note: '保留开放弦共鸣，适合把和弦接成连续的分解与扫弦。' },
    ],
    songs: [
      { title: 'ライラック', artist: 'Mrs. GREEN APPLE', rank: '2025 年榜 #1 · 2024 年榜 #5', href: 'https://www.billboard-japan.com/charts/detail?a=hot100_year&year=2025' },
      { title: '怪獣', artist: 'サカナクション', rank: '2025 年榜 #7', href: 'https://www.billboard-japan.com/charts/detail?a=hot100_year&year=2025' },
      { title: '幾億光年', artist: 'Omoinotake', rank: '2024 年榜 #3', href: 'https://www.billboard-japan.com/charts/detail?a=hot100_year&year=2024' },
    ],
  },
  {
    id: 'britpop', name: '英伦摇滚 / Britpop', english: 'BRITPOP / OASIS', note: '开放弦 · 挂留和弦 · 下行低音',
    description: '以 Oasis 的代表性吉他和弦形状为参考，包含 Wonderwall 的 Capo 2 常见按法、Don’t Look Back in Anger 的大调与平行小调色彩，以及开放高音弦和下行低音连接。',
    progressions: [
      { title: 'Wonderwall · 主循环', roman: 'Em7 — G — Dsus4 — A7sus4', key: 'E 小调形状 · Capo 2', ids: ['Em7','G','Dsus4','A7sus4'], note: '练习持续保留高音弦的开放和弦形状，注意变调夹后实际音高上移全音。' },
      { title: 'Don’t Look Back in Anger · 主循环', roman: 'I — V — vi — III7', key: 'C 大调示例', ids: ['C','G','Am','E7'], note: '旋律型大调循环中加入 E7，练习它向 Am 的牵引。' },
      { title: '大调到平行小调', roman: 'IV — iv — I — V', key: 'C 大调示例', ids: ['F','Fm','C','G'], note: 'F 到 Fm 的变化带出平行小调色彩，再回到 C；这是歌曲常见段落的一种简化练习编排。' },
      { title: 'Wonderwall · 下行低音连接', roman: 'G — G/F# — G/E — Cadd9', key: 'E 小调形状 · Capo 2', ids: ['G','G/F#','G/E','Cadd9'], note: '让低音逐步下行，同时保留高音弦，练习和弦上方的持续音。' },
    ], songs: [], sources: [
      { label: 'MusicRadar：音乐教授解析 Wonderwall 和弦与 Capo 2', href: 'https://www.musicradar.com/artists/just-because-some-of-your-university-friends-defaulted-to-it-doesnt-act-as-a-strike-against-it-a-music-professor-breaks-down-the-theory-behind-oasiss-wonderwall' },
      { label: 'Musicnotes：Wonderwall 授权吉他和弦谱', href: 'https://www.musicnotes.com/sheetmusic/oasis/wonderwall/MN0274321' },
      { label: 'Musicnotes：Don’t Look Back in Anger 授权吉他谱', href: 'https://www.musicnotes.com/sheetmusic/oasis/dont-look-back-in-anger/MN0053692_D5' },
    ],
  },
  {
    id: 'citypop', name: 'City Pop', english: 'CITY POP', note: 'Maj7 · 七和弦 · 柔和色彩',
    description: '用 Maj7、m7 和属七和弦营造圆润色彩；练习轻触弦、切分和干净的和弦转换。',
    progressions: [
      { title: '夜色循环', roman: 'Imaj7 — vi7 — ii7 — V7', key: 'C 大调示例', ids: ['Cmaj7','Am7','Dm7','G7'], note: '四度关系推动的流行爵士色彩，适合练习轻柔切分。' },
      { title: '半音下行回主和弦', roman: 'IVmaj7 — iii7 — ♭IIImaj7 — I6', key: 'C 大调示例', ids: ['Fmaj7','Em7','Ebmaj7','C6'], note: '低音 F–E–Eb 后回到 C6，听见半音经过和弦解决到主和弦。' },
      { title: '九和弦回环', roman: 'vi9 — ii9 — V9 — Imaj9', key: 'C 大调示例', ids: ['Am9','Dm9','G9','Cmaj9'], note: '用九和弦扩展音色；先慢练每个把位，再加入轻柔切分。' },
    ],
    songs: [],
  },
  {
    id: 'classic', name: '经典摇滚', english: 'CLASSIC ROCK', note: '强力和弦 · I–IV–V · 借用和弦',
    description: '以开放和弦和强力和弦为主，练习有力的下拨、闷音和稳定的四拍律动。',
    progressions: [
      { title: 'I — IV — V — IV', roman: 'I — IV — V — IV', key: 'E 大调示例', ids: ['E','A','B7','A'], note: '蓝調根基的经典摇滚循环，先用开放和弦熟悉根音移动。' },
      { title: '混合利底亚摇滚', roman: 'I — ♭VII — IV — I', key: 'D 大调示例', ids: ['D','C','G','D'], note: '借用 ♭VII 带来宽阔、带点粗粝的摇滚色彩。' },
      { title: '强力和弦推进', roman: 'I5 — ♭VII5 — IV5', key: 'E 根音示例', ids: ['E5','G','A','E5'], note: '先用 E5 练习低音弦闷音，再把形状移到 A 弦根音。' },
    ],
    songs: [],
  },
  {
    id: 'blues', name: '布鲁斯', english: 'BLUES', note: '属七和弦 · 12 小节 · Shuffle',
    description: '从 E 调 12 小节布鲁斯开始；左手和弦保持放松，右手用三连音摆动形成 Shuffle。',
    progressions: [
      { title: 'E 调 12 小节', roman: 'I7 × 4 · IV7 × 2 · I7 × 2 · V7 · IV7 · I7 · V7', key: 'E 调', ids: ['E7','E7','E7','E7','A7','A7','E7','E7','B7','A7','E7','B7'], note: '传统 12 小节蓝调骨架；12 格依次代表 12 个小节。' },
      { title: '三和弦 Shuffle', roman: 'I7 — IV7 — V7', key: 'E 调示例', ids: ['E7','A7','B7','A7'], note: '先用三个属七和弦熟悉 I、IV、V 的位置。' },
      { title: '小调蓝调氛围', roman: 'i — ♭VII — IV7', key: 'A 小调示例', ids: ['Am','G','D7','Am'], note: '小调主和弦搭配下行摇滚音色，适合练习力度控制。' },
    ],
    songs: [],
  },
  {
    id: 'poprock', name: '流行摇滚', english: 'POP / ROCK', note: '循环进行 · 大小调 · 借用和弦',
    description: '用常见四和弦循环练习稳定扫弦、强弱拍和转调感。调式级数是练习模板，具体歌曲会有自己的变化。',
    progressions: [
      { title: '流行四和弦', roman: 'I — V — vi — IV', key: 'G 大调示例', ids: ['G','D','Em','C'], note: '循环型流行摇滚模板；每个和弦一小节，适合先练匀速扫弦。' },
      { title: '50 年代摇滚循环', roman: 'I — vi — IV — V', key: 'C 大调示例', ids: ['C','Am','F','G7'], note: '经典 doo-wop 和声循环，可用轻重拍变化做出不同年代感。' },
      { title: '小调摇滚循环', roman: 'i — ♭VI — ♭III — ♭VII', key: 'A 小调示例', ids: ['Am','F','C','G'], note: '小调循环，用相同节奏型练习从低音根音快速换把。' },
    ], songs: [], sources: [
      { label: 'Open Music Theory：流行摇滚和声与常见循环', href: 'https://openmusictheory.github.io/popRockHarmony.html' },
      { label: 'Open Music Theory：50 年代与创作歌手循环', href: 'https://openmusictheory.github.io/popRockHarmony-dooWop.html' },
    ],
  },
  {
    id: 'jazz', name: '爵士', english: 'JAZZ', note: 'maj7 · m7 · 属七 · ii–V–I',
    description: '练习七和弦的柔和连接与 ii–V–I 解决感。当前提供的是便于吉他弹奏的简化把位。',
    progressions: [
      { title: '大调 ii–V–I', roman: 'ii7 — V7 — Imaj7 — VI7', key: 'C 大调示例', ids: ['Dm7','G7','Cmaj7','A7'], note: '基础爵士和声练习；注意 Dm7 到 G7 的共同音与顺阶移动。' },
      { title: '降 B 调 ii–V–I', roman: 'ii7 — V7 — Imaj7 — Imaj7', key: 'Bb 大调示例', ids: ['Cm7','F7','Bbmaj7','Bbmaj7'], note: '同一功能进行移至 Bb 调，熟悉横按和弦的位置变化。' },
      { title: 'G 调循环', roman: 'ii7 — V7 — Imaj7 — VI7', key: 'G 大调示例', ids: ['Am7','D7','Gmaj7','E7'], note: '用 VI7 把循环带回 ii7，练习四拍内平顺换和弦。' },
    ], songs: [], sources: [
      { label: 'Berklee：吉他声部连接与七和弦张力', href: 'https://online.berklee.edu/takenote/voice-leading-for-guitar/' },
      { label: 'Berklee：Jazz Guitar 101 和弦与 ii–V–I', href: 'https://online.berklee.edu/courses/jazz-guitar-101?pid=442' },
    ],
  },
  {
    id: 'bossa', name: 'Bossa Nova', english: 'BOSSA NOVA', note: 'maj7 · m7 · 属七 · 轻柔切分',
    description: '用柔和七和弦与细腻的低音、和弦交替练习 Bossa Nova 伴奏感；和弦进行为教学练习范例。',
    progressions: [
      { title: '明亮 ii–V–I', roman: 'Imaj7 — VI7 — ii7 — V7', key: 'C 大调示例', ids: ['Cmaj7','A7','Dm7','G7'], note: '让和弦延音互相衔接，右手可尝试低音后轻拨高音弦。' },
      { title: '顺阶回落', roman: 'IVmaj7 — iii7 — ii7 — V7', key: 'C 大调示例', ids: ['Fmaj7','Em7','Dm7','G7'], note: '沿级数下行，保持小幅度的和弦动态与稳定脉冲。' },
      { title: '小调色彩', roman: 'i7 — iv7 — V7 — i7', key: 'A 小调练习', ids: ['Am7','Dm7','E7','Am7'], note: '简化小调伴奏练习；在 E7 上听见回到 Am 的张力。' },
    ], songs: [], sources: [
      { label: 'Berklee：Bossa Nova 伴奏与编配课程单元', href: 'https://online.berklee.edu/courses/jazz-piano' },
      { label: 'Berklee：吉他声部连接与和弦张力', href: 'https://online.berklee.edu/takenote/voice-leading-for-guitar/' },
    ],
  },
  {
    id: 'funk', name: 'Funk', english: 'FUNK', note: '属九和弦 · 切分 · 短促制音',
    description: '用属九和弦的小把位练习切分与制音。和弦保持短而清楚，律动主要来自右手的十六分音符控制。',
    progressions: [
      { title: 'A 调属和弦律动', roman: 'I9 — IV9 — V9 — IV9', key: 'A 调示例', ids: ['A9','D9','E9','D9'], note: '用轻触弦的短音弹出和弦切分，先慢练右手的上下动作。' },
      { title: 'E 调七和弦律动', roman: 'I9 — IV9 — I9 — V9', key: 'E 调示例', ids: ['E9','A9','E9','B7'], note: '保持低音和高音和弦的动态平衡，空拍处做干净制音。' },
      { title: 'C 调色彩和弦', roman: 'I9 — ii7 — V9 — I9', key: 'C 调练习', ids: ['C9','Dm7','G7','C9'], note: '把和弦切分放在弱拍，留出空间让鼓机重拍带动律动。' },
    ], songs: [], sources: [
      { label: 'Berklee：吉他基础课程中的节奏、和弦与风格训练', href: 'https://online.berklee.edu/courses/guitar-fundamentals?tum_medium=blog' },
      { label: 'Berklee：吉他和弦声部连接', href: 'https://online.berklee.edu/takenote/voice-leading-for-guitar/' },
    ],
  },
  {
    id: 'soul', name: '灵魂乐 / R&B', english: 'SOUL / R&B', note: 'I–IV · maj7 · m7 · 属七',
    description: '从 I 与 IV 的往返、七和弦与短句式伴奏入手，练习让和弦和旋律互相回应。',
    progressions: [
      { title: '主和弦与下属和弦', roman: 'I — IV — I — IV', key: 'C 大调示例', ids: ['C','F','C','F'], note: 'I–IV 往返是常见的 plagal 色彩；可用切分和重复音型建立律动。' },
      { title: '柔和七和弦', roman: 'Imaj7 — vi7 — ii7 — V7', key: 'C 大调示例', ids: ['Cmaj7','Am7','Dm7','G7'], note: '让高音声部尽量平顺，适合温暖、较轻的伴奏音色。' },
      { title: '蓝调属和弦', roman: 'I7 — IV7 — V7 — IV7', key: 'E 调示例', ids: ['E7','A7','B7','A7'], note: '用属七和弦的粗粝感做短句回应，注意不要盖过主旋律。' },
    ], songs: [], sources: [
      { label: 'Open Music Theory：Soul / R&B 中的 I–IV 进行', href: 'https://openmusictheory.github.io/popRockHarmony-plagal.html' },
      { label: 'Berklee：布鲁斯和弦与风格训练', href: 'https://online.berklee.edu/courses/blues-guitar' },
    ],
  },
  {
    id: 'folk', name: '民谣 / 创作歌手', english: 'FOLK / SONGWRITER', note: '开放和弦 · 调式 · 循环进行',
    description: '以开放和弦、重复循环与民谣调式色彩为主，适合练习稳定扫弦和边弹边唱。',
    progressions: [
      { title: '创作歌手循环', roman: 'vi — IV — I — V', key: 'G 大调示例', ids: ['Em','C','G','D'], note: '循环进行适合反复弹唱，注意扫弦力度和旋律呼吸。' },
      { title: '多利亚民谣色彩', roman: 'i — ♭VII — i — ♭VII', key: 'A 多利亚练习', ids: ['Am','G','Am','G'], note: 'A 小调与 G 大调和弦交替，突出多利亚调式的自然六级音。' },
      { title: '混合利底亚色彩', roman: 'I — ♭VII — IV — I', key: 'D 混合利底亚练习', ids: ['D','C','G','D'], note: '用 ♭VII 带出民谣摇滚常见的调式色彩，适合分解和弦。' },
    ], songs: [], sources: [
      { label: 'Open Music Theory：创作歌手常见和弦循环', href: 'https://openmusictheory.github.io/popRockHarmony-sscp.html' },
      { label: 'Open Music Theory：民谣与流行摇滚中的调式和声', href: 'https://openmusictheory.github.io/popRockHarmony-EverettSystem2.html' },
    ],
  },
  {
    id: 'country', name: '乡村 / Americana', english: 'COUNTRY', note: 'I–IV–V · 七和弦 · 交替低音',
    description: '从开放和弦与 I–IV–V 进行开始，配合交替低音、二拍感或轻微 shuffle 练习。',
    progressions: [
      { title: '开放和弦 I–IV–V', roman: 'I — IV — V — I', key: 'A 大调示例', ids: ['A','D','E7','A'], note: '先弹清楚低音根音，再加上和弦扫弦或交替低音。' },
      { title: '乡村常用循环', roman: 'I — IV — V7 — I', key: 'G 大调示例', ids: ['G','C','D7','G'], note: '用开放把位保持明亮共鸣，可尝试轻快的二拍节奏。' },
      { title: '小调乡村色彩', roman: 'vi — IV — I — V', key: 'G 大调示例', ids: ['Em','C','G','D'], note: '适合慢速弹唱；尝试让低音和弦音交替，而非整拍扫弦。' },
    ], songs: [], sources: [
      { label: 'Berklee：Country Guitar 课程与常见和弦进行', href: 'https://online.berklee.edu/courses/country-guitar' },
      { label: 'Berklee：乡村吉他与交替低音练习', href: 'https://online.berklee.edu/takenote/country-music-guitar-essentials-chicken-pickin-string-bending-and-more/' },
    ],
  },
  {
    id: 'punk', name: '朋克 / 另类摇滚', english: 'PUNK / ALT ROCK', note: '强力和弦 · ♭III · ♭VII',
    description: '用强力和弦和简洁循环练习紧凑的下拨、闷音与整齐换把。根音与五度组成的和弦形状便于移动。',
    progressions: [
      { title: '强力和弦循环', roman: 'I5 — ♭VII5 — IV5 — I5', key: 'E 根音示例', ids: ['E5','D5','A5','E5'], note: '以根音与五度为主，弹奏时让闷音和开放音之间保持清楚对比。' },
      { title: '小调五声音阶根音', roman: 'i5 — ♭III5 — ♭VI5 — ♭VII5', key: 'E 小调示例', ids: ['E5','G5','C5','D5'], note: '根音取自小调五声音阶，练习整齐的根音移动与重拍。' },
      { title: '开放与强力和弦混合', roman: 'I5 — IV5 — ♭VII5 — I5', key: 'A 根音示例', ids: ['A5','D5','G5','A5'], note: '用短促有力的扫弦配合鼓机，保持每个和弦长度一致。' },
    ], songs: [], sources: [
      { label: 'Open Music Theory：摇滚中的强力和弦与五声音阶和声', href: 'https://openmusictheory.github.io/popRockHarmony-EverettSystem5.html' },
      { label: 'Open Music Theory：流行摇滚调式和弦', href: 'https://openmusictheory.github.io/popRockHarmony-EverettSystem2.html' },
    ],
  },
  {
    id: 'metal', name: '金属 / 硬核', english: 'METAL / HARDCORE', note: '低音强力和弦 · ♭II · 小调',
    description: '用低音弦强力和弦练习干净闷音和重拍控制；这里的调式级数是训练材料，不代表所有金属子风格。',
    progressions: [
      { title: 'Phrygian 色彩', roman: 'i5 — ♭II5 — ♭III5 — i5', key: 'E Phrygian 示例', ids: ['E5','F5','G5','E5'], note: '半音上行的 ♭II 带来紧张感；练习低音闷音与重拍落点。' },
      { title: '小调五度循环', roman: 'i5 — ♭VII5 — ♭VI5 — i5', key: 'E 小调示例', ids: ['E5','D5','C5','E5'], note: '下行根音循环配合持续低音，适合先用慢速检查制音。' },
      { title: '移动式强力和弦', roman: 'i5 — iv5 — ♭VII5 — ♭VI5', key: 'B 小调示例', ids: ['B5','E5','A5','G5'], note: '根音形状可沿琴颈移动；练习每次换把时左手放松再落弦。' },
    ], songs: [], sources: [
      { label: 'Open Music Theory：重金属与 Phrygian 调式', href: 'https://openmusictheory.github.io/popRockHarmony-EverettSystem5.html' },
      { label: 'Open Music Theory：流行摇滚调式和声概览', href: 'https://openmusictheory.github.io/popRockHarmony.html' },
    ],
  },
];

const SHARED_SOURCES = {
  jrock: [
    { label: '王道进行与日系流行摇滚参考', href: 'https://shibuyaapt.com/articles/oudou-shinkou-4536' },
    { label: 'Billboard JAPAN 年度榜单 2025', href: 'https://www.billboard-japan.com/charts/detail?a=hot100_year&year=2025' },
    { label: 'Billboard JAPAN 年度榜单 2024', href: 'https://www.billboard-japan.com/charts/detail?a=hot100_year&year=2024' },
  ],
  citypop: [
    { label: 'Berklee：吉他声部连接与七和弦张力', href: 'https://online.berklee.edu/takenote/voice-leading-for-guitar/' },
    { label: 'Berklee：爵士和声与 Bossa Nova 伴奏', href: 'https://online.berklee.edu/courses/jazz-piano' },
  ],
  classic: [
    { label: 'Open Music Theory：流行摇滚和声', href: 'https://openmusictheory.github.io/popRockHarmony.html' },
    { label: 'Open Music Theory：调式与借用和弦', href: 'https://openmusictheory.github.io/popRockHarmony-EverettSystem3.html' },
  ],
  blues: [
    { label: 'Open Music Theory：12 小节布鲁斯结构', href: 'https://openmusictheory.github.io/popRockHarmony-blues.html' },
    { label: 'Berklee：布鲁斯吉他课程与和弦练习', href: 'https://online.berklee.edu/courses/blues-guitar' },
  ],
};

const $ = (selector) => document.querySelector(selector);
const NOTE_NAMES = ['C','C♯','D','D♯','E','F','F♯','G','G♯','A','A♯','B'];
const OPEN_NOTES = [4,9,2,7,11,4]; // E A D G B E, low to high
const ROOT_PITCHES = { C:0,'C#':1,Db:1,D:2,'D#':3,Eb:3,E:4,F:5,'F#':6,Gb:6,G:7,'G#':8,Ab:8,A:9,'A#':10,Bb:10,B:11 };
const VOICING_RANGES = [
  { min:0,max:3,label:'开放 / 1–3 品' },
  { min:4,max:7,label:'4–7 品' },
  { min:8,max:10,label:'8–10 品' },
  { min:10,max:12,label:'10–12 品' },
];
let activeGenre = GENRES[0];
let selectedChordId = 'F';
let selectedProgressionIndex = 0;
let selectedChordIndex = 0;
let activeVoicings = [];
let selectedVoicingIndex = 0;

function noteAt(stringIndex, fret) { return NOTE_NAMES[(OPEN_NOTES[stringIndex] + fret + 120) % 12]; }
function chordVoicings(chordId) {
  const chord = CHORDS[chordId] || CHORDS.F;
  const toneSet = new Set(chord.frets.flatMap((fret, stringIndex) => fret < 0 ? [] : [(OPEN_NOTES[stringIndex] + fret) % 12]));
  const rootToken = chord.name.split('/')[0].match(/^([A-G](?:#|b)?)/)?.[1];
  const rootPc = ROOT_PITCHES[rootToken] ?? [...toneSet][0];
  const originalFrets = chord.frets.filter((fret) => fret > 0);
  const originalMin = originalFrets.length ? Math.min(...originalFrets) : 0;
  const originalLabel = originalMin <= 3 && chord.frets.includes(0) ? '原始按法 · 开放把位' : `原始按法 · ${originalMin || 1} 品附近`;
  const voicings = [{ frets:[...chord.frets], label:originalLabel }];
  const seen = new Set([chord.frets.join(',')]);
  const requiredTones = Math.min(4, toneSet.size);

  VOICING_RANGES.forEach((range) => {
    const choices = OPEN_NOTES.map((openPc) => [-1, ...Array.from({length:range.max-range.min+1}, (_, offset) => range.min+offset).filter((fret) => toneSet.has((openPc+fret)%12))]);
    let best = null;
    const shape = Array(6).fill(-1);
    function search(stringIndex, usedTones, count) {
      if (stringIndex === 6) {
        if (count < 3 || !usedTones.has(rootPc) || usedTones.size < requiredTones) return;
        const key = shape.join(',');
        if (seen.has(key)) return;
        const sounding = shape.map((fret, index) => fret < 0 ? null : ({ index, fret, pc:(OPEN_NOTES[index]+fret)%12 })).filter(Boolean);
        const firstNote = sounding[0];
        const frettedNotes = shape.filter((fret) => fret >= 0);
        const spread = Math.max(...frettedNotes) - Math.min(...frettedNotes);
        const score = usedTones.size * 100 + count * 8 + (firstNote?.pc === rootPc ? 5 : 0) - spread * 2;
        if (!best || score > best.score) best = { score, frets:[...shape] };
        return;
      }
      shape[stringIndex] = -1;
      search(stringIndex+1, usedTones, count);
      for (const fret of choices[stringIndex].slice(1)) {
        const pc = (OPEN_NOTES[stringIndex]+fret)%12;
        shape[stringIndex] = fret;
        const nextTones = new Set(usedTones); nextTones.add(pc);
        search(stringIndex+1, nextTones, count+1);
      }
      shape[stringIndex] = -1;
    }
    search(0, new Set(), 0);
    if (best) {
      const key = best.frets.join(',');
      seen.add(key);
      voicings.push({ frets:best.frets, label:range.label });
    }
  });
  return voicings;
}
function renderMiniDiagram(chord) {
  const fretted = chord.frets.filter((fret) => fret > 0);
  const base = fretted.length ? Math.min(...fretted) : 1;
  const xAt = (stringIndex) => 7 + stringIndex * 10;
  const yAt = (fret) => 20 + (fret - base + 0.5) * 9;
  const grid = [0,1,2,3,4].map((fret) => `<line x1="7" y1="${20 + fret * 9}" x2="57" y2="${20 + fret * 9}" class="mini-fret"/>`).join('');
  const strings = [0,1,2,3,4,5].map((stringIndex) => `<line x1="${xAt(stringIndex)}" y1="20" x2="${xAt(stringIndex)}" y2="56" class="mini-string"/>`).join('');
  const dots = chord.frets.map((fret, stringIndex) => {
    if (fret < 0) return `<text x="${xAt(stringIndex)}" y="14" class="mini-open">×</text>`;
    if (fret === 0) return `<text x="${xAt(stringIndex)}" y="14" class="mini-open">○</text>`;
    return `<circle cx="${xAt(stringIndex)}" cy="${yAt(fret)}" r="3.2" class="mini-dot"/>`;
  }).join('');
  return `<svg viewBox="0 0 64 62" aria-hidden="true">${grid}${strings}${dots}</svg>`;
}
function renderGenreList() {
  $('#genreList').innerHTML = GENRES.map((genre, index) => `<button type="button" class="genre-button ${genre.id === activeGenre.id ? 'active' : ''}" data-genre="${genre.id}"><span class="genre-number">${String(index + 1).padStart(2, '0')}</span><span><strong>${genre.name}</strong><small>${genre.english}</small></span><b>↗</b></button>`).join('');
}
function renderProgressions() {
  $('#genreEyebrow').textContent = `MODULE ${String(GENRES.indexOf(activeGenre) + 1).padStart(2, '0')} / ${activeGenre.english}`;
  $('#genreTitle').textContent = activeGenre.name;
  $('#genreDescription').textContent = activeGenre.description;
  const uniqueChordCount = new Set(activeGenre.progressions.flatMap((item) => item.ids)).size;
  $('#chordCount').textContent = `${uniqueChordCount} 个和弦型 · ${activeGenre.progressions.length} 组进行`;
  $('#progressionList').innerHTML = activeGenre.progressions.map((progression, index) => `<article class="progression-card"><div class="progression-top"><span class="progression-index">${String(index + 1).padStart(2,'0')}</span><div><h3>${progression.title}</h3><small>${progression.roman} <i>·</i> ${progression.key}</small></div></div><div class="chord-sequence">${progression.ids.map((id, chordIndex) => { const chord = CHORDS[id]; const selected = index === selectedProgressionIndex && chordIndex === selectedChordIndex; return `<button type="button" class="chord-tile ${selected ? 'selected' : ''}" data-chord="${id}" data-progression-index="${index}" data-chord-index="${chordIndex}" aria-label="查看 ${chord.name} 和弦指法"><span class="tile-name">${chord.name}</span>${renderMiniDiagram(chord)}<span class="tile-number">${String(chordIndex + 1).padStart(2,'0')}</span></button>`; }).join('')}</div><p class="progression-note">${progression.note}</p></article>`).join('');
  const references = activeGenre.songs?.length ? `<div class="reference-heading"><span class="section-index">LISTENING NOTES</span><span>聆听参考</span></div><div class="song-list">${activeGenre.songs.map((song) => `<a class="song-reference" href="${song.href}" target="_blank" rel="noopener noreferrer"><span class="song-play">↗</span><span class="song-main"><strong>${song.title}</strong><small>${song.artist}</small></span><span class="song-rank">${song.rank}</span></a>`).join('')}</div>` : '';
  const sources = (activeGenre.sources || SHARED_SOURCES[activeGenre.id] || []).map((source) => `<a href="${source.href}" target="_blank" rel="noopener noreferrer">${source.label} ↗</a>`).join('');
  $('#songReferences').innerHTML = `${references}<div class="source-links"><span class="source-label">乐理参考</span>${sources}</div>`;
}
function renderVoicingPicker(chordId) {
  const chord = CHORDS[chordId] || CHORDS.F;
  $('#voicingList').innerHTML = activeVoicings.map((voicing, index) => `<button type="button" class="voicing-option ${index === selectedVoicingIndex ? 'active' : ''}" data-voicing-index="${index}" aria-label="${chord.name}：${voicing.label}">${renderMiniDiagram({frets:voicing.frets})}<span class="voicing-name"><strong>${voicing.label}</strong><small>${voicing.frets.map((fret) => fret < 0 ? 'x' : fret).join(' ')}</small></span></button>`).join('');
}
function selectChord(chordId) {
  const chord = CHORDS[chordId] ? chordId : 'F';
  selectedChordId = chord;
  activeVoicings = chordVoicings(chord);
  selectedVoicingIndex = 0;
  renderVoicingPicker(chord);
  renderFretboard(chordId, activeVoicings[0].frets);
}
function renderFretboard(chordId, selectedFrets) {
  const chord = CHORDS[chordId] || CHORDS.F;
  const chordFrets = selectedFrets || chord.frets;
  const neckX = 198; const neckY = 101; const neckW = 820; const neckH = 142; const fretW = neckW / 12;
  const stringYs = [117, 139, 161, 183, 205, 227];
  const marks = [3,5,7,9,12];
  const frets = Array.from({ length: 12 }, (_, index) => {
    const fret = index + 1; const x = neckX + fretW * fret;
    return `<line x1="${x}" y1="${neckY}" x2="${x}" y2="${neckY + neckH}" class="fret-wire"/><text x="${neckX + fretW * (fret - .5)}" y="263" class="fret-number">${fret}</text>`;
  }).join('');
  const inlays = marks.map((fret) => {
    const x = neckX + fretW * (fret - .5);
    return fret === 12 ? `<path d="M${x-6} 154 l6 -8 6 8 -6 8z M${x-6} 190 l6 -8 6 8 -6 8z" class="neck-inlay"/>` : `<path d="M${x-6} 172 l6 -8 6 8 -6 8z" class="neck-inlay"/>`;
  }).join('');
  const strings = stringYs.map((y, index) => `<line x1="165" y1="${y}" x2="1310" y2="${y}" class="guitar-string string-${index}"/><text x="${neckX - 17}" y="${y + 4}" class="string-state">${chordFrets[index] < 0 ? '×' : chordFrets[index] === 0 ? '○' : ''}</text>`).join('');
  const pressedNotes = chordFrets.map((fret, stringIndex) => {
    if (fret <= 0) return '';
    const x = neckX + fretW * (fret - .5); const y = stringYs[stringIndex];
    return `<g class="pressed-note"><circle cx="${x}" cy="${y}" r="11"/><text x="${x}" y="${y + 3.5}">${noteAt(stringIndex, fret)}</text></g>`;
  }).join('');
  $('#fretboardSvg').innerHTML = `<defs>
    <linearGradient id="neckWood" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#563522"/><stop offset=".48" stop-color="#38251c"/><stop offset="1" stop-color="#4e3021"/></linearGradient>
    <linearGradient id="headstockWood" x1="0" x2="1"><stop offset="0" stop-color="#c88846"/><stop offset="1" stop-color="#6d3d27"/></linearGradient>
    <radialGradient id="bodyBurst" cx="48%" cy="44%" r="70%"><stop offset="0" stop-color="#f3c879"/><stop offset=".48" stop-color="#d6964f"/><stop offset=".82" stop-color="#9a5730"/><stop offset="1" stop-color="#43291e"/></radialGradient>
    <linearGradient id="bodyEdge" x1="0" x2="1"><stop offset="0" stop-color="#f4dca9"/><stop offset=".5" stop-color="#d9b77b"/><stop offset="1" stop-color="#8e6644"/></linearGradient>
    <linearGradient id="metal" x1="0" x2="1"><stop stop-color="#5d5b56"/><stop offset=".35" stop-color="#e0d5b9"/><stop offset=".6" stop-color="#77746d"/><stop offset="1" stop-color="#282a27"/></linearGradient>
  </defs>
  <ellipse cx="705" cy="326" rx="625" ry="14" fill="#000" opacity=".28"/>
  <path class="guitar-body" d="M1037 82 C1050 43 1098 28 1144 36 C1182 42 1195 68 1232 78 C1264 86 1281 69 1316 79 C1361 92 1375 132 1369 174 C1366 201 1345 213 1333 237 C1325 253 1340 276 1329 300 C1314 332 1272 344 1237 337 C1204 331 1195 307 1164 308 C1133 310 1117 337 1076 334 C1031 331 1007 302 1005 268 C1003 240 1018 218 1028 193 C1038 167 1025 119 1037 82Z" fill="url(#bodyBurst)" stroke="url(#bodyEdge)" stroke-width="9"/>
  <path d="M1050 91 C1061 58 1103 45 1141 51 C1180 57 1197 83 1231 90 C1271 99 1286 80 1312 91 C1344 103 1356 137 1350 173 C1346 198 1328 214 1317 239 C1305 265 1322 282 1310 302 C1298 322 1266 328 1238 320 C1204 310 1191 294 1164 294 C1129 294 1113 323 1079 318 C1047 314 1026 292 1025 266 C1024 243 1038 219 1048 193 C1058 162 1040 121 1050 91Z" fill="none" stroke="#f0cb8c" stroke-width="2" opacity=".82"/>
  <ellipse cx="1165" cy="185" rx="92" ry="78" fill="#70452d" stroke="#efd4a4" stroke-width="8"/><ellipse cx="1165" cy="185" rx="76" ry="62" fill="#31241d" stroke="#bd8d58" stroke-width="5"/><ellipse cx="1165" cy="185" rx="58" ry="47" fill="#211a16" stroke="#6b4932" stroke-width="2"/>
  <rect x="1079" y="137" width="28" height="88" rx="5" fill="#d8c8a2" stroke="#6d5038" stroke-width="3" transform="rotate(-8 1093 181)"/><rect x="1189" y="137" width="28" height="88" rx="5" fill="#d8c8a2" stroke="#6d5038" stroke-width="3" transform="rotate(7 1203 181)"/>
  <rect x="1270" y="138" width="13" height="86" rx="4" fill="url(#metal)" stroke="#e5d8b9" stroke-width="2"/><rect x="1301" y="113" width="16" height="140" rx="5" fill="url(#metal)" stroke="#e5d8b9" stroke-width="2"/>
  <path d="M1270 250 l36 0 12 10 -8 8 -42 -2z" fill="url(#metal)" stroke="#e3d2ae" stroke-width="2"/>
  <circle cx="1304" cy="291" r="11" fill="#3a2b20" stroke="#e5c784" stroke-width="3"/><circle cx="1334" cy="281" r="11" fill="#3a2b20" stroke="#e5c784" stroke-width="3"/><circle cx="1308" cy="319" r="11" fill="#3a2b20" stroke="#e5c784" stroke-width="3"/>
  <path d="M1259 95 q-12 -17 2 -26 q16 -6 18 10 l-8 16z" fill="#d8c7a0" stroke="#735239" stroke-width="2"/>
  <path d="M24 139 Q20 121 38 114 L132 114 Q151 114 171 128 L190 138 L190 206 L171 216 Q151 230 132 230 L38 230 Q20 222 24 204Z" fill="url(#headstockWood)" stroke="#e4c38d" stroke-width="3"/>
  <path d="M47 145 L165 145 M47 167 L165 167 M47 189 L165 189 M47 211 L165 211" stroke="#d4ad72" stroke-width="1" opacity=".48"/>
  <text x="84" y="183" transform="rotate(-90 84 183)" class="headstock-mark">50s</text>
  <rect x="${neckX-5}" y="${neckY-5}" width="${neckW+10}" height="${neckH+10}" rx="7" class="neck-binding"/><rect x="${neckX}" y="${neckY}" width="${neckW}" height="${neckH}" rx="4" fill="url(#neckWood)"/><rect x="${neckX-3}" y="${neckY}" width="6" height="${neckH}" class="nut-wire"/>
  ${inlays}${frets}${strings}<line x1="${neckX + neckW}" y1="${neckY-3}" x2="${neckX + neckW}" y2="${neckY + neckH + 3}" class="end-of-board"/>${pressedNotes}
  ${[0,1,2].map((i) => `<g class="tuner"><line x1="${150+i*12}" y1="${127+i*3}" x2="${150+i*12}" y2="${110+i*3}"/><ellipse cx="${150+i*12}" cy="${108+i*3}" rx="12" ry="5"/><line x1="${150+i*12}" y1="${211-i*3}" x2="${150+i*12}" y2="${231-i*3}"/><ellipse cx="${150+i*12}" cy="${234-i*3}" rx="12" ry="5"/></g>`).join('')}`;
  $('#selectedChordName').textContent = chord.name;
  $('#selectedChordHint').textContent = chord.hint;
  $('#selectedFingering').textContent = chordFrets.map((fret) => fret < 0 ? 'x' : String(fret)).join(' ');
  const notes = [...new Set(chordFrets.flatMap((fret, index) => fret < 0 ? [] : [noteAt(index, fret)]))];
  $('#selectedNotes').textContent = notes.join(' · ');
}
function setGenre(id) {
  activeGenre = GENRES.find((genre) => genre.id === id) || GENRES[0];
  const available = activeGenre.progressions.flatMap((item) => item.ids);
  const nextChord = available.includes(selectedChordId) ? selectedChordId : available[0];
  selectedChordId = nextChord;
  const progressionIndex = activeGenre.progressions.findIndex((progression) => progression.ids.includes(nextChord));
  selectedProgressionIndex = Math.max(0, progressionIndex);
  selectedChordIndex = activeGenre.progressions[selectedProgressionIndex].ids.indexOf(nextChord);
  renderGenreList(); selectChord(nextChord); renderProgressions();
}
export function mountChordLibrary() {
  renderGenreList(); selectChord('F'); renderProgressions();
  $('#genreList').addEventListener('click', (event) => {
    const button = event.target.closest('[data-genre]'); if (button) setGenre(button.dataset.genre);
  });
  $('#progressionList').addEventListener('click', (event) => {
    const button = event.target.closest('[data-chord]'); if (!button) return;
    selectedProgressionIndex = Number(button.dataset.progressionIndex);
    selectedChordIndex = Number(button.dataset.chordIndex);
    selectChord(button.dataset.chord);
    document.querySelectorAll('.chord-tile').forEach((tile) => tile.classList.toggle('selected', tile === button));
  });
  $('#voicingList').addEventListener('click', (event) => {
    const button = event.target.closest('[data-voicing-index]'); if (!button) return;
    selectedVoicingIndex = Number(button.dataset.voicingIndex);
    renderFretboard(selectedChordId, activeVoicings[selectedVoicingIndex].frets);
    document.querySelectorAll('.voicing-option').forEach((option) => option.classList.toggle('active', option === button));
  });
  $('#navPractice').addEventListener('click', () => showPage('practice'));
  $('#navLibrary').addEventListener('click', () => showPage('library'));
}
function showPage(page) {
  const library = page === 'library';
  $('#practicePage').hidden = library;
  $('#libraryPage').hidden = !library;
  $('#navLibrary').classList.toggle('active', library);
  $('#navPractice').classList.toggle('active', !library);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
