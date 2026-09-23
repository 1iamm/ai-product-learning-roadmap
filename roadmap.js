'use strict';

// Keep the V1 keys and original task order: existing progress and notes remain valid.
const tasks = [...document.querySelectorAll('[data-task]')];
const key = 'productRoadmapProgressV1';
const notesKey = 'productRoadmapNotesV1';
const reviewKey = 'productRoadmapWeek1ReviewV1';
let activeNotesKey = notesKey;
const byId = id => document.getElementById(id);
function warnStorage(message) { byId('storage-warning').textContent = message; }
function readText(storageKey) {
  try { return localStorage.getItem(storageKey); }
  catch { warnStorage('浏览器未允许读取本地记录。仍可填写，请及时导出复盘。'); return null; }
}
function readObject(storageKey) {
  const raw = readText(storageKey);
  if (!raw) return {};
  try { const value = JSON.parse(raw); return value && typeof value === 'object' && !Array.isArray(value) ? value : {}; }
  catch { warnStorage('有一份本地记录无法读取，页面仍可使用。新填写的复盘请及时导出。'); return {}; }
}
function storeText(storageKey, value) {
  try { localStorage.setItem(storageKey, value); return true; }
  catch { warnStorage('本地保存失败。请保持页面打开，并复制或导出复盘。'); return false; }
}
function load() {
  const saved = readObject(key);
  tasks.forEach((task, index) => { task.checked = !!saved[index]; task.addEventListener('change', save); });
  byId('notes').value = readText(notesKey) || '';
  update();
}
function save() {
  const saved = {};
  tasks.forEach((task, index) => { saved[index] = task.checked; });
  storeText(key, JSON.stringify(saved));
  update();
}
function update() {
  const done = tasks.filter(task => task.checked).length;
  const percent = Math.round(done / tasks.length * 100);
  byId('doneCount').textContent = done;
  byId('totalCount').textContent = tasks.length;
  byId('progressFill').style.width = percent + '%';
  byId('progressText').textContent = `实战练习 ${percent}% · 阅读与复盘另外记录，勾选不代表掌握。`;
}
function resetProgress() {
  if (!confirm('清空原有实战练习的勾选？这不会清空 Week 1 阅读标记、复盘草稿或通用笔记。')) return;
  try { localStorage.removeItem(key); }
  catch { warnStorage('无法清空本地进度，请检查浏览器存储权限。'); return; }
  tasks.forEach(task => { task.checked = false; });
  update();
}
function saveNotes() {
  const saved = storeText(activeNotesKey, byId('notes').value);
  byId('saveStatus').textContent = saved ? '已保存到当前浏览器' : '保存失败，请复制备份';
  return saved;
}

const readingInputs = [...document.querySelectorAll('[data-w1-read]')];
const answerInputs = [...document.querySelectorAll('[data-w1-answer]')];
const checkInputs = [...document.querySelectorAll('[data-w1-check]')];
let reviewUpdatedAt = '';
const questions = {
  headspace: 'Headspace：用户想要的改变，和“使用冥想功能”有什么区别？',
  mcdonalds: 'McDonald’s：从开始点餐到完成点餐，哪一步让用户更费力？',
  blinkist: 'Blinkist：哪个环节消耗了用户继续使用的意愿？你会怎样调整？',
  synthesis: '把三篇连起来：三篇共同改变了你对“好用”的哪个判断？',
  question: '我仍不确定的地方'
};
function snapshotReview() {
  return {
    version: 1,
    read: Object.fromEntries(readingInputs.map(input => [input.dataset.w1Read, input.checked])),
    answers: Object.fromEntries(answerInputs.map(input => [input.dataset.w1Answer, input.value])),
    selfCheck: Object.fromEntries(checkInputs.map(input => [input.dataset.w1Check, input.checked])),
    updatedAt: reviewUpdatedAt
  };
}
function updateReviewStatus() {
  const reading = readingInputs.filter(input => input.checked).length;
  const answers = answerInputs.filter(input => input.dataset.w1Answer !== 'question' && input.value.trim()).length;
  const checked = checkInputs.filter(input => input.checked).length;
  byId('w1-reading-status').textContent = `${reading} / 3 篇已标记`;
  const includesExample = answerInputs.some(input => input.value.startsWith('【助手示范'));
  byId('w1-draft-status').textContent = answers ? `${answers} / 4 题有草稿 · ${includesExample ? '含助手示范' : '等待讨论'}` : '还没有复盘草稿';
  byId('w1-check-status').textContent = `自检 ${checked} / 3 · ${checked === 3 ? '可以带着复盘讨论是否进入 Week 2。' : '可以带着问题开始讨论。'}`;
  byId('w1-mark-read').disabled = reading === readingInputs.length;
  byId('w1-mark-read').textContent = reading === readingInputs.length ? '已标记三篇读完' : '三篇都已读完';
}
function saveReview() {
  reviewUpdatedAt = new Date().toISOString();
  const saved = storeText(reviewKey, JSON.stringify(snapshotReview()));
  byId('w1-save-status').textContent = saved ? '草稿已保存到当前浏览器' : '保存失败，请复制或导出';
  updateReviewStatus();
  return saved;
}
function loadReview() {
  const state = readObject(reviewKey);
  readingInputs.forEach(input => { input.checked = state.read?.[input.dataset.w1Read] === true; });
  answerInputs.forEach(input => { const answer = state.answers?.[input.dataset.w1Answer]; input.value = typeof answer === 'string' ? answer : ''; });
  checkInputs.forEach(input => { input.checked = state.selfCheck?.[input.dataset.w1Check] === true; });
  reviewUpdatedAt = typeof state.updatedAt === 'string' ? state.updatedAt : '';
  if (reviewUpdatedAt) byId('w1-save-status').textContent = '已恢复当前浏览器的草稿';
  updateReviewStatus();
}
function discussionText() {
  const state = snapshotReview();
  const includesExample = Object.values(state.answers).some(answer => answer.startsWith('【助手示范'));
  const sourceLines = readingInputs.map(input => {
    const link = input.closest('li').querySelector('a');
    return `- [${input.checked ? 'x' : ' '}] [${link.textContent.replace(/ ↗$/, '')}](${link.href})`;
  });
  const answerLines = Object.entries(questions).map(([name, title]) => `## ${title}\n\n${state.answers[name]?.trim() || '（暂未填写，可以从这里追问我）'}`);
  const selfChecks = checkInputs.map(input => `- [${input.checked ? 'x' : ' '}] ${input.closest('label').textContent.trim()}`);
  return [
    '# Week 1 复盘：用户、任务、旅程与摩擦',
    '学习计划：https://1iamm.github.io/ai-product-learning-roadmap/#week1',
    '本周学习资料仅为以下三篇 Growth.Design 案例；请以这份清单为准。',
    includesExample ? '内容说明：下面含有助手提供的 Week 1 写法示范，请不要将它视为我已独立完成或掌握。Week 2 起我会自己尝试。' : '',
    '## 阅读标记\n\n' + sourceLines.join('\n'),
    ...answerLines,
    '## 我的自检（不代表助手已验收）\n\n' + selfChecks.join('\n'),
    includesExample
      ? '## 希望怎样讨论\n\n请带我理解示范中从原文观察到解释与建议的推理过程，回答我的疑问。不要将阅读示范或复制示范当成我已经掌握。Week 2 起我会先写自己的复盘，再请你反馈。'
      : '## 希望怎样讨论\n\n请先指出理解准确的地方、混淆的概念，以及观察与推断是否分清，再一次追问一个问题。优先使用这三篇的案例，不要求我先提供真实业务，也不要直接代写我的答案。讨论后帮助我整理认知变化、修正和未解决问题，再判断是否进入 Week 2。',
    '导出时间：' + new Date().toLocaleString('zh-CN')
  ].filter(Boolean).join('\n\n');
}
async function copyReview() {
  const text = discussionText();
  try {
    await navigator.clipboard.writeText(text);
    byId('w1-save-status').textContent = '已复制，请粘贴回我们的对话';
  } catch {
    byId('w1-copy-text').value = text;
    byId('w1-copy-dialog').showModal();
    byId('w1-copy-text').focus();
    byId('w1-copy-text').select();
  }
}
function exportReview() {
  const blob = new Blob([discussionText()], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'week1-learning-review.md';
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  byId('w1-save-status').textContent = '已生成 Markdown 文件，请留存备份';
}
load();
loadReview();
readingInputs.forEach(input => input.addEventListener('change', saveReview));
answerInputs.forEach(input => input.addEventListener('input', saveReview));
checkInputs.forEach(input => input.addEventListener('change', saveReview));
byId('week1-form').addEventListener('submit', event => event.preventDefault());
byId('w1-mark-read').addEventListener('click', () => { readingInputs.forEach(input => { input.checked = true; }); saveReview(); });
byId('w1-save').addEventListener('click', saveReview);
byId('w1-copy').addEventListener('click', copyReview);
byId('w1-export').addEventListener('click', exportReview);
byId('w1-use-example').addEventListener('click', () => {
  let added = 0;
  answerInputs.forEach(input => {
    if (input.value.trim()) return;
    const example = document.querySelector(`[data-w1-example="${input.dataset.w1Answer}"]`);
    if (!example) return;
    const source = example.closest('article').querySelector('.example-source');
    input.value = '【助手示范，可改写】\n\n' + example.innerText.trim() + (source ? '\n\n来源：' + source.href : '');
    added++;
  });
  if (!added) {
    byId('example-status').textContent = '复盘栏都有内容，已保留现有草稿；示范可在上方阅读或下载。';
    return;
  }
  const saved = saveReview();
  byId('example-status').textContent = `已填入 ${added} 个空白复盘栏，已有内容未改动。${saved ? '草稿已保存。' : '本地保存失败，请及时导出。'}`;
});
byId('notes').addEventListener('input', saveNotes);
byId('notes-week').addEventListener('change', () => {
  const select = byId('notes-week');
  if (!saveNotes()) {
    select.value = activeNotesKey === notesKey ? 'legacy' : activeNotesKey.replace('productRoadmapNotesV2-', '');
    return;
  }
  activeNotesKey = select.value === 'legacy' ? notesKey : 'productRoadmapNotesV2-' + select.value;
  byId('notes').value = readText(activeNotesKey) || '';
  byId('notes').placeholder = select.value === 'legacy' ? '原有的通用笔记保留在这里。' : '本周读了什么：\n我的理解与案例依据：\n讨论后的修正：\n尚未解决的问题：';
  byId('saveStatus').textContent = '已切换记录，输入后自动保存';
});
byId('notes-export').addEventListener('click', () => {
  const select = byId('notes-week');
  const label = select.options[select.selectedIndex].textContent;
  const blob = new Blob(['# ' + label + '\n\n' + (byId('notes').value || '（尚未填写）')], {type:'text/markdown;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url; anchor.download = 'learning-notes-' + select.value + '.md';
  document.body.append(anchor); anchor.click(); anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  byId('saveStatus').textContent = '已生成当前记录的 Markdown 文件';
});
