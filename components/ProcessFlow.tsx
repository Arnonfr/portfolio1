
import React, { useState } from 'react';

export const ProcessFlow: React.FC = () => {
  const [activeView, setActiveView] = useState<'before' | 'after'>('before');

  // Styles matching the reference image diagrams
  // Yellow nodes (Open Claim, Create Movement, Create Statistic)
  const yellowNode = "bg-[#FCD34D] border-2 border-[#F59E0B] text-amber-900 rounded-lg shadow-sm flex items-center justify-center text-center font-bold text-xs p-2 leading-tight";
  // Blue nodes (Payee, Carrier)
  const blueNode = "bg-[#3B82F6] border-2 border-[#2563EB] text-white rounded-lg shadow-sm flex items-center justify-center text-center font-bold text-xs p-2 leading-tight";
  // Green nodes (Complete Movement)
  const greenNode = "bg-[#4ADE80] border-2 border-[#16A34A] text-white rounded-lg shadow-sm flex items-center justify-center text-center font-bold text-xs p-2 leading-tight";
  
  // Container for the unified transaction step
  const containerNode = "bg-[#FCD34D] border-2 border-[#F59E0B] bg-opacity-90 rounded-xl p-4 flex flex-col items-center justify-center relative";

  const ArrowRight = () => (
    <div className="text-gray-400 mx-2 shrink-0">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
    </div>
  );

  return (
    <div className="w-full bg-white py-20 border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Toggle / Header */}
        <div className="flex flex-col items-center mb-16">
          <h3 className="text-3xl font-display font-bold text-gray-900 mb-8">
            Workflow Evolution
          </h3>
          <div className="bg-gray-100 p-1 rounded-full inline-flex relative">
            <div 
              className={`absolute top-1 bottom-1 w-[140px] bg-white rounded-full transition-all duration-300 ease-out shadow-sm border border-gray-200
                ${activeView === 'before' ? 'left-1' : 'left-[145px]'}
              `}
            />
            <button 
              onClick={() => setActiveView('before')}
              className={`relative z-10 w-[140px] py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300
                ${activeView === 'before' ? 'text-black' : 'text-gray-500 hover:text-black'}
              `}
            >
              Old: Linear
            </button>
            <button 
              onClick={() => setActiveView('after')}
              className={`relative z-10 w-[140px] py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300
                ${activeView === 'after' ? 'text-black' : 'text-gray-500 hover:text-black'}
              `}
            >
              New: Smart
            </button>
          </div>
        </div>

        {/* Scrollable Canvas */}
        <div className="overflow-x-auto pb-8 hide-scrollbar">
          <div className="min-w-[1000px] flex justify-center px-4 min-h-[400px] items-center">
            
            {activeView === 'before' ? (
              // --- BEFORE VIEW (Complex Branching) ---
              <div className="flex items-center animate-fadeIn gap-2 scale-90 md:scale-100 origin-center">
                
                {/* Step 1: Open Claim */}
                <div className={`${yellowNode} w-28 h-28`}>Open Claim</div>
                
                <ArrowRight />
                
                {/* Step 2: Create Movement */}
                <div className={`${yellowNode} w-28 h-28`}>Create<br/>Movement</div>
                
                <ArrowRight />

                {/* Step 3: Branching Complex */}
                <div className="flex flex-col gap-6">
                    {/* Top Branch */}
                    <div className="flex items-center gap-2">
                        <div className={`${yellowNode} w-24 h-20`}>Create<br/>Statistic</div>
                        <div className="flex flex-col gap-1 text-gray-300">
                           <svg width="20" height="40" viewBox="0 0 20 40" fill="none" stroke="currentColor"><path d="M0 20 C 10 20, 10 5, 20 5" /><path d="M0 20 C 10 20, 10 35, 20 35" /></svg>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className={`${blueNode} w-28 h-10 text-[10px]`}>Create Payee<br/>Transaction</div>
                            <div className={`${blueNode} w-28 h-10 text-[10px]`}>Create Payee<br/>Transaction</div>
                        </div>
                        <div className="text-gray-300">
                           <svg width="20" height="40" viewBox="0 0 20 40" fill="none" stroke="currentColor"><path d="M0 5 C 10 5, 10 20, 20 20" /><path d="M0 35 C 10 35, 10 20, 20 20" /></svg>
                        </div>
                        <div className={`${blueNode} w-28 h-20`}>Create<br/>Carrier Tx...</div>
                    </div>

                    {/* Bottom Branch (Duplicate structure for visual density) */}
                    <div className="flex items-center gap-2">
                        <div className={`${yellowNode} w-24 h-20`}>Create<br/>Statistic</div>
                         <div className="flex flex-col gap-1 text-gray-300">
                           <svg width="20" height="40" viewBox="0 0 20 40" fill="none" stroke="currentColor"><path d="M0 20 C 10 20, 10 5, 20 5" /><path d="M0 20 C 10 20, 10 35, 20 35" /></svg>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className={`${blueNode} w-28 h-10 text-[10px]`}>Create Payee<br/>Transaction</div>
                            <div className={`${blueNode} w-28 h-10 text-[10px]`}>Create Payee<br/>Transaction</div>
                        </div>
                        <div className="text-gray-300">
                           <svg width="20" height="40" viewBox="0 0 20 40" fill="none" stroke="currentColor"><path d="M0 5 C 10 5, 10 20, 20 20" /><path d="M0 35 C 10 35, 10 20, 20 20" /></svg>
                        </div>
                        <div className={`${blueNode} w-28 h-20`}>Create<br/>Carrier Tx...</div>
                    </div>
                </div>

                {/* Merge Arrow */}
                <div className="text-gray-300 -ml-2">
                     <svg width="30" height="160" viewBox="0 0 30 160" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M0 40 C 15 40, 15 80, 30 80" />
                        <path d="M0 120 C 15 120, 15 80, 30 80" />
                        <path d="M25 75 L30 80 L25 85" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                </div>

                {/* Step 4: Complete */}
                <div className={`${greenNode} w-28 h-28 ml-2`}>Complete<br/>Movement</div>

              </div>
            ) : (
              // --- AFTER VIEW (Streamlined) ---
              <div className="flex items-center animate-fadeIn gap-6 relative pt-16">
                 
                 {/* Connection Arrows color override */}
                 <style>{`
                    .arrow-orange { color: #F59E0B; }
                 `}</style>

                 {/* Step 1 */}
                 <div className={`${yellowNode} w-32 h-32 text-sm`}>Open Claim</div>
                 
                 <div className="text-[#F59E0B]"><svg width="40" height="24" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M0 12h36M32 5l7 7-7 7"/></svg></div>
                 
                 {/* Step 2 */}
                 <div className={`${yellowNode} w-32 h-32 text-sm`}>Create<br/>Movement</div>
                 
                 <div className="text-[#F59E0B]"><svg width="40" height="24" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M0 12h36M32 5l7 7-7 7"/></svg></div>

                 {/* Step 3: The Unified Container */}
                 <div className="relative">
                    {/* Floating Crossed Out Box */}
                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 z-10">
                        <div className={`${yellowNode} w-32 h-12 opacity-80 border-dashed bg-white`}>
                           Create Statistic
                        </div>
                        {/* The Red X */}
                        <svg className="absolute inset-0 w-full h-full text-red-500 drop-shadow-sm" viewBox="0 0 100 50" preserveAspectRatio="none">
                           <line x1="0" y1="0" x2="100" y2="100%" stroke="currentColor" strokeWidth="3" />
                           <line x1="0" y1="100%" x2="100" y2="0" stroke="currentColor" strokeWidth="3" />
                        </svg>
                        {/* Connecting lines to indicate removal */}
                        <div className="absolute top-full left-1/2 w-px h-8 bg-indigo-500/50 -translate-x-1/2"></div>
                    </div>

                    <div className={`${containerNode} w-[420px] h-36`}>
                        <div className="text-[#92400E] text-xs font-bold uppercase tracking-widest mb-4 w-full text-center border-b border-[#F59E0B]/30 pb-2">
                           Transaction
                        </div>
                        <div className="flex gap-4 w-full px-2">
                           <div className={`${blueNode} flex-1 h-16 relative`}>
                              Payee Details
                              <span className="absolute -top-2 right-2 bg-white text-gray-500 border border-gray-200 text-[9px] px-1 rounded shadow-sm">CCY</span>
                           </div>
                           <div className={`${blueNode} flex-1 h-16 relative`}>
                              Carrier Details
                              <span className="absolute -top-2 right-2 bg-white text-gray-500 border border-gray-200 text-[9px] px-1 rounded shadow-sm">CCY</span>
                           </div>
                        </div>
                    </div>
                 </div>

                 <div className="text-[#F59E0B]"><svg width="40" height="24" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M0 12h36M32 5l7 7-7 7"/></svg></div>

                 {/* Step 4: Complete */}
                 <div className={`${greenNode} w-32 h-32 text-sm`}>Complete<br/>Movement</div>

              </div>
            )}
            
          </div>
        </div>
        
        {/* Legend / Info */}
        <div className="text-center mt-12">
            <p className="text-gray-500 text-sm font-medium">
               {activeView === 'before' 
                 ? "Legacy: Users forced through multiple fragmented windows" 
                 : "Redesign: Statistics calculation removed, inputs unified into one view"}
            </p>
        </div>

      </div>
    </div>
  );
};
