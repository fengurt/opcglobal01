import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { useState, useMemo, useCallback } from "react";
import { ChevronDown, ChevronUp, ArrowDownAZ } from "lucide-react";

export default function Experts() {
  const { t, language } = useLanguage();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [sortAlpha, setSortAlpha] = useState(false);
  const { data: experts = [], isLoading } = trpc.experts.visible.useQuery();
  
  const getLocalizedField = useCallback((expert: typeof experts[0], field: 'name' | 'role' | 'title' | 'bio') => {
    const langMap: Record<string, 'En' | 'Zh' | 'Fr' | 'Ja'> = {
      en: 'En', zh: 'Zh', fr: 'Fr', ja: 'Ja',
    };
    const suffix = langMap[language] || 'En';
    const key = `${field}${suffix}` as keyof typeof expert;
    const fallbackKey = `${field}En` as keyof typeof expert;
    return (expert[key] as string) || (expert[fallbackKey] as string) || '';
  }, [language]);
  
  // Sort experts: by displayOrder (default) or alphabetically
  // This hook MUST be before any conditional returns
  const sortedExperts = useMemo(() => {
    if (!sortAlpha) return [...experts].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
    return [...experts].sort((a, b) => {
      const langMap: Record<string, 'En' | 'Zh' | 'Fr' | 'Ja'> = {
        en: 'En', zh: 'Zh', fr: 'Fr', ja: 'Ja',
      };
      const suffix = langMap[language] || 'En';
      const nameA = ((a as any)[`name${suffix}`] || a.nameEn || '').toLowerCase();
      const nameB = ((b as any)[`name${suffix}`] || b.nameEn || '').toLowerCase();
      return nameA.localeCompare(nameB, language === 'zh' ? 'zh-CN' : language === 'ja' ? 'ja' : 'en');
    });
  }, [experts, sortAlpha, language]);
  
  if (isLoading) {
    return (
      <section id="experts" className="section-padding">
        <div className="container">
          <div className="text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-muted rounded w-48 mx-auto" />
              <div className="h-4 bg-muted rounded w-80 mx-auto" />
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  if (experts.length === 0) return null;
  
  return (
    <section id="experts" className="section-padding">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[11px] text-muted-foreground uppercase tracking-[0.2em] mb-4">
            {language === 'zh' ? '共创教练团' : language === 'ja' ? '共創コーチ' : language === 'fr' ? 'Coachs Co-Création' : 'Co-Creation Coaches'}
          </p>
          <h2 className="mb-5 text-foreground">{t('experts.title')}</h2>
          <div className="section-divider mb-6" />
          <p className="text-muted-foreground text-sm leading-relaxed">
            {t('experts.subtitle')}
          </p>
          
          {/* Sort toggle */}
          <button
            onClick={() => setSortAlpha(!sortAlpha)}
            className={`mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border rounded-full transition-colors ${
              sortAlpha 
                ? 'border-accent/40 bg-accent/5 text-accent' 
                : 'border-border text-muted-foreground hover:border-accent/30'
            }`}
          >
            <ArrowDownAZ className="w-3.5 h-3.5" />
            {language === 'zh' ? 'A-Z 排序' : language === 'ja' ? 'A-Z ソート' : language === 'fr' ? 'Tri A-Z' : 'Sort A-Z'}
          </button>
        </div>

        {/* Expert Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {sortedExperts.map((expert) => {
            const isExpanded = expandedId === expert.id;
            const bio = getLocalizedField(expert, 'bio');
            
            return (
              <div 
                key={expert.id} 
                className="bg-card border border-border p-5 md:p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_4px_24px_oklch(0.15_0.03_250/0.06)]"
              >
                <div className="flex items-start gap-3.5">
                  {/* Avatar */}
                  {expert.avatarUrl ? (
                    <img 
                      src={expert.avatarUrl} 
                      alt={getLocalizedField(expert, 'name')}
                      className="w-12 h-12 rounded-full object-cover border border-border flex-shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center text-base font-semibold text-foreground/60 flex-shrink-0" style={{ fontFamily: 'var(--font-heading)' }}>
                      {getLocalizedField(expert, 'name').charAt(0)}
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-sm mb-0.5" style={{ fontFamily: 'var(--font-sans)' }}>
                      {getLocalizedField(expert, 'name')}
                    </h3>
                    <p className="text-xs text-accent font-medium mb-0.5">
                      {getLocalizedField(expert, 'title')}
                    </p>
                    {getLocalizedField(expert, 'role') && (
                      <p className="text-[11px] text-muted-foreground">
                        {getLocalizedField(expert, 'role')}
                      </p>
                    )}
                  </div>
                </div>
                
                {bio && (
                  <div className="mt-3.5">
                    <p className={`text-xs text-muted-foreground leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
                      {bio}
                    </p>
                    {bio.length > 120 && (
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : expert.id)}
                        className="mt-1.5 text-[11px] text-accent hover:underline flex items-center gap-0.5"
                      >
                        {isExpanded ? (
                          <>
                            {language === 'zh' ? '收起' : language === 'ja' ? '閉じる' : language === 'fr' ? 'Réduire' : 'Less'}
                            <ChevronUp className="w-3 h-3" />
                          </>
                        ) : (
                          <>
                            {language === 'zh' ? '展开' : language === 'ja' ? '続きを読む' : language === 'fr' ? 'Voir plus' : 'More'}
                            <ChevronDown className="w-3 h-3" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
