
import React from 'react';

interface UiTransformationProps {
  forceScrollRight?: boolean;
}

export const UiTransformation: React.FC<UiTransformationProps> = ({ forceScrollRight }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (forceScrollRight && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [forceScrollRight]);

  return (
    <div className="w-full bg-transparent overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        {/* Main Modal Container - SF Pro styled typography */}
        <div className="bg-white rounded-[12px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-[#d8dde6] overflow-hidden font-sans text-[13px] relative mx-auto flex flex-col h-[85vh]">
           
           {/* Header */}
           <div className="bg-white px-6 py-4 border-b border-[#d8dde6] flex justify-center items-center relative shrink-0">
              <span className="text-[#080707] font-semibold text-[18px]">New Movement</span>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-[#dddbda] rounded-full flex items-center justify-center text-[#747474] cursor-pointer hover:bg-gray-50 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </div>
           </div>

           {/* Body */}
           <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
              
              {/* Movement Information */}
              <div className="border border-[#dddbda] rounded-[4px] overflow-hidden shadow-sm" id="section-info">
                <div className="px-4 py-2.5 bg-white border-b border-[#dddbda] flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-[#1b3a8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  <span className="font-bold text-[#1b3a8a] text-[14px]">Movement Information</span>
                </div>

                <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-8 items-start bg-[#f3f6f9]/50">
                   <div className="md:col-span-4 space-y-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12px] text-[#444] font-medium">Movement Type</label>
                        <div className="relative">
                          <div className="w-full h-8 px-3 bg-white border border-[#dddbda] rounded-[4px] flex items-center text-[#747474] text-[13px]">
                            Internal Transfer
                          </div>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#747474]">
                             <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12px] text-[#444] font-medium">Additional Details</label>
                        <textarea 
                          className="w-full h-20 px-3 py-2 bg-white border border-[#dddbda] rounded-[4px] text-[#747474] text-[13px] resize-none focus:outline-none"
                          defaultValue="Standard claim settlement process."
                          readOnly
                        />
                      </div>
                   </div>

                   <div className="md:col-span-4 md:border-l border-[#dddbda] md:pl-8">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12px] text-[#444] font-medium"><span className="text-[#ea001e] mr-0.5">*</span>Section</label>
                        <div className="relative">
                          <div className="w-full h-8 px-3 bg-white border border-[#dddbda] rounded-[4px] flex items-center text-[#747474] text-[13px]">Casualty</div>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#747474]">
                             <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
                          </div>
                        </div>
                      </div>
                   </div>

                   <div className="md:col-span-4 md:border-l border-[#dddbda] md:pl-8">
                      <label className="text-[12px] font-bold text-[#080707] mb-2.5 block">Mark for:</label>
                      <div className="flex flex-col gap-2.5">
                        <label className="flex items-center gap-2 cursor-pointer">
                           <div className="w-4 h-4 border border-[#dddbda] rounded bg-white"></div>
                           <span className="text-[12px] text-[#080707]">CLASS</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                           <div className="w-4 h-4 border border-[#dddbda] rounded bg-white"></div>
                           <span className="text-[12px] text-[#080707]">Bordereaux</span>
                        </label>
                      </div>
                   </div>
                </div>
              </div>

              {/* Payee Transactions */}
              <div className="border border-[#dddbda] rounded-[4px] overflow-hidden shadow-sm" id="section-payee">
                <div className="px-4 py-2.5 bg-white border-b border-[#dddbda] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-[#1b3a8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    <span className="font-bold text-[#1b3a8a] text-[14px]">Payee Transactions</span>
                  </div>
                </div>

                <div ref={scrollRef} className="overflow-x-auto bg-white">
                   <table className="w-full min-w-[1000px] text-left border-collapse">
                      <thead>
                        <tr className="bg-[#f3f6f9] border-b border-[#dddbda] text-[11px] font-bold text-[#444] uppercase tracking-tight">
                           <th className="px-4 py-2 w-10"></th>
                           <th className="px-4 py-2">Payee</th>
                           <th className="px-4 py-2">Risk</th>
                           <th className="px-4 py-2">Paid</th>
                           <th className="px-4 py-2">Reserve Amou</th>
                           <th className="px-4 py-2">Deductible</th>
                           <th className="px-4 py-2">Original</th>
                           <th className="px-4 py-2">Settlement</th>
                           <th className="px-4 py-2">Rate of</th>
                           <th className="px-4 py-2 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-[13px] text-[#080707]">
                         <tr className="border-b border-[#f3f6f9]">
                            <td className="px-4 py-2.5"></td>
                            <td className="px-4 py-2.5 font-medium">John Smith</td>
                            <td className="px-4 py-2.5">Liability</td>
                            <td className="px-4 py-2.5">5,000.00</td>
                            <td className="px-4 py-2.5">5,000.00</td>
                            <td className="px-4 py-2.5">1,000.00</td>
                            <td className="px-4 py-2.5">USD</td>
                            <td className="px-4 py-2.5">USD</td>
                            <td className="px-4 py-2.5">1.00</td>
                            <td className="px-4 py-2.5">
                               <div className="flex gap-3 justify-center text-[#747474]">
                                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="cursor-pointer hover:text-[#0176d3]"><rect x="9" y="9" width="11" height="11" rx="1.5" ry="1.5"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="cursor-pointer hover:text-[#0176d3]"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="cursor-pointer hover:text-[#ea001e]"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                               </div>
                            </td>
                         </tr>
                      </tbody>
                   </table>
                </div>
              </div>

              {/* Summary */}
              <div className="border border-[#dddbda] rounded-[4px] overflow-hidden shadow-sm" id="section-summary">
                <div className="px-4 py-2.5 bg-white border-b border-[#dddbda] flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-[#1b3a8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  <span className="font-bold text-[#1b3a8a] text-[14px]">Summary</span>
                </div>

                <div className="bg-white">
                   <div className="flex bg-[#f3f6f9] border-b border-[#dddbda]">
                      <button className="px-6 py-2.5 text-[11px] font-bold text-[#080707] border-b-2 border-[#0176d3] bg-white">USD - USD</button>
                      <button className="px-6 py-2.5 text-[11px] font-medium text-[#444] hover:bg-white transition-colors">GBP - GBP</button>
                   </div>
                   <div className="overflow-x-auto">
                      <table className="w-full text-left text-[12px] border-collapse">
                        <thead>
                           <tr className="bg-[#f3f6f9] text-[11px] font-bold text-[#444] uppercase tracking-tight">
                              <th className="px-4 py-2 border-r border-[#dddbda] w-32"></th>
                              <th className="px-4 py-2 border-r border-[#dddbda]">FGU</th>
                              <th className="px-4 py-2 border-r border-[#dddbda]">Reserve</th>
                              <th className="px-4 py-2">Paid Amount</th>
                           </tr>
                        </thead>
                        <tbody className="text-[#080707]">
                           <tr className="border-t border-[#dddbda]">
                              <td className="px-4 py-2 border-r border-[#dddbda] font-bold">Indemnity</td>
                              <td className="px-4 py-2 border-r border-[#dddbda]">19,000.00</td>
                              <td className="px-4 py-2 border-r border-[#dddbda]">10,000.00</td>
                              <td className="px-4 py-2">8,000.00</td>
                           </tr>
                           <tr className="border-t border-[#dddbda] bg-[#f3f6f9]/50 font-bold">
                              <td className="px-4 py-2 border-r border-[#dddbda]">Total</td>
                              <td className="px-4 py-2 border-r border-[#dddbda]">19,000.00</td>
                              <td className="px-4 py-2 border-r border-[#dddbda]">10,000.00</td>
                              <td className="px-4 py-2">8,000.00</td>
                           </tr>
                        </tbody>
                      </table>
                   </div>
                </div>
              </div>

              {/* Substantial buffer after Summary as requested */}
              <div className="pb-32"></div>
           </div>

           {/* Footer with exact SF styles */}
           <div className="px-6 py-4 border-t border-[#d8dde6] flex justify-end gap-3 bg-white shrink-0 shadow-[0_-4px_12px_rgba(0,0,0,0.02)]">
              <button className="px-6 py-[7px] text-[#0176d3] font-normal border border-[#dddbda] rounded-full hover:bg-gray-50 text-[13px] tracking-tight leading-none bg-white">Cancel</button>
              <button className="px-6 py-[7px] text-[#0176d3] font-normal border border-[#dddbda] rounded-full hover:bg-gray-50 text-[13px] tracking-tight leading-none bg-white">Save</button>
              <button className="px-8 py-[7px] bg-[#0176d3] text-white font-normal rounded-full hover:bg-[#015ba2] text-[13px] tracking-tight leading-none shadow-sm">Complete</button>
           </div>
        </div>
      </div>
    </div>
  );
};
