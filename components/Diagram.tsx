
import React from 'react';

interface DiagramProps {
  width: number;
  height: number;
}

const Diagram: React.FC<DiagramProps> = React.memo(({ width, height }) => {
  return (
    <div className="bg-white">
      <style>{`
        .block {
          fill: transparent;
          stroke: #333;
          stroke-width: 2;
          transition: stroke 0.2s;
        }

        .clickable-nf:hover .block {
          stroke: #4f46e5;
          stroke-width: 3;
        }

        .highlight {
          animation: fadeInGreen 2s forwards;
          animation-delay: 0s;
        }

        .blink {
          animation: fadeIn 1s forwards, pulse 2s infinite;
        }

        .line {
          stroke: #666;
          stroke-width: 2;
          opacity: 0;
          animation: drawLine 1s forwards;
        }

        .bus {
          stroke: #000;
          stroke-width: 2;
        }

        text {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          pointer-events: none; /* Let clicks pass to the anchor tag */
        }

        @keyframes fadeIn {
          to { opacity: 1; }
        }

        @keyframes pulse {
          0%, 100% { stroke-width: 2; }
          50% { stroke-width: 6; }
        }

        @keyframes drawLine {
          to { opacity: 1; }
        }

        @keyframes fadeInGreen {
          0% { fill: transparent; }
          100% { fill: #a3e4a3; }
        }

        @keyframes blinkingText {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @keyframes blinkingText1 {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }

        @keyframes blinkingText2 {
          0% { opacity: 0; }
          25% { opacity: 1; }
          75% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes moveDots {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -15; }
        }

        @keyframes flashGreen {
          0% { fill: white; }
          50% { fill: lightgreen; }
          100% { fill: white; }
        }

        @keyframes flashGreenSegment {
          0% { fill: lightgreen; }
          4.17% { fill: white; }
          100% { fill: white; }
        }

        @keyframes hidePath {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes blinkArrow {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }

        /* Signal Paths Synchronized to 3GPP Sequence */
        .AMF_NRF { opacity: 0; stroke: darkcyan; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arroworange); animation: fadeIn 0.5s forwards 5.5s, moveDots 1s linear infinite, hidePath 0s 8.5s forwards; }
        .NEF_NRF { opacity: 0; stroke: darkcyan; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arroworange); animation: fadeIn 0.5s forwards 11.5s, moveDots 1s linear infinite, hidePath 0s 15.5s forwards; }
        .AUSF_NRF { opacity: 0; stroke: darkcyan; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arroworange); animation: fadeIn 0.5s forwards 17.5s, moveDots 1s linear infinite, hidePath 0s 20.5s forwards; }
        .NSSF_NRF { opacity: 0; stroke: darkcyan; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arroworange); animation: fadeIn 0.5s forwards 23.5s, moveDots 1s linear infinite, hidePath 0s 26.5s forwards; }
        .UDM_NRF { opacity: 0; stroke: darkcyan; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arroworange); animation: fadeIn 0.5s forwards 29.5s, moveDots 1s linear infinite, hidePath 0s 32.5s forwards; }
        .PCF_NRF { opacity: 0; stroke: darkcyan; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arroworange); animation: fadeIn 0.5s forwards 35.5s, moveDots 1s linear infinite, hidePath 0s 38.5s forwards; }
        .SMF_NRF { opacity: 0; stroke: darkcyan; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arroworange); animation: fadeIn 0.5s forwards 41.5s, moveDots 1s linear infinite, hidePath 0s 44.5s forwards; }
        
        .BSSetupReq { opacity: 0; stroke: red; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arrowred); animation: fadeIn 0.5s forwards 50s, moveDots 1s linear infinite, hidePath 0s 55s forwards; }
        .BSSetupRes { opacity: 0; stroke: red; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arrowred); animation: fadeIn 0.5s forwards 56s, moveDots 1s linear infinite, hidePath 0s 61s forwards; }
        .SSB { opacity: 0; stroke: purple; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arrowred); animation: fadeIn 0.5s forwards 65s, moveDots 1s linear infinite, hidePath 0s 70s forwards; }
        .RanAccPro { opacity: 0; stroke: purple; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arrowred); animation: fadeIn 0.5s forwards 71s, moveDots 1s linear infinite, hidePath 0s 76s forwards; }
        .RRCReq { opacity: 0; stroke: purple; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arrowred); animation: fadeIn 0.5s forwards 77s, moveDots 1s linear infinite, hidePath 0s 82s forwards; }
        .RRCSetup { opacity: 0; stroke: purple; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arrowred); animation: fadeIn 0.5s forwards 83s, moveDots 1s linear infinite, hidePath 0s 88s forwards; }
        .RRCSetupComp { opacity: 0; stroke: purple; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arrowred); animation: fadeIn 0.5s forwards 89s, moveDots 1s linear infinite, hidePath 0s 94s forwards; }
        
        .regPath { opacity: 0; stroke: darkblue; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arrowred); animation: fadeIn 0.5s forwards 95s, moveDots 1s linear infinite, hidePath 0s 100s forwards; }
        .AMF_NSSF_Req { opacity: 0; stroke: darkcyan; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arroworange); animation: fadeIn 0.5s forwards 97s, moveDots 1s linear infinite, hidePath 0s 98.5s forwards; }
        .NSSF_AMF_Res { opacity: 0; stroke: darkcyan; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arroworange); animation: fadeIn 0.5s forwards 99s, moveDots 1s linear infinite, hidePath 0s 100.5s forwards; }

        .authReqPath { opacity: 0; stroke: darkblue; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arrowblue); animation: fadeIn 0.5s forwards 101s, moveDots 1s linear infinite, hidePath 0s 106s forwards; }
        .authVect { opacity: 0; stroke: darkblue; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arrowblue); animation: fadeIn 0.5s forwards 107s, moveDots 1s linear infinite, hidePath 0s 112s forwards; }
        .authVectRes { opacity: 0; stroke: darkblue; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arrowblue); animation: fadeIn 0.5s forwards 113s, moveDots 1s linear infinite, hidePath 0s 118s forwards; }
        .authChal { opacity: 0; stroke: darkblue; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arrowblue); animation: fadeIn 0.5s forwards 119s, moveDots 1s linear infinite, hidePath 0s 124s forwards; }
        .authChal_UE { opacity: 0; stroke: darkblue; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arrowblue); animation: fadeIn 0.5s forwards 125s, moveDots 1s linear infinite, hidePath 0s 130s forwards; }
        .UE_RES { opacity: 0; stroke: darkblue; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arrowblue); animation: fadeIn 0.5s forwards 131s, moveDots 1s linear infinite, hidePath 0s 136s forwards; }
        .AUSFcompRES { opacity: 0; stroke: darkblue; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arrowblue); animation: fadeIn 0.5s forwards 137s, moveDots 1s linear infinite, hidePath 0s 142s forwards; }
        
        .secCmdPath { opacity: 0; stroke: darkblue; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arrowblue); animation: fadeIn 0.5s forwards 143s, moveDots 1s linear infinite, hidePath 0s 148s forwards; }
        .secCompPath { opacity: 0; stroke: darkblue; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arrowblue); animation: fadeIn 0.5s forwards 149s, moveDots 1s linear infinite, hidePath 0s 154s forwards; }

        .accPath { opacity: 0; stroke: darkblue; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arroworange); animation: fadeIn 0.5s forwards 155s, moveDots 1s linear infinite, hidePath 0s 160s forwards; }
        .pduSessEstReq { opacity: 0; stroke: darkorange; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arroworange); animation: fadeIn 0.5s forwards 161s, moveDots 1s linear infinite, hidePath 0s 166s forwards; }
        .NsmfpduSessCon { opacity: 0; stroke: darkorange; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arroworange); animation: fadeIn 0.5s forwards 167s, moveDots 1s linear infinite, hidePath 0s 172s forwards; }
        
        /* Policy Interaction Paths */
        .policyReqPath { opacity: 0; stroke: darkorange; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arroworange); animation: fadeIn 0.5s forwards 173s, moveDots 1s linear infinite, hidePath 0s 178s forwards; }
        .policyResPath { opacity: 0; stroke: darkorange; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arroworange); animation: fadeIn 0.5s forwards 179s, moveDots 1s linear infinite, hidePath 0s 184s forwards; }

        .N4SessEst { opacity: 0; stroke: darkorange; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arroworange); animation: fadeIn 0.5s forwards 185s, moveDots 1s linear infinite, hidePath 0s 190s forwards; }
        .SesSetupRes { opacity: 0; stroke: darkorange; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arroworange); animation: fadeIn 0.5s forwards 191s, moveDots 1s linear infinite, hidePath 0s 196s forwards; }
        .PDUSesAcc { opacity: 0; stroke: darkorange; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arroworange); animation: fadeIn 0.5s forwards 197s, moveDots 1s linear infinite, hidePath 0s 202s forwards; }
        .PDUSesAccNAS { opacity: 0; stroke: darkorange; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arroworange); animation: fadeIn 0.5s forwards 203s, moveDots 1s linear infinite, hidePath 0s 208s forwards; }
        .dlPath { opacity: 0; stroke: navy; stroke-width: 4; stroke-dasharray: 10 5; fill: none; marker-end: url(#arroworange); animation: fadeIn 0.5s forwards 209s, moveDots 1s linear infinite; }

        /* Protocol Stack Animations Synchronized to Handshake Slots */
        .flash-NAS { animation: flashGreen 1s linear 1 65s, flashGreen 1s linear 1 83s, flashGreen 1s linear 1 97s, flashGreen 1s linear 1 99s, flashGreen 1s linear 1 125s, flashGreen 1s linear 1 143s, flashGreen 1s linear 1 155s, flashGreen 1s linear 1 203s, flashGreen 1s linear 1 76.5s, flashGreen 1s linear 1 82.5s, flashGreen 1s linear 1 94.5s, flashGreen 1s linear 1 100.5s, flashGreen 1s linear 1 136.5s, flashGreen 1s linear 1 149.5s, flashGreen 1s linear 1 161.5s; }
        .flash-RRC { animation: flashGreen 1s linear 1 65.5s, flashGreen 1s linear 1 83.5s, flashGreen 1s linear 1 125.5s, flashGreen 1s linear 1 143.5s, flashGreen 1s linear 1 155.5s, flashGreen 1s linear 1 203.5s, flashGreen 1s linear 1 76s, flashGreen 1s linear 1 82s, flashGreen 1s linear 1 94s, flashGreen 1s linear 1 100s, flashGreen 1s linear 1 136s, flashGreen 1s linear 1 149s, flashGreen 1s linear 1 161s; }
        .flash-SDAP { animation: flashGreenSegment 6s linear infinite calc(209s + 1s); }
        .flash-PDCP { animation: flashGreen 1s linear 1 66s, flashGreen 1s linear 1 84s, flashGreen 1s linear 1 126s, flashGreen 1s linear 1 144s, flashGreen 1s linear 1 156s, flashGreen 1s linear 1 204s, flashGreen 1s linear 1 209.5s, flashGreen 1s linear 1 75.5s, flashGreen 1s linear 1 81.5s, flashGreen 1s linear 1 93.5s, flashGreen 1s linear 1 99.5s, flashGreen 1s linear 1 135.5s, flashGreen 1s linear 1 148.5s, flashGreen 1s linear 1 160.5s, flashGreenSegment 6s linear infinite calc(209s + 1.5s); }
        .flash-RLC { animation: flashGreen 1s linear 1 66.5s, flashGreen 1s linear 1 84.5s, flashGreen 1s linear 1 126.5s, flashGreen 1s linear 1 144.5s, flashGreen 1s linear 1 156.5s, flashGreen 1s linear 1 204.5s, flashGreen 1s linear 1 210s, flashGreen 1s linear 1 75s, flashGreen 1s linear 1 81s, flashGreen 1s linear 1 93s, flashGreen 1s linear 1 99s, flashGreen 1s linear 1 135s, flashGreen 1s linear 1 148s, flashGreen 1s linear 1 160s, flashGreenSegment 6s linear infinite calc(209s + 2s); }
        .flash-MAC { animation: flashGreen 1s linear 1 67s, flashGreen 1s linear 1 85s, flashGreen 1s linear 1 127s, flashGreen 1s linear 1 145s, flashGreen 1s linear 1 157s, flashGreen 1s linear 1 205s, flashGreen 1s linear 1 210.5s, flashGreen 1s linear 1 74.5s, flashGreen 1s linear 1 80.5s, flashGreen 1s linear 1 92.5s, flashGreen 1s linear 1 98.5s, flashGreen 1s linear 1 134.5s, flashGreen 1s linear 1 147.5s, flashGreen 1s linear 1 159.5s, flashGreenSegment 6s linear infinite calc(209s + 2.5s); }
        .flash-PHY { animation: flashGreen 1s linear 1 67.5s, flashGreen 1s linear 1 85.5s, flashGreen 1s linear 1 127.5s, flashGreen 1s linear 1 145.5s, flashGreen 1s linear 1 157.5s, flashGreen 1s linear 1 205.5s, flashGreen 1s linear 1 211s, flashGreen 1s linear 1 74s, flashGreen 1s linear 1 80s, flashGreen 1s linear 1 92s, flashGreen 1s linear 1 98s, flashGreen 1s linear 1 134s, flashGreen 1s linear 1 147s, flashGreen 1s linear 1 159s, flashGreenSegment 6s linear infinite calc(209s + 3s); }

        .flash-PHY-ue { animation: flashGreen 1s linear 1 68s, flashGreen 1s linear 1 86s, flashGreen 1s linear 1 128s, flashGreen 1s linear 1 146s, flashGreen 1s linear 1 158s, flashGreen 1s linear 1 206s, flashGreen 1s linear 1 212s, flashGreen 1s linear 1 73.5s, flashGreen 1s linear 1 79.5s, flashGreen 1s linear 1 91.5s, flashGreen 1s linear 1 97.5s, flashGreen 1s linear 1 133.5s, flashGreen 1s linear 1 146.5s, flashGreen 1s linear 1 158.5s, flashGreenSegment 6s linear infinite calc(209s + 4s); }
        .flash-MAC-ue { animation: flashGreen 1s linear 1 68.5s, flashGreen 1s linear 1 86.5s, flashGreen 1s linear 1 128.5s, flashGreen 1s linear 1 146.5s, flashGreen 1s linear 1 158.5s, flashGreen 1s linear 1 206.5s, flashGreen 1s linear 1 212.5s, flashGreen 1s linear 1 73s, flashGreen 1s linear 1 79s, flashGreen 1s linear 1 91s, flashGreen 1s linear 1 97s, flashGreen 1s linear 1 133s, flashGreen 1s linear 1 146s, flashGreen 1s linear 1 158s, flashGreenSegment 6s linear infinite calc(209s + 4.5s); }
        .flash-RLC-ue { animation: flashGreen 1s linear 1 69s, flashGreen 1s linear 1 87s, flashGreen 1s linear 1 129s, flashGreen 1s linear 1 147s, flashGreen 1s linear 1 159s, flashGreen 1s linear 1 207s, flashGreen 1s linear 1 213s, flashGreen 1s linear 1 72.5s, flashGreen 1s linear 1 78.5s, flashGreen 1s linear 1 90.5s, flashGreen 1s linear 1 96.5s, flashGreen 1s linear 1 132.5s, flashGreen 1s linear 1 145.5s, flashGreen 1s linear 1 157.5s, flashGreenSegment 6s linear infinite calc(209s + 5s); }
        .flash-PDCP-ue { animation: flashGreen 1s linear 1 69.5s, flashGreen 1s linear 1 87.5s, flashGreen 1s linear 1 129.5s, flashGreen 1s linear 1 147.5s, flashGreen 1s linear 1 159.5s, flashGreen 1s linear 1 207.5s, flashGreen 1s linear 1 213.5s, flashGreen 1s linear 1 72s, flashGreen 1s linear 1 78s, flashGreen 1s linear 1 90s, flashGreen 1s linear 1 96s, flashGreen 1s linear 1 132s, flashGreen 1s linear 1 145s, flashGreen 1s linear 1 157s, flashGreenSegment 6s linear infinite calc(209s + 5.5s); }
        .flash-SADP-ue { animation: flashGreenSegment 6s linear infinite calc(209s + 6s); }
        .flash-RRC-ue { animation: flashGreen 1s linear 1 70s, flashGreen 1s linear 1 88s, flashGreen 1s linear 1 130s, flashGreen 1s linear 1 148s, flashGreen 1s linear 1 160s, flashGreen 1s linear 1 208s, flashGreen 1s linear 1 71.5s, flashGreen 1s linear 1 77.5s, flashGreen 1s linear 1 89.5s, flashGreen 1s linear 1 95.5s, flashGreen 1s linear 1 131.5s, flashGreen 1s linear 1 144.5s, flashGreen 1s linear 1 156.5s; }
        .flash-NAS-ue { animation: flashGreen 1s linear 1 70.5s, flashGreen 1s linear 1 88.5s, flashGreen 1s linear 1 130.5s, flashGreen 1s linear 1 148.5s, flashGreen 1s linear 1 160.5s, flashGreen 1s linear 1 208.5s, flashGreen 1s linear 1 71s, flashGreen 1s linear 1 77s, flashGreen 1s linear 1 89s, flashGreen 1s linear 1 95s, flashGreen 1s linear 1 131s, flashGreen 1s linear 1 144s, flashGreen 1s linear 1 156s; }

        .dl_65, .dl_83, .dl_125, .dl_143, .dl_155, .dl_203, .dl_209, .dl_212 { stroke-width: 2.5; marker-end: url(#arrow); opacity: 0; }
        .dl_65  { stroke: purple;     animation: blinkArrow 1s linear 5 forwards 65s; }
        .dl_83  { stroke: purple;     animation: blinkArrow 1s linear 5 forwards 83s; }
        .dl_125 { stroke: darkblue;   animation: blinkArrow 1s linear 5 forwards 125s; }
        .dl_143 { stroke: darkblue;   animation: blinkArrow 1s linear 5 forwards 143s; }
        .dl_155 { stroke: darkblue;   animation: blinkArrow 1s linear 5 forwards 155s; }
        .dl_203 { stroke: darkorange; animation: blinkArrow 1s linear 5 forwards 203s; }
        .dl_209 { stroke: navy;       animation: blinkArrow 1s linear 5 forwards 209s; }
        .dl_212 { stroke: navy;       animation: blinkArrow 1s linear infinite forwards 212s; }

        .ul_71, .ul_77, .ul_89, .ul_95, .ul_131, .ul_149, .ul_161 { stroke-width: 2.5; marker-end: url(#arrow); opacity: 0; }
        .ul_71  { stroke: purple;     animation: blinkArrow 1s linear 5 forwards 71s; }
        .ul_77  { stroke: purple;     animation: blinkArrow 1s linear 5 forwards 77s; }
        .ul_89  { stroke: purple;     animation: blinkArrow 1s linear 5 forwards 89s; }
        .ul_95  { stroke: darkblue;   animation: blinkArrow 1s linear 5 forwards 95s; }
        .ul_131 { stroke: darkblue;   animation: blinkArrow 1s linear 5 forwards 131s; }
        .ul_149 { stroke: darkblue;   animation: blinkArrow 1s linear 5 forwards 149s; }
        .ul_161 { stroke: darkorange; animation: blinkArrow 1s linear 5 forwards 161s; }

        .eventText { font-size: 12px; fill: red; opacity: 0; }
        .eventText.blink { animation: blinkingText 1s linear infinite; }
        
        /* Cursor Styling for clickable elements */
        .clickable-nf { cursor: pointer; }
      `}</style>
      
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <rect width="100%" height="100%" fill="transparent"/>
        
        {/* Core Frame */}
        <rect x="80" y="30" width="720" height="120" stroke="#2c3e50" strokeWidth="0.5" strokeDasharray="10 5" fill="none" />
        <text x="85" y="45" fontSize="14" fontWeight="bold">5G Core Network</text>

        {/* NF Labels Positioning */}
        <text x="295" y="230" transform="rotate(270,295,230)" fontWeight="bold">NGAP</text>
        <text x="565" y="220" transform="rotate(400,565,220)" fontWeight="bold">PFCP</text>
        <text x="475" y="310" fontWeight="bold">GTP-U</text>

        {/* Network Functions (NFs) Blocks with requested ETSI Specification Links */}
        <g>
          {/* NRF */}
          <a href="https://www.etsi.org/deliver/etsi_ts/129500_129599/129510/18.10.00_60/ts_129510v181000p.pdf" target="_blank" className="clickable-nf">
            <rect className="block highlight" style={{animationDelay: '0.5s'}} x="350" y="50" width="100" height="25" /><text x="400" y="67" textAnchor="middle">NRF</text>
          </a>
          {/* AMF */}
          <a href="https://www.etsi.org/deliver/etsi_ts/123500_123599/123502/18.11.00_60/ts_123502v181100p.pdf" target="_blank" className="clickable-nf">
            <rect className="block highlight" style={{animationDelay: '3.5s'}} x="250" y="100" width="100" height="25" /><text x="300" y="117" textAnchor="middle">AMF</text>
          </a>
          {/* NEF */}
          <a href="https://www.etsi.org/deliver/etsi_ts/129500_129599/129520/18.11.00_60/ts_129520v181100p.pdf" target="_blank" className="clickable-nf">
            <rect className="block highlight" style={{animationDelay: '9.5s'}} x="500" y="50" width="100" height="25" /><text x="550" y="67" textAnchor="middle">NEF</text>
          </a>
          {/* AUSF */}
          <a href="https://www.etsi.org/deliver/etsi_ts/129500_129599/129509/18.05.00_60/ts_129509v180500p.pdf" target="_blank" className="clickable-nf">
            <rect className="block highlight" style={{animationDelay: '15.5s'}} x="100" y="100" width="100" height="25" /><text x="150" y="117" textAnchor="middle">AUSF</text>
          </a>
          {/* NSSF */}
          <a href="https://www.etsi.org/deliver/etsi_ts/129500_129599/129531/18.09.00_60/ts_129531v180900p.pdf" target="_blank" className="clickable-nf">
            <rect className="block highlight" style={{animationDelay: '21.5s'}} x="200" y="50" width="100" height="25" /><text x="250" y="67" textAnchor="middle">NSSF</text>
          </a>
          {/* UDM */}
          <a href="https://www.etsi.org/deliver/etsi_ts/129500_129599/129503/18.11.00_60/ts_129503v181100p.pdf" target="_blank" className="clickable-nf">
            <rect className="block highlight" style={{animationDelay: '27.5s'}} x="550" y="100" width="100" height="25" /><text x="600" y="117" textAnchor="middle">UDM</text>
          </a>
          {/* PCF */}
          <a href="https://www.etsi.org/deliver/etsi_ts/129500_129599/129512/18.11.00_60/ts_129512v181100p.pdf" target="_blank" className="clickable-nf">
            <rect className="block highlight" style={{animationDelay: '33.5s'}} x="650" y="50" width="100" height="25" /><text x="700" y="67" textAnchor="middle">PCF</text>
          </a>
          {/* SMF */}
          <a href="https://www.etsi.org/deliver/etsi_ts/129500_129599/129502/18.10.00_60/ts_129502v181000p.pdf" target="_blank" className="clickable-nf">
            <rect className="block highlight" style={{animationDelay: '39.5s'}} x="400" y="100" width="100" height="25" /><text x="450" y="117" textAnchor="middle">SMF</text>
          </a>
          {/* UPF */}
          <a href="https://www.etsi.org/deliver/etsi_ts/129200_129299/129244/18.10.00_60/ts_129244v181000p.pdf" target="_blank" className="clickable-nf">
            <rect className="block highlight" style={{animationDelay: '45.5s'}} x="600" y="300" width="100" height="30" rx="5" /><text x="650" y="320" textAnchor="middle">UPF</text>
          </a>
          {/* BS */}
          <a href="https://www.3gpp.org/dynareport/38300.htm" target="_blank" className="clickable-nf">
            <rect className="block highlight" style={{animationDelay: '47.5s'}} x="250" y="300" width="100" height="30" rx="5" /><text x="300" y="320" textAnchor="middle">gNB</text>
          </a>
          {/* UE */}
          <a href="https://www.3gpp.org/dynareport/38300.htm" target="_blank" className="clickable-nf">
            <rect className="block highlight" style={{animationDelay: '62.5s'}} x="250" y="580" width="100" height="30" rx="5" /><text x="300" y="600" textAnchor="middle">UE</text>
          </a>
          {/* DN */}
          <circle cx="860" cy="315" r="20" className="block" /><text x="860" y="320" textAnchor="middle">DN</text>
        </g>

        {/* Bus and Static Connection Lines */}
        <line x1="100" y1="85" x2="790" y2="85" className="bus" />
        <text x="790" y="78" textAnchor="end" fontWeight="bold">SBI</text>
        <line x1="150" y1="100" x2="150" y2="85" className="line" />
        <line x1="300" y1="100" x2="300" y2="85" className="line" />
        <line x1="450" y1="100" x2="450" y2="85" className="line" />
        <line x1="600" y1="100" x2="600" y2="85" className="line" />
        <line x1="250" y1="75"  x2="250" y2="85" className="line" />
        <line x1="400" y1="75"  x2="400" y2="85" className="line" />
        <line x1="550" y1="75"  x2="550" y2="85" className="line" />
        <line x1="700" y1="75"  x2="700" y2="85" className="line" />
        
        <line x1="300" y1="580" x2="300" y2="330" className="line" />
        <line x1="350" y1="315" x2="600" y2="315" className="line" />
        <line x1="700" y1="315" x2="840" y2="315" className="line" />
        <line x1="300" y1="300" x2="300" y2="125" className="line" />
        <line x1="650" y1="300" x2="450" y2="125" className="line" />

        {/* 3GPP Signal Polylines */}
        <polyline points="305,100 305,90 395,90 395,75" className="AMF_NRF" />
        <polyline points="545,75 545,90 405,90 405,75" className="NEF_NRF" />
        <polyline points="155,100 155,90 395,90 395,75" className="AUSF_NRF" />
        <polyline points="255,75 255,90 395,90 395,75" className="NSSF_NRF" />
        <polyline points="595,100 595,90 405,90 405,75" className="UDM_NRF" />
        <polyline points="695,75 695,90 405,90 405,75" className="PCF_NRF" />
        <polyline points="445,100 445,90 405,90 405,75" className="SMF_NRF" />

        {/* Handshake Phase Polylines */}
        <polyline points="305,300 305,125" className="BSSetupReq" />
        <polyline points="305,125 305,300" className="BSSetupRes" />
        <polyline points="305,330 305,580" className="SSB" />
        <polyline points="305,580 305,330" className="RanAccPro" />
        <polyline points="305,580 305,330" className="RRCReq" />
        <polyline points="305,330 305,580" className="RRCSetup" />
        <polyline points="305,580 305,330" className="RRCSetupComp" />
        
        <polyline points="305,580 305,300 305,125" className="regPath" />
        {/* Inserted NSSF Handshake */}
        <polyline points="295,100 295,90 255,90 255,75" className="AMF_NSSF_Req" />
        <polyline points="255,75 255,90 295,90 295,100" className="NSSF_AMF_Res" />

        <polyline points="295,100 295,90 155,90 155,100" className="authReqPath" />
        <polyline points="155,100 155,90 595,90 595,100" className="authVect" />
        <polyline points="595,100 595,90 155,90 155,100" className="authVectRes" />
        <polyline points="155,100 155,90 295,90 295,100" className="authChal" />
        <polyline points="305,125 305,580" className="authChal_UE" />
        <polyline points="295,580 295,90 155,90 155,100" className="UE_RES" />
        <polyline points="155,100 155,90 295,90 295,100" className="AUSFcompRES" />
        
        <polyline points="305,125 305,580" className="secCmdPath" />
        <polyline points="305,580 305,125" className="secCompPath" />

        <polyline points="305,125 305,300 305,580" className="accPath" />
        <polyline points="305,580 305,300 305,125" className="pduSessEstReq" />
        <polyline points="305,100 305,90 445,90 445,100" className="NsmfpduSessCon" />
        
        <polyline points="445,100 445,90 695,90 695,75" className="policyReqPath" />
        <polyline points="705,75 705,90 455,90 455,100" className="policyResPath" />

        <polyline points="445,126 645,299" className="N4SessEst" />
        <polyline points="645,299 445,126" className="SesSetupRes" />
        <polyline points="445,100 445,90 305,90 305,100" className="PDUSesAcc" />
        <polyline points="305,125 305,300 305,580" className="PDUSesAccNAS" />
        <polyline points="840,322 700,322 650,322 305,322 305,580" className="dlPath" />

        {/* UE Protocol Stack with Clickable Layers */}
        <g transform="translate(300, 660)">
          <a href="https://www.etsi.org/deliver/etsi_ts/124500_124599/124501/18.12.00_60/ts_124501v181200p.pdf" target="_blank" className="clickable-nf">
            <rect className="block flash-NAS-ue" x="0" y="0" width="45" height="20" /><text x="22.5" y="15" textAnchor="middle">NAS</text>
          </a>
          <a href="https://www.etsi.org/deliver/etsi_ts/138300_138399/138331/19.00.00_60/ts_138331v190000p.pdf" target="_blank" className="clickable-nf">
            <rect className="block flash-RRC-ue" x="0" y="20" width="45" height="20" /><text x="22.5" y="35" textAnchor="middle">RRC</text>
          </a>
          <a href="https://www.etsi.org/deliver/etsi_ts/138300_138399/138324/" target="_blank" className="clickable-nf">
            <rect className="block flash-SADP-ue" x="45" y="0" width="55" height="40" /><text x="72.5" y="25" textAnchor="middle">SDAP</text>
          </a>
          <a href="https://www.etsi.org/deliver/etsi_ts/138300_138399/138323/19.00.00_60/ts_138323v190000p.pdf" target="_blank" className="clickable-nf">
            <rect className="block flash-PDCP-ue" x="0" y="40" width="100" height="20" /><text x="50" y="55" textAnchor="middle">PDCP</text>
          </a>
          <a href="https://www.etsi.org/deliver/etsi_ts/138300_138399/138322/19.00.00_60/ts_138322v190000p.pdf" target="_blank" className="clickable-nf">
            <rect className="block flash-RLC-ue" x="0" y="60" width="100" height="20" /><text x="50" y="75" textAnchor="middle">RLC</text>
          </a>
          <a href="https://www.etsi.org/deliver/etsi_ts/138300_138399/138321/19.00.00_60/ts_138321v190000p.pdf" target="_blank" className="clickable-nf">
            <rect className="block flash-MAC-ue" x="0" y="80" width="100" height="20" /><text x="50" y="95" textAnchor="middle">MAC</text>
          </a>
          <a href="https://www.etsi.org/deliver/etsi_ts/138200_138299/138291/19.01.00_60/ts_138291v190100p.pdf" target="_blank" className="clickable-nf">
            <rect className="block flash-PHY-ue" x="0" y="100" width="100" height="20" /><text x="50" y="115" textAnchor="middle">PHY</text>
          </a>
        </g>
        
        {/* BS Protocol Stack with Clickable Layers */}
        <g transform="translate(350, 390)">
          <a href="https://www.etsi.org/deliver/etsi_ts/124500_124599/124501/18.12.00_60/ts_124501v181200p.pdf" target="_blank" className="clickable-nf">
            <rect className="block flash-NAS" x="0" y="0" width="45" height="20" /><text x="22.5" y="15" textAnchor="middle">NAS</text>
          </a>
          <a href="https://www.etsi.org/deliver/etsi_ts/138300_138399/138331/19.00.00_60/ts_138331v190000p.pdf" target="_blank" className="clickable-nf">
            <rect className="block flash-RRC" x="0" y="20" width="45" height="20" /><text x="22.5" y="35" textAnchor="middle">RRC</text>
          </a>
          <a href="https://www.etsi.org/deliver/etsi_ts/138300_138399/138324/" target="_blank" className="clickable-nf">
            <rect className="block flash-SDAP" x="45" y="0" width="55" height="40" /><text x="72.5" y="25" textAnchor="middle">SDAP</text>
          </a>
          <a href="https://www.etsi.org/deliver/etsi_ts/138300_138399/138323/19.00.00_60/ts_138323v190000p.pdf" target="_blank" className="clickable-nf">
            <rect className="block flash-PDCP" x="0" y="40" width="100" height="20" /><text x="50" y="55" textAnchor="middle">PDCP</text>
          </a>
          <a href="https://www.etsi.org/deliver/etsi_ts/138300_138399/138322/19.00.00_60/ts_138322v190000p.pdf" target="_blank" className="clickable-nf">
            <rect className="block flash-RLC" x="0" y="60" width="100" height="20" /><text x="50" y="75" textAnchor="middle">RLC</text>
          </a>
          <a href="https://www.etsi.org/deliver/etsi_ts/138300_138399/138321/19.00.00_60/ts_138321v190000p.pdf" target="_blank" className="clickable-nf">
            <rect className="block flash-MAC" x="0" y="80" width="100" height="20" /><text x="50" y="95" textAnchor="middle">MAC</text>
          </a>
          <a href="https://www.etsi.org/deliver/etsi_ts/138200_138299/138291/19.01.00_60/ts_138291v190100p.pdf" target="_blank" className="clickable-nf">
            <rect className="block flash-PHY" x="0" y="100" width="100" height="20" /><text x="50" y="115" textAnchor="middle">PHY</text>
          </a>
        </g>

        {/* Handshake Arrows */}
        <line x1="465" y1="400" x2="465" y2="500" className="dl_65" /><text x="470" y="418" transform="rotate(-270,470,418)" style={{opacity: 0, animation: 'blinkingText1 1s linear 5 forwards 65s'}}>Down Link</text>
        <line x1="465" y1="400" x2="465" y2="500" className="dl_83" /><text x="470" y="418" transform="rotate(-270,470,418)" style={{opacity: 0, animation: 'blinkingText1 1s linear 5 forwards 83s'}}>Down Link</text>
        <line x1="465" y1="400" x2="465" y2="500" className="dl_125" /><text x="470" y="418" transform="rotate(-270,470,418)" style={{opacity: 0, animation: 'blinkingText1 1s linear 5 forwards 125s'}}>Down Link</text>
        <line x1="465" y1="400" x2="465" y2="500" className="dl_143" /><text x="470" y="418" transform="rotate(-270,470,418)" style={{opacity: 0, animation: 'blinkingText1 1s linear 5 forwards 143s'}}>Down Link</text>
        <line x1="465" y1="400" x2="465" y2="500" className="dl_155" /><text x="470" y="418" transform="rotate(-270,470,418)" style={{opacity: 0, animation: 'blinkingText1 1s linear 5 forwards 155s'}}>Down Link</text>
        <line x1="465" y1="400" x2="465" y2="500" className="dl_203" /><text x="470" y="418" transform="rotate(-270,470,418)" style={{opacity: 0, animation: 'blinkingText1 1s linear 5 forwards 203s'}}>Down Link</text>
        <line x1="465" y1="400" x2="465" y2="500" className="dl_209" /><text x="470" y="418" transform="rotate(-270,470,418)" style={{opacity: 0, animation: 'blinkArrow 1s linear 5 forwards 209s'}}>Down Link</text>
        <line x1="465" y1="400" x2="465" y2="500" className="dl_212" /><text x="470" y="418" transform="rotate(-270,470,418)" style={{opacity: 0, animation: 'blinkArrow 1s linear infinite forwards 212s'}}>Down Link</text>
        
        <line x1="335" y1="500" x2="335" y2="400" className="ul_71" /><text x="330" y="458" style={{opacity: 0, animation: 'blinkingText1 1s linear 5 forwards 71s'}} transform="rotate(270,335,463)">Up Link</text>
        <line x1="335" y1="500" x2="335" y2="400" className="ul_77" /><text x="330" y="458" style={{opacity: 0, animation: 'blinkingText1 1s linear 5 forwards 77s'}} transform="rotate(270,335,463)">Up Link</text>
        <line x1="335" y1="500" x2="335" y2="400" className="ul_89" /><text x="330" y="458" style={{opacity: 0, animation: 'blinkingText1 1s linear 5 forwards 89s'}} transform="rotate(270,335,463)">Up Link</text>
        <line x1="335" y1="500" x2="335" y2="400" className="ul_95" /><text x="330" y="458" style={{opacity: 0, animation: 'blinkingText1 1s linear 5 forwards 95s'}} transform="rotate(270,335,463)">Up Link</text>
        <line x1="335" y1="500" x2="335" y2="400" className="ul_131" /><text x="330" y="458" style={{opacity: 0, animation: 'blinkingText1 1s linear 5 forwards 131s'}} transform="rotate(270,335,463)">Up Link</text>
        <line x1="335" y1="500" x2="335" y2="400" className="ul_149" /><text x="330" y="458" style={{opacity: 0, animation: 'blinkingText1 1s linear 5 forwards 149s'}} transform="rotate(270,335,463)">Up Link</text>
        <line x1="335" y1="500" x2="335" y2="400" className="ul_161" /><text x="330" y="458" style={{opacity: 0, animation: 'blinkingText1 1s linear 5 forwards 161s'}} transform="rotate(270,335,463)">Up Link</text>

        <line x1="285" y1="670" x2="285" y2="770" className="ul_71" /><text x="280" y="745" style={{opacity: 0, animation: 'blinkingText1 1s linear 5 forwards 71s'}} transform="rotate(270,280,745)">Up Link</text>
        <line x1="285" y1="670" x2="285" y2="770" className="ul_149" /><text x="280" y="745" style={{opacity: 0, animation: 'blinkingText1 1s linear 5 forwards 149s'}} transform="rotate(270,280,745)">Up Link</text>
        <line x1="415" y1="770" x2="415" y2="670" className="dl_143" /><text x="420" y="690" style={{opacity: 0, animation: 'blinkingText1 1s linear 5 forwards 143s'}} transform="rotate(-270,420,690)">Down Link</text>

        {/* Status Event Text */}
        <g id="Logos">
          <text x="360" y="25" className="eventText" style={{animation: 'blinkingText2 2s forwards 0.5s'}}>Start NRF.</text>
          <text x="310" y="170" className="eventText" style={{animation: 'blinkingText2 2s forwards 3.5s'}}>Start AMF.</text>
          <text x="620" y="348" className="eventText" style={{animation: 'blinkingText2 2s forwards 45.5s'}}>Start UPF.</text>
          <text x="320" y="348" className="eventText" style={{animation: 'blinkingText2 2s forwards 47.5s'}}>Start BS.</text>
          <text x="270" y="630" className="eventText" style={{animation: 'blinkingText2 2s forwards 62.5s'}}>Start UE.</text>
        </g>

        {/* 3GPP Procedure Logs (Left) */}
        <g id="Logs" transform="translate(1050, 40)">
          {[
            { t: "Starting NRF", d: 0, c: "green" },
            { t: "Starting AMF", d: 3, c: "green" },
            { t: "AMF registering in NRF", d: 5, c: "darkgreen" },
            { t: "Starting NEF", d: 9, c: "green" },
            { t: "NEF registering in NRF", d: 11, c: "darkgreen" },
            { t: "Starting AUSF", d: 15, c: "green" },
            { t: "AUSF registering in NRF", d: 17, c: "darkgreen" },
            { t: "Starting NSSF", d: 21, c: "green" },
            { t: "NSSF registering in NRF", d: 23, c: "darkgreen" },
            { t: "Starting UDM", d: 27, c: "green" },
            { t: "UDM registering in NRF", d: 29, c: "darkgreen" },
            { t: "Starting PCF", d: 33, c: "green" },
            { t: "PCF registering in NRF", d: 35, c: "darkgreen" },
            { t: "Starting SMF", d: 39, c: "green" },
            { t: "SMF registering in NRF", d: 41, c: "darkgreen" },
            { t: "Starting UPF", d: 45, c: "green" },
            { t: "Starting BS", d: 47, c: "green" },
            { t: "Starting UE", d: 62, c: "green" }
          ].map((log, i) => (
            <text key={i} y={i * 20} fill={log.c} style={{opacity: 0, animation: 'fadeIn 2s forwards', animationDelay: `${log.d}s`}} fontWeight="bold">• {log.t}</text>
          ))}
        </g>

        {/* Handshake Log (Right) - Updated to 29 steps */}
        <g id="ProcedureLogs" transform="translate(1300, 40)">
          {[
            { t: "1. BS sends Setup Request to AMF.", d: 50, c: "red" },
            { t: "2. AMF sends Setup Response to BS.", d: 56, c: "red" },
            { t: "3. UE Cell Synchronization.", d: 65, c: "purple" },
            { t: "4. RACH Procedure UE -> BS.", d: 71, c: "purple" },
            { t: "5. UE initiates RRC setup.", d: 77, c: "purple" },
            { t: "6. BS sends RRC parameters to UE.", d: 83, c: "purple" },
            { t: "7. UE completes RRC Setup.", d: 89, c: "purple" },
            { t: "8. UE sends NAS Registration Request to AMF.", d: 95, c: "darkblue" },
            { t: "9. AMF send Slice Selection Request to NSSF.", d: 97, c: "darkblue" },
            { t: "10. NSSF sends Allowed NSSAI + Slice Info to AMF.", d: 99, c: "darkblue" },
            { t: "11. AMF forwards Registration Request to AUSF.", d: 101, c: "darkblue" },
            { t: "12. AUSF sends Authentication Vector Request to UDM.", d: 107, c: "darkblue" },
            { t: "13. UDM responds Authentication Vector to AUSF.", d: 113, c: "darkblue" },
            { t: "14. AUSF forwards Authentication Challenge to AMF.", d: 119, c: "darkblue" },
            { t: "15. AMF sends Authentication Challenge to UE.", d: 125, c: "darkblue" },
            { t: "16. UE sends Authentication Response to AMF.", d: 131, c: "darkblue" },
            { t: "17. AUSF confirms RES; Authentication Success.", d: 137, c: "darkblue" },
            { t: "18. NAS Security Mode Command (AMF -> UE).", d: 143, c: "darkblue" },
            { t: "19. NAS Security Mode Complete (UE -> AMF).", d: 149, c: "darkblue" },
            { t: "20. AMF sends Registration Accept to UE.", d: 155, c: "darkblue" },
            { t: "21. UE sends PDU Session Request.", d: 161, c: "darkorange" },
            { t: "22. AMF Create SM Context to SMF.", d: 167, c: "darkorange" },
            { t: "23. SMF Create Policy Request to PCF.", d: 173, c: "darkorange" },
            { t: "24. PCF sends Policy Decision to SMF.", d: 179, c: "darkorange" },
            { t: "25. SMF sends N4 Session Establishment to UPF.", d: 185, c: "darkorange" },
            { t: "26. UPF sends Session Setup Response to SMF.", d: 191, c: "darkorange" },
            { t: "27. SMF sends PDU Session Accept to AMF.", d: 197, c: "darkorange" },
            { t: "28. AMF sends PDU Session Accept (NAS) to UE.", d: 203, c: "darkorange" },
            { t: "29. Downlink User Plane Data connection established.", d: 209, c: "navy" }
          ].map((log, i) => (
            <text key={i} y={i * 20} fill={log.c} style={{opacity: 0, animation: 'fadeIn 2s forwards', animationDelay: `${log.d}s`}} fontWeight="900">• {log.t}</text>
          ))}
        </g>

        {/* Byte Info Overlays */}
        <g id="Bytes">
          {/* DN -> UPF area */}
          <text x="880" y="300" style={{opacity: 0, animation: 'fadeIn 1s forwards 210s'}} fill="navy" fontWeight="bold">Message: 'A'(1 byte)</text>
          <text x="730" y="340" style={{opacity: 0, animation: 'fadeIn 1s forwards 210.5s'}} fill="navy">UDP: +~8 bytes</text>
          <text x="734" y="355" style={{opacity: 0, animation: 'fadeIn 1s forwards 211s'}} fill="navy">IP: +~20 bytes</text>
          <text x="720" y="365" style={{opacity: 0, animation: 'fadeIn 1s forwards 211.5s'}} fill="navy">--------------------------</text>
          <text x="730" y="375" style={{opacity: 0, animation: 'fadeIn 1s forwards 211.5s'}} fill="navy" fontWeight="bold">Total: ~29 bytes</text>

          {/* BS -> UPF area */}
          <text x="485" y="340" style={{opacity: 0, animation: 'fadeIn 1s forwards 212s'}} fill="navy">GTP-U: +~8 bytes</text>
          <text x="485" y="350" style={{opacity: 0, animation: 'fadeIn 1s forwards 212.5s'}} fill="navy">--------------------------</text>
          <text x="495" y="360" style={{opacity: 0, animation: 'fadeIn 1s forwards 212.5s'}} fill="navy" fontWeight="bold">Total: ~37 bytes</text>

          {/* BS Stack area */}
          <text x="490" y="415" style={{opacity: 0, animation: 'fadeIn 1s forwards 213s'}} fill="navy">+~2 bytes</text>
          <text x="490" y="445" style={{opacity: 0, animation: 'fadeIn 1s forwards 213.5s'}} fill="navy">+~4 bytes</text>
          <text x="490" y="465" style={{opacity: 0, animation: 'fadeIn 1s forwards 214s'}} fill="navy">+~2 bytes</text>
          <text x="490" y="485" style={{opacity: 0, animation: 'fadeIn 1s forwards 214.5s'}} fill="navy">+~4 bytes</text>
          <text x="490" y="505" style={{opacity: 0, animation: 'fadeIn 1s forwards 215s'}} fill="navy">+~45 bytes extra</text>
          <text x="490" y="520" style={{opacity: 0, animation: 'fadeIn 1s forwards 215.5s'}} fill="navy">---------------------------</text>
          <text x="490" y="530" style={{opacity: 0, animation: 'fadeIn 1s forwards 215.5s'}} fill="navy" fontWeight="bold">Total: ~94 bytes (~ 752 bits)</text>

          {/* UE Stack area */}
          <text x="440" y="795" style={{opacity: 0, animation: 'fadeIn 1s forwards 216s'}} fill="navy" fontWeight="bold">Total: ~94 bytes (~ 752 bits)</text>
          <text x="440" y="775" style={{opacity: 0, animation: 'fadeIn 1s forwards 216.5s'}} fill="navy">-~45 bytes extra</text>
          <text x="440" y="755" style={{opacity: 0, animation: 'fadeIn 1s forwards 217s'}} fill="navy">-~4 bytes</text>
          <text x="440" y="735" style={{opacity: 0, animation: 'fadeIn 1s forwards 217.5s'}} fill="navy">-~2 bytes</text>
          <text x="440" y="715" style={{opacity: 0, animation: 'fadeIn 1s forwards 218s'}} fill="navy">-~4 bytes</text>
          <text x="440" y="685" style={{opacity: 0, animation: 'fadeIn 1s forwards 218.5s'}} fill="navy">-~2 bytes</text>
          <text x="427" y="670" style={{opacity: 0, animation: 'fadeIn 1s forwards 219s'}} fill="navy">-----------------------------</text>
          <text x="440" y="660" style={{opacity: 0, animation: 'fadeIn 1s forwards 219s'}} fill="navy" fontWeight="bold">Total: ~37 bytes</text>
          <text x="410" y="640" style={{opacity: 0, animation: 'fadeIn 1s forwards 219.5s'}} fill="navy" fontWeight="bold">IP/UDP: -~36 bytes</text>
          <text x="390" y="620" style={{opacity: 0, animation: 'fadeIn 1s forwards 220s'}} fill="navy" fontWeight="bold">App Layer: Receives 'A' = 0x41</text>
        </g>

        {/* Markers */}
        <defs>
          <marker id="arrowred" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto"><path d="M0,0 L0,3.5 L4,1.75 z" fill="red" /></marker>
          <marker id="arrowblue" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto"><path d="M0,0 L0,3.5 L4,1.75 z" fill="darkblue" /></marker>
          <marker id="arroworange" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto"><path d="M0,0 L0,3.5 L4,1.75 z" fill="darkorange" /></marker>
          <marker id="arrowgray" markerWidth="4" markerHeight="4" refX="0" refY="2" orient="auto"><path d="M0,0 L4,2 L0,4 z" fill="#cbd5e1" /></marker>
          <marker id="arrow" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto"><path d="M0,0 L0,3.5 L4,1.75 z" fill="context-stroke" /></marker>
        </defs>
      </svg>
    </div>
  );
});

export default Diagram;
