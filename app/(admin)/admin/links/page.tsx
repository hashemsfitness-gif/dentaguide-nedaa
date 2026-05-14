
import Link from 'next/link';

const LINKS = [
  {
    category: '🏢 Admin',
    items: [
      { label: 'Dashboard', href: '/admin/dashboard' },
      { label: 'Scenarier', href: '/admin/scenarios' },
      { label: 'Användare', href: '/admin/users' },
      { label: 'Analys', href: '/admin/analytics' },
    ]
  },
  {
    category: '🦷 Kliniska Områden',
    items: [
      { label: 'Endodonti', href: '/endodonti' },
      { label: 'Parodontologi', href: '/parodontologi' },
      { label: 'Protetik', href: '/protetik' },
      { label: 'Käkkirurgi', href: '/kakkirurgi' },
      { label: 'Bettfysiologi', href: '/bettfysiologi' },
      { label: 'Oralmedicin', href: '/oralmedicin' },
      { label: 'Pedodonti', href: '/pedodonti' },
      { label: 'Ortodonti', href: '/ortodonti' },
    ]
  },
  {
    category: '🛠️ Verktyg',
    items: [
      { label: 'AI-Journal', href: '/tools/journalmall/ai-assisterad' },
      { label: 'Manuell Journal', href: '/tools/journalmall/manuell' },
      { label: 'Läkemedel', href: '/tools/lakemedel' },
      { label: 'Antibiotika', href: '/tools/antibiotika' },
      { label: 'Dosering', href: '/tools/dosering' },
      { label: 'Parod-klass', href: '/tools/parod-klassificering' },
      { label: 'Trauma', href: '/tools/traumaguide' },
      { label: 'Debitering', href: '/tools/debitering' },
    ]
  },
  {
    category: '🎓 Simulator',
    items: [
      { label: 'Simulator Start', href: '/simulator' },
      { label: 'Historik', href: '/simulator/historik' },
      { label: 'Leaderboard', href: '/simulator/leaderboard' },
    ]
  }
];

export default function AdminLinksPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-display mb-8">🚀 Snabbnavigering (Admin)</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {LINKS.map((section) => (
          <div key={section.category} className="bg-white border border-border-light rounded-2xl p-6 shadow-clay">
            <h2 className="text-xl font-display mb-4 text-secondary">{section.category}</h2>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href}
                    className="flex items-center justify-between p-2 hover:bg-neutral rounded-lg transition-colors group"
                  >
                    <span className="text-ink/80 group-hover:text-ink">{item.label}</span>
                    <span className="text-xs text-secondary font-mono">/{item.href.split('/').pop()} →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="mt-12 p-6 bg-primary/10 rounded-2xl border border-primary/20">
        <p className="text-sm text-primary">
          <strong>Tips:</strong> Om det går långsamt att klicka runt i menyerna kan du använda dessa direktlänkar. 
          Du är inloggad med full access.
        </p>
      </div>
    </div>
  );
}
