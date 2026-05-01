import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, Check, Zap, Brain, Wrench, Palette, Network, BookOpen, Target, Award } from "lucide-react";
import { Reveal, SectionHeading, Counter } from "@/components/motion";

type Lang = "en" | "zh" | "fr" | "ja";
const tx = (m: Partial<Record<Lang, string>>, lang: string) => m[lang as Lang] || m.en || "";

export default function Uni() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[70vh] flex items-center section-deep-blue overflow-hidden">
        <div className="absolute inset-0 pattern-overlay pointer-events-none opacity-30" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        <div className="container relative z-10 text-center py-24 md:py-32">
          <Reveal>
            <span className="badge-official mb-8 inline-block">OPC UNI</span>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-white max-w-4xl mx-auto mb-6">
              {tx({
                zh: "智慧大脑与教育中台",
                en: "The Mind \u2014 Education & Intelligence Hub",
              }, language)}
            </h1>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-4">
              {tx({
                zh: "世界第一所由 AI 担任法定校长的教育实体。输出国际认证体系，确保个体具备 0.5/3/2 高效能素养。",
                en: "The world\u2019s first educational entity with an AI legal principal. Delivering international certification for the 0.5/3/2 high-performance paradigm.",
              }, language)}
            </p>
          </Reveal>
          <Reveal delay={0.5}>
            <p className="text-white/55 text-sm max-w-lg mx-auto">
              {tx({
                zh: "认证的唯一标准是真实的商业交付流水",
                en: "The sole certification standard is real commercial delivery revenue",
              }, language)}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="section-padding-sm border-b border-border/30 bg-background">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto text-center">
            {[
              { num: 500, suffix: "+", label: { zh: "认证教练", en: "Certified Coaches" } },
              { num: 20, suffix: "+", label: { zh: "国家/地区", en: "Countries" } },
              { num: 50, suffix: "+", label: { zh: "专业领域", en: "Specializations" } },
              { num: 10, suffix: "K+", label: { zh: "学员", en: "Learners" } },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div>
                  <div className="stat-number"><Counter value={s.num} />{s.suffix}</div>
                  <p className="text-sm text-muted-foreground mt-1">{tx(s.label, language)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ L1-L3 CERTIFICATION ═══ */}
      <section className="section-padding bg-background">
        <div className="container">
          <SectionHeading
            label={tx({ zh: "OPC+X 国际教练认证体系", en: "OPC+X International Coach Certification" }, language)}
            title={tx({ zh: "五级认证 \u00B7 以交付流水为唯一标准", en: "Five Tiers \u00B7 Revenue as the Only Standard" }, language)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-6xl mx-auto">
            {[
              {
                level: "L1", title: { zh: "认证教练", en: "Certified" },
                sub: "Foundation",
                desc: { zh: "掌握 AI 基础工具，具备独立产能与陪跑能力。", en: "Master AI foundational tools, independent productivity." },
                revenue: { zh: "首个交付项目", en: "First delivery project" },
              },
              {
                level: "L1+", title: { zh: "专精教练", en: "Specialist" },
                sub: "Domain Expert",
                desc: { zh: "叠加特定领域的 AI 专长。", en: "Layer domain-specific AI expertise." },
                revenue: { zh: "垂直领域深耕", en: "Vertical domain depth" },
              },
              {
                level: "L2", title: { zh: "首席教练", en: "Principal" },
                sub: "Senior Practitioner",
                desc: { zh: "资深实战派。服务 OPC 年营业额达 500 万。", en: "Senior practitioner. Annual service revenue \u00A55M." },
                revenue: "\u00A55M / year",
              },
              {
                level: "L2 Pro", title: { zh: "领袖教练", en: "Master" },
                sub: "Industry Leader",
                desc: { zh: "行业领袖。自身年营收 1000 万+。", en: "Industry leader. Personal annual revenue \u00A510M+." },
                revenue: "\u00A510M+ / year",
              },
              {
                level: "L3", title: { zh: "泰坦荣誉俱乐部", en: "Titan Club" },
                sub: "By Invitation Only",
                desc: { zh: "生态精神标杆。年营收 5000 万+。仅限邀请。", en: "Ecosystem benchmark. Revenue \u00A550M+. Invitation only." },
                revenue: "\u00A550M+ / year",
              },
            ].map((cert, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="card-premium h-full flex flex-col">
                  <span className="text-2xl font-bold text-gold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                    {cert.level}
                  </span>
                  <h3 className="text-sm font-medium text-foreground mb-0.5">
                    {tx(cert.title, language)}
                  </h3>
                  <p className="text-xs text-muted-foreground/75 mb-3">{cert.sub}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {tx(cert.desc, language)}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-gold/70 font-medium pt-3 border-t border-border/30">
                    <Check className="w-3 h-3" />
                    {typeof cert.revenue === "string" ? cert.revenue : tx(cert.revenue, language)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DIGITAL EXOSKELETON ═══ */}
      <section className="section-padding section-deep-blue relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay pointer-events-none opacity-30" />
        <div className="container relative z-10">
          <SectionHeading
            label={tx({ zh: "数字外骨骼", en: "Digital Exoskeleton" }, language)}
            title={tx({ zh: "四层技术栈 \u00B7 2025 黄金工具矩阵", en: "Four-Layer Stack \u00B7 2025 Golden Tool Matrix" }, language)}
            dark
          />

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Brain,
                name: "The Brain",
                label: { zh: "思考引擎", en: "Thinking Engine" },
                tools: "ChatGPT \u00B7 Claude \u00B7 Gemini \u00B7 DeepSeek \u00B7 Grok",
                desc: { zh: "大语言模型作为认知核心", en: "LLMs as the cognitive core" },
              },
              {
                icon: Wrench,
                name: "The Builder",
                label: { zh: "构建引擎", en: "Construction Engine" },
                tools: "Cursor \u00B7 Bolt.new \u00B7 Replit \u00B7 v0 \u00B7 Manus",
                desc: { zh: "AI 原生开发与构建", en: "AI-native development & building" },
              },
              {
                icon: Palette,
                name: "The Creative",
                label: { zh: "创意引擎", en: "Creative Engine" },
                tools: "Midjourney \u00B7 Sora \u00B7 Kling \u00B7 ElevenLabs \u00B7 Suno",
                desc: { zh: "多模态内容生成", en: "Multi-modal content generation" },
              },
              {
                icon: Network,
                name: "The Nervous System",
                label: { zh: "编排引擎", en: "Orchestration Engine" },
                tools: "n8n \u00B7 Make \u00B7 Zapier \u00B7 Dify \u00B7 Coze",
                desc: { zh: "工作流自动化与智能体编排", en: "Workflow automation & agent orchestration" },
              },
            ].map((layer, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="glass-card-dark p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <layer.icon className="w-5 h-5 text-gold/70" />
                    <div>
                      <span className="text-base font-medium text-white">{layer.name}</span>
                      <span className="text-sm text-white/65 ml-2">{tx(layer.label, language)}</span>
                    </div>
                  </div>
                  <p className="text-sm text-white/65 mb-3">{tx(layer.desc, language)}</p>
                  <p className="text-sm text-white/70 tracking-wide">{layer.tools}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THINK TANK & RESEARCH ═══ */}
      <section className="section-padding bg-background">
        <div className="container max-w-4xl">
          <SectionHeading
            label={tx({ zh: "智库与研究", en: "Think Tank & Research" }, language)}
            title={tx({ zh: "不只是培训，更是知识生产", en: "Beyond Training: Knowledge Production" }, language)}
          />

          <div className="grid md:grid-cols-2 gap-8">
            <Reveal>
              <div className="card-premium h-full">
                <h3 className="text-lg text-foreground mb-3">
                  {tx({ zh: "智库咨询", en: "Strategic Consulting" }, language)}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {tx({
                    zh: "汇聚全球顶尖共创教练，为企业、政府和投资方提供基于真实交付经验的战略咨询服务。不是纸上谈兵，而是从实战中提炼的方法论。",
                    en: "Assembling top global co-creation coaches to provide strategic consulting based on real delivery experience. Methodology distilled from real-world practice.",
                  }, language)}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="card-premium h-full">
                <h3 className="text-lg text-foreground mb-3">
                  {tx({ zh: "课题研究", en: "Frontier Research" }, language)}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {tx({
                    zh: "围绕超级个体经济学、液态协作治理等前沿议题，持续输出具有公信力的研究成果。为全球政策制定者提供数据支撑。",
                    en: "Continuously producing credible research on frontier topics like super-individual economics and liquid collaboration governance.",
                  }, language)}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ UNIVERSITY PARTNERSHIP ═══ */}
      <section className="section-padding section-deep-blue relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay pointer-events-none opacity-30" />
        <div className="container relative z-10">
          <SectionHeading
            label={tx({ zh: "高校合作", en: "University Partnership" }, language)}
            title={tx({ zh: "面向高校的专业支持", en: "Professional Support for Universities" }, language)}
            dark
          />

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: { zh: "课程共建", en: "Curriculum Co-Development" },
                desc: { zh: "联合高校开发AI时代新专业，将OPC方法论融入课程体系", en: "Co-develop AI-era curricula with universities, integrating OPC methodology" },
              },
              {
                title: { zh: "师资培训", en: "Faculty Training" },
                desc: { zh: "为高校教师提供AI工具应用和实战项目指导培训", en: "Train faculty in AI tools and hands-on project guidance" },
              },
              {
                title: { zh: "创业孵化", en: "Startup Incubation" },
                desc: { zh: "对接高校科研成果与OPC生态，加速技术商业化", en: "Connect university research with OPC ecosystem to accelerate commercialization" },
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="glass-card-dark p-6">
                  <h3 className="text-base font-medium text-white mb-3">{tx(item.title, language)}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{tx(item.desc, language)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ UNICORN INCUBATION ═══ */}
      <section className="section-padding bg-background">
        <div className="container max-w-4xl">
          <SectionHeading
            label={tx({ zh: "独角兽孵化", en: "Unicorn Incubation" }, language)}
            title={tx({ zh: "从0到1的加速服务", en: "From 0 to 1 Acceleration" }, language)}
            subtitle={tx({
              zh: "为有潜力的创业项目提供全链路支持，快速成长为行业独角兽",
              en: "Full-chain support for promising startups to grow into industry unicorns",
            }, language)}
          />

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: { zh: "战略定位", en: "Strategic Positioning" },
                desc: { zh: "帮助创始人厘清商业模式，定位差异化竞争赛道", en: "Help founders clarify business models and position differentiated competitive tracks" },
              },
              {
                title: { zh: "资源对接", en: "Resource Matching" },
                desc: { zh: "对接全球订单网络、投资机构、产业专家资源", en: "Connect with global order networks, investors, and industry expert resources" },
              },
              {
                title: { zh: "团队组建", en: "Team Building" },
                desc: { zh: "协助组建OPC液态团队，搭建全球化协作架构", en: "Assist in building OPC liquid teams and establishing global collaboration frameworks" },
              },
              {
                title: { zh: "资本加速", en: "Capital Acceleration" },
                desc: { zh: "对接早期投资、RWA资产融资、战略投资人", en: "Connect with seed investment, RWA financing, and strategic investors" },
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card-premium h-full">
                  <h3 className="text-base font-medium text-foreground mb-3">{tx(item.title, language)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tx(item.desc, language)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 2025-2026 FRONTIER ═══ */}
      <section className="section-padding-sm bg-[oklch(0.98_0.003_250)]">
        <div className="container max-w-4xl">
          <Reveal>
            <p className="text-center text-xs text-muted-foreground uppercase tracking-[0.3em] mb-8">
              {tx({ zh: "2025-2026 前沿方向", en: "2025-2026 Frontier Directions" }, language)}
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { zh: "AI Agent 编排与多智能体协作", en: "AI Agent Orchestration & Multi-Agent Collaboration" },
              { zh: "MCP 生态融合", en: "MCP (Model Context Protocol) Ecosystem" },
              { zh: "AI 原生工作流自动化", en: "AI-Native Workflow Automation" },
              { zh: "个人知识库与记忆系统", en: "Personal Knowledge Base & Memory Systems" },
              { zh: "多模态内容生产流水线", en: "Multi-Modal Content Production Pipeline" },
              { zh: "去中心化身份与声誉系统", en: "Decentralized Identity & Reputation" },
            ].map((dir, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="flex items-center gap-3 p-4 border border-border/50 hover:border-gold/30 transition-all duration-300 rounded-xl bg-white/50">
                  <Zap className="w-3.5 h-3.5 text-gold/60 shrink-0" />
                  <span className="text-sm text-foreground/70">{tx(dir, language)}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW TO ENROLL ═══ */}
      <section className="section-padding bg-background">
        <div className="container max-w-4xl">
          <SectionHeading
            label={tx({ zh: "如何开始", en: "How to Get Started" }, language)}
            title={tx({ zh: "你的认证之旅", en: "Your Certification Journey" }, language)}
          />

          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {[
              {
                step: "01",
                title: { zh: "选择赛道", en: "Choose Your Track" },
                desc: {
                  zh: "根据你的行业背景和兴趣，选择适合的垂直领域。",
                  en: "Based on your industry and interests, choose a vertical domain.",
                },
                icon: BookOpen,
              },
              {
                step: "02",
                title: { zh: "实战训练", en: "Hands-On Training" },
                desc: {
                  zh: "在教练督导下完成真实商业项目。边学边赚，以交付结果为唯一考核标准。",
                  en: "Complete real commercial projects under coach supervision. Learn while earning.",
                },
                icon: Target,
              },
              {
                step: "03",
                title: { zh: "获得认证", en: "Get Certified" },
                desc: {
                  zh: "达到交付流水标准后，获得 OPC+X 国际认证。认证即通行证，解锁全球订单网络。",
                  en: "After reaching revenue standards, earn OPC+X certification. Your passport to the global order network.",
                },
                icon: Award,
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="text-center">
                  <div className="stat-number mb-4">{item.step}</div>
                  <h3 className="text-base font-medium text-foreground mb-3">
                    {tx(item.title, language)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tx(item.desc, language)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="section-padding-sm bg-[oklch(0.98_0.003_250)]">
        <div className="container max-w-2xl text-center">
          <Reveal>
            <h2 className="text-foreground mb-4">
              {tx({ zh: "开启 OPC+X 教练之旅", en: "Start Your OPC+X Coach Journey" }, language)}
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-muted-foreground mb-8">
              {tx({
                zh: "无论你是零基础的新人还是资深行业专家，OPC UNI 都有适合你的认证路径。",
                en: "Whether you\u2019re a beginner or a seasoned expert, OPC UNI has a certification path for you.",
              }, language)}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:hi@opcglobal.ai">
                <button className="btn-gold">
                  <span className="flex items-center gap-2">
                    {tx({ zh: "立即报名", en: "Enroll Now" }, language)}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              </a>
              <a href="mailto:hi@opcglobal.ai">
                <button className="btn-outline-gold">
                  <span>{tx({ zh: "联系我们", en: "Contact Us" }, language)}</span>
                </button>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
