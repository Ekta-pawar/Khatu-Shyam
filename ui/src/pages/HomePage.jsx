import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { PageShell } from "../components/PageShell";
import { ImageWithFallback } from "../components/ImageWithFallback";
import EventCardSkeleton from "../components/EventCardSkeleton";

import heroTemple from "../assets/KHATU-optimized.webp";
import deity from "../assets/midd-Shyam-optimized.webp";
import event1 from "../assets/event-1-optimized.webp";
import bowEmblem from "../assets/Untitled-2-optimized.webp";
import bowEmblem1 from "../assets/ome-optimized.webp";

import cofounder1 from "../assets/homephot11.jpeg";
import cofounder2 from "../assets/homephoto11.jpg";
import cofounder3 from "../assets/homephoto33.JPG";
import cofounder4 from "../assets/homephoto3.jpeg";
import cofounder5 from "../assets/homephoto5.jpeg";
import cofounder6 from "../assets/homephoto6.JPG";
import cofounder7 from "../assets/homephoto7.jpg";
import cofounder8 from "../assets/homephot8.JPG";
import cofounder9 from "../assets/homephoto9.jpg";
import cofounder10 from "../assets/homephoto10.jpeg";

import {
  CalendarDays,
  MapPin,
  Clock,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatDateRange = (startDate, endDate) => {
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  if (start === "-") return "-";
  if (!endDate || start === end) return start;
  return `${start} – ${end}`;
};

const formatTime = (time) => {
  if (!time) return null;
  const [h, m] = time.split(":");
  const hour = parseInt(h, 10);
  if (Number.isNaN(hour)) return time;
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${m} ${suffix}`;
};

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const committeeMembers = [
       { image: cofounder1, role: "सुरेश गोयल" },

  { image: cofounder2, role: "जय किशन बंसल" },
   { image: cofounder3, role: "हरीश शर्मा" },
   { image: cofounder4, role: "संजय कुमार गुप्ता" },
 
    { image: cofounder5, role: "संजय मित्तल" },

  { image: cofounder6, role: "राजेश जैन " },
        { image: cofounder7, role: " अमित गोयल" },
            { image: cofounder8, role: "अरविंद गोयल" },

            { image: cofounder9, role: "नतेश गोयल (CA)" },
            { image: cofounder10, role: "अमित गुप्ता" },
             { image: cofounder7, role: "अमित गुप्ता" },
                   { image: cofounder7, role: "अमित गुप्ता" },
            




];

function HomePage() {
  const [homeEvents, setHomeEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const eventsRes = await axios.get(`${API_BASE}/events/upcoming`);
        setHomeEvents((eventsRes.data.data || []).slice(0, 3));
      } catch (error) {
        console.error("Error loading home page data:", error);
      } finally {
        setEventsLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <PageShell>
            <section className="relative min-h-[72vh] overflow-hidden">
        <ImageWithFallback
          src={heroTemple}
          alt="Khatu Shyam Ji temple"
          className="absolute inset-0 h-full w-full object-cover "
        />

        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/30 to-black/80" />

        <motion.div
          className="relative mx-auto flex min-h-[100vh] max-w-9xl flex-col items-center justify-center px-5 py-20 pt-0 text-center text-white mt-6"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div
            className="mb-3 mt-0 flex w-full flex-col items-center justify-between gap-1 text-center font-display text-base text-wight-200 sm:flex-row sm:text-xl md:text-2xl"
            variants={fadeUp}
          >
            <p>॥ श्री श्याम देवाय नमः ॥</p>
                    <span className="">|| श्री श्याम शरणम् ममः ||</span>

            <p>॥ श्री श्याम देवाय नमः ॥</p>
          </motion.div>

          <motion.div
            className="mb-5 flex flex-wrap items-center justify-center gap-6 md:gap-12"
            variants={fadeUp}
          >
            <ImageWithFallback
              src={bowEmblem}
              alt="हारे का सहारा बाबा श्याम हमारा"
              className="h-25 w-auto md:h-35"
            />

            <ImageWithFallback
              src={deity}
              alt="Shyam Baba"
              className="h-40 w-40 rounded-full border-2 border-yellow-300 object-cover md:h-65 md:w-65"
            />

            <ImageWithFallback
              src={bowEmblem1}
              alt="हारे का सहारा बाबा श्याम हमारा"
              className="h-25 w-auto md:h-35"
            />
          </motion.div>

          <motion.p className="mb-4 text-lg text-wight-500 md:text-xl" variants={fadeUp}>
            हारे का सहारा · बाबा श्याम हमारा
          </motion.p>

          <motion.h1
            className="font-display text-3xl py-4 bg-linear-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent sm:text-4xl md:text-5xl lg:text-6xl"
            variants={fadeUp}
          >
            श्री श्री खाटू श्याम सेवा समिति (रजि.)
            {/* <span className="block text-yellow-300">
              सभा समिति (रजी)
            </span> */}
          </motion.h1>

          {/* <p className="mt-6 max-w-2xl text-base md:text-lg">
            तीन दशकों से भी अधिक की सेवा, संगत और श्याम बाबा के प्रति अटूट
            भक्ति — भजन, भण्डारा और यात्रा के माध्यम से भारत भर के परिवारों
            को एक सूत्र में जोड़ते हुए।
          </p> */}

          <motion.p className="mt-3 text-sm text-yellow-200 md:text-base" variants={fadeUp}>
            कार्यालय : — B-2/22, सेक्टर-17, रोहिणी, दिल्ली
          </motion.p>

          <motion.div className="mt-8 flex flex-wrap justify-center gap-4" variants={fadeUp}>
            <Link
              to="/become-member"
              className="rounded-full bg-linear-to-r from-yellow-200 to-yellow-500 px-7 py-3 text-black"
            >
              Become a Member
            </Link>

            <Link
              to="/events"
              className="rounded-full border border-white px-7 py-3"
            >
             Upcoming Events
            </Link>
          </motion.div>
        </motion.div>
      </section>
        
<section className="mb-0 grid gap-5 px-5 py-2 pt-15 pb-0 md:grid-cols-2 md:items-center md:gap-10">
  <div className="flex h-60 items-stretch justify-center self-stretch mb-0 sm:h-80 md:h-140">
    <ImageWithFallback
      src={deity}
      alt="Shri Khatu Shyam Ji"
      className="h-full w-full rounded-3xl object-cover"
      loading="lazy"
    />
  </div>

  <motion.div
    className="mb-5 flex flex-col md:mb-8"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={fadeUp}
  >
    <p className="mb-2 text-xs uppercase tracking-[0.35em] text-orange-500">
      हारे का सहारा
    </p>

    <h2 className="text-3xl md:text-3xl">
     श्याम वर्णन
    </h2>

    <div className=" space-y-3 text-[13px] leading-8 text-gray-500 text-justify">
      <p>
        खाटू श्याम बाबा की कहानी महाभारत के वीर योद्धा
        'बर्बरीक' से जुड़ी है। वे भीम के पौत्र थे। अपने महान
        बलिदान से प्रसन्न होकर भगवान श्रीकृष्ण ने उन्हें
        कलियुग में 'श्याम' नाम से पूजे जाने और हारे हुए का
        सहारा बनने का वरदान दिया।
      </p>

      <p>
        <span className="font-semibold text-gray-800">
          बर्बरीक का पराक्रम और तीन बाण —{" "}
        </span>
        बर्बरीक बचपन से ही अत्यंत वीर थे। उन्होंने माँ दुर्गा
        की घोर तपस्या करके तीन अचूक बाण प्राप्त किए थे।
        महाभारत का युद्ध शुरू होने पर वे अपनी माता को यह वचन
        देकर युद्ध देखने गए कि वे हमेशा युद्ध में हारने वाले
        पक्ष की ओर से लड़ेंगे।
      </p>

      <p>
        <span className="font-semibold text-gray-800">
          श्रीकृष्ण की परीक्षा और शीश दान —{" "}
        </span>
        बर्बरीक की अपार शक्ति को देखकर भगवान श्रीकृष्ण ने
        ब्राह्मण का वेश धारण कर उनकी परीक्षा ली। उन्होंने
        बर्बरीक से दान में उनका शीश (सिर) मांग लिया। एक वीर
        और वचनबद्ध योद्धा होने के नाते, बर्बरीक ने सहर्ष अपना
        शीश काटकर दान कर दिया।
      </p>

      <p>
        <span className="font-semibold text-gray-800">
          वरदान और कलियुग में अवतार —{" "}
        </span>
        बर्बरीक के इस अद्वितीय बलिदान से प्रसन्न होकर
        श्रीकृष्ण ने उन्हें वरदान दिया कि कलियुग में तुम मेरे
        (श्याम) रूप में पूजे जाओगे। तुम्हारा केवल नाम लेने से
        ही भक्तों के सारे कष्ट दूर हो जाएंगे।
      </p>

      <p>
        <span className="font-semibold text-gray-800">
          खाटू गाँव में प्राकट्य —{" "}
        </span>
        कालांतर में, राजस्थान के सीकर जिले में स्थित खाटू
        गाँव की धरती से उनका शीश प्रकट हुआ। एक बार एक गाय इस
        स्थान पर आकर अपने थन से दूध गिराने लगी, जिसके बाद
        खुदाई करने पर शीश मिला। बाद में खाटू के तत्कालीन राजा
        रूप सिंह चौहान ने स्वप्नादेश के अनुसार विक्रम संवत
        1027 में यहाँ मंदिर का निर्माण कराया और शीश को
        स्थापित किया।
      </p>
    </div>
  </motion.div>
</section>

 <motion.div
   className="mt-2 mb-6 p-5 grid grid-cols-2 gap-4 sm:grid-cols-4"
   initial="hidden"
   whileInView="visible"
   viewport={{ once: true, amount: 0.3 }}
   variants={staggerContainer}
 >
      {[
        { n: "30+", l: "Years of Seva" },
        { n: "5000+", l: "Families" },
        { n: "120+", l: "Events" },
        { n: "220+", l: "Members" },
      ].map((item) => (
        <motion.div
          key={item.l}
          className="rounded-2xl bg-yellow-400 p-5 text-center"
          variants={fadeUp}
        >
          <div className="text-3xl">
            {item.n}
          </div>

          <div className="text-xs">
            {item.l}
          </div>
        </motion.div>
      ))}
    </motion.div>
            <section className="py-6 bg-yellow-200 font-bold ">
        <div className="mx-auto max-w-7xl px-5">
          <motion.h2
            className="mb-14 text-center text-4xl text-yellow-500 "
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
           मुख्य कार्यकारिणी
          </motion.h2>

<motion.div
  className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  variants={staggerContainer}
>
          {committeeMembers.map((m, index) => (
              <motion.div
                key={`${m.role}-${index}`}
                className="group overflow-hidden rounded-3xl bg-yellow-500 shadow transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
                variants={fadeUp}
              >
                <div className="relative h-64 w-full   overflow-hidden object-fit">
                  <ImageWithFallback
                    src={m.image}
                    alt={m.role}
  className="absolute inset-0 h-full w-full object-fit transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="p-5 text-center  bg-linear-to-r from-yellow-200 to-yellow-500">
                  <p className="text-sm font-semibold text-gray-800">
                    {m.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
            <section className="mx-auto max-w-7xl px-5 py-6 pt-14">
        <motion.h2
          className="mb-7 text-5xl align-items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          Upcoming Events
        </motion.h2>
        <motion.h2
          className="mb-7 text-2xl align-items-center text-center text-yellow-400"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >भव्य श्री कृष्ण जन्माष्टमी महोत्सव, नन्द उत्सव 2026, दिनांक 29 सेप्टेंबर टू 4 अगस्त</motion.h2>

        <motion.div
          className="grid gap-8 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {eventsLoading ? (
            [...Array(3)].map((_, i) => <EventCardSkeleton key={i} />)
          ) : (
            homeEvents.map((e) => (
              <motion.article
                key={e._id}
                className="overflow-hidden rounded-2xl bg-yellow-500 shadow"
                variants={fadeUp}
              >
                <ImageWithFallback
                  src={e.image || event1}
                  alt={e.title}
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />

                <div className="p-6  bg-linear-to-r from-yellow-200 to-yellow-500">
                  <h3 className="text-xl">
                    {e.title}
                  </h3>

                  <p className="mt-3 flex items-center gap-2">
                    <CalendarDays size={14} />
                    {formatDateRange(e.startDate, e.endDate)}
                  </p>

                  {(e.startTime || e.endTime) && (
                    <p className="mt-2 flex items-center gap-2">
                      <Clock size={14} />
                      {[formatTime(e.startTime), formatTime(e.endTime)]
                        .filter(Boolean)
                        .join(" – ")}
                    </p>
                  )}

                  <p className="mt-2 flex items-center gap-2">
                    <MapPin size={14} />
                    {e.location}
                  </p>
                </div>
              </motion.article>
            ))
          )}
        </motion.div>
        {!eventsLoading && homeEvents.length === 0 && (
          <p className="mt-6 text-muted-foreground  border-yellow-400 rounded-lg p-4 text-center">
            Upcoming events will appear here soon.
          </p>
        )}
      </section>
    </PageShell>
  );
}

export default HomePage;
 
