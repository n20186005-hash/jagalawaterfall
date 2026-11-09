import { useLocale } from 'next-intl';

const content = {
  en: {
    title: 'Practical information: sources and review',
    credit: 'Source recommendations and editorial feedback provided by Liis Kurm, Visit Harju / Harju Ettevõtlus- ja Arenduskeskus (Harju-, Rapla-, Läänemaa DMO), in an email dated 3 November 2026.',
    date: 'Public-source review: 9 November 2026. This is not an on-site inspection or an endorsement of this guide.',
    details: 'Visit Harju lists information boards, a dry toilet and free parking. The parish reports a south-bank coffee vending machine. Current platform and boardwalk arrangements, toilet availability and wheelchair or stroller routes still require local confirmation. For buses, check both directions and the final walk for your travel date on Peatus.ee.',
    safety: 'Safety advice: keep children on dry land under close supervision. Do not swim or wade near the falls or walk on river ice. A blanket legal swimming ban has not been established by this review; obey local signs and current restrictions.',
  },
  zh: {
    title: '实用信息来源与核查说明',
    credit: '本次资料线索及修订建议由 Visit Harju / Harju Ettevõtlus- ja Arenduskeskus（Harju-, Rapla-, Läänemaa DMO）的 Liis Kurm 提供，邮件日期为 2026 年 11 月 3 日。',
    date: '公开资料核查日期：2026 年 11 月 9 日。本次为资料核查，非实地检查，也不代表对本指南的官方背书。',
    details: 'Visit Harju 景点页列有信息牌、旱厕和免费停车；市政通报提及南岸咖啡自动售货机。观景平台、木栈道、厕所实际开放及轮椅或婴儿车路线仍需向当地确认。公交请在 Peatus.ee 按出行日期核对往返班次、站点及最后步行路段。',
    safety: '安全建议：儿童应在成人近距离照看下留在稳固干燥的岸上，不要在瀑布附近游泳、涉水或走上河面冰层。本次未核实全面法定禁泳令；请遵守现场标志和主管机关现行限制。',
  },
  et: {
    title: 'Praktilise teabe allikad ja kontroll',
    credit: 'Allikasoovitused ja parandusettepanekud edastas Liis Kurm, Visit Harju / Harju Ettevõtlus- ja Arenduskeskus (Harju-, Rapla-, Läänemaa DMO), 3. novembri 2026 e-kirjas.',
    date: 'Avalike allikate kontroll: 9. november 2026. See ei ole kohapealne ülevaatus ega juhendi ametlik heakskiit.',
    details: 'Visit Harju loetleb infotahvlid, kuivkäimla ja tasuta parkimise. Valla teates mainitakse lõunakalda kohviautomaati. Vaateplatvormide ja laudteede olemasolu ning seisukord, tualeti kasutatavus ja ratastooli või lapsevankri jaoks sobiv teekond tuleb kohapealselt üle kontrollida. Bussireisi puhul kontrollige Peatus.ee kaudu mõlemat sõidusuunda, peatust ja viimast jalgsiteekonda oma reisikuupäeval.',
    safety: 'Ohutussoovitus: hoidke lapsed täiskasvanu vahetu järelevalve all kuival ja kindlal kaldal. Ärge ujuge ega kahlake joa lähedal ega astuge jõejääle. Selle kontrolliga ei ole tuvastatud üldist õiguslikku ujumiskeeldu; järgige kohapealseid silte ja kehtivaid piiranguid.',
  },
};
const sources = [
  ['Visit Harju — Jägala Waterfall', 'https://visitharju.ee/en/jagala-waterfall/'],
  ['Jõelähtme Vallavalitsus', 'https://www.joelahtme.ee/kontakt'],
  ['Jõelähtme — 04.11.2026', 'https://www.joelahtme.ee/uudised/joelahtme-vallavalitsuse-infokiri-0810-03112026'],
  ['Keskkonnaamet', 'https://keskkonnaamet.ee/keskkonnaamet-uudised-kontakt/uldkontaktid-meie-kontorid'],
  ['Peatus.ee', 'https://peatus.ee/'],
  ['EPIKoda', 'https://epikoda.ee/'],
  ['Juhised looduses liikujale', 'https://www.loodusturism.com/juhisedlooduses'],
];

export default function SourceReview() {
  const locale = useLocale();
  const c = content[locale as keyof typeof content] || content.en;
  return (
    <section id="sources-review" className="section-padding" aria-labelledby="sources-review-title">
      <div className="max-w-5xl mx-auto rounded-xl p-5 sm:p-8 space-y-4" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
        <h2 id="sources-review-title" className="font-display text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>{c.title}</h2>
        <p className="leading-relaxed">{c.credit}</p>
        <p className="text-sm">{c.date}</p>
        <p className="leading-relaxed">{c.details}</p>
        <p className="leading-relaxed">{c.safety}</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {sources.map(([name, url]) => <li key={url}><a href={url} className="underline underline-offset-4 break-words">{name}</a></li>)}
        </ul>
      </div>
    </section>
  );
}
