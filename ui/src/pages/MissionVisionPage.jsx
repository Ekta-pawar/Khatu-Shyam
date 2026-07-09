import { PageShell, PageHeader } from "../components/PageShell";
import { Target, Eye, Heart, Star, Sparkles, Flag, Users, Calendar } from "lucide-react";

const milestones = [
  {
    year: 2011,
    title: "Samiti Founded",
    description:
      "श्री श्री खाटूश्याम सेवा समिति की स्थापना रोहिणी, दिल्ली में कुछ समर्पित श्याम प्रेमियों द्वारा की गई। पहला मासिक भजन संकीर्तन आयोजित किया गया।",
    icon: Flag,
    highlight: true,
  },
  {
    year: 2013,
    title: "Monthly Yatra Begins",
    description:
      "प्रतिमाह खाटूश्याम जी एवं सालासर बालाजी के लिए बस सेवा प्रारंभ की गई। सैकड़ों भक्तों ने पहली यात्रा में भाग लिया।",
    icon: Users,
  },
  {
    year: 2015,
    title: "First Nishan Yatra",
    description:
      "फाल्गुण माह में रींगस से खाटूधाम तक पहली 'निशान यात्रा' का सफल आयोजन किया गया, जो अब प्रतिवर्ष एक परंपरा बन चुकी है।",
    icon: Star,
  },
  {
    year: 2018,
    title: "Janmashtami Mahotsav",
    description:
      "रोहिणी के जापानी पार्क में विराट श्री कृष्ण जन्माष्टमी महोत्सव का आयोजन। सात दिवसीय कार्यक्रम में भजन संध्या, कवि सम्मेलन एवं नाट्य मंचन हुआ।",
    icon: Sparkles,
    highlight: true,
  },
  {
    year: 2020,
    title: "Digital Seva Initiative",
    description:
      "कोविड-19 महामारी के दौरान जब सामूहिक आयोजन संभव नहीं थे, समिति ने डिजिटल माध्यमों से भक्तों को जोड़ने की पहल की। ऑनलाइन भजन संकीर्तन, लाइव आरती एवं जरूरतमंद परिवारों तक राशन व सेवा समन्वय पहुँचाया गया।",
    icon: Heart,
  },
  {
    year: 2023,
    title: "5000+ Families Milestone",
    description:
      "समिति से जुड़े परिवारों की संख्या 5000 से अधिक हो गई। समिति ने 120 से अधिक कार्यक्रमों का सफल आयोजन किया।",
    icon: Users,
    highlight: true,
  },
  {
    year: 2025,
    title: "Shyam Mandir Vision",
    description:
      "रोहिणी में 'श्री श्याम बाबा मंदिर' निर्माण की योजना प्रारंभ। यह मंदिर समिति के सदस्यों एवं भक्तों के सहयोग से साकार होगा।",
    icon: Star,
    highlight: true,
  },
];

const missionPoints = [
  "प्रत्येक माह श्री खाटूश्याम बाबा का भजन-कीर्तन एवं संकीर्तन आयोजित करना।",
  "खाटूश्याम जी व सालासर बालाजी के लिए नियमित तीर्थ यात्रा सुविधा प्रदान करना।",
  "फाल्गुण माह में रींगस से खाटूधाम तक 'निशान यात्रा' का वार्षिक आयोजन।",
  "समाज में भक्ति, सेवा और एकता की भावना को बढ़ावा देना।",
  "जरूरतमंद भक्तों की सहायता एवं अन्नदान कार्यक्रम संचालित करना।",
  "रोहिणी में श्री श्याम बाबा मंदिर का निर्माण करना।",
];

const visionPoints = [
  "दिल्ली-NCR में श्री खाटूश्याम बाबा की भक्ति का सबसे प्रतिष्ठित केंद्र बनना।",
  "लाखों परिवारों को श्याम भक्ति से जोड़कर सामाजिक सौहार्द्र स्थापित करना।",
  "समाज सेवा हेतु समिति द्वारा निःशुल्क एम्बुलेंस सेवा प्रारंभ करना।",
  "समाज कल्याण हेतु समिति द्वारा सस्ती दवाइयों की दुकान खुलवाना।",
  "पिछड़े एवं आर्थिक रूप से कमजोर वर्ग के विद्यार्थियों को उनकी शिक्षा हेतु सहायता प्रदान करना।",
];

function MissionVisionPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="हमारा उद्देश्य"
        title="Mission & Vision"
        subtitle="2011 से श्याम सेवा में समर्पित — हमारा लक्ष्य, हमारी दिशा, हमारा संकल्प"
      />

      {/* Mission & Vision Cards */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Mission */}
          <div className="rounded-3xl bg-linear-to-br from-yellow-500 to-orange-500 p-8 text-white shadow-lg">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
              <Target size={32} className="text-white" />
            </div>
            <h2 className="mb-2 font-display text-3xl font-bold">हमारा मिशन</h2>
            <p className="mb-2 text-sm uppercase tracking-widest text-white/70">Our Mission</p>
            <p className="mb-6 leading-relaxed text-white/90">
              श्री श्री खाटूश्याम सेवा समिति का मिशन है — श्री खाटूश्याम बाबा की भक्ति को जन-जन तक
              पहुँचाना, निःस्वार्थ सेवा करना और एक मजबूत भक्त परिवार का निर्माण करना।
            </p>
            <ul className="space-y-3">
              {missionPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/30 text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-white/90">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Vision */}
          <div className="rounded-3xl bg-linear-to-br from-yellow-500 to-maroon/70 p-8 text-white shadow-lg bg-yellow-300">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
              <Eye size={32} className="text-white" />
            </div>
            <h2 className="mb-2 font-display text-3xl font-bold">हमारा विजन</h2>
            <p className="mb-2 text-sm uppercase tracking-widest text-white/70">Our Vision</p>
            <p className="mb-6 leading-relaxed text-white/90">
              एक ऐसे समाज की कल्पना जहाँ श्री श्याम बाबा की भक्ति, प्रेम और सेवा की भावना हर
              घर-आँगन में व्याप्त हो और हर हारा हुआ भक्त श्याम की शरण में आश्रय पाए।
            </p>
            <ul className="space-y-4">
              {visionPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Star size={16} className="mt-1 shrink-0 " />
                  <span className="text-sm leading-relaxed text-white/90">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs uppercase tracking-widest text-saffron">हमारे मूल्य</p>
            <h2 className="font-display text-4xl text-yellow-500">Core Values</h2>
            <div className="mx-auto mt-4 h-px w-24 bg-linear-to-r from-transparent via-yellow-500 to-transparent" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Heart, label: "भक्ति", sub: "Devotion", desc: "श्री श्याम बाबा के प्रति अटूट श्रद्धा और निःस्वार्थ भक्ति।" },
              { icon: Users, label: "सेवा", sub: "Service", desc: "जरूरतमंदों की मदद और समाज की निःस्वार्थ सेवा।" },
              { icon: Star, label: "एकता", sub: "Unity", desc: "सभी भक्तों को एकजुट करके एक मजबूत परिवार बनाना।" },
              { icon: Sparkles, label: "संस्कृति", sub: "Culture", desc: "भारतीय संस्कृति और परंपराओं का संरक्षण एवं प्रचार।" },
            ].map(({ icon: Icon, label, sub, desc }) => (
              <div key={label} className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50">
                  <Icon size={22} className="text-yellow-600" />
                </div>
                <h3 className="font-display text-2xl text-yellow-500">{label}</h3>
                <p className="mb-2 text-xs uppercase tracking-widest text-saffron">{sub}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="mx-auto max-w-4xl px-5 py-20">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs uppercase tracking-widest text-saffron">2011 से अब तक</p>
          <h2 className="font-display text-4xl text-yellow-500">Our Journey</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            "श्री श्री समिति" द्वारा वर्ष 2011 से लगातार आयोजित किए जा रहे निशुल्क मासिक कीर्तन
          </p>
          <div className="mx-auto mt-4 h-px w-24 bg-linear-to-r from-transparent via-yellow-500 to-transparent" />
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 h-full w-0.5 bg-linear-to-b from-yellow-400 via-orange-400 to-maroon md:left-1/2 md:-translate-x-0.5" />

          <div className="space-y-10">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const isRight = index % 2 === 0;
              return (
                <div
                  key={milestone.year}
                  className={`relative flex items-start gap-6 md:items-center ${
                    isRight ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Icon bubble — mobile: left col, desktop: center */}
                  <div className="relative z-10 shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-full border-4 border-white shadow-md ${
                        milestone.highlight
                          ? "bg-linear-to-br from-yellow-400 to-orange-500"
                          : "bg-white"
                      }`}
                    >
                      <Icon
                        size={22}
                        className={milestone.highlight ? "text-white" : "text-yellow-600"}
                      />
                    </div>
                  </div>

                  {/* Content card */}
                  <div
                    className={`flex-1 rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md md:w-5/12 md:flex-none ${
                      isRight ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"
                    }`}
                  >
                    <div className="mb-1 flex items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          milestone.highlight
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <Calendar size={12} className="mr-1 inline" />
                        {milestone.year}
                      </span>
                      {milestone.highlight && (
                        <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-700">
                          Milestone
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 font-display text-xl text-yellow-500">{milestone.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border/60 bg-linear-to-b from-yellow-50 to-white py-20">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <Star size={32} className="mx-auto mb-6 text-yellow-500" />
          <h2 className="font-display text-3xl text-yellow-500 md:text-4xl">
            ॥ जय श्री श्याम ॥
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            2011 से आज तक, हर कदम श्याम बाबा की कृपा से। आइए मिलकर इस सेवा यात्रा को और आगे बढ़ाएँ।
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/become-member"
              className="rounded-full bg-linear-to-r from-yellow-200 to-yellow-500 px-8 py-3 text-sm font-semibold text-black transition hover:from-yellow-300 hover:to-yellow-600"
            >
              Join Our Family
            </a>
            <a
              href="/Sponsor"
              className="rounded-full border border-maroon px-8 py-3 text-sm font-semibold text-yellow-500 transition hover:bg-maroon hover:text-white"
            >
              Become a Sponsor
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export default MissionVisionPage;
