import React, { useState } from 'react';
import { PropertyItem } from '../types';

interface AmmanMapViewProps {
  items: PropertyItem[];
  selectedItemId?: string;
  onSelectItem?: (item: PropertyItem) => void;
  isArabic?: boolean;
  type?: 'estate' | 'car';
}

export const AmmanMapView: React.FC<AmmanMapViewProps> = ({
  items,
  selectedItemId,
  onSelectItem,
  isArabic = true,
  type = 'estate',
}) => {
  const [mapMode, setMapMode] = useState<'standard' | 'satellite'>('standard');
  const [activePinId, setActivePinId] = useState<string | null>(selectedItemId || null);

  // Amman neighborhood pins coordinates simulation overlay over OpenStreetMap
  const pinsData = items.map((item, idx) => {
    // Generate realistic Amman coordinate offsets relative to center (31.9539, 35.9106)
    const offsets = [
      { top: '42%', left: '48%', area: 'دير غبار' },
      { top: '35%', left: '52%', area: 'عبدون' },
      { top: '28%', left: '38%', area: 'دابوق' },
      { top: '55%', left: '60%', area: 'الشميساني' },
      { top: '22%', left: '65%', area: 'الجبيهة' },
      { top: '62%', left: '42%', area: 'أم أذينة' },
      { top: '38%', left: '32%', area: 'خلدا' },
      { top: '48%', left: '72%', area: 'طبربور' },
      { top: '70%', left: '55%', area: 'طريق المطار' },
      { top: '50%', left: '25%', area: 'الفحيص / السلط' },
    ];

    const offset = offsets[idx % offsets.length];
    return {
      item,
      top: offset.top,
      left: offset.left,
      area: offset.area,
    };
  });

  return (
    <div className="w-full h-full min-h-[500px] lg:min-h-[680px] bg-neutral-100 rounded-2xl overflow-hidden border border-neutral-300 relative shadow-inner font-ibm flex flex-col">
      
      {/* Top Map Toolbar */}
      <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-none">
        
        {/* Toggle Mode Buttons */}
        <div className="bg-white/95 backdrop-blur-md rounded-xl p-1 shadow-md border border-neutral-200 flex items-center gap-1 pointer-events-auto">
          <button
            onClick={() => setMapMode('standard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              mapMode === 'standard' ? 'bg-[#1E3A8A] text-white shadow-sm' : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            {isArabic ? 'خريطة' : 'Map'}
          </button>
          <button
            onClick={() => setMapMode('satellite')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              mapMode === 'satellite' ? 'bg-[#1E3A8A] text-white shadow-sm' : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            {isArabic ? 'قمر صناعي' : 'Satellite'}
          </button>
        </div>

        {/* Draw Zone Search Badge */}
        <div className="bg-[#EF4444] text-white px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5 text-xs font-bold pointer-events-auto cursor-pointer hover:bg-red-600 transition-colors">
          <span className="material-symbols-outlined text-[16px]">draw</span>
          <span>{isArabic ? 'رسم منطقة البحث' : 'Draw Area'}</span>
        </div>

      </div>

      {/* Interactive Amman Map Container */}
      <div className="relative w-full flex-grow overflow-hidden bg-[#E4E8EC]">
        
        {/* Map Tile Layer Background */}
        <iframe
          title="Amman Jordan Interactive Map"
          width="100%"
          height="100%"
          className={`w-full h-full border-0 pointer-events-none transition-all duration-500 ${
            mapMode === 'satellite' ? 'contrast-125 brightness-90 saturate-150' : 'brightness-100'
          }`}
          src="https://www.openstreetmap.org/export/embed.html?bbox=35.8000%2C31.8800%2C36.0500%2C32.0200&amp;layer=mapnik"
        ></iframe>

        {/* Pins & Yellow Price Badge Markers Layer */}
        <div className="absolute inset-0 z-20 pointer-events-auto">
          {pinsData.map(({ item, top, left, area }) => {
            const isSelected = activePinId === item.id;
            return (
              <div
                key={item.id}
                style={{ top, left }}
                onClick={() => {
                  setActivePinId(item.id);
                  if (onSelectItem) onSelectItem(item);
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group transition-all duration-300 hover:z-40"
              >
                {/* Yellow Price Badge Marker (Matching User Screenshot) */}
                <div className={`flex flex-col items-center transition-transform duration-300 ${isSelected ? 'scale-115 z-50' : 'group-hover:scale-110'}`}>
                  
                  <div className="bg-[#F59E0B] text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-md font-mono border border-amber-600 flex items-center gap-1">
                    <span>{item.price}</span>
                  </div>

                  {/* Red Pin Marker Circle */}
                  <div className={`w-4 h-4 rounded-full border-2 border-white shadow-md transition-all ${
                    isSelected ? 'bg-red-600 scale-125 ring-4 ring-red-400/40' : 'bg-red-500 group-hover:bg-red-600'
                  }`}></div>
                  
                  {/* Subtle Pointer Shadow */}
                  <div className="w-2 h-1 bg-black/30 rounded-full blur-[1px] mt-0.5"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Left Map Attribution / Info Badge */}
        <div className="absolute bottom-3 right-3 z-30 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-neutral-200 shadow-sm text-[11px] font-bold text-neutral-700 flex items-center gap-2">
          <span className="material-symbols-outlined text-[15px] text-[#1E3A8A]">map</span>
          <span>{isArabic ? 'خريطة عمّان والمحافظات' : 'Amman Interactive Map'}</span>
        </div>

      </div>
    </div>
  );
};

export default AmmanMapView;
