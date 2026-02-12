
import React from 'react';

export const ClaimStatisticsForm: React.FC = () => {
  return (
    <div className="w-full bg-slate-50 p-8 font-sans text-[13px] text-[#080707]">
      <div className="max-w-[1200px] mx-auto bg-white border border-[#dddbda] rounded-lg shadow-sm overflow-hidden">
        
        {/* TOP SUMMARY SECTION */}
        <div className="p-4 border-b border-[#dddbda]">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-4 h-4 text-[#747474]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            <h2 className="text-[16px] font-medium">Summary</h2>
          </div>

          <div className="mb-4">
             <div className="flex gap-1 border-b border-[#dddbda] mb-0">
                <div className="px-4 py-2 border-b-2 border-[#1b96ff] font-bold text-[#080707]">USD - USD</div>
                <div className="px-4 py-2 text-[#444444] hover:text-[#1b96ff] cursor-pointer">GBP - GBP</div>
             </div>
             
             <div className="overflow-x-auto">
               <table className="w-full border border-[#dddbda] border-t-0">
                 <thead>
                   <tr className="bg-[#f3f2f2] text-left">
                     <th className="p-2 border-r border-[#dddbda] font-bold w-32"></th>
                     <th className="p-2 border-r border-[#dddbda] font-bold">FGU</th>
                     <th className="p-2 border-r border-[#dddbda] font-bold">Reserve</th>
                     <th className="p-2 border-r border-[#dddbda] font-bold">Previously Paid</th>
                     <th className="p-2 border-r border-[#dddbda] font-bold">Paid Amount</th>
                     <th className="p-2 border-r border-[#dddbda] font-bold">Deductible</th>
                     <th className="p-2 border-r border-[#dddbda] font-bold">Incurred Amount</th>
                     <th className="p-2 font-bold">Insured Amount</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr className="border-t border-[#dddbda]">
                     <td className="p-2 border-r border-[#dddbda] font-medium">Indemnity</td>
                     <td className="p-2 border-r border-[#dddbda]">19,000.00</td>
                     <td className="p-2 border-r border-[#dddbda]">10,000.00</td>
                     <td className="p-2 border-r border-[#dddbda]">1,000.00</td>
                     <td className="p-2 border-r border-[#dddbda]">8,000.00</td>
                     <td className="p-2 border-r border-[#dddbda]">00.00</td>
                     <td className="p-2 border-r border-[#dddbda]">00.00</td>
                     <td className="p-2">00.00</td>
                   </tr>
                   <tr className="border-t border-[#dddbda]">
                     <td className="p-2 border-r border-[#dddbda] font-medium">Fees</td>
                     <td className="p-2 border-r border-[#dddbda]">00.00</td>
                     <td className="p-2 border-r border-[#dddbda]">00.00</td>
                     <td className="p-2 border-r border-[#dddbda]">00.00</td>
                     <td className="p-2 border-r border-[#dddbda]">00.00</td>
                     <td className="p-2 border-r border-[#dddbda]">00.00</td>
                     <td className="p-2 border-r border-[#dddbda]">00.00</td>
                     <td className="p-2">00.00</td>
                   </tr>
                   <tr className="border-t border-[#dddbda] font-bold bg-[#f3f2f2]">
                     <td className="p-2 border-r border-[#dddbda]">Total</td>
                     <td className="p-2 border-r border-[#dddbda]">19,000.00</td>
                     <td className="p-2 border-r border-[#dddbda]">10,000.00</td>
                     <td className="p-2 border-r border-[#dddbda]">1,000.00</td>
                     <td className="p-2 border-r border-[#dddbda]">8,000.00</td>
                     <td className="p-2 border-r border-[#dddbda]">00.00</td>
                     <td className="p-2 border-r border-[#dddbda]">19,000.00</td>
                     <td className="p-2">1,000,000.00</td>
                   </tr>
                 </tbody>
               </table>
             </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button className="px-4 py-1.5 bg-white border border-[#dddbda] rounded text-[#0070d2] text-[13px] hover:bg-gray-50">Cancel</button>
            <button className="px-4 py-1.5 bg-white border border-[#dddbda] rounded text-[#0070d2] text-[13px] hover:bg-gray-50">Save</button>
            <button className="px-4 py-1.5 bg-[#0070d2] text-white rounded text-[13px] hover:bg-[#005fb2]">Complete</button>
          </div>
        </div>

        {/* DETAILED FORM SECTION */}
        <div className="p-4 bg-white">
          <h3 className="text-[14px] font-bold mb-4 border-b border-[#dddbda] pb-2">Claim Statistics</h3>
          
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6">
            <div className="flex items-center">
              <label className="w-1/3 text-[#444444] text-[12px]">Claim Statistics Name</label>
              <div className="w-2/3 p-2 bg-[#f3f2f2] border border-[#dddbda] rounded text-[#080707]">GBP-GBP</div>
            </div>
            <div className="flex items-center">
              <label className="w-1/3 text-[#444444] text-[12px]">Movement</label>
              <div className="w-2/3 p-1 bg-[#f3f2f2] border border-[#dddbda] rounded flex items-center gap-2">
                 <div className="bg-[#7f8de1] text-white p-0.5 rounded px-1 text-[10px]">M</div>
                 <span className="text-[#0070d2]">CM-15369</span>
              </div>
            </div>

            <div className="flex items-center">
              <label className="w-1/3 text-[#444444] text-[12px]">Policy Reference</label>
              <div className="w-2/3 p-2 bg-[#f3f2f2] border border-[#dddbda] rounded text-[#080707]">Main Policy UKP-17999</div>
            </div>
            <div className="flex items-center">
              <label className="w-1/3 text-[#444444] text-[12px]"><span className="text-red-500">*</span> Rate Of Exchange</label>
              <input type="text" className="w-2/3 p-2 border border-[#dddbda] rounded text-[#080707]" defaultValue="1.00000000" />
            </div>
          </div>

          {/* INPUT FIELDS GRID */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-2">
             <div className="flex items-center">
                <label className="w-1/3 text-[#444444] text-[12px]">FGU Indemnity (Original Ccy)</label>
                <div className="w-2/3 p-2 bg-[#f3f2f2] border border-[#dddbda] rounded">20,0000</div>
             </div>
             <div className="flex items-center">
                <label className="w-1/3 text-[#444444] text-[12px]">FGU Fees (Original Ccy)</label>
                <input type="text" className="w-2/3 p-2 border border-[#dddbda] rounded" defaultValue="0.0000" />
             </div>

             <div className="flex items-center">
                <label className="w-1/3 text-[#444444] text-[12px] flex items-center gap-1">Deductible Indemnity (Original Ccy) <span className="text-xs text-gray-400">ⓘ</span></label>
                <input type="text" className="w-2/3 p-2 border border-[#dddbda] rounded" defaultValue="0.0000" />
             </div>
             <div className="flex items-center">
                <label className="w-1/3 text-[#444444] text-[12px] flex items-center gap-1">Deductible Fees (Original Ccy) <span className="text-xs text-gray-400">ⓘ</span></label>
                <input type="text" className="w-2/3 p-2 border border-[#dddbda] rounded" defaultValue="0.0000" />
             </div>
             
             <div className="flex items-center">
                <label className="w-1/3 text-[#444444] text-[12px]">Reserve Indemnity (Original Ccy)</label>
                <input type="text" className="w-2/3 p-2 border border-[#dddbda] rounded" defaultValue="0.0000" />
             </div>
             <div className="flex items-center">
                <label className="w-1/3 text-[#444444] text-[12px]">Reserve Fees (Original Ccy)</label>
                <input type="text" className="w-2/3 p-2 border border-[#dddbda] rounded" defaultValue="0.0000" />
             </div>
          </div>

          {/* BLUE HIGHLIGHTED SECTIONS */}
          <div className="space-y-[1px] mt-4">
             {/* Previously Paid */}
             <div className="grid grid-cols-2 gap-x-8 bg-[#03aef0] text-white p-2">
                 <div className="flex items-center">
                    <label className="w-1/3 text-[12px] font-medium">Previously Paid Indemnity (Original Ccy)</label>
                    <div className="w-2/3 text-[12px]">20.0000</div>
                 </div>
                 <div className="flex items-center">
                    <label className="w-1/3 text-[12px] font-medium">Previously Paid Fees (Original Ccy)</label>
                    <div className="w-2/3 text-[12px]">0.0000</div>
                 </div>
             </div>

             {/* Paid This Time (White BG, Blue Text/Border) */}
             <div className="grid grid-cols-2 gap-x-8 bg-white p-2 border-l-4 border-[#03aef0]">
                 <div className="flex items-center">
                    <label className="w-1/3 text-[#444444] text-[12px]">Paid This Time Indemnity (Original Ccy)</label>
                    <input type="text" className="w-2/3 p-2 border-2 border-black rounded" defaultValue="800" />
                 </div>
                 <div className="flex items-center">
                    <label className="w-1/3 text-[#444444] text-[12px]">Paid This Time Fees (Original Ccy)</label>
                    <input type="text" className="w-2/3 p-2 border border-[#dddbda] rounded" defaultValue="0.0000" />
                 </div>
             </div>

             {/* Sum Insured / Incurred */}
             <div className="grid grid-cols-2 gap-x-8 bg-[#03aef0] text-white p-2">
                 <div className="flex items-center">
                    <label className="w-1/3 text-[12px] font-medium flex items-center gap-1">Sum Insured (Original Ccy) <span className="opacity-70">ⓘ</span></label>
                    <div className="w-2/3 text-[12px]">0.0000</div>
                 </div>
                 <div className="flex items-center">
                    <label className="w-1/3 text-[12px] font-medium">Incurred Amount (Original Ccy)</label>
                    <div className="w-2/3 text-[12px]">820.0000</div>
                 </div>
             </div>

             {/* Total FGU */}
             <div className="grid grid-cols-2 gap-x-8 bg-[#03aef0] text-white p-2">
                 <div className="flex items-center">
                    <label className="w-1/3 text-[12px] font-medium">Total FGU (Original Ccy)</label>
                    <div className="w-2/3 text-[12px]">820.0000</div>
                 </div>
                 <div className="flex items-center">
                    <label className="w-1/3 text-[12px] font-medium">Total FGU (Settlement Ccy)</label>
                    <div className="w-2/3 text-[12px]">820.0000</div>
                 </div>
             </div>

             {/* Total Deductible */}
             <div className="grid grid-cols-2 gap-x-8 bg-[#03aef0] text-white p-2">
                 <div className="flex items-center">
                    <label className="w-1/3 text-[12px] font-medium flex items-center gap-1">Total Deductible (Original Ccy) <span className="opacity-70">ⓘ</span></label>
                    <div className="w-2/3 text-[12px]">0.0000</div>
                 </div>
                 <div className="flex items-center">
                    <label className="w-1/3 text-[12px] font-medium flex items-center gap-1">Total Deductible (Settlement Ccy) <span className="opacity-70">ⓘ</span></label>
                    <div className="w-2/3 text-[12px]">0.0000</div>
                 </div>
             </div>

             {/* Total Reserve */}
             <div className="grid grid-cols-2 gap-x-8 bg-[#03aef0] text-white p-2">
                 <div className="flex items-center">
                    <label className="w-1/3 text-[12px] font-medium">Total Reserve (Original Ccy)</label>
                    <div className="w-2/3 text-[12px]">0.0000</div>
                 </div>
                 <div className="flex items-center">
                    <label className="w-1/3 text-[12px] font-medium">Total Reserve (Settlement Ccy)</label>
                    <div className="w-2/3 text-[12px]">0.0000</div>
                 </div>
             </div>

            {/* Total Previously Paid */}
             <div className="grid grid-cols-2 gap-x-8 bg-[#03aef0] text-white p-2">
                 <div className="flex items-center">
                    <label className="w-1/3 text-[12px] font-medium">Total Previously Paid (Original Ccy)</label>
                    <div className="w-2/3 text-[12px]">20.0000</div>
                 </div>
                 <div className="flex items-center">
                    <label className="w-1/3 text-[12px] font-medium">Total Previously Paid (Settlement Ccy)</label>
                    <div className="w-2/3 text-[12px]">20.0000</div>
                 </div>
             </div>

             {/* Total Paid This Time */}
             <div className="grid grid-cols-2 gap-x-8 bg-[#03aef0] text-white p-2">
                 <div className="flex items-center">
                    <label className="w-1/3 text-[12px] font-medium">Total Paid This Time (Original Ccy)</label>
                    <div className="w-2/3 text-[12px]">800.0000</div>
                 </div>
                 <div className="flex items-center">
                    <label className="w-1/3 text-[12px] font-medium">Total Paid This Time (Settlement Ccy)</label>
                    <div className="w-2/3 text-[12px]">800.0000</div>
                 </div>
             </div>
          </div>

          <hr className="my-8 border-gray-200" />

          <div className="flex justify-between items-center pb-4">
             <button className="px-4 py-2 bg-white border border-[#dddbda] rounded text-[#0070d2] text-[13px] flex items-center gap-1 hover:bg-gray-50">
               <span>&larr;</span> Finish
             </button>

             <div className="flex gap-2">
                <button className="px-4 py-2 bg-white border border-[#dddbda] rounded text-[#b0b0b0] text-[13px] cursor-not-allowed">Contra & Replace</button>
                <button className="px-4 py-2 bg-white border border-[#dddbda] rounded text-[#b0b0b0] text-[13px] cursor-not-allowed">Contra</button>
                <button className="px-4 py-2 bg-white border border-[#dddbda] rounded text-[#b0b0b0] text-[13px] cursor-not-allowed">Complete</button>
                <button className="px-6 py-2 bg-[#0070d2] text-white rounded text-[13px] hover:bg-[#005fb2] font-medium">Save</button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};
