import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { Loader2, Clock, Users, ArrowRight, Sparkles, GraduationCap } from "lucide-react";
import { useMemo } from "react";

type Language = "en" | "zh" | "fr" | "ja";

export default function Courses() {
  const { language } = useLanguage();
  const { data: courses, isLoading } = trpc.courses.visible.useQuery();

  const sortedCourses = useMemo(() => {
    if (!courses) return [];
    return [...courses].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
  }, [courses]);

  const loc = (en?: string | null, zh?: string | null, fr?: string | null, ja?: string | null) => {
    const texts: Record<Language, string | null | undefined> = { en, zh, fr, ja };
    return texts[language as Language] || en || "";
  };

  const t: Record<string, Record<Language, string>> = {
    title: { en: "Courses & Programs", zh: "课程体系", fr: "Cours et Programmes", ja: "コース＆プログラム" },
    subtitle: { en: "Empowering super-individuals with AI-driven coaching and practical skills", zh: "以AI驱动的教练式陪跑，赋能超级个体实战技能", fr: "Autonomiser les super-individus avec un coaching piloté par l'IA", ja: "AIドリブンのコーチングで実践スキルを身につける" },
    duration: { en: "Duration", zh: "课程周期", fr: "Durée", ja: "期間" },
    audience: { en: "Target Audience", zh: "适合人群", fr: "Public cible", ja: "対象者" },
    highlights: { en: "Course Highlights", zh: "课程亮点", fr: "Points forts", ja: "コースのハイライト" },
    learnMore: { en: "Learn More", zh: "了解详情", fr: "En savoir plus", ja: "詳細を見る" },
    comingSoon: { en: "Coming Soon", zh: "即将开放", fr: "Bientôt disponible", ja: "近日公開" },
    noCourses: { en: "Courses are being prepared. Stay tuned!", zh: "课程正在筹备中，敬请期待！", fr: "Les cours sont en préparation.", ja: "コースは準備中です。" },
    coachPartner: { en: "Coaching Partner Track", zh: "教练合伙人赛道", fr: "Piste Partenaire Coaching", ja: "コーチングパートナートラック" },
    aiMentor: { en: "AI Application Mentor Track", zh: "AI应用导师赛道", fr: "Piste Mentor IA", ja: "AIメンタートラック" },
    slogan: { en: "Master AI, Achieve Freedom", zh: "善用AI，终获自由", fr: "Maîtriser l'IA, Atteindre la Liberté", ja: "AIを活用し、自由を手に入れる" },
  };

  const g = (key: string) => t[key]?.[language as Language] || t[key]?.en || key;

  const getCategoryColor = (category: string | null) => {
    const colors: Record<string, string> = {
      coaching: "#A88B52",
      ai: "#3B82F6",
      business: "#059669",
      media: "#8B5CF6",
      knowledge: "#EC4899",
      startup: "#F59E0B",
      enterprise: "#0A1626",
    };
    return colors[category || ""] || "#A88B52";
  };

  const getCategoryLabel = (category: string | null): string => {
    const labels: Record<string, Record<Language, string>> = {
      coaching: { en: "Coaching", zh: "教练", fr: "Coaching", ja: "コーチング" },
      ai: { en: "AI Application", zh: "AI应用", fr: "Application IA", ja: "AI応用" },
      business: { en: "Business", zh: "商业", fr: "Affaires", ja: "ビジネス" },
      media: { en: "New Media", zh: "新媒体", fr: "Nouveaux Médias", ja: "ニューメディア" },
      knowledge: { en: "Knowledge", zh: "知识", fr: "Connaissances", ja: "知識" },
      startup: { en: "Startup", zh: "创业", fr: "Startup", ja: "スタートアップ" },
      enterprise: { en: "Enterprise", zh: "企业", fr: "Entreprise", ja: "企業" },
    };
    return labels[category || ""]?.[language as Language] || labels[category || ""]?.en || category || "";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 relative">
        <div className="absolute inset-0 pattern-overlay pointer-events-none" />
        <div className="container relative text-center">
          <span className="badge-official mb-8 inline-block">{g("slogan")}</span>
          <h1 className="max-w-3xl mx-auto mb-6 text-foreground">
            {g("title")}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {g("subtitle")}
          </p>
        </div>
      </section>

      {/* Two Tracks Overview */}
      <section className="py-12 border-y border-border/40 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-card border border-border p-6 md:p-8 hover:border-accent/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                  {g("coachPartner")}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {language === 'zh' 
                  ? '培养具备AI教练能力的合伙人，通过教练式陪跑赋能超级个体，构建可持续的教练商业模式。'
                  : 'Cultivate partners with AI coaching capabilities, empowering super-individuals through coaching accompaniment.'}
              </p>
            </div>
            <div className="bg-card border border-border p-6 md:p-8 hover:border-blue-500/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="font-semibold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                  {g("aiMentor")}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {language === 'zh' 
                  ? '深度掌握AI工具与应用场景，成为行业AI转型的引领者，帮助企业和个人实现智能化升级。'
                  : 'Master AI tools and application scenarios deeply, becoming a leader in industry AI transformation.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Cards */}
      <section className="section-padding flex-1">
        <div className="container">
          {sortedCourses.length === 0 ? (
            <div className="text-center py-16">
              <GraduationCap className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">{g("noCourses")}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {sortedCourses.map((course) => {
                const color = getCategoryColor(course.category);
                return (
                  <div key={course.id} className="bg-card border border-border overflow-hidden hover:border-accent/30 hover:shadow-[0_4px_24px_oklch(0.15_0.03_250/0.06)] transition-all duration-300 group flex flex-col">
                    {/* Color Top Bar */}
                    <div className="h-1" style={{ backgroundColor: color }} />
                    
                    <div className="p-6 flex flex-col flex-1">
                      {/* Category & Icon */}
                      <div className="flex items-center justify-between mb-4">
                        <span 
                          className="text-[10px] font-medium tracking-[0.1em] uppercase px-2 py-0.5"
                          style={{ backgroundColor: `${color}15`, color }}
                        >
                          {getCategoryLabel(course.category)}
                        </span>
                        {course.icon && (
                          <span className="text-2xl">{course.icon}</span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-foreground mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                        {loc(course.nameEn, course.nameZh, course.nameFr, course.nameJa)}
                      </h3>

                      {/* Tagline */}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                        {loc(course.taglineEn, course.taglineZh, course.taglineFr, course.taglineJa)}
                      </p>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-3 mb-4 text-xs text-muted-foreground/70">
                        {course.duration && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {course.duration}
                          </span>
                        )}
                        {(course.targetAudienceZh || course.targetAudienceEn) && (
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {language === 'zh' ? course.targetAudienceZh : course.targetAudienceEn}
                          </span>
                        )}
                      </div>

                      {/* Highlights */}
                      {course.highlights && course.highlights.length > 0 && (
                        <div className="mb-4 flex-1">
                          <ul className="space-y-1.5">
                            {(course.highlights as Array<{ en: string; zh: string; fr?: string; ja?: string }>).slice(0, 3).map((h, i) => (
                              <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                                <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: color }} />
                                {language === 'zh' ? h.zh : language === 'fr' ? (h.fr || h.en) : language === 'ja' ? (h.ja || h.en) : h.en}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="mt-auto pt-4 border-t border-border/40 flex items-center justify-between">
                        {course.priceInfo ? (
                          <span className="text-sm font-semibold" style={{ color }}>{course.priceInfo}</span>
                        ) : (
                          <span className="text-xs text-muted-foreground/50">{g("comingSoon")}</span>
                        )}
                        <span className="text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color }}>
                          {g("learnMore")}
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-deep-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay pointer-events-none opacity-30" />
        <div className="container relative text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            {language === 'zh' ? '开启你的AI赋能之旅' : 'Start Your AI Empowerment Journey'}
          </h2>
          <p className="text-white/70 mb-8 text-sm md:text-base leading-relaxed">
            {language === 'zh' 
              ? '无论你是想成为教练合伙人，还是AI应用导师，OPC都有适合你的课程路径。善用AI，终获自由。'
              : 'Whether you want to become a Coaching Partner or an AI Application Mentor, OPC has the right course path for you. Master AI, Achieve Freedom.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/partner-apply" className="btn-primary">
              {language === 'zh' ? '申请加入' : 'Apply Now'}
            </a>
            <a href="/alliance" className="btn-outline-gold">
              {language === 'zh' ? '了解联盟生态' : 'Explore Alliance'}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
