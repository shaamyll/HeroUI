// import React, { useState } from 'react';
// import { MonitorSmartphone, ShieldCheck, Info, CreditCard, ChevronRight } from "lucide-react";

// const MonitorMobileIcon = (props: React.ComponentProps<typeof MonitorSmartphone>) => (
//   <MonitorSmartphone size={24} {...props} />
// );

// const ShieldSecurityIcon = (props: React.ComponentProps<typeof ShieldCheck>) => (
//   <ShieldCheck size={24} {...props} />
// );

// const InfoIcon = (props: React.ComponentProps<typeof Info>) => (
//   <Info size={24} {...props} />
// );

// const InvalidCardIcon = (props: React.ComponentProps<typeof CreditCard>) => (
//   <CreditCard size={24} {...props} />
// );    //understood

// export default function App() {
//   const [selectedKey, setSelectedKey] = useState<string | null>(null);

//   const defaultContent =
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

//   const items = [
//     {
//       key: "1",
//       title: "Connected devices",
//       subtitle: (
//         <span className="flex text-sm text-gray-600">
//           2 issues to <span className="text-blue-500 ml-1">fix now</span>
//         </span>
//       ),
//       icon: <MonitorMobileIcon className="text-blue-500" />,
//       content: defaultContent
//     },
//     {
//       key: "2", 
//       title: "Apps Permissions",
//       subtitle: <span className="text-sm text-gray-600">3 apps have read permissions</span>,
//       icon: <ShieldSecurityIcon className="text-gray-600" />,
//       content: defaultContent
//     },
//     {
//       key: "3",
//       title: "Pending tasks", 
//       subtitle: <span className="text-sm text-orange-500">Complete your profile</span>,
//       icon: <InfoIcon className="text-orange-500" />,
//       content: defaultContent
//     },
//     {
//       key: "4",
//       title: (
//         <span className="flex gap-1 items-center">
//           Card expired
//           <span className="text-gray-400 text-sm">*4812</span>
//         </span>
//       ),
//       subtitle: <span className="text-sm text-red-500">Please, update now</span>,
//       icon: <InvalidCardIcon className="text-red-500" />,
//       content: defaultContent
//     }
//   ];

//   return (
//     <div className="flex w-full bg-white">
//       {/* Left side - Accordion items */}
//       <div className="p-2 flex flex-col gap-1 w-full max-w-[300px] bg-white shadow-lg rounded-lg">
//         {items.map((item) => (
//           <div
//             key={item.key}
//             className={`px-2 py-0 rounded-lg h-14 flex items-center cursor-pointer transition-all duration-200 ${
//               selectedKey === item.key 
//                 ? 'bg-gray-100 shadow-sm' 
//                 : 'hover:bg-gray-50'
//             }`}
//             onClick={() => setSelectedKey(selectedKey === item.key ? null : item.key)}
//           >
//             <div className="flex items-center gap-3 flex-1">
//               <div className="flex-shrink-0">
//                 {item.icon}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="font-medium text-base text-gray-900 truncate">
//                   {item.title}
//                 </div>
//                 <div className="truncate">
//                   {item.subtitle}
//                 </div>
//               </div>
//             </div>
//             <ChevronRight 
//               size={16} 
//               className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${
//                 selectedKey === item.key ? 'rotate-90' : ''
//               }`} 
//             />
//           </div>
//         ))}
//       </div>

//       {/* Right side - Content panel */}
//       <div className={`transition-all duration-300 overflow-hidden ${
//         selectedKey ? 'w-96 opacity-100' : 'w-0 opacity-0'
//       }`}>
//         {selectedKey && (
//           <div className="ml-4 p-6 bg-white shadow-lg rounded-lg h-fit">
//             <div className="text-sm text-gray-700 leading-relaxed">
//               {items.find(item => item.key === selectedKey)?.content}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }