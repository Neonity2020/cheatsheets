"use client";

import { useState } from "react";

// 定义类型
interface LangText {
  zh: string;
  en: string;
}
interface Appearance {
  fat: LangText;
  water: LangText;
  muscle: LangText;
  bone: LangText;
  enhancement?: LangText;
  iron?: LangText;
}
interface MRISequence {
  name: LangText;
  abbreviation: LangText;
  description: LangText;
  clinicalUse: LangText;
  appearance: Appearance;
  parameters: LangText;
  advantages: LangText;
  disadvantages: LangText;
}

const mriSequences: MRISequence[] = [
  {
    name: { zh: "T1加权", en: "T1-weighted" },
    abbreviation: { zh: "T1W", en: "T1W" },
    description: { zh: "显示解剖结构，脂肪呈高信号，水呈低信号", en: "Shows anatomy, fat is hyperintense, water is hypointense" },
    clinicalUse: { zh: "解剖定位、脂肪组织识别、对比增强", en: "Anatomical localization, fat identification, contrast enhancement" },
    appearance: {
      fat: { zh: "高信号（亮）", en: "High signal (bright)" },
      water: { zh: "低信号（暗）", en: "Low signal (dark)" },
      muscle: { zh: "中等信号", en: "Intermediate signal" },
      bone: { zh: "低信号", en: "Low signal" }
    },
    parameters: { zh: "TR: 400-600ms, TE: 10-20ms", en: "TR: 400-600ms, TE: 10-20ms" },
    advantages: { zh: "解剖细节清晰，对比度好", en: "Clear anatomical details, good contrast" },
    disadvantages: { zh: "对水肿不敏感", en: "Insensitive to edema" }
  },
  {
    name: { zh: "T2加权", en: "T2-weighted" },
    abbreviation: { zh: "T2W", en: "T2W" },
    description: { zh: "显示组织含水量，水呈高信号", en: "Shows tissue water content, water is hyperintense" },
    clinicalUse: { zh: "水肿检测、炎症、肿瘤", en: "Edema detection, inflammation, tumor" },
    appearance: {
      fat: { zh: "中等信号", en: "Intermediate signal" },
      water: { zh: "高信号（亮）", en: "High signal (bright)" },
      muscle: { zh: "中等信号", en: "Intermediate signal" },
      bone: { zh: "低信号", en: "Low signal" }
    },
    parameters: { zh: "TR: 2000-4000ms, TE: 80-120ms", en: "TR: 2000-4000ms, TE: 80-120ms" },
    advantages: { zh: "对病理变化敏感", en: "Sensitive to pathological changes" },
    disadvantages: { zh: "解剖细节相对模糊", en: "Anatomical details relatively blurred" }
  },
  {
    name: { zh: "FLAIR", en: "FLAIR" },
    abbreviation: { zh: "FLAIR", en: "FLAIR" },
    description: { zh: "液体衰减反转恢复，抑制脑脊液信号", en: "Fluid-attenuated inversion recovery, suppresses CSF signal" },
    clinicalUse: { zh: "脑白质病变、多发性硬化、脑梗死", en: "White matter lesions, multiple sclerosis, cerebral infarction" },
    appearance: {
      fat: { zh: "中等信号", en: "Intermediate signal" },
      water: { zh: "低信号（被抑制）", en: "Low signal (suppressed)" },
      muscle: { zh: "中等信号", en: "Intermediate signal" },
      bone: { zh: "低信号", en: "Low signal" }
    },
    parameters: { zh: "TR: 8000-10000ms, TE: 80-120ms, TI: 2000-2500ms", en: "TR: 8000-10000ms, TE: 80-120ms, TI: 2000-2500ms" },
    advantages: { zh: "脑脊液抑制，病变显示清晰", en: "CSF suppression, clear lesion display" },
    disadvantages: { zh: "扫描时间长", en: "Long scan time" }
  },
  {
    name: { zh: "DWI", en: "DWI" },
    abbreviation: { zh: "DWI", en: "DWI" },
    description: { zh: "扩散加权成像，检测水分子扩散", en: "Diffusion-weighted imaging, detects water molecule diffusion" },
    clinicalUse: { zh: "急性脑梗死、脓肿、肿瘤", en: "Acute stroke, abscess, tumor" },
    appearance: {
      fat: { zh: "中等信号", en: "Intermediate signal" },
      water: { zh: "根据扩散程度变化", en: "Varies with diffusion" },
      muscle: { zh: "中等信号", en: "Intermediate signal" },
      bone: { zh: "低信号", en: "Low signal" }
    },
    parameters: { zh: "TR: 3000-5000ms, TE: 60-100ms, b值: 1000s/mm²", en: "TR: 3000-5000ms, TE: 60-100ms, b value: 1000s/mm²" },
    advantages: { zh: "早期缺血检测", en: "Early ischemia detection" },
    disadvantages: { zh: "易受运动伪影影响", en: "Susceptible to motion artifacts" }
  },
  {
    name: { zh: "T1增强", en: "T1+C" },
    abbreviation: { zh: "T1+C", en: "T1+C" },
    description: { zh: "T1加权加对比剂，显示血脑屏障破坏", en: "T1-weighted with contrast, shows BBB disruption" },
    clinicalUse: { zh: "肿瘤、感染、炎症", en: "Tumor, infection, inflammation" },
    appearance: {
      fat: { zh: "高信号", en: "High signal" },
      water: { zh: "低信号", en: "Low signal" },
      muscle: { zh: "中等信号", en: "Intermediate signal" },
      bone: { zh: "低信号", en: "Low signal" },
      enhancement: { zh: "异常强化区域", en: "Abnormal enhancement area" }
    },
    parameters: { zh: "TR: 400-600ms, TE: 10-20ms + Gd对比剂", en: "TR: 400-600ms, TE: 10-20ms + Gd contrast" },
    advantages: { zh: "病变边界清晰", en: "Clear lesion boundary" },
    disadvantages: { zh: "需要对比剂，过敏风险", en: "Requires contrast, allergy risk" }
  },
  {
    name: { zh: "SWI", en: "SWI" },
    abbreviation: { zh: "磁敏感成像", en: "Susceptibility-weighted imaging" },
    description: { zh: "磁敏感加权成像，检测铁沉积", en: "Susceptibility-weighted imaging, detects iron deposition" },
    clinicalUse: { zh: "微出血、钙化、静脉血管", en: "Microbleeds, calcification, venous vessels" },
    appearance: {
      fat: { zh: "中等信号", en: "Intermediate signal" },
      water: { zh: "中等信号", en: "Intermediate signal" },
      muscle: { zh: "中等信号", en: "Intermediate signal" },
      bone: { zh: "低信号", en: "Low signal" },
      iron: { zh: "低信号（暗）", en: "Low signal (dark)" }
    },
    parameters: { zh: "TR: 27-35ms, TE: 20-30ms", en: "TR: 27-35ms, TE: 20-30ms" },
    advantages: { zh: "铁沉积检测敏感", en: "Sensitive to iron deposition" },
    disadvantages: { zh: "易受金属伪影影响", en: "Susceptible to metal artifacts" }
  }
];

const t: {
  title: LangText;
  subtitle: LangText;
  quickCompare: LangText;
  table: {
    sequence: LangText;
    use: LangText;
    fat: LangText;
    water: LangText;
    scanTime: LangText;
  };
  scanTime: {
    short: LangText;
    medium: LangText;
    long: LangText;
  };
  detail: {
    clinical: LangText;
    signal: LangText;
    fat: LangText;
    water: LangText;
    muscle: LangText;
    enhancement: LangText;
    iron: LangText;
    params: LangText;
    advantage: LangText;
    disadvantage: LangText;
  };
  tips: LangText;
  choose: LangText;
  chooseList: LangText[];
  note: LangText;
  noteList: LangText[];
} = {
  title: { zh: "MRI序列 Cheat Sheet", en: "MRI Sequence Cheat Sheet" },
  subtitle: { zh: "快速参考指南 - 不同MRI序列的特点和临床应用", en: "Quick Reference - Features and Clinical Uses of MRI Sequences" },
  quickCompare: { zh: "序列快速对比", en: "Quick Sequence Comparison" },
  table: {
    sequence: { zh: "序列", en: "Sequence" },
    use: { zh: "主要用途", en: "Main Use" },
    fat: { zh: "脂肪信号", en: "Fat Signal" },
    water: { zh: "水信号", en: "Water Signal" },
    scanTime: { zh: "扫描时间", en: "Scan Time" }
  },
  scanTime: {
    short: { zh: "短", en: "Short" },
    medium: { zh: "中等", en: "Medium" },
    long: { zh: "长", en: "Long" }
  },
  detail: {
    clinical: { zh: "临床应用", en: "Clinical Use" },
    signal: { zh: "信号特征", en: "Signal Features" },
    fat: { zh: "脂肪", en: "Fat" },
    water: { zh: "水", en: "Water" },
    muscle: { zh: "肌肉", en: "Muscle" },
    enhancement: { zh: "强化", en: "Enhancement" },
    iron: { zh: "铁沉积", en: "Iron Deposition" },
    params: { zh: "典型参数", en: "Typical Parameters" },
    advantage: { zh: "优势", en: "Advantages" },
    disadvantage: { zh: "局限性", en: "Limitations" }
  },
  tips: { zh: "使用提示", en: "Usage Tips" },
  choose: { zh: "序列选择建议", en: "Sequence Selection Advice" },
  chooseList: [
    { zh: "解剖定位：T1加权", en: "Anatomical localization: T1-weighted" },
    { zh: "病理检测：T2加权 + FLAIR", en: "Pathology detection: T2-weighted + FLAIR" },
    { zh: "急性缺血：DWI", en: "Acute ischemia: DWI" },
    { zh: "肿瘤评估：T1增强", en: "Tumor assessment: T1+C" },
    { zh: "微出血：SWI", en: "Microbleeds: SWI" }
  ],
  note: { zh: "注意事项", en: "Notes" },
  noteList: [
    { zh: "对比剂使用前需评估肾功能", en: "Assess renal function before using contrast agent" },
    { zh: "DWI对运动敏感，需患者配合", en: "DWI is sensitive to motion, patient cooperation needed" },
    { zh: "FLAIR扫描时间较长", en: "FLAIR has a long scan time" },
    { zh: "SWI对金属植入物敏感", en: "SWI is sensitive to metal implants" },
    { zh: "序列组合可提高诊断准确性", en: "Combining sequences improves diagnostic accuracy" }
  ]
};

export default function Home() {
  const [language, setLanguage] = useState<keyof LangText>("zh");
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* 语言切换按钮 */}
        <div className="flex justify-end mb-4">
          <button
            className="px-4 py-2 bg-blue-200 rounded hover:bg-blue-300 text-blue-900 font-semibold transition"
            onClick={() => setLanguage(language === "zh" ? "en" : "zh")}
          >
            {language === "zh" ? "English" : "中文"}
          </button>
        </div>
        {/* 标题区域 */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">{t.title[language]}</h1>
          <p className="text-xl text-gray-600">{t.subtitle[language]}</p>
        </div>
        {/* 快速对比表格 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t.quickCompare[language]}</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-3 text-left font-semibold">{t.table.sequence[language]}</th>
                  <th className="border border-gray-300 p-3 text-left font-semibold">{t.table.use[language]}</th>
                  <th className="border border-gray-300 p-3 text-left font-semibold">{t.table.fat[language]}</th>
                  <th className="border border-gray-300 p-3 text-left font-semibold">{t.table.water[language]}</th>
                  <th className="border border-gray-300 p-3 text-left font-semibold">{t.table.scanTime[language]}</th>
                </tr>
              </thead>
              <tbody>
                {mriSequences.map((sequence, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 p-3 font-medium">{sequence.name[language]} ({sequence.abbreviation[language]})</td>
                    <td className="border border-gray-300 p-3">{sequence.clinicalUse[language]}</td>
                    <td className="border border-gray-300 p-3">{sequence.appearance.fat[language]}</td>
                    <td className="border border-gray-300 p-3">{sequence.appearance.water[language]}</td>
                    <td className="border border-gray-300 p-3">
                      {sequence.name.zh.includes('T1') ? t.scanTime.short[language] : 
                       sequence.name.zh.includes('FLAIR') ? t.scanTime.long[language] : 
                       sequence.name.zh.includes('DWI') ? t.scanTime.medium[language] : t.scanTime.medium[language]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* 详细序列信息 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mriSequences.map((sequence, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">{sequence.name[language]}</h3>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {sequence.abbreviation[language]}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{sequence.description[language]}</p>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">{t.detail.clinical[language]}</h4>
                  <p className="text-sm text-gray-600">{sequence.clinicalUse[language]}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">{t.detail.signal[language]}</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>{t.detail.fat[language]}: {sequence.appearance.fat[language]}</div>
                    <div>{t.detail.water[language]}: {sequence.appearance.water[language]}</div>
                    <div>{t.detail.muscle[language]}: {sequence.appearance.muscle[language]}</div>
                    {sequence.appearance.enhancement && (
                      <div>{t.detail.enhancement[language]}: {sequence.appearance.enhancement[language]}</div>
                    )}
                    {sequence.appearance.iron && (
                      <div>{t.detail.iron[language]}: {sequence.appearance.iron[language]}</div>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">{t.detail.params[language]}</h4>
                  <p className="text-sm text-gray-600">{sequence.parameters[language]}</p>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-1 text-sm">{t.detail.advantage[language]}</h4>
                    <p className="text-sm text-gray-600">{sequence.advantages[language]}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-1 text-sm">{t.detail.disadvantage[language]}</h4>
                    <p className="text-sm text-gray-600">{sequence.disadvantages[language]}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* 使用提示 */}
        <div className="bg-blue-50 rounded-lg p-6 mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t.tips[language]}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <h3 className="font-semibold mb-2">{t.choose[language]}</h3>
              <ul className="space-y-1 text-sm list-disc list-inside">
                {t.chooseList.map((item, idx) => (
                  <li key={idx}>{item[language]}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t.note[language]}</h3>
              <ul className="space-y-1 text-sm list-disc list-inside">
                {t.noteList.map((item, idx) => (
                  <li key={idx}>{item[language]}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
