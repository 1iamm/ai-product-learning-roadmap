# AI Product Learning Roadmap

面向工程师的六阶段产品、UX、Product Analytics、Growth 学习路线。Week 表示建议顺序，不是固定六周内完成的承诺。

正式学习计划与后续讨论以这个仓库和 [GitHub Pages 网站](https://1iamm.github.io/ai-product-learning-roadmap/) 为准。其他实验性 Demo 不代表用户已学材料。

每个阶段包含：

1. 学什么
2. 学习资料链接
3. 怎么验证
4. 学完会收获什么

## GitHub Pages

发布源建议使用：`main` 分支 + `/ (root)`。

## Week 1 固定材料

1. Growth.Design: [Headspace — Jobs-to-be-Done](https://growth.design/case-studies/headspace-user-onboarding)
2. Growth.Design: [McDonald’s Self-Serve UX](https://growth.design/case-studies/mcdonalds-self-serve-ux)
3. Growth.Design: [Blinkist Onboarding](https://growth.design/case-studies/blinkist-user-onboarding)

复盘围绕 User Need、JTBD、User Journey、Friction。优先用原文案例讨论，不要求提供自己的业务，不把阅读、填写或勾选当作掌握。

## 2026-09-23 更新

- 添加 Week 1 逐篇复盘、跨案例总结、疑问、自检、复制讨论提纲和 Markdown 导出。
- 阅读标记、复盘草稿、练习勾选分开；原有任务顺序与 V1 存储键不变。
- 所有原有实战任务保留为选做，添加阶段阅读范围和周次导航。
- Mixpanel 资料直达正文与相关章节；Week 3 添加具体的 2026 年文章；Week 5 区分必读概念和案例选读。
- 通用历史笔记单独保留，Week 2–6 可各自记录和导出。
- 添加由助手整理的 Week 1 完整示范（四道复盘题与疑问），包含来源、观察、解释与建议的边界。支持下载及仅填入空白复盘栏；不覆盖已有回答或自动勾选自检。Week 2 起由学习者先作答。

## 2026-09-24 B 端补充

- 增加 B2B 学习导航，保留 Week 1 的三篇材料与助手示范。
- Week 2：Trello 案例 + Mixpanel Account Analytics（2025）激活小节；分别理解个人与团队首次价值。
- Week 3：保留两篇主阅读，替换选读为 SVPG 企业软件设计（2018）。明确它是较早的角色关系基础材料。
- Week 4：漏斗 + Group Analytics 指定章节，Cohorts 选读；区分个人／组织口径、角色与事件归属。
- Week 5：留存概念 + Mixpanel 客户团队实践（2025）；区分持续采用、账户健康与续费。
- Week 6：复用已读材料，整合角色、流程、状态、指标、权限、异常恢复和 Agent 分工。
- 每周新增一个 B 端复盘问题，可跳到对应周笔记；已有笔记保留。Week 2 起由学习者先写，不自动填示范。
- 核心新增材料：
  - [Account Analytics（2025-02-25）](https://mixpanel.com/blog/mixpanel-account-analytics-b2b/)
  - [Customer health / renewals（2025-01-24）](https://mixpanel.com/blog/how-b2b-saas-account-teams-use-mixpanel-customer-health-renewals/)
  - [Group Analytics（持续更新的文档）](https://docs.mixpanel.com/docs/data-structure/group-analytics)
  - [Enterprise Software Design（2018-12-27，选读）](https://www.svpg.com/design-in-enterprise-software-companies/)

## 维护与数据

- `index.html`：路线和复盘内容；`review.css`：新增布局；`roadmap.js`：本地记录和导出。
- 无构建步骤。可用 `python3 -m http.server 4174 --bind 127.0.0.1` 本地预览。
- 网站不上传学习记录，不与助手自动同步；通过复制内容回对话衔接。跨设备前请导出备份。
- 原有 `productRoadmapProgressV1` 按 18 个 `[data-task]` 的顺序存储；不可直接重排。
- 原有笔记键 `productRoadmapNotesV1` 保留；新增 `productRoadmapWeek1ReviewV1` 和 `productRoadmapNotesV2-week2` 至 `week6`。
- 链接核查日期与文章发表日期不同；不因页脚年份推断资料新旧。
