# AI Product Learning Roadmap

当前首页是面向 SaaS 实践的 **4 周产品设计学习计划**：发现并选择重要需求 → 设计交互 → 验证需求效果 → 判断产品价值。每周约 2–3 小时，允许跨周完成。

原有六阶段路线、Week 1 三篇 Growth.Design 与完整示范保存在 `foundations.html`；历史存储键与字段顺序保持不变。

正式学习计划与后续讨论以这个仓库和 [GitHub Pages 网站](https://1iamm.github.io/ai-product-learning-roadmap/) 为准。其他实验性 Demo 不代表用户已学材料。

每周包含目标、指定阅读范围与来源日期、时间建议、一个作业、三条验收标准和可保存的结构化笔记。

## 当前 4 周计划（2026-10-19）

1. 发现与取舍：Product Talk 的 API 需求发现案例、客户访谈、机会解决方案树；交付需求判断卡。
2. 交互设计：NN/g Task Analysis 与 Wireflows；交付两套草图、一条任务流程及选择理由。
3. 需求验证：NN/g Usability Testing 101 与 Product Talk Outcomes vs. Outputs；交付需求验证卡与任务测试记录。
4. 产品判断：SVPG Product Model Concepts，回读案例和 Outcomes；交付一页产品判断备忘录。

以公开案例为默认练习材料，可选择自己的 SaaS。可视化后台是教学延伸，原文没有该界面。没有真实用户和数据时交付验证方案，标记未知；助手评审与自测不能冒充用户证据。

主阅读共 8 篇，部分跨周复用。年份较早的 NN/g 方法文明确标注；来源发布日期、更新/复核日期和本次核查日期分别列出。Product Talk 文末付费 Outcome Coach 不是学习要求。

阅读、草稿、自检分别记录，不自动推断掌握程度。支持复制讨论提纲、单周和全课程 Markdown 导出。所有内容为静态 HTML，可不启用脚本阅读。

## GitHub Pages

发布源建议使用：`main` 分支 + `/ (root)`。

## 历史路线 Week 1 固定材料

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

- 当前课程：`index.html`、`product-design.css`、`product-design.js`。
- 历史路线：`foundations.html`、`review.css`、`roadmap.js`，以及 `week1-worked-example.md`。
- 旧首页片段链接（例如 `#week1-example`、`#b2b-guide`）在启用脚本时转到历史页面；新周次使用 `#pd-week1` 至 `#pd-week4`。
- 无构建步骤。可用 `python3 -m http.server 4174 --bind 127.0.0.1` 本地预览。
- 网站不上传学习记录，不与助手自动同步；通过复制内容回对话衔接。跨设备前请导出备份。
- 原有 `productRoadmapProgressV1` 按 18 个 `[data-task]` 的顺序存储；不可直接重排。
- 原有笔记键 `productRoadmapNotesV1` 保留；新增 `productRoadmapWeek1ReviewV1` 和 `productRoadmapNotesV2-week2` 至 `week6`。
- 链接核查日期与文章发表日期不同；不因页脚年份推断资料新旧。

- 新课程使用 `productDesignCourse202610V1-week1` 至 `week4`，读物/答案/自检按命名 ID 存储，不重用旧周次键。
- 无效的新课程存档会保留原始值并阻止自动覆盖；存储不可用时保留当前输入，提示复制或导出。
- 发布仍通过原 GitHub Pages `main` / root；没有迁移到其他托管服务。
