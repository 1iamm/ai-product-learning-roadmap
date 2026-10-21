'use strict';

(() => {
  const legacy = JSON.parse(document.querySelector('meta[name="legacy-anchors"]').content);
  const foundations = JSON.parse(document.querySelector('meta[name="foundation-anchors"]').content);
  function openLegacyAnchor() {
    let fragment;
    try { fragment = decodeURIComponent(location.hash.slice(1)); } catch { return false; }
    if (!fragment || document.getElementById(fragment)) return false;
    const destination = legacy.includes(fragment) ? 'foundations.html' : foundations.includes(fragment) ? 'product-design-foundations.html' : null;
    if (!destination) return false;
    location.replace(destination + location.search + location.hash);
    return true;
  }
  if (openLegacyAnchor()) return;
  addEventListener('hashchange', openLegacyAnchor);
  const prefix = 'productCaseStudies20261021V1-week';
  const weeks = [...document.querySelectorAll('[data-week]')];
  const blockedWeeks = new Set();
  const warning = document.getElementById('case-storage-warning');
  const warningMessages = new Set();
  function warn(message) {
    warningMessages.add(message);
    warning.textContent = [...warningMessages].join(' ');
    warning.hidden = false;
  }
  function snapshot(section) {
    return {
      version: 1,
      read: Object.fromEntries([...section.querySelectorAll('[data-read]')].map(el => [el.dataset.read, el.checked])),
      answers: Object.fromEntries([...section.querySelectorAll('[data-answer]')].map(el => [el.dataset.answer, el.value])),
      checks: Object.fromEntries([...section.querySelectorAll('[data-check]')].map(el => [el.dataset.check, el.checked])),
      updatedAt: new Date().toISOString()
    };
  }
  function update(section) {
    const count = selector => [...section.querySelectorAll(selector)];
    const reading = count('[data-read]');
    const drafts = count('[data-answer]').filter(el => el.value.trim()).length;
    const checked = count('[data-check]').filter(el => el.checked).length;
    document.getElementById('status-week' + section.dataset.week).textContent =
      `阅读 ${reading.filter(el => el.checked).length}/${reading.length} · ${drafts ? drafts + '/4 题有草稿' : '尚无草稿'} · 自检 ${checked}/3`;
  }
  function save(section) {
    const n = section.dataset.week;
    const status = document.getElementById('save-week' + n);
    update(section);
    if (blockedWeeks.has(n)) {
      status.textContent = '原记录未覆盖，请导出本次草稿';
      return;
    }
    try {
      localStorage.setItem(prefix + n, JSON.stringify(snapshot(section)));
      status.textContent = '已保存到当前浏览器';
    } catch {
      status.textContent = '保存失败，请及时复制或导出';
      warn('浏览器本地保存不可用。请保持页面打开，及时复制或导出当前草稿。');
    }
  }
  function load(section) {
    const n = section.dataset.week;
    let raw;
    try { raw = localStorage.getItem(prefix + n); }
    catch {
      warn('无法读取本地记录。可以继续填写，建议及时导出备份。');
      blockedWeeks.add(n);
      document.getElementById('save-week' + n).textContent = '本地记录不可读，请导出本次草稿';
      update(section);
      return;
    }
    if (raw !== null) {
      try {
        const state = JSON.parse(raw);
        const object = value => value && typeof value === 'object' && !Array.isArray(value);
        if (!object(state) || state.version !== 1 || !object(state.answers) || !object(state.read) || !object(state.checks)) throw new Error('Invalid saved course data');
        section.querySelectorAll('[data-read]').forEach(el => { el.checked = state.read[el.dataset.read] === true; });
        section.querySelectorAll('[data-check]').forEach(el => { el.checked = state.checks[el.dataset.check] === true; });
        section.querySelectorAll('[data-answer]').forEach(el => {
          const answer = state.answers[el.dataset.answer];
          el.value = typeof answer === 'string' ? answer : '';
        });
        document.getElementById('save-week' + n).textContent = '已恢复当前浏览器的记录';
      } catch {
        blockedWeeks.add(n);
        warn(`第 ${n} 周原有记录格式无法读取，已保留原值；本次填写请复制或导出。`);
        document.getElementById('save-week' + n).textContent = '原记录未覆盖，请导出本次草稿';
      }
    }
    update(section);
  }
  function weekMarkdown(section) {
    const n = section.dataset.week;
    const title = section.querySelector('.week-heading h2').textContent;
    const readings = [...section.querySelectorAll('.reading')].map(card => {
      const link = card.querySelector('h4 a');
      return `- [${card.querySelector('[data-read]').checked ? 'x' : ' '}] [${link.textContent.trim()}](${link.href})\n  ${card.querySelector('.scope').textContent.trim()}`;
    });
    const answers = [...section.querySelectorAll('[data-answer]')].map(input => {
      const label = section.querySelector(`label[for="${input.id}"]`).textContent;
      return `### ${label}\n\n${input.value.trim() || '（尚未填写 / 待验证）'}`;
    });
    const checks = [...section.querySelectorAll('.check-item')].map(label => `- [${label.querySelector('input').checked ? 'x' : ' '}] ${label.textContent.trim()}`);
    return [
      `## Week ${n} · ${title}`,
      '学习计划：https://1iamm.github.io/ai-product-learning-roadmap/#case-week' + n,
      section.querySelector('.week-question').textContent,
      '### 阅读标记\n\n' + readings.join('\n'),
      '### 本周练习\n\n' + [...section.querySelectorAll('.assignment li')].map((el, i) => `${i + 1}. ${el.textContent}`).join('\n'),
      '练习边界：' + section.querySelector('.thinking-note p').textContent,
      '### 图示与证据边界\n\n' + [...section.querySelectorAll('.case-card')].map(card => `- ${card.querySelector('h3').textContent}：${card.querySelector('.evidence-limit').textContent}\n  图示：${card.querySelector('figcaption p').textContent}\n  ${new URL(card.querySelector('.diagram-download a').getAttribute('href'), 'https://1iamm.github.io/ai-product-learning-roadmap/').href}`).join('\n'),
      ...answers,
      '### 我的自检（不代表已通过验收）\n\n' + checks.join('\n')
    ].join('\n\n');
  }
  const discussion = '## 希望怎样讨论\n\n请围绕本周目标评审我的判断：先指出证据是否充分、问题与方案是否混淆、取舍和验证方式是否合理，再一次追问一个关键问题。不要直接替我补全答案，也不要把草稿或勾选视为掌握。原文事实、作者陈述、我的假设和真实测试结果请分开。默认沿用公开案例；模拟界面不是原产品界面，助手推演不是真实用户证据。最后帮助我修订结论和待验证项。';
  function documentText(sections, forDiscussion = false) {
    return [
      '# 6 周产品设计与经营学习记录',
      '版本：2026.10.21 · 案例进阶版；与此前基础路线及 Growth.Design 记录独立。',
      ...sections.map(weekMarkdown),
      forDiscussion ? discussion : '',
      '导出时间：' + new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }) + '（北京时间）'
    ].filter(Boolean).join('\n\n');
  }
  function download(text, filename) {
    const url = URL.createObjectURL(new Blob([text], { type: 'text/markdown;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  weeks.forEach(section => {
    load(section);
    section.querySelectorAll('[data-read], [data-check]').forEach(el => el.addEventListener('change', () => save(section)));
    section.querySelectorAll('[data-answer]').forEach(el => el.addEventListener('input', () => save(section)));
    section.querySelector('[data-export-week]').addEventListener('click', () => {
      download(documentText([section]), `product-case-study-week${section.dataset.week}.md`);
      document.getElementById('save-week' + section.dataset.week).textContent = '已生成本周 Markdown 文件';
    });
    section.querySelector('[data-copy-week]').addEventListener('click', async () => {
      const text = documentText([section], true);
      try {
        await navigator.clipboard.writeText(text);
        document.getElementById('save-week' + section.dataset.week).textContent = '已复制，请粘贴回对话';
      } catch {
        const input = document.getElementById('case-copy-content');
        input.value = text;
        document.getElementById('case-copy-dialog').showModal();
        input.focus();
        input.select();
      }
    });
  });
  function openWorkbook() {
    const match = location.hash.match(/^#case-work([1-6])$/);
    if (match) document.getElementById('case-work' + match[1]).open = true;
  }
  openWorkbook();
  addEventListener('hashchange', openWorkbook);
  document.querySelectorAll('[data-open-work]').forEach(link => link.addEventListener('click', () => {
    document.getElementById('case-work' + link.dataset.openWork).open = true;
  }));
  document.getElementById('case-export-all').addEventListener('click', () => {
    download(documentText(weeks), 'product-case-study-six-week-notes.md');
  });
  document.querySelectorAll('.diagram-switch').forEach(switcher => {
    const figure = switcher.closest('figure');
    const show = id => {
      figure.querySelectorAll('[data-diagram]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.diagram === id)));
      figure.querySelectorAll('[data-panel]').forEach(panel => { panel.hidden = panel.dataset.panel !== id; });
    };
    switcher.querySelectorAll('button').forEach(button => button.addEventListener('click', () => show(button.dataset.diagram)));
    show('wireflow');
  });
  let scrollQueued = false;
  function updateCurrentWeek() {
    scrollQueued = false;
    const active = [...weeks].reverse().find(section => section.getBoundingClientRect().top <= 130);
    document.querySelectorAll('.week-nav a').forEach(link => {
      if (active && link.hash === '#' + active.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  addEventListener('scroll', () => {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(updateCurrentWeek);
  }, { passive: true });
  updateCurrentWeek();
})();
