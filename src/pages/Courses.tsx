import { useTranslation } from "react-i18next";
import CourseCard from "../components/CourseCard";

type Course = {
    code: string;
    name: string;
    credits: number;
    rating: number;
};

type Specialization = {
    id: string;
    title: string;
    courses: Course[];
};

const courses: Specialization[] = [
    {
        id: "bg",
        title: "Bilder och grafik",
        courses: [
            { code: "FMAN20", name: "Bildanalys", credits: 7.5, rating: 4.2 },
            { code: "EDAF80", name: "Datorgrafik", credits: 7.5, rating: 4.5 },
            {
                code: "FMSF10",
                name: "Stationära stokastiska processer",
                credits: 7.5,
                rating: 3.8,
            },
            { code: "FMAN71", name: "Matristeori", credits: 7.5, rating: 4.1 },
            {
                code: "EDAN35",
                name: "Högpresterande datorgrafik",
                credits: 7.5,
                rating: 4.7,
            },
            {
                code: "MAMN25",
                name: "Interaktionsdesign",
                credits: 7.5,
                rating: 4.3,
            },
            {
                code: "EXTQ41",
                name: "Introduktion till artificiella neuronnätverk och deep learning",
                credits: 7.5,
                rating: 4.6,
            },
            {
                code: "EDAN96",
                name: "Tillämpad maskininlärning",
                credits: 7.5,
                rating: 4.4,
            },
            { code: "FMAN95", name: "Datorseende", credits: 7.5, rating: 4.3 },
            {
                code: "MAMN01",
                name: "Avancerad interaktionsdesign",
                credits: 7.5,
                rating: 4.0,
            },
            {
                code: "MAMF45",
                name: "Virtual Reality i teori och praktik",
                credits: 7.5,
                rating: 4.5,
            },
            {
                code: "EDAP30",
                name: "Avancerad tillämpad maskininlärning",
                credits: 7.5,
                rating: 4.2,
            },
            {
                code: "FMAN45",
                name: "Maskininlärning",
                credits: 7.5,
                rating: 4.1,
            },
            {
                code: "TNSN05",
                name: "Digital tillgänglighet",
                credits: 7.5,
                rating: 3.9,
            },
            {
                code: "MAMN65",
                name: "Extended Reality (XR) - fortsättningskurs",
                credits: 7.5,
                rating: 4.4,
            },
            {
                code: "FMSN20",
                name: "Spatial statistik med bildanalys",
                credits: 7.5,
                rating: 4.0,
            },
        ],
    },
    {
        id: "hs",
        title: "Hårdvarunära systemutveckling",
        courses: [
            {
                code: "EITF35",
                name: "Digitala strukturer på kisel",
                credits: 7.5,
                rating: 4.1,
            },
            {
                code: "EITF51",
                name: "Kretsar och system för trådlös kommunikation",
                credits: 7.5,
                rating: 3.8,
            },
            {
                code: "EIEN65",
                name: "Tillämpad mekatronik",
                credits: 15.0,
                rating: 4.3,
            },
            {
                code: "EITF20",
                name: "Datorarkitektur",
                credits: 7.5,
                rating: 4.2,
            },
            { code: "EDAG01", name: "Effektiv C", credits: 7.5, rating: 4.0 },
            {
                code: "ETIN46",
                name: "Integration av hårdvarueffektiva algoritmer",
                credits: 7.5,
                rating: 3.9,
            },
            { code: "ESSF10", name: "Mätteknik", credits: 5.0, rating: 3.7 },
            {
                code: "BMEN20",
                name: "Projektkurs i signalbehandling – från idé till app",
                credits: 7.5,
                rating: 4.2,
            },
            {
                code: "FRTN01",
                name: "Realtidssystem",
                credits: 10.0,
                rating: 4.4,
            },
            {
                code: "EITN30",
                name: "Internet inuti",
                credits: 7.5,
                rating: 4.1,
            },
            {
                code: "EDAN15",
                name: "Konstruktion av inbyggda system",
                credits: 7.5,
                rating: 4.0,
            },
            { code: "BMEF10", name: "Sensorteknik", credits: 7.5, rating: 3.8 },
            {
                code: "BMEN40",
                name: "Projektkurs i automatiserade mätsystem",
                credits: 7.5,
                rating: 4.1,
            },
        ],
    },
    {
        id: "is",
        title: "Inbyggda system",
        courses: [
            {
                code: "EITF35",
                name: "Digitala strukturer på kisel",
                credits: 7.5,
                rating: 4.1,
            },
            { code: "EDAN65", name: "Kompilatorer", credits: 7.5, rating: 4.3 },
            {
                code: "EDAN26",
                name: "Multicoreprogrammering",
                credits: 7.5,
                rating: 4.2,
            },
            {
                code: "EIEN65",
                name: "Tillämpad mekatronik",
                credits: 15.0,
                rating: 4.3,
            },
            {
                code: "EITF20",
                name: "Datorarkitektur",
                credits: 7.5,
                rating: 4.2,
            },
            { code: "EDAG01", name: "Effektiv C", credits: 7.5, rating: 4.0 },
            {
                code: "EITP40",
                name: "Maskininlärning för sakernas internet (IoT)",
                credits: 7.5,
                rating: 4.1,
            },
            {
                code: "EDAF35",
                name: "Operativsystem",
                credits: 7.5,
                rating: 4.0,
            },
            {
                code: "BMEN20",
                name: "Projektkurs i signalbehandling – från idé till app",
                credits: 7.5,
                rating: 4.2,
            },
            {
                code: "FRTN01",
                name: "Realtidssystem",
                credits: 10.0,
                rating: 4.4,
            },
            {
                code: "EITN30",
                name: "Internet inuti",
                credits: 7.5,
                rating: 4.1,
            },
            {
                code: "EDAN15",
                name: "Konstruktion av inbyggda system",
                credits: 7.5,
                rating: 4.0,
            },
            {
                code: "EDAN75",
                name: "Optimerande kompilatorer",
                credits: 7.5,
                rating: 4.2,
            },
        ],
    },
    {
        id: "mai",
        title: "Maskinintelligens",
        courses: [
            {
                code: "EDAP20",
                name: "Intelligenta autonoma system",
                credits: 7.5,
                rating: 4.4,
            },
            {
                code: "EDAN20",
                name: "Språkteknologi",
                credits: 7.5,
                rating: 4.2,
            },
            {
                code: "FMSF10",
                name: "Stationära stokastiska processer",
                credits: 7.5,
                rating: 3.8,
            },
            {
                code: "FRTN85",
                name: "Tillämpad robotik",
                credits: 7.5,
                rating: 4.5,
            },
            {
                code: "FRTN65",
                name: "Modellering och inlärning från data",
                credits: 7.5,
                rating: 4.3,
            },
            {
                code: "BMEN35",
                name: "Datadriven hälsa",
                credits: 7.5,
                rating: 4.1,
            },
            {
                code: "EXTQ41",
                name: "Introduktion till artificiella neuronnätverk och deep learning",
                credits: 7.5,
                rating: 4.6,
            },
            { code: "FMAN61", name: "Optimering", credits: 7.5, rating: 4.0 },
            {
                code: "TNSN01",
                name: "Servicerobotik",
                credits: 7.5,
                rating: 4.2,
            },
            {
                code: "EDAN96",
                name: "Tillämpad maskininlärning",
                credits: 7.5,
                rating: 4.4,
            },
            {
                code: "EDAP01",
                name: "Artificiell intelligens",
                credits: 7.5,
                rating: 4.3,
            },
            {
                code: "FRTN75",
                name: "Inlärningsbaserad reglering",
                credits: 7.5,
                rating: 4.1,
            },
            {
                code: "EDAP30",
                name: "Avancerad tillämpad maskininlärning",
                credits: 7.5,
                rating: 4.2,
            },
            {
                code: "FMAN45",
                name: "Maskininlärning",
                credits: 7.5,
                rating: 4.1,
            },
            {
                code: "FRTN50",
                name: "Optimering för maskininlärning",
                credits: 7.5,
                rating: 4.0,
            },
            {
                code: "VFTN75",
                name: "Den smarta stadens styrning: AI och etik i en spatial kontext",
                credits: 7.5,
                rating: 3.9,
            },
        ],
    },
    {
        id: "ns",
        title: "Nätverk och säkerhet",
        courses: [
            {
                code: "EITG05",
                name: "Digital kommunikation",
                credits: 7.5,
                rating: 4.0,
            },
            {
                code: "EITP20",
                name: "Konstruktion av säkra system",
                credits: 7.5,
                rating: 4.2,
            },
            {
                code: "FMSF15",
                name: "Markovprocesser",
                credits: 7.5,
                rating: 3.8,
            },
            {
                code: "ETSN11",
                name: "Trådlösa nätverk och applikationer - Systemdesign och prestanda",
                credits: 7.5,
                rating: 4.1,
            },
            {
                code: "ETTN01",
                name: "Digital kommunikation, fortsättningskurs",
                credits: 7.5,
                rating: 4.0,
            },
            { code: "EDIN01", name: "Kryptoteknik", credits: 7.5, rating: 4.3 },
            {
                code: "EITP40",
                name: "Maskininlärning för sakernas internet (IoT)",
                credits: 7.5,
                rating: 4.1,
            },
            { code: "FRTN90", name: "Molnsystem", credits: 7.5, rating: 4.2 },
            { code: "EITN95", name: "Simulering", credits: 7.5, rating: 3.9 },
            { code: "EITF06", name: "Webbsäkerhet", credits: 7.5, rating: 4.4 },
            {
                code: "EITN41",
                name: "Avancerad webbsäkerhet",
                credits: 7.5,
                rating: 4.3,
            },
            {
                code: "EITN45",
                name: "Informationsteori",
                credits: 7.5,
                rating: 3.8,
            },
            {
                code: "EITN30",
                name: "Internet inuti",
                credits: 7.5,
                rating: 4.1,
            },
            {
                code: "ETSF10",
                name: "Internetprotokoll",
                credits: 7.5,
                rating: 4.0,
            },
            {
                code: "EITP50",
                name: "Nätverksarkitektur för 5G-system",
                credits: 7.5,
                rating: 4.2,
            },
        ],
    },
    {
        id: "pv",
        title: "Programvara",
        courses: [
            { code: "EDAN65", name: "Kompilatorer", credits: 7.5, rating: 4.3 },
            {
                code: "EDAN26",
                name: "Multicoreprogrammering",
                credits: 7.5,
                rating: 4.2,
            },
            {
                code: "EDAN20",
                name: "Språkteknologi",
                credits: 7.5,
                rating: 4.2,
            },
            { code: "EDAG01", name: "Effektiv C", credits: 7.5, rating: 4.0 },
            { code: "FRTN90", name: "Molnsystem", credits: 7.5, rating: 4.2 },
            {
                code: "EDAF35",
                name: "Operativsystem",
                credits: 7.5,
                rating: 4.0,
            },
            {
                code: "ETSN20",
                name: "Programvarutestning",
                credits: 7.5,
                rating: 4.1,
            },
            {
                code: "EDAN70",
                name: "Projekt i datavetenskap",
                credits: 7.5,
                rating: 4.3,
            },
            {
                code: "EDAN96",
                name: "Tillämpad maskininlärning",
                credits: 7.5,
                rating: 4.4,
            },
            {
                code: "EDAP01",
                name: "Artificiell intelligens",
                credits: 7.5,
                rating: 4.3,
            },
            {
                code: "FMAP05",
                name: "Linjär och kombinatorisk optimering",
                credits: 7.5,
                rating: 3.9,
            },
            {
                code: "EDAP15",
                name: "Programanalys",
                credits: 7.5,
                rating: 4.1,
            },
            {
                code: "EDAF50",
                name: "C++ - programmering",
                credits: 7.5,
                rating: 4.0,
            },
            {
                code: "EDAF75",
                name: "Databasteknik",
                credits: 7.5,
                rating: 4.2,
            },
            {
                code: "EDAN55",
                name: "Avancerade algoritmer",
                credits: 7.5,
                rating: 4.3,
            },
            {
                code: "EDAN75",
                name: "Optimerande kompilatorer",
                credits: 7.5,
                rating: 4.2,
            },
        ],
    },
    {
        id: "se",
        title: "Software engineering",
        courses: [
            {
                code: "EITP20",
                name: "Konstruktion av säkra system",
                credits: 7.5,
                rating: 4.2,
            },
            {
                code: "ETSN05",
                name: "Programvaruutveckling för stora system",
                credits: 7.5,
                rating: 4.3,
            },
            {
                code: "BMEN35",
                name: "Datadriven hälsa",
                credits: 7.5,
                rating: 4.1,
            },
            {
                code: "MAMN25",
                name: "Interaktionsdesign",
                credits: 7.5,
                rating: 4.3,
            },
            {
                code: "EDAN10",
                name: "Konfigurationshantering",
                credits: 7.5,
                rating: 4.0,
            },
            { code: "FRTN90", name: "Molnsystem", credits: 7.5, rating: 4.2 },
            {
                code: "ETSN20",
                name: "Programvarutestning",
                credits: 7.5,
                rating: 4.1,
            },
            {
                code: "EDAN96",
                name: "Tillämpad maskininlärning",
                credits: 7.5,
                rating: 4.4,
            },
            { code: "EITF06", name: "Webbsäkerhet", credits: 7.5, rating: 4.4 },
            {
                code: "ETSN15",
                name: "Kravhantering",
                credits: 7.5,
                rating: 3.9,
            },
            {
                code: "EDAF75",
                name: "Databasteknik",
                credits: 7.5,
                rating: 4.2,
            },
            {
                code: "MAMN30",
                name: "Ledarskap, arbetsorganisation och projektledning",
                credits: 7.5,
                rating: 4.0,
            },
            {
                code: "FMAN45",
                name: "Maskininlärning",
                credits: 7.5,
                rating: 4.1,
            },
            {
                code: "MAMF50",
                name: "Användbarhetsutvärdering",
                credits: 7.5,
                rating: 3.8,
            },
            {
                code: "TNSN05",
                name: "Digital tillgänglighet",
                credits: 7.5,
                rating: 3.9,
            },
            {
                code: "MAMN50",
                name: "Teoretiska perspektiv inom interaktionsdesign",
                credits: 7.5,
                rating: 4.1,
            },
        ],
    },
    {
        id: "ssr",
        title: "System, signaler och reglering",
        courses: [
            {
                code: "EITG05",
                name: "Digital kommunikation",
                credits: 7.5,
                rating: 4.0,
            },
            {
                code: "EITN60",
                name: "Optimal och adaptiv signalbehandling",
                credits: 7.5,
                rating: 4.1,
            },
            {
                code: "FRTN55",
                name: "Reglerteknik, fortsättningskurs",
                credits: 7.5,
                rating: 4.2,
            },
            {
                code: "FMSF10",
                name: "Stationära stokastiska processer",
                credits: 7.5,
                rating: 3.8,
            },
            { code: "FMAN71", name: "Matristeori", credits: 7.5, rating: 4.1 },
            {
                code: "FRTN65",
                name: "Modellering och inlärning från data",
                credits: 7.5,
                rating: 4.3,
            },
            {
                code: "ETTN01",
                name: "Digital kommunikation, fortsättningskurs",
                credits: 7.5,
                rating: 4.0,
            },
            {
                code: "FMSN45",
                name: "Matematisk statistik, tidsserieanalys",
                credits: 7.5,
                rating: 3.9,
            },
            {
                code: "FRTN70",
                name: "Projekt i system, reglering och maskininlärning",
                credits: 7.5,
                rating: 4.3,
            },
            { code: "EIEN50", name: "Automation", credits: 7.5, rating: 4.0 },
            {
                code: "FRTN75",
                name: "Inlärningsbaserad reglering",
                credits: 7.5,
                rating: 4.1,
            },
            {
                code: "BMEN20",
                name: "Projektkurs i signalbehandling – från idé till app",
                credits: 7.5,
                rating: 4.2,
            },
            {
                code: "FRTN01",
                name: "Realtidssystem",
                credits: 10.0,
                rating: 4.4,
            },
            {
                code: "EIEN35",
                name: "Automation för komplexa system",
                credits: 7.5,
                rating: 4.1,
            },
        ],
    },
];

const Courses = () => {
    const { t } = useTranslation();

    return (
        <main className="flex flex-col items-center w-full px-6 py-10 space-y-16">
            <header className="text-center max-w-3xl">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-datarosa">
                    {t("coursesTitle")}
                </h1>
                <p className="mt-4 text-gray-700 text-lg">{t("coursesDesc")}</p>
            </header>

            {courses.map((spec) => (
                <section key={spec.id} className="w-full max-w-7xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        {spec.title}
                    </h2>
                    <div className="flex flex-wrap gap-4">
                        {spec.courses.map((course) => (
                            <CourseCard key={course.code} {...course} />
                        ))}
                    </div>
                </section>
            ))}
        </main>
    );
};

export default Courses;
