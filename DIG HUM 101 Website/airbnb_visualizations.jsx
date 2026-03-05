import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, ScatterChart, Scatter, Cell, ReferenceLine, ComposedChart, Area } from "recharts";

const viz1Data = [
  {"neighbourhood":"Long Beach","Entire home/apt":1499,"Private room":373,"Shared room":14,"Hotel room":20,"total":1906},
  {"neighbourhood":"Hollywood","Entire home/apt":1361,"Private room":353,"Shared room":10,"Hotel room":34,"total":1758},
  {"neighbourhood":"Venice","Entire home/apt":1350,"Private room":177,"Shared room":2,"Hotel room":0,"total":1529},
  {"neighbourhood":"Santa Monica","Entire home/apt":986,"Private room":249,"Shared room":2,"Hotel room":6,"total":1243},
  {"neighbourhood":"West Hollywood","Entire home/apt":985,"Private room":169,"Shared room":3,"Hotel room":62,"total":1219},
  {"neighbourhood":"Downtown","Entire home/apt":900,"Private room":224,"Shared room":11,"Hotel room":20,"total":1155},
  {"neighbourhood":"Beverly Hills","Entire home/apt":784,"Private room":149,"Shared room":2,"Hotel room":0,"total":935},
  {"neighbourhood":"Pasadena","Entire home/apt":653,"Private room":143,"Shared room":0,"Hotel room":26,"total":822},
  {"neighbourhood":"Hollywood Hills","Entire home/apt":626,"Private room":103,"Shared room":0,"Hotel room":0,"total":729},
  {"neighbourhood":"Alhambra","Entire home/apt":486,"Private room":234,"Shared room":2,"Hotel room":0,"total":722},
  {"neighbourhood":"Glendale","Entire home/apt":613,"Private room":106,"Shared room":2,"Hotel room":0,"total":721},
  {"neighbourhood":"Hollywood Hills West","Entire home/apt":622,"Private room":61,"Shared room":1,"Hotel room":0,"total":684},
  {"neighbourhood":"Exposition Park","Entire home/apt":79,"Private room":575,"Shared room":1,"Hotel room":0,"total":655},
  {"neighbourhood":"Culver City","Entire home/apt":516,"Private room":126,"Shared room":0,"Hotel room":2,"total":644},
  {"neighbourhood":"Burbank","Entire home/apt":503,"Private room":131,"Shared room":1,"Hotel room":0,"total":635},
  {"neighbourhood":"Beverly Grove","Entire home/apt":489,"Private room":94,"Shared room":0,"Hotel room":3,"total":586},
  {"neighbourhood":"Rowland Heights","Entire home/apt":236,"Private room":332,"Shared room":3,"Hotel room":3,"total":574},
  {"neighbourhood":"Mid-City","Entire home/apt":402,"Private room":151,"Shared room":2,"Hotel room":0,"total":555},
  {"neighbourhood":"Woodland Hills","Entire home/apt":441,"Private room":99,"Shared room":2,"Hotel room":0,"total":542},
  {"neighbourhood":"Sherman Oaks","Entire home/apt":442,"Private room":88,"Shared room":2,"Hotel room":0,"total":532}
];

const viz2Data = [
  {"group":"City of Los Angeles","Single-listing host (1)":9271,"Small multi-listing (2-5)":5559,"Commercial (6+)":8047,"total":22877},
  {"group":"Other Cities","Single-listing host (1)":6454,"Small multi-listing (2-5)":5778,"Commercial (6+)":6157,"total":18389},
  {"group":"Unincorporated Areas","Single-listing host (1)":1425,"Small multi-listing (2-5)":1563,"Commercial (6+)":1331,"total":4319}
];

const viz3Data = [
  {"month":"2014-01","n":40},{"month":"2014-04","n":50},{"month":"2014-07","n":90},{"month":"2014-10","n":80},
  {"month":"2015-01","n":78},{"month":"2015-04","n":140},{"month":"2015-07","n":226},{"month":"2015-10","n":192},
  {"month":"2016-01","n":143},{"month":"2016-04","n":232},{"month":"2016-07","n":305},{"month":"2016-10","n":231},
  {"month":"2017-01","n":186},{"month":"2017-04","n":273},{"month":"2017-07","n":357},{"month":"2017-10","n":262},
  {"month":"2018-01","n":224},{"month":"2018-04","n":310},{"month":"2018-07","n":395},{"month":"2018-10","n":309},
  {"month":"2019-01","n":231},{"month":"2019-04","n":348},{"month":"2019-07","n":418},{"month":"2019-10","n":337},
  {"month":"2020-01","n":210},{"month":"2020-03","n":109},{"month":"2020-04","n":11},{"month":"2020-07","n":122},{"month":"2020-10","n":115},
  {"month":"2021-01","n":76},{"month":"2021-04","n":219},{"month":"2021-07","n":338},{"month":"2021-10","n":249},
  {"month":"2022-01","n":227},{"month":"2022-04","n":316},{"month":"2022-07","n":406},{"month":"2022-10","n":307},
  {"month":"2023-01","n":282},{"month":"2023-04","n":375},{"month":"2023-07","n":477},{"month":"2023-10","n":363},
  {"month":"2024-01","n":349},{"month":"2024-04","n":420},{"month":"2024-07","n":555},{"month":"2024-10","n":445},
  {"month":"2025-01","n":377},{"month":"2025-04","n":474},{"month":"2025-07","n":665},{"month":"2025-10","n":789}
];

const viz4Data = [
  {"neighbourhood":"Malibu","entire_home_pct":93.6,"private_room_pct":6.4,"t":452},
  {"neighbourhood":"Playa Vista","entire_home_pct":92.8,"private_room_pct":7.2,"t":111},
  {"neighbourhood":"Avalon","entire_home_pct":92.7,"private_room_pct":4.8,"t":248},
  {"neighbourhood":"Topanga","entire_home_pct":92.1,"private_room_pct":7.7,"t":390},
  {"neighbourhood":"Beverly Crest","entire_home_pct":91.3,"private_room_pct":8.7,"t":231},
  {"neighbourhood":"Hwd Hills West","entire_home_pct":90.9,"private_room_pct":8.9,"t":684},
  {"neighbourhood":"Marina del Rey","entire_home_pct":90.9,"private_room_pct":8.9,"t":384},
  {"neighbourhood":"Manhattan Beach","entire_home_pct":90.8,"private_room_pct":9.0,"t":445},
  {"neighbourhood":"Palmdale","entire_home_pct":43.9,"private_room_pct":55.7,"t":228},
  {"neighbourhood":"Rowland Heights","entire_home_pct":41.1,"private_room_pct":57.8,"t":574},
  {"neighbourhood":"Pico-Union","entire_home_pct":40.8,"private_room_pct":56.3,"t":206},
  {"neighbourhood":"Arlington Heights","entire_home_pct":37.0,"private_room_pct":59.3,"t":108},
  {"neighbourhood":"Vermont Vista","entire_home_pct":29.3,"private_room_pct":67.2,"t":58},
  {"neighbourhood":"Adams-Normandie","entire_home_pct":26.5,"private_room_pct":72.1,"t":68},
  {"neighbourhood":"University Park","entire_home_pct":25.0,"private_room_pct":67.3,"t":52},
  {"neighbourhood":"Exposition Park","entire_home_pct":12.1,"private_room_pct":87.8,"t":655}
];

const scatterData = [
  {"ccd":"Los Angeles","listings":23613,"entire_home_pct":72.4,"multi_listing_pct":62.3,"median_income":79637},
  {"ccd":"Santa Monica","listings":6065,"entire_home_pct":83.6,"multi_listing_pct":66.7,"median_income":114885},
  {"ccd":"San Fernando Valley","listings":3866,"entire_home_pct":77.6,"multi_listing_pct":55.6,"median_income":92046},
  {"ccd":"Pasadena","listings":2343,"entire_home_pct":80.8,"multi_listing_pct":61.8,"median_income":120550},
  {"ccd":"Long Beach-Lakewood","listings":1988,"entire_home_pct":78.4,"multi_listing_pct":52.9,"median_income":91722},
  {"ccd":"Torrance","listings":1284,"entire_home_pct":66.0,"multi_listing_pct":56.5,"median_income":116217},
  {"ccd":"East San Gabriel","listings":1283,"entire_home_pct":46.7,"multi_listing_pct":79.1,"median_income":96952},
  {"ccd":"SW San Gabriel","listings":1041,"entire_home_pct":64.1,"multi_listing_pct":80.5,"median_income":83779},
  {"ccd":"Inglewood","listings":860,"entire_home_pct":72.3,"multi_listing_pct":57.6,"median_income":75746},
  {"ccd":"N. Antelope Valley","listings":614,"entire_home_pct":45.8,"multi_listing_pct":65.3,"median_income":80795},
  {"ccd":"Agoura Hills-Malibu","listings":573,"entire_home_pct":88.8,"multi_listing_pct":61.6,"median_income":169991},
  {"ccd":"South Bay Cities","listings":445,"entire_home_pct":90.8,"multi_listing_pct":57.8,"median_income":160911},
  {"ccd":"Upper San Gabriel","listings":406,"entire_home_pct":67.7,"multi_listing_pct":70.9,"median_income":90913},
  {"ccd":"Newhall","listings":354,"entire_home_pct":60.5,"multi_listing_pct":50.3,"median_income":126278},
  {"ccd":"Downey-Norwalk","listings":260,"entire_home_pct":61.2,"multi_listing_pct":60.4,"median_income":92089},
  {"ccd":"Compton","listings":240,"entire_home_pct":56.2,"multi_listing_pct":42.9,"median_income":86558},
  {"ccd":"Whittier","listings":194,"entire_home_pct":69.1,"multi_listing_pct":56.2,"median_income":100226},
  {"ccd":"Palos Verdes","listings":156,"entire_home_pct":69.2,"multi_listing_pct":62.2,"median_income":160539}
];

const C = { coral:'#E07A5F', navy:'#3D405B', sage:'#81B29A', gold:'#F2CC8F', cream:'#F4F1DE', slate:'#5C6B73', rust:'#BC4B51', teal:'#5B8E7D', sand:'#D4A373', steel:'#8B8BAE' };

const Tip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div style={{ background:'#fff', border:'1px solid #ddd', padding:'10px 14px', borderRadius:6, fontSize:13, boxShadow:'0 2px 8px rgba(0,0,0,.1)' }}>
      <p style={{ fontWeight:700, marginBottom:4, color:'#333' }}>{label}</p>
      {payload.map((p,i) => <p key={i} style={{ color:p.color, margin:'2px 0' }}>{p.name}: <strong>{typeof p.value==='number'?p.value.toLocaleString():p.value}</strong></p>)}
    </div>
  );
};

const Section = ({ num, title, question, chartNote, analysis, children }) => (
  <div style={{ marginBottom:56, paddingBottom:40, borderBottom:'1px solid #e8e4dc' }}>
    <div style={{ marginBottom:20 }}>
      <div style={{ display:'flex', alignItems:'baseline', gap:10, marginBottom:6, flexWrap:'wrap' }}>
        <span style={{ background:C.coral, color:'#fff', fontWeight:800, fontSize:13, padding:'3px 10px', borderRadius:4, letterSpacing:.5, fontFamily:'system-ui', flexShrink:0 }}>VIZ {num}</span>
        <h2 style={{ margin:0, fontSize:21, fontWeight:700, color:C.navy, lineHeight:1.3 }}>{title}</h2>
      </div>
      <p style={{ margin:'8px 0 0', fontSize:14, color:C.slate, fontStyle:'italic', lineHeight:1.5 }}>
        <strong>Humanities Question:</strong> {question}
      </p>
    </div>
    <div style={{ background:'#fff', borderRadius:10, padding:'24px 12px 16px', border:'1px solid #e8e4dc', marginBottom:16 }}>
      {children}
    </div>
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, fontSize:13.5, lineHeight:1.65, color:'#444' }}>
      <div style={{ background:'#f8f7f4', borderRadius:8, padding:16, borderLeft:`3px solid ${C.sage}` }}>
        <p style={{ fontWeight:700, fontSize:11, textTransform:'uppercase', letterSpacing:1, color:C.sage, marginBottom:6, fontFamily:'system-ui' }}>Chart Type Selection</p>
        <p style={{ margin:0 }}>{chartNote}</p>
      </div>
      <div style={{ background:'#f8f7f4', borderRadius:8, padding:16, borderLeft:`3px solid ${C.coral}` }}>
        <p style={{ fontWeight:700, fontSize:11, textTransform:'uppercase', letterSpacing:1, color:C.coral, marginBottom:6, fontFamily:'system-ui' }}>Analysis</p>
        <p style={{ margin:0 }}>{analysis}</p>
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  return (
    <div style={{ maxWidth:940, margin:'0 auto', padding:'32px 20px', fontFamily:"'Georgia','Times New Roman',serif", background:C.cream, minHeight:'100vh' }}>
      <div style={{ textAlign:'center', marginBottom:48, paddingBottom:32, borderBottom:`2px solid ${C.navy}` }}>
        <p style={{ fontSize:12, letterSpacing:3, textTransform:'uppercase', color:C.coral, fontWeight:700, fontFamily:'system-ui', marginBottom:8 }}>DH 101 · Data Visualizations</p>
        <h1 style={{ fontSize:28, fontWeight:700, color:C.navy, margin:'0 0 12px', lineHeight:1.25 }}>Airbnb & Los Angeles</h1>
        <p style={{ fontSize:15, color:C.slate, maxWidth:620, margin:'0 auto', lineHeight:1.6 }}>
          How does Airbnb spatially shape and commodify communities in Los Angeles — and for whom? Five visualizations exploring 45,585 listings across LA County.
        </p>
        <p style={{ fontSize:11, color:'#999', marginTop:8, fontFamily:'system-ui' }}>InsideAirbnb (Dec 2025) · U.S. Census Bureau ACS 5-Year Estimates</p>
      </div>

      {/* VIZ 1 */}
      <Section num={1}
        title="Where Is Airbnb Concentrated? Top 20 Neighbourhoods"
        question="Where are Airbnb listings densest in Los Angeles, and is the platform dominated by whole-home rentals or casual room-sharing?"
        chartNote="A horizontal stacked bar chart allows simultaneous comparison of two dimensions: total listing volume (bar length) and room type composition within each neighborhood (color segments). This dual encoding reveals not just where Airbnb is concentrated but what kind of housing is listed. The horizontal orientation accommodates long neighborhood names and makes magnitude comparisons intuitive."
        analysis="Listings cluster in coastal and entertainment-adjacent neighborhoods — Long Beach (1,906), Hollywood (1,758), Venice (1,529), and Santa Monica (1,243) lead the county. Entire homes dominate most neighborhoods at 70–90% of listings, confirming Airbnb operates primarily as a whole-unit rental market. However, Exposition Park and Rowland Heights stand out as exceptions where private rooms dominate, suggesting a different commodification pattern — room-sharing rather than full unit conversion — in these communities."
      >
        <p style={{ fontSize:13, fontWeight:600, textAlign:'center', color:C.navy, marginBottom:12, fontFamily:'system-ui' }}>Top 20 Neighbourhoods by Listing Count (n=45,585 total)</p>
        <ResponsiveContainer width="100%" height={520}>
          <BarChart data={[...viz1Data].reverse()} layout="vertical" margin={{ left:135, right:20, top:5, bottom:5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8e4dc" />
            <XAxis type="number" tick={{ fontSize:11, fill:'#666' }} />
            <YAxis dataKey="neighbourhood" type="category" tick={{ fontSize:11, fill:'#444' }} width={130} />
            <Tooltip content={<Tip />} />
            <Legend wrapperStyle={{ fontSize:12, fontFamily:'system-ui' }} />
            <Bar dataKey="Entire home/apt" stackId="a" fill={C.coral} />
            <Bar dataKey="Private room" stackId="a" fill={C.navy} />
            <Bar dataKey="Shared room" stackId="a" fill={C.sage} />
            <Bar dataKey="Hotel room" stackId="a" fill={C.gold} />
          </BarChart>
        </ResponsiveContainer>
        <p style={{ fontSize:10, color:'#999', textAlign:'center', marginTop:6, fontFamily:'system-ui' }}>Source: InsideAirbnb Los Angeles, December 2025 · CC BY 4.0</p>
      </Section>

      {/* VIZ 2 */}
      <Section num={2}
        title="Who Profits? Host Professionalization Across LA County"
        question="Where is hosting professionalized into a commercial operation, and what does the prevalence of multi-listing hosts reveal about who benefits from the platform?"
        chartNote="A grouped bar chart enables direct side-by-side comparison of host categories across the three administrative neighbourhood groups. Unlike stacked bars, grouped bars make it easy to compare absolute counts of each host type, revealing that commercial operators (6+ listings) are not a fringe phenomenon but a structural market feature. The three-group structure maps onto LA County's administrative geography."
        analysis="Commercial operators managing 6+ listings account for 31–35% of all listings across every neighbourhood group. In the City of LA alone, 8,047 listings (35.2%) belong to hosts with 6+ properties — nearly matching single-listing casual hosts (40.5%). Roughly one in three Airbnb units in LA operates as part of an informal hospitality business. This finding undercuts the 'sharing economy' narrative and suggests economic benefits concentrate among professional operators rather than ordinary residents supplementing rent."
      >
        <p style={{ fontSize:13, fontWeight:600, textAlign:'center', color:C.navy, marginBottom:12, fontFamily:'system-ui' }}>Listings by Host Type Across LA County</p>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={viz2Data} margin={{ left:20, right:20, top:5, bottom:5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8e4dc" />
            <XAxis dataKey="group" tick={{ fontSize:11, fill:'#444' }} />
            <YAxis tick={{ fontSize:11, fill:'#666' }} />
            <Tooltip content={<Tip />} />
            <Legend wrapperStyle={{ fontSize:12, fontFamily:'system-ui' }} />
            <Bar dataKey="Single-listing host (1)" fill={C.sage} radius={[3,3,0,0]} />
            <Bar dataKey="Small multi-listing (2-5)" fill={C.gold} radius={[3,3,0,0]} />
            <Bar dataKey="Commercial (6+)" fill={C.coral} radius={[3,3,0,0]} />
          </BarChart>
        </ResponsiveContainer>
        <p style={{ fontSize:10, color:'#999', textAlign:'center', marginTop:6, fontFamily:'system-ui' }}>Source: InsideAirbnb (calculated_host_listings_count), December 2025</p>
      </Section>

      {/* VIZ 3 */}
      <Section num={3}
        title="Platform Growth and the COVID-19 Rupture"
        question="How has Airbnb activity in LA evolved over time, and what does the pandemic disruption reveal about the platform's relationship to tourism cycles?"
        chartNote="An area chart with a time axis is ideal for showing temporal trends and dramatic disruptions. The filled area emphasizes cumulative volume, while the COVID reference line creates a clear 'before and after' visual. Monthly granularity reveals seasonal rhythms (summer peaks) alongside macro-level growth and pandemic collapse. This chart type is standard in economic analysis for showing trends and structural breaks."
        analysis="Growth was steady from 2014–2019 with clear summer seasonality. COVID-19 caused a catastrophic collapse: new listing activations dropped from 210 in January 2020 to just 11 in April 2020 — a 95% decline. Recovery took over a year. By 2024–2025, the platform surged past previous peaks, suggesting not recovery but acceleration. Airbnb's commodification of LA housing is not a one-time event but an intensifying, ongoing process that survived a global shutdown."
      >
        <p style={{ fontSize:13, fontWeight:600, textAlign:'center', color:C.navy, marginBottom:12, fontFamily:'system-ui' }}>New Listing Activations per Quarter, 2014–2025</p>
        <ResponsiveContainer width="100%" height={360}>
          <ComposedChart data={viz3Data} margin={{ left:10, right:20, top:5, bottom:40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8e4dc" />
            <XAxis dataKey="month" tick={{ fontSize:9, fill:'#666', angle:-45, textAnchor:'end' }} interval={1} />
            <YAxis tick={{ fontSize:11, fill:'#666' }} />
            <Tooltip content={<Tip />} />
            <ReferenceLine x="2020-03" stroke={C.rust} strokeWidth={2} strokeDasharray="5 5" label={{ value:"COVID-19", position:"top", fontSize:11, fill:C.rust, fontWeight:700 }} />
            <ReferenceLine x="2019-07" stroke={C.steel} strokeWidth={1} strokeDasharray="3 3" label={{ value:"HSO", position:"insideTopRight", fontSize:10, fill:C.steel }} />
            <Area type="monotone" dataKey="n" fill={C.coral} fillOpacity={.15} stroke={C.coral} strokeWidth={2} name="New listings" />
          </ComposedChart>
        </ResponsiveContainer>
        <p style={{ fontSize:10, color:'#999', textAlign:'center', marginTop:6, fontFamily:'system-ui' }}>Source: InsideAirbnb (first_review as listing activation proxy) · HSO = Home Sharing Ordinance</p>
      </Section>

      {/* VIZ 4 */}
      <Section num={4}
        title="Two Geographies of Commodification"
        question="Is different types of housing being commodified in wealthy coastal neighbourhoods versus lower-income inland communities, and what does that reveal about uneven platform impacts?"
        chartNote="A horizontal bar chart comparing the highest and lowest entire-home-percentage neighborhoods creates a visual divergence that communicates two distinct geographies. Rather than showing all 200+ neighborhoods, selecting the extremes sharpens the contrast and invites the reader to ask why patterns differ. The percentage scale standardizes comparison across neighborhoods of different sizes, and horizontal orientation accommodates neighborhood names."
        analysis="In wealthy, coastal neighborhoods — Malibu (93.6%), Manhattan Beach (90.8%), Hollywood Hills West (90.9%) — over 90% of listings are entire homes removed from residential use. In lower-income, historically marginalized neighborhoods — Exposition Park (12.1%), University Park (25.0%), Adams-Normandie (26.5%) — private room-sharing dominates. This reveals two fundamentally different Airbnb economies: one converting whole properties into tourist inventory (in affluent areas), another based on residents renting rooms to supplement income (in lower-income areas). The platform commodifies housing differently depending on neighborhood wealth."
      >
        <p style={{ fontSize:13, fontWeight:600, textAlign:'center', color:C.navy, marginBottom:12, fontFamily:'system-ui' }}>Entire Home % vs. Private Room %: High and Low Extremes (min. 50 listings)</p>
        <ResponsiveContainer width="100%" height={480}>
          <BarChart data={viz4Data} layout="vertical" margin={{ left:120, right:30, top:5, bottom:5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8e4dc" />
            <XAxis type="number" domain={[0,100]} tick={{ fontSize:11, fill:'#666' }} tickFormatter={v=>`${v}%`} />
            <YAxis dataKey="neighbourhood" type="category" tick={{ fontSize:11, fill:'#444' }} width={115} />
            <Tooltip formatter={v=>`${v}%`} />
            <Legend wrapperStyle={{ fontSize:12, fontFamily:'system-ui' }} />
            <Bar dataKey="entire_home_pct" name="Entire home/apt %" fill={C.coral} radius={[0,3,3,0]} />
            <Bar dataKey="private_room_pct" name="Private room %" fill={C.navy} radius={[0,3,3,0]} />
          </BarChart>
        </ResponsiveContainer>
        <p style={{ fontSize:10, color:'#999', textAlign:'center', marginTop:6, fontFamily:'system-ui' }}>Source: InsideAirbnb Los Angeles, December 2025</p>
      </Section>

      {/* VIZ 5 */}
      <Section num={5}
        title="Connecting Platform Activity to Community Income"
        question="Does Airbnb listing concentration align with community income levels, and does the platform reinforce or disrupt LA's existing economic geography?"
        chartNote="A bubble scatter plot places each Census County Division at the intersection of two variables — median household income (x-axis) and Airbnb listing count (y-axis) — while bubble color encodes entire-home percentage. This three-dimensional encoding reveals whether Airbnb clusters in wealthy or lower-income areas and whether commodification type varies with income. Scatter plots effectively show correlation patterns and outliers in geographic-demographic data, directly linking our two primary datasets."
        analysis="High-income areas like Agoura Hills-Malibu ($170K median) and South Bay Cities ($161K) have fewer total listings but the highest entire-home rates (89–91%), shown by coral bubbles. Lower-income areas like Inglewood ($76K) and Compton ($87K) have both fewer listings and lower entire-home rates. The massive Los Angeles CCD dominates in volume (23,613 listings) at $80K median income. This confirms Airbnb's most intensive commodification — converting entire homes to tourist units — disproportionately occurs in wealthier communities, suggesting platform benefits flow where wealth already concentrates."
      >
        <p style={{ fontSize:13, fontWeight:600, textAlign:'center', color:C.navy, marginBottom:12, fontFamily:'system-ui' }}>Airbnb Listings vs. Median Income by Census County Division</p>
        <ResponsiveContainer width="100%" height={420}>
          <ScatterChart margin={{ left:20, right:20, top:20, bottom:30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8e4dc" />
            <XAxis type="number" dataKey="median_income" tick={{ fontSize:11, fill:'#666' }} tickFormatter={v=>`$${(v/1000).toFixed(0)}K`} label={{ value:"Median Household Income (ACS)", position:"bottom", offset:10, fontSize:12, fill:'#666', fontFamily:'system-ui' }} />
            <YAxis type="number" dataKey="listings" tick={{ fontSize:11, fill:'#666' }} label={{ value:"Total Airbnb Listings", angle:-90, position:"insideLeft", offset:0, fontSize:12, fill:'#666', fontFamily:'system-ui' }} />
            <Tooltip cursor={{ strokeDasharray:'3 3' }} content={({ active, payload }) => {
              if (!active || !payload?.[0]) return null;
              const d = payload[0].payload;
              return (
                <div style={{ background:'#fff', border:'1px solid #ddd', padding:'10px 14px', borderRadius:6, fontSize:13, boxShadow:'0 2px 8px rgba(0,0,0,.1)' }}>
                  <p style={{ fontWeight:700, marginBottom:4 }}>{d.ccd}</p>
                  <p style={{ margin:'2px 0' }}>Listings: <strong>{d.listings.toLocaleString()}</strong></p>
                  <p style={{ margin:'2px 0' }}>Median Income: <strong>${d.median_income.toLocaleString()}</strong></p>
                  <p style={{ margin:'2px 0' }}>Entire Home: <strong>{d.entire_home_pct}%</strong></p>
                  <p style={{ margin:'2px 0' }}>Multi-listing Hosts: <strong>{d.multi_listing_pct}%</strong></p>
                </div>
              );
            }} />
            <Scatter data={scatterData} name="CCD">
              {scatterData.map((d,i) => (
                <Cell key={i} fill={d.entire_home_pct>80?C.coral:d.entire_home_pct>65?C.gold:C.sage} fillOpacity={.8} stroke="#fff" strokeWidth={1.5} r={Math.max(7,Math.sqrt(d.listings)/2.8)} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <div style={{ display:'flex', justifyContent:'center', gap:20, fontSize:11, color:'#666', fontFamily:'system-ui', marginTop:8, flexWrap:'wrap' }}>
          <span><span style={{ display:'inline-block', width:12, height:12, borderRadius:'50%', background:C.coral, marginRight:4, verticalAlign:-2 }}></span>Entire home &gt;80%</span>
          <span><span style={{ display:'inline-block', width:12, height:12, borderRadius:'50%', background:C.gold, marginRight:4, verticalAlign:-2 }}></span>65–80%</span>
          <span><span style={{ display:'inline-block', width:12, height:12, borderRadius:'50%', background:C.sage, marginRight:4, verticalAlign:-2 }}></span>&lt;65%</span>
          <span style={{ marginLeft:8 }}>Bubble size = listing count</span>
        </div>
        <p style={{ fontSize:10, color:'#999', textAlign:'center', marginTop:6, fontFamily:'system-ui' }}>Sources: InsideAirbnb Dec 2025 · U.S. Census Bureau ACS S1901</p>
      </Section>

      <div style={{ textAlign:'center', paddingTop:24, borderTop:`1px solid ${C.navy}`, fontSize:12, color:'#888', fontFamily:'system-ui' }}>
        <p style={{margin:'4px 0'}}>Data: InsideAirbnb.com (CC BY 4.0) · U.S. Census Bureau ACS 5-Year Estimates</p>
        <p style={{margin:'4px 0'}}>DH 101 — Group 4A · UCLA · 2026</p>
      </div>
    </div>
  );
}
