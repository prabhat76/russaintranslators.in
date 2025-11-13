import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useLanguage } from "../context/LanguageContext";
import { Briefcase, Calendar, Clock, MapPin } from "lucide-react";

export function ExperienceTimeline() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const experiences = [
      {
        company: "Language Liberty",
        role: t("experience.ll.role1"),
        type: "Full-time",
        start: "Aug 2020",
        end: "Present",
        duration: "5 yrs 4 mos",
        description: t("experience.ll.desc1"),
        color: "#b91c1c",
        location: "Mumbai, India",
        icon: "💼"
      },
      {
        company: "Language Liberty",
        role: t("experience.ll.role2"),
        type: "Full-time",
        start: "Aug 2020",
        end: "Present",
        duration: "5 yrs 4 mos",
        description: t("experience.ll.desc2"),
        color: "#dc2626",
        location: "Mumbai, India",
        icon: "🚀"
      },
      {
        company: "Sirmaxo Chemicals Pvt Ltd",
        role: t("experience.sirmaxo.role"),
        type: "Freelance",
        start: "Aug 2020",
        end: "Present",
        duration: "5 yrs 4 mos",
        description: t("experience.sirmaxo.desc"),
        color: "#ea580c",
        location: "Mumbai, India",
        icon: "🔬"
      },
      {
        company: "SULPHUR MILLS LTD",
        role: t("experience.sulphur.role"),
        type: "Freelance",
        start: "Aug 2020",
        end: "Present",
        duration: "5 yrs 4 mos",
        description: t("experience.sulphur.desc"),
        color: "#d97706",
        location: "Mumbai, India",
        icon: "🏭"
      },
      {
        company: "Foreign Language Institute",
        role: t("experience.fli.role"),
        type: "Freelance",
        start: "Mar 2019",
        end: "Present",
        duration: "6 yrs 9 mos",
        description: t("experience.fli.desc"),
        color: "#059669",
        location: "Mumbai, India",
        icon: "🎓"
      },
      {
        company: "KJK Diamonds",
        role: t("experience.kjk.role"),
        type: "Freelance",
        start: "Feb 2021",
        end: "Aug 2021",
        duration: "7 mos",
        description: t("experience.kjk.desc"),
        color: "#0891b2",
        location: "Mumbai, India",
        icon: "💎"
      }
    ];

    const width = containerRef.current.clientWidth;
    const height = 700;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 3;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Parse dates for sorting
    const parseDate = (dateStr: string) => {
      if (dateStr === "Present") return new Date();
      const [month, year] = dateStr.split(" ");
      const monthMap: { [key: string]: number } = {
        "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5,
        "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11
      };
      return new Date(parseInt(year), monthMap[month], 1);
    };

    const data = experiences.map(exp => ({
      ...exp,
      startDate: parseDate(exp.start),
      endDate: parseDate(exp.end)
    })).sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    // Create circular layout
    const angleStep = (2 * Math.PI) / data.length;
    
    data.forEach((exp, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      // Create group for each experience
      const g = svg.append("g")
        .attr("class", "experience-node")
        .style("cursor", "pointer")
        .on("mouseenter", () => setHoveredIndex(i))
        .on("mouseleave", () => setHoveredIndex(null));

      // Draw connection line from center
      g.append("line")
        .attr("x1", centerX)
        .attr("y1", centerY)
        .attr("x2", centerX)
        .attr("y2", centerY)
        .attr("stroke", exp.color)
        .attr("stroke-width", 2)
        .attr("opacity", 0.3)
        .transition()
        .duration(1000)
        .delay(i * 100)
        .attr("x2", x)
        .attr("y2", y);

      // Draw outer circle (animated)
      g.append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 0)
        .attr("fill", exp.color)
        .attr("opacity", 0.2)
        .transition()
        .duration(800)
        .delay(i * 100 + 200)
        .attr("r", 45);

      // Draw main circle
      g.append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 0)
        .attr("fill", "white")
        .attr("stroke", exp.color)
        .attr("stroke-width", 3)
        .style("filter", "drop-shadow(0 4px 6px rgba(0,0,0,0.1))")
        .transition()
        .duration(600)
        .delay(i * 100 + 400)
        .attr("r", 35);

      // Add icon/emoji
      g.append("text")
        .attr("x", x)
        .attr("y", y + 5)
        .attr("text-anchor", "middle")
        .attr("font-size", "24px")
        .attr("opacity", 0)
        .text(exp.icon)
        .transition()
        .duration(400)
        .delay(i * 100 + 800)
        .attr("opacity", 1);

      // Add company name
      const textRadius = radius + 60;
      const textX = centerX + textRadius * Math.cos(angle);
      const textY = centerY + textRadius * Math.sin(angle);

      g.append("text")
        .attr("x", textX)
        .attr("y", textY)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", "#374151")
        .attr("font-size", "13px")
        .attr("font-weight", "700")
        .attr("opacity", 0)
        .text(exp.company)
        .transition()
        .duration(400)
        .delay(i * 100 + 1000)
        .attr("opacity", 1);

      // Add duration below company
      g.append("text")
        .attr("x", textX)
        .attr("y", textY + 16)
        .attr("text-anchor", "middle")
        .attr("fill", "#6b7280")
        .attr("font-size", "11px")
        .attr("opacity", 0)
        .text(exp.duration)
        .transition()
        .duration(400)
        .delay(i * 100 + 1100)
        .attr("opacity", 1);
    });

    // Add center circle with logo/text
    svg.append("circle")
      .attr("cx", centerX)
      .attr("cy", centerY)
      .attr("r", 0)
      .attr("fill", "#dc2626")
      .attr("opacity", 0.1)
      .transition()
      .duration(1000)
      .attr("r", 80);

    svg.append("circle")
      .attr("cx", centerX)
      .attr("cy", centerY)
      .attr("r", 0)
      .attr("fill", "white")
      .attr("stroke", "#dc2626")
      .attr("stroke-width", 4)
      .style("filter", "drop-shadow(0 8px 16px rgba(0,0,0,0.15))")
      .transition()
      .duration(800)
      .delay(200)
      .attr("r", 60);

    svg.append("text")
      .attr("x", centerX)
      .attr("y", centerY - 10)
      .attr("text-anchor", "middle")
      .attr("fill", "#dc2626")
      .attr("font-size", "16px")
      .attr("font-weight", "700")
      .attr("opacity", 0)
      .text("Language")
      .transition()
      .duration(400)
      .delay(1000)
      .attr("opacity", 1);

    svg.append("text")
      .attr("x", centerX)
      .attr("y", centerY + 10)
      .attr("text-anchor", "middle")
      .attr("fill", "#dc2626")
      .attr("font-size", "16px")
      .attr("font-weight", "700")
      .attr("opacity", 0)
      .text("Liberty")
      .transition()
      .duration(400)
      .delay(1200)
      .attr("opacity", 1);

    svg.append("text")
      .attr("x", centerX)
      .attr("y", centerY + 28)
      .attr("text-anchor", "middle")
      .attr("fill", "#9ca3af")
      .attr("font-size", "11px")
      .attr("opacity", 0)
      .text("Est. 2020")
      .transition()
      .duration(400)
      .delay(1400)
      .attr("opacity", 1);

  }, [t, hoveredIndex]);

  const experiences = [
    {
      company: "Language Liberty",
      role: t("experience.ll.role1"),
      type: "Full-time",
      start: "Aug 2020",
      end: "Present",
      duration: "5 yrs 4 mos",
      description: t("experience.ll.desc1"),
      color: "#b91c1c",
      location: "Mumbai, India",
      icon: "💼"
    },
    {
      company: "Sirmaxo Chemicals",
      role: t("experience.sirmaxo.role"),
      type: "Freelance",
      start: "Aug 2020",
      end: "Present",
      duration: "5 yrs 4 mos",
      description: t("experience.sirmaxo.desc"),
      color: "#ea580c",
      location: "Mumbai, India",
      icon: "🔬"
    },
    {
      company: "Sulphur Mills",
      role: t("experience.sulphur.role"),
      type: "Freelance",
      start: "Aug 2020",
      end: "Present",
      duration: "5 yrs 4 mos",
      description: t("experience.sulphur.desc"),
      color: "#d97706",
      location: "Mumbai, India",
      icon: "🏭"
    },
    {
      company: "Foreign Lang. Inst.",
      role: t("experience.fli.role"),
      type: "Freelance",
      start: "Mar 2019",
      end: "Present",
      duration: "6 yrs 9 mos",
      description: t("experience.fli.desc"),
      color: "#059669",
      location: "Mumbai, India",
      icon: "🎓"
    },
    {
      company: "KJK Diamonds",
      role: t("experience.kjk.role"),
      type: "Freelance",
      start: "Feb 2021",
      end: "Aug 2021",
      duration: "7 mos",
      description: t("experience.kjk.desc"),
      color: "#0891b2",
      location: "Mumbai, India",
      icon: "💎"
    }
  ];

  return (
    <div ref={containerRef} className="w-full">
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <svg ref={svgRef} className="w-full"></svg>
      </div>
      
      {/* Experience Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className={`group relative p-6 rounded-xl bg-white border-2 transition-all duration-300 ${
              hoveredIndex === index 
                ? 'shadow-2xl -translate-y-2 scale-105' 
                : 'shadow-md hover:shadow-xl hover:-translate-y-1'
            }`}
            style={{ borderColor: exp.color }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex items-start gap-4">
              <div 
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: exp.color + '20' }}
              >
                {exp.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 mb-1 truncate" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {exp.company}
                </h4>
                <p className="text-sm text-gray-700 font-medium mb-2">{exp.role}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <Calendar className="w-3 h-3" />
                  <span>{exp.start} - {exp.end}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <Clock className="w-3 h-3" />
                  <span>{exp.duration}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                  <MapPin className="w-3 h-3" />
                  <span>{exp.location}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{exp.description}</p>
                <span 
                  className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ 
                    backgroundColor: exp.color + '20',
                    color: exp.color
                  }}
                >
                  {exp.type}
                </span>
              </div>
            </div>
            <div 
              className="absolute bottom-0 left-0 right-0 h-1 rounded-b-xl transition-all duration-300"
              style={{ 
                backgroundColor: exp.color,
                transform: hoveredIndex === index ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left'
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
