import React from "react";
import { PageShell, PageHeader } from "../components/PageShell";
import { Quote, Heart, Star } from "lucide-react";

const messages = [
  {
    id: 1,
    role: "प्रधान (President)",
    name: "सुरेश गोयल",
    message: `आदरणीय श्याम प्रेमियों,
अपार हर्ष का विषय है कि विगत कई वर्षों से श्री श्री खाटूश्याम सेवा समिति, रोहिणी, दिल्ली सामाजिक कार्यक्रमों का आयोजन सफलता पूर्वक करती आ रही है। वर्ष 2018 में बहुत बड़े स्तर पर आयोजित श्री कृष्ण जन्माष्टमी महोत्सव का सफलता पूर्वक आयोजन भी किया गया था। संस्था के प्रत्येक पदाधिकारी, सदस्य व जुड़े हुए हर संस्था तथा व्यक्ति कार्यकर्ता का निःस्वार्थ योगदान प्रशंसनीय है। राष्ट्रीय स्तर पर एक सप्ताह तक चलने वाले इस कार्यक्रम का विशेष आकर्षण भजन संध्या, दीप प्रज्वलन, कवि सम्मेलन एवं विभिन्न टी.वी. कलाकारों द्वारा किए जाने वाले नाट्य मंचन समारोह को सफलता में चार-चाँद लगा देते हैं। ऐसे उच्च स्तर पर सम्पन्न कार्यक्रम प्रत्येक सदस्य की लगन, मेहनत, अनवरत प्रयास, अंशदान तथा समर्पण का परिचायक है। दिनों-दिन प्रगतिशील इस संस्था के भविष्य में आयोजित सभी कार्यक्रमों, उत्सवों की अपार सफलता के लिए मेरी शुभकामनाएँ एवं आप सभी का योगदान भी प्रेरित है।`,
  },
  {
    id: 2,
    role: "चेयरमैन (Chairman)",
    name: "नरेश मंगल",
    message: `आदरणीय श्याम प्रेमियों
जय श्री श्याम
श्याम प्यारे की जय, खाटू वाले की जय, हारे के सहारे तीन बाण धारी की जय, ॐ श्री श्याम देवाय नमः। यही जय घोष और श्याम धुनी इस कलयुग में मनुष्य को जीवन रूपी भव सागर पार करा देंगे।
श्री श्याम प्रभु के पास कृपा का अक्षय भण्डार है, जिसे वह अपने दरबार में संकीर्तनों में आने वाले श्याम प्रेमियों पर उदार हृदय से करते रहते हैं।
अगर कोई जप-तप किये बिना, व्रत उपवास रखे बिना, वेद पुराण पढ़े बिना, भव सागर से पार होना चाहता है, तो श्री श्याम गुणगान श्रवण करके भी कर सकता है। भजन संकीर्तन श्रवण करना भी भक्ति के समान ही होता है।
इसलिए आप सभी सह परिवार श्री कृष्ण जन्माष्टमी महोत्सव में सम्मिलित होकर महोत्सव को सफल बनायें।`,
  },
  {
    id: 3,
    role: "वरिष्ठ महासचिव (Senior General Secretary)",
    name: "अमित अग्रवाल",
    message: `आप सभी को सूचित करते हुए बड़ा हर्ष हो रहा है कि श्री श्री खाटू श्याम सेवा समिति (पंजी.) के द्वारा पिछले वर्षों से श्री कृष्ण जन्माष्टमी महोत्सव के सफल आयोजन पर आप सभी का दिल की गहराइयों से आभार प्रकट करता हूँ।`,
  },
  {
    id: 4,
    role: "महासचिव (General Secretary)",
    name: "अमित गोयल",
    message: `समिति पिछले 19 वर्षों से सामाजिक कार्यक्रमों का आयोजन करती आ रही है। समिति द्वारा हर महीने खाटू श्याम जी एवं सालासर बालाजी के लिए बस ले जाई जाती है एवं प्रत्येक वर्ष फाल्गुण माह में रींगस से खाटूधाम तक 'निशान यात्रा' भी ले जाई जाती है।
प्रत्येक माह समिति द्वारा श्री खाटूश्याम बाबा का गुणगान कीर्तन द्वारा किया जाता है जिसके लिए टेंट, लाइट, प्रसाद की व्यवस्था पार्टी को स्वयं करनी होती है और बाकी सारी व्यवस्था समिति द्वारा की जाती है जिसके लिए कोई शुल्क नहीं लिया जाता।
पिछले वर्ष की भांति इस वर्ष भी श्री कृष्ण जन्माष्टमी महोत्सव का आयोजन दिनांक 11 अगस्त 2025 से 17 अगस्त 2025 तक रोहिणी के जापानी पार्क में ESI हॉस्पिटल के सामने किया जा रहा है, जिसमें प्रत्येक दिन अलग-अलग कार्यक्रमों का आयोजन होना है जिसकी विस्तृत जानकारी कार्यक्रम सूची में दी गई है। इस कार्यक्रम में विशेष विराट कवियों द्वारा काव्य पाठ, टी.वी. कलाकारों द्वारा रुक्मणी विवाह, श्री कृष्ण लीला का लाइव मंचन किया जाएगा। इस महोत्सव के दौरान श्री खाटूश्याम बाबा का संकीर्तन एवं श्री बाँके बिहारी जी का संकीर्तन भी किया जाएगा जिसमें की श्याम जगत के मशहूर भजन गायकों द्वारा भजनों की वर्षा की जायेगी।
महोत्सव के समापन दिवस पर एक शाम शहीदों के नाम का कार्यक्रम की प्रस्तुति भी की जायेगी क्योंकि आज हम इस महोत्सव का आयोजन सिर्फ और सिर्फ जवानों की बदौलत ही कर रहे हैं। बॉर्डर पर रक्षा की बदली तैन कर रहे हैं और देश की रक्षा कर रहे हैं। वीरगति को प्राप्त हुए शहीदों को याद कर लेने उनके साथ बहुत बड़ी नाइंसाफी होगी।
इसी दिन लायन्स क्लब द्वारा रक्तदान शिविर भी लगाया जायेगा जिसमें की आप के द्वारा दिया गया रक्त किसी जरूरतमंद के काम आयेगा और इसी लिए रक्तदान को महादान भी कहा जाता है।
आने वाले वर्षों में समिति द्वारा रोहिणी में "श्री श्याम बाबा मंदिर" का निर्माण विचाराधीन है जो कि आपके सहयोग से ही सम्पूर्ण हो सकेगा।
अन्त में मैं आप सभी से यही निवेदन करता हूँ कि "श्री कृष्ण जन्माष्टमी महोत्सव" में आप अपने परिवार, ईष्ट मित्रों, रिश्ते-नातेदारों सहित अवश्य आयें और कार्यक्रम का आनंद उठाकर महोत्सव को सफल बनायें।
आइये आज आप और हम संकल्प लें कि समिति के द्वारा आयोजित कार्यक्रमों में भाग लेकर व सहयोग देकर महोत्सव को सफल बनायें और आपकी अपनी समिति को एक नई ऊँचाई पर लेकर जायें जो कि अपने आप में एक मिसाल बन जाये।
आपकी गरिमामयी उपस्थिति प्रार्थनीय है।`,
  },
];

function CommitteeMessagesPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="संदेश"
        title="पदाधिकारियों के संदेश"
        subtitle="हमारी समिति के वरिष्ठ पदाधिकारियों के शुभकामना संदेश एवं मार्गदर्शन"
      />

      {/* Header Section */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg">
            <Quote size={36} className="text-white" />
          </div>
          <h2 className="font-display text-3xl text-maroon md:text-4xl">
            आदरणीय पदाधिकारीगण
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
            श्री श्री खाटूश्याम सेवा समिति के मार्गदर्शकों के प्रेरणादायक विचार
          </p>
        </div>
      </section>

      {/* Messages Grid */}
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div className="grid gap-8 lg:grid-cols-2">
          {messages.map((msg, index) => (
            <MessageCard key={msg.id} message={msg} index={index} />
          ))}
        </div>
      </section>

      {/* Bottom Quote */}
      <section className="border-t border-border/60 bg-gradient-to-b from-yellow-50 to-white py-20">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <Star size={32} className="mx-auto mb-6 text-yellow-500" />
          <p className="font-display text-2xl text-maroon md:text-3xl">
            ॥ जय श्री श्याम ॥
          </p>
          <p className="mt-4 text-lg italic text-muted-foreground">
            "हारे के सहारे, श्याम हमारा"
          </p>
          <div className="mt-8 flex items-center justify-center gap-2">
            <Heart size={20} className="text-red-500" />
            <span className="text-sm text-muted-foreground">
              श्री श्री खाटूश्याम सेवा समिति, रोहिणी, दिल्ली
            </span>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function MessageCard({ message, index }) {
  const isPresident = message.role.includes("प्रधान");
  const isChairman = message.role.includes("चेयरमैन");
  
  return (
    <div
      className={`group relative rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl ${
        isPresident
          ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-yellow-200"
          : isChairman
          ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-blue-200"
          : "bg-white shadow-elegant hover:border-maroon/20"
      }`}
    >
      {/* Decorative Quote Icon */}
      <div className="absolute right-6 top-6 opacity-10">
        <Quote size={48} />
      </div>

      {/* Card Header */}
      <div className="mb-6 flex items-start gap-4">
        <div
          className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full text-2xl font-bold ${
            isPresident
              ? "bg-white/20 text-white"
              : isChairman
              ? "bg-white/20 text-white"
              : "bg-maroon text-white"
          }`}
        >
          {message.name.charAt(0)}
        </div>
        <div>
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
              isPresident
                ? "bg-white/30 text-white"
                : isChairman
                ? "bg-white/30 text-white"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {message.role}
          </span>
          <h3
            className={`mt-2 text-xl font-bold ${
              isPresident || isChairman ? "text-white" : "text-maroon"
            }`}
          >
            {message.name}
          </h3>
        </div>
      </div>

      {/* Message Content */}
      <div
        className={`prose max-w-none ${
          isPresident || isChairman ? "text-white/90" : "text-gray-700"
        }`}
      >
        {message.message.split("\n").map((paragraph, i) => (
          <p key={i} className="mb-3 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Bottom Decoration */}
      <div className="mt-6 flex items-center gap-2">
        <div
          className={`h-1 w-8 rounded-full ${
            isPresident
              ? "bg-white/50"
              : isChairman
              ? "bg-white/50"
              : "bg-yellow-400"
          }`}
        />
        <div
          className={`h-1 w-4 rounded-full ${
            isPresident
              ? "bg-white/30"
              : isChairman
              ? "bg-white/30"
              : "bg-yellow-200"
          }`}
        />
      </div>
    </div>
  );
}

export default CommitteeMessagesPage;