

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { PageShell, PageHeader } from "../components/PageShell";
// import {
//   Quote, Heart, Star, ArrowRight,
//   Target, Eye, Sparkles, Flag, Users, Calendar,
// } from "lucide-react";
// import { members, tierLabel } from "../data/members";

// // Sample image URL - replace with your actual image path
// const committeeMemberImage = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop"; // Professional person image

// const messages = [
//   {
//     id: 1,
//     role: "प्रधान (President)",
//     name: "सुरेश गोयल",
//     image: committeeMemberImage,
//     message: `आदरणीय श्याम प्रेमियों,
// अपार हर्ष का विषय है कि विगत कई वर्षों से श्री श्री खाटूश्याम सेवा समिति, रोहिणी, दिल्ली सामाजिक कार्यक्रमों का आयोजन सफलता पूर्वक करती आ रही है। वर्ष 2018 में बहुत बड़े स्तर पर आयोजित श्री कृष्ण जन्माष्टमी महोत्सव का सफलता पूर्वक आयोजन भी किया गया था। संस्था के प्रत्येक पदाधिकारी, सदस्य व जुड़े हुए हर संस्था तथा व्यक्ति कार्यकर्ता का निःस्वार्थ योगदान प्रशंसनीय है। राष्ट्रीय स्तर पर एक सप्ताह तक चलने वाले इस कार्यक्रम का विशेष आकर्षण भजन संध्या, दीप प्रज्वलन, कवि सम्मेलन एवं विभिन्न टी.वी. कलाकारों द्वारा किए जाने वाले नाट्य मंचन समारोह को सफलता में चार-चाँद लगा देते हैं। ऐसे उच्च स्तर पर सम्पन्न कार्यक्रम प्रत्येक सदस्य की लगन, मेहनत, अनवरत प्रयास, अंशदान तथा समर्पण का परिचायक है। दिनों-दिन प्रगतिशील इस संस्था के भविष्य में आयोजित सभी कार्यक्रमों, उत्सवों की अपार सफलता के लिए मेरी शुभकामनाएँ एवं आप सभी का योगदान भी प्रेरित है।`,
//   },
//   {
//     id: 2,
//     role: "चेयरमैन (Chairman)",
//     name: "नरेश मंगल",
//     image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=500&fit=crop",
//     message: `आदरणीय श्याम प्रेमियों
// जय श्री श्याम
// श्याम प्यारे की जय, खाटू वाले की जय, हारे के सहारे तीन बाण धारी की जय, ॐ श्री श्याम देवाय नमः। यही जय घोष और श्याम धुनी इस कलयुग में मनुष्य को जीवन रूपी भव सागर पार करा देंगे।
// श्री श्याम प्रभु के पास कृपा का अक्षय भण्डार है, जिसे वह अपने दरबार में संकीर्तनों में आने वाले श्याम प्रेमियों पर उदार हृदय से करते रहते हैं।
// अगर कोई जप-तप किये बिना, व्रत उपवास रखे बिना, वेद पुराण पढ़े बिना, भव सागर से पार होना चाहता है, तो श्री श्याम गुणगान श्रवण करके भी कर सकता है। भजन संकीर्तन श्रवण करना भी भक्ति के समान ही होता है।
// इसलिए आप सभी सह परिवार श्री कृष्ण जन्माष्टमी महोत्सव में सम्मिलित होकर महोत्सव को सफल बनायें।`,
//   },
//   {
//     id: 3,
//     role: "वरिष्ठ महासचिव (Senior General Secretary)",
//     name: "अमित अग्रवाल",
//     image: "https://images.unsplash.com/photo-1580894732931-5f6e9a8b7b3c?w=400&h=500&fit=crop",
//     message: `आप सभी को सूचित करते हुए बड़ा हर्ष हो रहा है कि श्री श्री खाटू श्याम सेवा समिति (पंजी.) के द्वारा पिछले वर्षों से श्री कृष्ण जन्माष्टमी महोत्सव के सफल आयोजन पर आप सभी का दिल की गहराइयों से आभार प्रकट करता हूँ।`,
//   },
//   {
//     id: 4,
//     role: "महासचिव (General Secretary)",
//     name: "अमित गोयल",
//     image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=500&fit=crop",
//     message: `समिति पिछले 19 वर्षों से सामाजिक कार्यक्रमों का आयोजन करती आ रही है। समिति द्वारा हर महीने खाटू श्याम जी एवं सालासर बालाजी के लिए बस ले जाई जाती है एवं प्रत्येक वर्ष फाल्गुण माह में रींगस से खाटूधाम तक 'निशान यात्रा' भी ले जाई जाती है।
// प्रत्येक माह समिति द्वारा श्री खाटूश्याम बाबा का गुणगान कीर्तन द्वारा किया जाता है जिसके लिए टेंट, लाइट, प्रसाद की व्यवस्था पार्टी को स्वयं करनी होती है और बाकी सारी व्यवस्था समिति द्वारा की जाती है जिसके लिए कोई शुल्क नहीं लिया जाता।
// पिछले वर्ष की भांति इस वर्ष भी श्री कृष्ण जन्माष्टमी महोत्सव का आयोजन दिनांक 11 अगस्त 2025 से 17 अगस्त 2025 तक रोहिणी के जापानी पार्क में ESI हॉस्पिटल के सामने किया जा रहा है, जिसमें प्रत्येक दिन अलग-अलग कार्यक्रमों का आयोजन होना है जिसकी विस्तृत जानकारी कार्यक्रम सूची में दी गई है। इस कार्यक्रम में विशेष विराट कवियों द्वारा काव्य पाठ, टी.वी. कलाकारों द्वारा रुक्मणी विवाह, श्री कृष्ण लीला का लाइव मंचन किया जाएगा। इस महोत्सव के दौरान श्री खाटूश्याम बाबा का संकीर्तन एवं श्री बाँके बिहारी जी का संकीर्तन भी किया जाएगा जिसमें की श्याम जगत के मशहूर भजन गायकों द्वारा भजनों की वर्षा की जायेगी।
// महोत्सव के समापन दिवस पर एक शाम शहीदों के नाम का कार्यक्रम की प्रस्तुति भी की जायेगी क्योंकि आज हम इस महोत्सव का आयोजन सिर्फ और सिर्फ जवानों की बदौलत ही कर रहे हैं। बॉर्डर पर रक्षा की बदली तैन कर रहे हैं और देश की रक्षा कर रहे हैं। वीरगति को प्राप्त हुए शहीदों को याद कर लेने उनके साथ बहुत बड़ी नाइंसाफी होगी।
// इसी दिन लायन्स क्लब द्वारा रक्तदान शिविर भी लगाया जायेगा जिसमें की आप के द्वारा दिया गया रक्त किसी जरूरतमंद के काम आयेगा और इसी लिए रक्तदान को महादान भी कहा जाता है।
// आने वाले वर्षों में समिति द्वारा रोहिणी में "श्री श्याम बाबा मंदिर" का निर्माण विचाराधीन है जो कि आपके सहयोग से ही सम्पूर्ण हो सकेगा।
// अन्त में मैं आप सभी से यही निवेदन करता हूँ कि "श्री कृष्ण जन्माष्टमी महोत्सव" में आप अपने परिवार, ईष्ट मित्रों, रिश्ते-नातेदारों सहित अवश्य आयें और कार्यक्रम का आनंद उठाकर महोत्सव को सफल बनायें।
// आइये आज आप और हम संकल्प लें कि समिति के द्वारा आयोजित कार्यक्रमों में भाग लेकर व सहयोग देकर महोत्सव को सफल बनायें और आपकी अपनी समिति को एक नई ऊँचाई पर लेकर जायें जो कि अपने आप में एक मिसाल बन जाये।
// आपकी गरिमामयी उपस्थिति प्रार्थनीय है।`,
//   },
// ];

// const milestones = [
//   { year: 2011, title: "Samiti Founded", description: "श्री श्री खाटूश्याम सेवा समिति की स्थापना रोहिणी, दिल्ली में कुछ समर्पित श्याम प्रेमियों द्वारा की गई। पहला मासिक भजन संकीर्तन आयोजित किया गया।", icon: Flag, highlight: true },
//   { year: 2013, title: "Monthly Yatra Begins", description: "प्रतिमाह खाटूश्याम जी एवं सालासर बालाजी के लिए बस सेवा प्रारंभ की गई। सैकड़ों भक्तों ने पहली यात्रा में भाग लिया।", icon: Users },
//   { year: 2015, title: "First Nishan Yatra", description: "फाल्गुण माह में रींगस से खाटूधाम तक पहली 'निशान यात्रा' का सफल आयोजन किया गया, जो अब प्रतिवर्ष एक परंपरा बन चुकी है।", icon: Star },
//   { year: 2018, title: "Janmashtami Mahotsav", description: "रोहिणी के जापानी पार्क में विराट श्री कृष्ण जन्माष्टमी महोत्सव का आयोजन। सात दिवसीय कार्यक्रम में भजन संध्या, कवि सम्मेलन एवं नाट्य मंचन हुआ।", icon: Sparkles, highlight: true },
//   { year: 2020, title: "Digital Seva Initiative", description: "डिजिटल माध्यमों से श्याम भक्तों को जोड़ने की पहल। ऑनलाइन भजन संकीर्तन एवं सेवा समन्वय शुरू किया गया।", icon: Heart },
//   { year: 2023, title: "5000+ Families Milestone", description: "समिति से जुड़े परिवारों की संख्या 5000 से अधिक हो गई। समिति ने 120 से अधिक कार्यक्रमों का सफल आयोजन किया।", icon: Users, highlight: true },
//   { year: 2025, title: "Shyam Mandir Vision", description: "रोहिणी में 'श्री श्याम बाबा मंदिर' निर्माण की योजना प्रारंभ। यह मंदिर समिति के सदस्यों एवं भक्तों के सहयोग से साकार होगा।", icon: Star, highlight: true },
// ];

// const missionPoints = [
//   "प्रत्येक माह श्री खाटूश्याम बाबा का भजन-कीर्तन एवं संकीर्तन आयोजित करना।",
//   "खाटूश्याम जी व सालासर बालाजी के लिए नियमित तीर्थ यात्रा सुविधा प्रदान करना।",
//   "फाल्गुण माह में रींगस से खाटूधाम तक 'निशान यात्रा' का वार्षिक आयोजन।",
//   "समाज में भक्ति, सेवा और एकता की भावना को बढ़ावा देना।",
//   "जरूरतमंद भक्तों की सहायता एवं अन्नदान कार्यक्रम संचालित करना।",
//   "रोहिणी में श्री श्याम बाबा मंदिर का निर्माण करना।",
// ];

// const visionPoints = [
//   "दिल्ली-NCR में श्री खाटूश्याम बाबा की भक्ति का सबसे प्रतिष्ठित केंद्र बनना।",
//   "लाखों परिवारों को श्याम भक्ति से जोड़कर सामाजिक सौहार्द्र स्थापित करना।",
//   "युवा पीढ़ी को भारतीय संस्कृति, भक्ति और सेवा के मूल्यों से परिचित कराना।",
//   "देशभर में श्री खाटूश्याम सेवा समितियों का एक मजबूत नेटवर्क बनाना।",
// ];

// const tierButtons = [
//   {
//     tier: "Diamond",
//     label: "Diamond",
//     activeClass: "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-blue-200 shadow-lg",
//     inactiveClass: "border-2 border-sky-400 text-sky-600 hover:bg-sky-50",
//     dot: "bg-sky-400",
//   },
//   {
//     tier: "golden",
//     label: "Golden",
//     activeClass: "bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-yellow-200 shadow-lg",
//     inactiveClass: "border-2 border-yellow-400 text-yellow-700 hover:bg-yellow-50",
//     dot: "bg-yellow-400",
//   },
//   {
//     tier: "KaryaKarani",
//     label: "Karyakarani",
//     activeClass: "bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-orange-200 shadow-lg",
//     inactiveClass: "border-2 border-orange-400 text-orange-700 hover:bg-orange-50",
//     dot: "bg-orange-400",
//   },
// ];

// function CommitteeMessagesPage() {
//   const [activeTier, setActiveTier] = useState("golden");

//   const filteredMembers = members.filter((m) => m.tier === activeTier);
//   const activeBtn = tierButtons.find((b) => b.tier === activeTier);

//   return (
//     <PageShell>
//       <PageHeader
//         eyebrow="संदेश"
//         title="पदाधिकारियों के संदेश"
//         subtitle="हमारी समिति के वरिष्ठ पदाधिकारियों के शुभकामना संदेश एवं मार्गदर्शन"
//       />

//       {/* Header Section */}
//       <section className="mx-auto max-w-7xl px-5 py-16">
//         <div className="text-center">
//           <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg">
//             <Quote size={36} className="text-white" />
//           </div>
//           <h2 className="font-display text-3xl text-maroon md:text-4xl">
//             आदरणीय पदाधिकारीगण
//           </h2>
//           <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
//             श्री श्री खाटूश्याम सेवा समिति के मार्गदर्शकों के प्रेरणादायक विचार
//           </p>
//         </div>
//       </section>

//       {/* Messages Grid with Image + Text Layout */}
//       <section className="mx-auto max-w-7xl px-5 pb-24">
//         <div className="space-y-12">
//           {messages.map((msg, index) => (
//             <MessageCardWithImage key={msg.id} message={msg} index={index} />
//           ))}
//         </div>
//       </section>

//       {/* Bottom Quote */}
//       <section className="border-t border-border/60 bg-gradient-to-b from-yellow-50 to-white py-20">
//         <div className="mx-auto max-w-4xl px-5 text-center">
//           <Star size={32} className="mx-auto mb-6 text-yellow-500" />
//           <p className="font-display text-2xl text-maroon md:text-3xl">
//             ॥ जय श्री श्याम ॥
//           </p>
//           <p className="mt-4 text-lg italic text-muted-foreground">
//             "हारे के सहारे, श्याम हमारा"
//           </p>
//           <div className="mt-8 flex items-center justify-center gap-2">
//             <Heart size={20} className="text-red-500" />
//             <span className="text-sm text-muted-foreground">
//               श्री श्री खाटूश्याम सेवा समिति, रोहिणी, दिल्ली
//             </span>
//           </div>
//         </div>
//       </section>

    

      
//     </PageShell>
//   );
// }

// // New component with Image on Left and Message on Right
// function MessageCardWithImage({ message, index }) {
//   const isPresident = message.role.includes("प्रधान");
//   const isChairman = message.role.includes("चेयरमैन");
  
//   const getGradientClass = () => {
//     if (isPresident) return "from-yellow-400 to-orange-500";
//     if (isChairman) return "from-blue-600 to-purple-600";
//     return "from-gray-50 to-white";
//   };
  
//   const getTextColorClass = () => {
//     if (isPresident || isChairman) return "text-white";
//     return "text-gray-800";
//   };
  
//   const getBgClass = () => {
//     if (isPresident || isChairman) return "";
//     return "bg-white";
//   };

//   return (
//     <div
//       className={`group rounded-3xl shadow-elegant transition-all duration-300 hover:shadow-2xl overflow-hidden ${
//         isPresident || isChairman ? `bg-gradient-to-br ${getGradientClass()}` : getBgClass()
//       }`}
//     >
//       <div className="grid grid-cols-1 lg:grid-cols-2">
//         {/* Left Side - Image */}
//         <div className="relative overflow-hidden h-full min-h-[400px]">
//           <img
//             src={message.image}
//             alt={message.name}
//             className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//           />
//           {/* Overlay gradient for better text readability if needed */}
//           <div className={`absolute inset-0 bg-gradient-to-t ${isPresident || isChairman ? 'from-black/40 via-transparent' : 'from-black/20 via-transparent'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          
//           {/* Role badge overlay on image */}
//           <div className="absolute bottom-6 left-6 right-6">
//             <div className="inline-block rounded-full backdrop-blur-md bg-black/30 px-4 py-1.5 text-xs font-medium text-white">
//               {message.role}
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Message Content */}
//         <div className={`p-8 lg:p-10 ${getTextColorClass()}`}>
//           <div className="relative">
//             <div className="absolute -top-4 -left-4 opacity-10">
//               <Quote size={60} className={isPresident || isChairman ? "text-white" : "text-gray-400"} />
//             </div>
            
//             <div className="relative z-10">
//               <div className="mb-4 flex items-center gap-3">
//                 <div className={`h-12 w-12 flex-shrink-0 rounded-full bg-gradient-to-br ${getGradientClass()} flex items-center justify-center shadow-md`}>
//                   <span className="text-xl font-bold text-white">
//                     {message.name.charAt(0)}
//                   </span>
//                 </div>
//                 <div>
//                   <h3 className={`text-xl font-bold ${isPresident || isChairman ? "text-white" : "text-maroon"}`}>
//                     {message.name}
//                   </h3>
//                   <p className={`text-xs ${isPresident || isChairman ? "text-white/70" : "text-muted-foreground"}`}>
//                     {message.role}
//                   </p>
//                 </div>
//               </div>

//               <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
//                 {message.message.split("\n").map((paragraph, i) => (
//                   paragraph.trim() && (
//                     <p key={i} className={`text-sm leading-relaxed ${isPresident || isChairman ? "text-white/90" : "text-gray-700"}`}>
//                       {paragraph}
//                     </p>
//                   )
//                 ))}
//               </div>

//               <div className="mt-6 flex items-center gap-2 pt-4 border-t border-white/20">
//                 <div
//                   className={`h-1 w-8 rounded-full ${
//                     isPresident ? "bg-white/50" : isChairman ? "bg-white/50" : "bg-yellow-400"
//                   }`}
//                 />
//                 <div
//                   className={`h-1 w-4 rounded-full ${
//                     isPresident ? "bg-white/30" : isChairman ? "bg-white/30" : "bg-yellow-200"
//                   }`}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CommitteeMessagesPage;




import  { useState } from "react";

import { PageShell, PageHeader } from "../components/PageShell";
import {
  Quote, Heart, Star, ArrowRight,
  Target, Eye, Sparkles, Flag, Users, Calendar,
} from "lucide-react";
import { members, tierLabel } from "../data/members";

// Sample image URL - replace with your actual image path
const committeeMemberImage = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop"; // Professional person image

const messages = [
  {
    id: 1,
    role: "प्रधान (President)",
    name: "सुरेश गोयल",
    image: committeeMemberImage,
    message: `आदरणीय श्याम प्रेमियों,
अपार हर्ष का विषय है कि विगत कई वर्षों से श्री श्री खाटूश्याम सेवा समिति, रोहिणी, दिल्ली सामाजिक कार्यक्रमों का आयोजन सफलता पूर्वक करती आ रही है। वर्ष 2018 में बहुत बड़े स्तर पर आयोजित श्री कृष्ण जन्माष्टमी महोत्सव का सफलता पूर्वक आयोजन भी किया गया था। संस्था के प्रत्येक पदाधिकारी, सदस्य व जुड़े हुए हर संस्था तथा व्यक्ति कार्यकर्ता का निःस्वार्थ योगदान प्रशंसनीय है। राष्ट्रीय स्तर पर एक सप्ताह तक चलने वाले इस कार्यक्रम का विशेष आकर्षण भजन संध्या, दीप प्रज्वलन, कवि सम्मेलन एवं विभिन्न टी.वी. कलाकारों द्वारा किए जाने वाले नाट्य मंचन समारोह को सफलता में चार-चाँद लगा देते हैं। ऐसे उच्च स्तर पर सम्पन्न कार्यक्रम प्रत्येक सदस्य की लगन, मेहनत, अनवरत प्रयास, अंशदान तथा समर्पण का परिचायक है। दिनों-दिन प्रगतिशील इस संस्था के भविष्य में आयोजित सभी कार्यक्रमों, उत्सवों की अपार सफलता के लिए मेरी शुभकामनाएँ एवं आप सभी का योगदान भी प्रेरित है।`,
  },
  {
    id: 2,
    role: "चेयरमैन (Chairman)",
    name: "नरेश मंगल",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=500&fit=crop",
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
    image: "https://images.unsplash.com/photo-1580894732931-5f6e9a8b7b3c?w=400&h=500&fit=crop",
    message: `आप सभी को सूचित करते हुए बड़ा हर्ष हो रहा है कि श्री श्री खाटू श्याम सेवा समिति (पंजी.) के द्वारा पिछले वर्षों से श्री कृष्ण जन्माष्टमी महोत्सव के सफल आयोजन पर आप सभी का दिल की गहराइयों से आभार प्रकट करता हूँ।`,
  },
  {
    id: 4,
    role: "महासचिव (General Secretary)",
    name: "अमित गोयल",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=500&fit=crop",
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

const milestones = [
  { year: 2011, title: "Samiti Founded", description: "श्री श्री खाटूश्याम सेवा समिति की स्थापना रोहिणी, दिल्ली में कुछ समर्पित श्याम प्रेमियों द्वारा की गई। पहला मासिक भजन संकीर्तन आयोजित किया गया।", icon: Flag, highlight: true },
  { year: 2013, title: "Monthly Yatra Begins", description: "प्रतिमाह खाटूश्याम जी एवं सालासर बालाजी के लिए बस सेवा प्रारंभ की गई। सैकड़ों भक्तों ने पहली यात्रा में भाग लिया।", icon: Users },
  { year: 2015, title: "First Nishan Yatra", description: "फाल्गुण माह में रींगस से खाटूधाम तक पहली 'निशान यात्रा' का सफल आयोजन किया गया, जो अब प्रतिवर्ष एक परंपरा बन चुकी है।", icon: Star },
  { year: 2018, title: "Janmashtami Mahotsav", description: "रोहिणी के जापानी पार्क में विराट श्री कृष्ण जन्माष्टमी महोत्सव का आयोजन। सात दिवसीय कार्यक्रम में भजन संध्या, कवि सम्मेलन एवं नाट्य मंचन हुआ।", icon: Sparkles, highlight: true },
  { year: 2020, title: "Digital Seva Initiative", description: "डिजिटल माध्यमों से श्याम भक्तों को जोड़ने की पहल। ऑनलाइन भजन संकीर्तन एवं सेवा समन्वय शुरू किया गया।", icon: Heart },
  { year: 2023, title: "5000+ Families Milestone", description: "समिति से जुड़े परिवारों की संख्या 5000 से अधिक हो गई। समिति ने 120 से अधिक कार्यक्रमों का सफल आयोजन किया।", icon: Users, highlight: true },
  { year: 2025, title: "Shyam Mandir Vision", description: "रोहिणी में 'श्री श्याम बाबा मंदिर' निर्माण की योजना प्रारंभ। यह मंदिर समिति के सदस्यों एवं भक्तों के सहयोग से साकार होगा।", icon: Star, highlight: true },
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
  "युवा पीढ़ी को भारतीय संस्कृति, भक्ति और सेवा के मूल्यों से परिचित कराना।",
  "देशभर में श्री खाटूश्याम सेवा समितियों का एक मजबूत नेटवर्क बनाना।",
];

const tierButtons = [
  {
    tier: "Diamond",
    label: "Diamond",
    activeClass: "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-blue-200 shadow-lg",
    inactiveClass: "border-2 border-sky-400 text-sky-600 hover:bg-sky-50",
    dot: "bg-sky-400",
  },
  {
    tier: "golden",
    label: "Golden",
    activeClass: "bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-yellow-200 shadow-lg",
    inactiveClass: "border-2 border-yellow-400 text-yellow-700 hover:bg-yellow-50",
    dot: "bg-yellow-400",
  },
  {
    tier: "KaryaKarani",
    label: "Karyakarani",
    activeClass: "bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-orange-200 shadow-lg",
    inactiveClass: "border-2 border-orange-400 text-orange-700 hover:bg-orange-50",
    dot: "bg-orange-400",
  },
];

function CommitteeMessagesPage() {
  const [activeTier, setActiveTier] = useState("golden");

  const filteredMembers = members.filter((m) => m.tier === activeTier);
  const activeBtn = tierButtons.find((b) => b.tier === activeTier);

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

      {/* Messages Grid with Alternating Image + Text Layout */}
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div className="space-y-12">
          {messages.map((msg, index) => (
            <MessageCardWithAlternatingLayout 
              key={msg.id} 
              message={msg} 
              index={index} 
            />
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

// Component with Alternating Layout: Image Left/Right based on index
function MessageCardWithAlternatingLayout({ message, index }) {
  const isPresident = message.role.includes("प्रधान");
  const isChairman = message.role.includes("चेयरमैन");
  const isEven = index % 2 === 0; // Even index: Image on Left, Odd index: Image on Right
  
  const getGradientClass = () => {
    if (isPresident) return "from-yellow-400 to-orange-500";
    if (isChairman) return "from-blue-600 to-purple-600";
    return "from-amber-50 to-white";
  };
  
  const getTextColorClass = () => {
    if (isPresident || isChairman) return "text-white";
    return "text-gray-800";
  };
  
  const getBorderClass = () => {
    if (isPresident) return "border-yellow-300";
    if (isChairman) return "border-purple-300";
    return "border-gray-200";
  };

  // Image Section Component
  const ImageSection = () => (
    <div className="relative overflow-hidden h-full min-h-[400px] lg:min-h-[500px]">
      <img
        src={message.image}
        alt={message.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t ${isPresident || isChairman ? 'from-black/60 via-transparent to-transparent' : 'from-black/40 via-transparent to-transparent'} opacity-60 group-hover:opacity-80 transition-opacity duration-300`} />
      
      {/* Role badge overlay on image */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="inline-block rounded-full backdrop-blur-md bg-white/20 px-4 py-1.5 text-sm font-medium text-white border border-white/30">
          {message.role}
        </div>
      </div>
    </div>
  );

  // Content Section Component
  const ContentSection = () => (
    <div className={`p-8 lg:p-10 ${getTextColorClass()} flex flex-col justify-center`}>
      <div className="relative">
        {/* Decorative quote icon */}
        <div className="absolute -top-4 -left-4 opacity-10">
          <Quote size={64} className={isPresident || isChairman ? "text-white" : "text-maroon"} />
        </div>
        
        <div className="relative z-10">
          {/* Profile info */}
          <div className="mb-6 flex items-center gap-4">
            <div className={`h-14 w-14 flex-shrink-0 rounded-full bg-gradient-to-br ${getGradientClass()} flex items-center justify-center shadow-lg`}>
              <span className="text-xl font-bold text-white">
                {message.name.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className={`text-xl font-bold ${isPresident || isChairman ? "text-white" : "text-maroon"}`}>
                {message.name}
              </h3>
              <p className={`text-sm ${isPresident || isChairman ? "text-white/80" : "text-muted-foreground"}`}>
                {message.role}
              </p>
            </div>
          </div>

          {/* Message content */}
          <div className={`space-y-4 max-h-[400px] overflow-y-auto pr-3 custom-scrollbar ${getBorderClass()}`}>
            {message.message.split("\n").map((paragraph, i) => (
              paragraph.trim() && (
                <p 
                  key={i} 
                  className={`text-sm leading-relaxed ${
                    isPresident || isChairman 
                      ? "text-white/90" 
                      : "text-gray-700"
                  }`}
                >
                  {paragraph}
                </p>
              )
            ))}
          </div>

          {/* Decorative bottom line */}
          <div className="mt-8 flex items-center gap-2 pt-4 border-t border-white/20">
            <div
              className={`h-1.5 w-12 rounded-full ${
                isPresident ? "bg-white/60" : isChairman ? "bg-white/60" : "bg-yellow-400"
              }`}
            />
            <div
              className={`h-1.5 w-6 rounded-full ${
                isPresident ? "bg-white/40" : isChairman ? "bg-white/40" : "bg-yellow-200"
              }`}
            />
            <div
              className={`h-1.5 w-3 rounded-full ${
                isPresident ? "bg-white/20" : isChairman ? "bg-white/20" : "bg-yellow-100"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`group rounded-3xl shadow-elegant transition-all duration-300 hover:shadow-2xl overflow-hidden border ${getBorderClass()} ${
        isPresident || isChairman 
          ? `bg-gradient-to-br ${getGradientClass()}` 
          : "bg-white"
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Alternating Layout based on index */}
        {isEven ? (
          <>
            {/* Even index (0, 2, 4...): Image Left, Content Right */}
            <ImageSection />
            <ContentSection />
          </>
        ) : (
          <>
            {/* Odd index (1, 3, 5...): Image Right, Content Left */}
            <ContentSection />
            <ImageSection />
          </>
        )}
      </div>
    </div>
  );
}

export default CommitteeMessagesPage;