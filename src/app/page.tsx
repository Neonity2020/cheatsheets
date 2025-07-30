// MRI序列数据
const mriSequences = [
  {
    name: "T1加权",
    abbreviation: "T1W",
    description: "显示解剖结构，脂肪呈高信号，水呈低信号",
    clinicalUse: "解剖定位、脂肪组织识别、对比增强",
    appearance: {
      fat: "高信号（亮）",
      water: "低信号（暗）",
      muscle: "中等信号",
      bone: "低信号"
    },
    parameters: "TR: 400-600ms, TE: 10-20ms",
    advantages: "解剖细节清晰，对比度好",
    disadvantages: "对水肿不敏感"
  },
  {
    name: "T2加权",
    abbreviation: "T2W",
    description: "显示组织含水量，水呈高信号",
    clinicalUse: "水肿检测、炎症、肿瘤",
    appearance: {
      fat: "中等信号",
      water: "高信号（亮）",
      muscle: "中等信号",
      bone: "低信号"
    },
    parameters: "TR: 2000-4000ms, TE: 80-120ms",
    advantages: "对病理变化敏感",
    disadvantages: "解剖细节相对模糊"
  },
  {
    name: "FLAIR",
    abbreviation: "FLAIR",
    description: "液体衰减反转恢复，抑制脑脊液信号",
    clinicalUse: "脑白质病变、多发性硬化、脑梗死",
    appearance: {
      fat: "中等信号",
      water: "低信号（被抑制）",
      muscle: "中等信号",
      bone: "低信号"
    },
    parameters: "TR: 8000-10000ms, TE: 80-120ms, TI: 2000-2500ms",
    advantages: "脑脊液抑制，病变显示清晰",
    disadvantages: "扫描时间长"
  },
  {
    name: "DWI",
    abbreviation: "DWI",
    description: "扩散加权成像，检测水分子扩散",
    clinicalUse: "急性脑梗死、脓肿、肿瘤",
    appearance: {
      fat: "中等信号",
      water: "根据扩散程度变化",
      muscle: "中等信号",
      bone: "低信号"
    },
    parameters: "TR: 3000-5000ms, TE: 60-100ms, b值: 1000s/mm²",
    advantages: "早期缺血检测",
    disadvantages: "易受运动伪影影响"
  },
  {
    name: "T1增强",
    abbreviation: "T1+C",
    description: "T1加权加对比剂，显示血脑屏障破坏",
    clinicalUse: "肿瘤、感染、炎症",
    appearance: {
      fat: "高信号",
      water: "低信号",
      muscle: "中等信号",
      bone: "低信号",
      enhancement: "异常强化区域"
    },
    parameters: "TR: 400-600ms, TE: 10-20ms + Gd对比剂",
    advantages: "病变边界清晰",
    disadvantages: "需要对比剂，过敏风险"
  },
  {
    name: "SWI",
    abbreviation: "SWI",
    description: "磁敏感加权成像，检测铁沉积",
    clinicalUse: "微出血、钙化、静脉血管",
    appearance: {
      fat: "中等信号",
      water: "中等信号",
      muscle: "中等信号",
      bone: "低信号",
      iron: "低信号（暗）"
    },
    parameters: "TR: 27-35ms, TE: 20-30ms",
    advantages: "铁沉积检测敏感",
    disadvantages: "易受金属伪影影响"
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* 标题区域 */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">MRI序列 Cheat Sheet</h1>
          <p className="text-xl text-gray-600">快速参考指南 - 不同MRI序列的特点和临床应用</p>
        </div>

        {/* 快速对比表格 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">序列快速对比</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-3 text-left font-semibold">序列</th>
                  <th className="border border-gray-300 p-3 text-left font-semibold">主要用途</th>
                  <th className="border border-gray-300 p-3 text-left font-semibold">脂肪信号</th>
                  <th className="border border-gray-300 p-3 text-left font-semibold">水信号</th>
                  <th className="border border-gray-300 p-3 text-left font-semibold">扫描时间</th>
                </tr>
              </thead>
              <tbody>
                {mriSequences.map((sequence, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 p-3 font-medium">{sequence.name} ({sequence.abbreviation})</td>
                    <td className="border border-gray-300 p-3">{sequence.clinicalUse}</td>
                    <td className="border border-gray-300 p-3">{sequence.appearance.fat}</td>
                    <td className="border border-gray-300 p-3">{sequence.appearance.water}</td>
                    <td className="border border-gray-300 p-3">
                      {sequence.name.includes('T1') ? '短' : 
                       sequence.name.includes('FLAIR') ? '长' : 
                       sequence.name.includes('DWI') ? '中等' : '中等'}
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
                <h3 className="text-xl font-bold text-gray-800">{sequence.name}</h3>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {sequence.abbreviation}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{sequence.description}</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">临床应用</h4>
                  <p className="text-sm text-gray-600">{sequence.clinicalUse}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">信号特征</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>脂肪: {sequence.appearance.fat}</div>
                    <div>水: {sequence.appearance.water}</div>
                    <div>肌肉: {sequence.appearance.muscle}</div>
                    {sequence.appearance.enhancement && (
                      <div>强化: {sequence.appearance.enhancement}</div>
                    )}
                    {sequence.appearance.iron && (
                      <div>铁沉积: {sequence.appearance.iron}</div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">典型参数</h4>
                  <p className="text-sm text-gray-600">{sequence.parameters}</p>
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-1 text-sm">优势</h4>
                    <p className="text-sm text-gray-600">{sequence.advantages}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-1 text-sm">局限性</h4>
                    <p className="text-sm text-gray-600">{sequence.disadvantages}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 使用提示 */}
        <div className="bg-blue-50 rounded-lg p-6 mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">使用提示</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <h3 className="font-semibold mb-2">序列选择建议</h3>
              <ul className="space-y-1 text-sm list-disc list-inside">
                <li>解剖定位：T1加权</li>
                <li>病理检测：T2加权 + FLAIR</li>
                <li>急性缺血：DWI</li>
                <li>肿瘤评估：T1增强</li>
                <li>微出血：SWI</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">注意事项</h3>
              <ul className="space-y-1 text-sm list-disc list-inside">
                <li>对比剂使用前需评估肾功能</li>
                <li>DWI对运动敏感，需患者配合</li>
                <li>FLAIR扫描时间较长</li>
                <li>SWI对金属植入物敏感</li>
                <li>序列组合可提高诊断准确性</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
