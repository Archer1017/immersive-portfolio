import type { ContactLink, ImageAsset, Interest, JournalEntry, Photograph, Project, Section } from '../types';

// 所有个人内容都从这里修改。当前姓名、照片、兴趣和文字均为明确标记的演示内容。
export const assets: Record<string, ImageAsset> = {
  mountain: { src: '/images/mountains.webp', small: '/images/mountains-small.webp', alt: '云雾中的绿色山谷与蜿蜒小路，示例素材', width: 1600, height: 1100 },
  light: { src: '/images/city.webp', small: '/images/city-small.webp', alt: '星空下亮着暖光的灯塔，示例素材', width: 1600, height: 1100 },
  building: { src: '/images/architecture.webp', small: '/images/architecture-small.webp', alt: '从街角仰望现代建筑的线条，示例素材', width: 1600, height: 1100 },
  canyon: { src: '/images/coast.webp', small: '/images/coast-small.webp', alt: '夕阳照在峡谷岩石上，示例素材', width: 1600, height: 1100 },
  waterfall: { src: '/images/waterfall.webp', small: '/images/waterfall-small.webp', alt: '自然风景，竖幅示例素材', width: 900, height: 1200 },
  city: { src: '/images/street.webp', small: '/images/street-small.webp', alt: '城市观察，示例素材', width: 1200, height: 900 },
  dog: { src: '/images/dog.webp', small: '/images/dog-small.webp', alt: '一只裹着毯子的小狗，示例素材', width: 900, height: 1100 },
};

export const profile = {
  name: 'visitor', // 可替换的示例名称，不代表已确认的真实姓名。
  brand: 'portfolio.example',
  greeting: "A little world of my own.",
  headline: ['不止一面，', '都是我。'],
  introduction: '一个保持好奇的人，在生活里观察，在创作里表达。欢迎走进我的小小宇宙。',
  shortIntroduction: '记录所见，收藏所爱，慢慢成为自己。',
  heroImage: assets.mountain,
  heroSecondary: assets.light,
  demo: true, // 真实内容替换完成后设为 false，隐藏全站示例提示。
  footer: '保持好奇，慢慢探索。',
};

// 顺序就是轮盘顺序。增删、改名、调整路径后，导航和轮盘会一起更新。
export const sections: Section[] = [
  { id: 'about', kind: 'about', path: '/about', label: '关于我', english: 'About me', description: '性格、想法，还有那些让我成为我的小事。', headline: '认识我，从这里开始。', image: assets.mountain },
  { id: 'interests', kind: 'interests', path: '/interests', label: '兴趣爱好', english: 'Interests', description: '让我忘记时间的事，和生活里不断发生的好奇。', headline: '把时间，交给喜欢的事。', image: assets.dog },
  { id: 'photography', kind: 'photography', path: '/photography', label: '我的摄影', english: 'Photography', description: '把眼前的瞬间，变成可以回看的记忆。', headline: '一些瞬间，值得停留。', image: assets.light },
  { id: 'projects', kind: 'projects', path: '/projects', label: '我的项目', english: 'Projects', description: '把脑海中的可能，一点一点变成现实。', headline: '让想法，真的发生。', image: assets.building },
  { id: 'journal', kind: 'journal', path: '/journal', label: '随笔与生活', english: 'Journal', description: '没有标准答案的想法，和不必特别的日常。', headline: '记下一点，生活的回声。', image: assets.canyon },
  { id: 'contact', kind: 'contact', path: '/contact', label: '联系我', english: 'Say hello', description: '从一句你好开始，让有趣的想法彼此相遇。', headline: '很高兴，在这里遇见你。', image: assets.city },
];

export const about = {
  opening: '我喜欢用不同的方式，理解同一个世界。',
  paragraphs: ['有时候是相机，有时候是一页设计，也可能只是一段写给自己的话。对我来说，创作不是某个特别的时刻，而是看待日常的一种方式。', '这个网站像一个还没整理完的房间，放着我的兴趣、尝试和生活切片。你可以从任何地方开始认识我。'],
  tags: ['好奇心驱动', '喜欢观察', '边做边学', '珍惜日常'],
  values: [
    { title: '留一点好奇', text: '对没尝试过的事保留兴趣，不急着为自己下定义。' },
    { title: '认真感受', text: '比起一味追赶，更想记得自己为什么出发。' },
    { title: '保持表达', text: '把观察和想法留下来，允许它们还不完美。' },
  ],
  timeline: [
    { when: '一个起点', title: '开始记录', text: '把相册里的片刻、笔记里的想法，慢慢放到一起。' },
    { when: '此刻', title: '给创作一个家', text: '试着做一个自己的数字空间，让不同的兴趣在这里相遇。' },
    { when: '接下来', title: '继续尝试', text: '还有很多未完成的想法，留给以后的自己。' },
  ],
};

export const interests: Interest[] = [
  { id: 'walking', title: '没有目的地的散步', english: 'Wandering', image: assets.waterfall, description: '从熟悉的小路拐一个弯，看看日常之外的风景。', why: '走路的时候，思绪也能换一种速度。', next: '想整理一份属于自己的散步地图。' },
  { id: 'photography', title: '用镜头观察', english: 'Seeing', image: assets.light, description: '比起完美的照片，更喜欢那些让我停下来的瞬间。', why: '拍照提醒我认真看，而不只是经过。', next: '想完成一次围绕光线的小型拍摄练习。' },
  { id: 'making', title: '动手做点什么', english: 'Making', image: assets.building, description: '设计、拼贴，或是一个小网站，把想法变成看得见的东西。', why: '从零到一的过程，总能带来新的发现。', next: '试着每个月完成一个小小的创作。' },
];

export const photographs: Photograph[] = [
  { id: 'green', title: '山路弯弯', category: '自然', image: assets.mountain, caption: '偶尔慢下来，风景就会多一点。' },
  { id: 'water', title: '向着水声', category: '自然', image: assets.waterfall },
  { id: 'light', title: '夜色里的光', category: '光影', image: assets.light, caption: '一小束光，就足够让人停留。' },
  { id: 'geometry', title: '城市的几何', category: '城市', image: assets.building },
  { id: 'companion', title: '陪伴的温度', category: '日常', image: assets.dog },
  { id: 'evening', title: '落日余温', category: '自然', image: assets.canyon },
  { id: 'street', title: '经过这里', category: '城市', image: assets.city },
];

export const projects: Project[] = [
  { slug: 'personal-space', title: '一个人的数字空间', english: 'A personal space', category: '交互网站', description: '用一个可以转动的目录，连接生活、兴趣与创作。', image: assets.building, tools: ['React', 'TypeScript', 'CSS'], status: '探索中', body: [ { title: '想解决什么', text: '不想把自己压缩成一张简历，于是尝试用可以自由探索的方式组织内容。这是一条示例项目记录。' }, { title: '如何展开', text: '从一个轮盘开始，将不同内容变成各自独立又互相连接的空间。这里可以补充设计过程、线框稿和实现细节。' }, { title: '接下来', text: '用真实作品和生活记录替换占位内容，逐渐形成自己的表达。' } ] },
  { slug: 'light-collection', title: '光线收集计划', english: 'A study of light', category: '视觉练习', description: '用一组日常画面，观察光线如何改变我们的感受。', image: assets.light, tools: ['摄影', '图像编辑', '排版'], status: '构想中', body: [ { title: '最初的想法', text: '这是一个尚待展开的示例项目。可以在这里记录创作动机、灵感来源与研究方向。' }, { title: '可以记录的过程', text: '从拍摄、选图到最终编排，把每一次尝试和调整整理成自己的创作档案。' } ] },
];

export const journal: JournalEntry[] = [
  { slug: 'a-place-to-begin', title: '给那些零散的想法，找个地方', date: '2000-01-01', category: '想法', excerpt: '相册、便签、未完成的草稿。也许它们可以住在同一个地方。', paragraphs: ['这是一篇示例随笔。很多时候，想法并不是成体系出现的。它可能是一张照片、一段对话，或者走路时突然想到的一句话。', '想做这个网站，是想给这些片刻一个可以慢慢整理的地方。不需要一次完成，也不用急着给它一个确定的样子。', '从这里开始，记下一点点。'], image: assets.mountain },
  { slug: 'taking-the-long-way', title: '今天，试着绕一点路', date: '2000-01-01', category: '生活', excerpt: '没有特别的目的，也可以是一段值得记住的时间。', paragraphs: ['这是一篇示例生活记录，用于展示文章的排版方式。', '比起沿着最熟悉的路线快快走完，偶尔试着换一条路。可能没有什么发现，也可能刚好看到一束很好的光。', '这里可以放旅行、读书、散步，或者任何想留下的生活片段。'] },
  { slug: 'leave-some-space', title: '允许一些事情，还没有答案', date: '2000-01-01', category: '随想', excerpt: '留白不是空缺，也可以是新的可能。', paragraphs: ['这是一篇示例短文。这个页面为以后更长的写作预留空间。', '可以从很短的一段开始，逐渐添加照片、想法和经历。重要的是，它用自己的节奏生长。'], image: assets.canyon },
];

// 暂未填写真实联系方式。添加后 Contact 页面自动显示；不要填虚构账号。
export const contacts: ContactLink[] = [];
