"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface LangText {
  zh: string;
  en: string;
}

const t: {
  title: LangText;
  subtitle: LangText;
  welcome: LangText;
  userInfo: LangText;
  sequences: LangText;
  logout: LangText;
  backToHome: LangText;
  username: LangText;
  email: LangText;
  lastLogin: LangText;
  totalSequences: LangText;
  recentActivity: LangText;
  noActivity: LangText;
  viewAll: LangText;
  addSequence: LangText;
  editSequence: LangText;
  deleteSequence: LangText;
} = {
  title: { zh: "仪表板", en: "Dashboard" },
  subtitle: { zh: "MRI序列管理", en: "MRI Sequence Management" },
  welcome: { zh: "欢迎回来", en: "Welcome back" },
  userInfo: { zh: "用户信息", en: "User Information" },
  sequences: { zh: "序列管理", en: "Sequence Management" },
  logout: { zh: "退出登录", en: "Logout" },
  backToHome: { zh: "返回首页", en: "Back to Home" },
  username: { zh: "用户名", en: "Username" },
  email: { zh: "邮箱", en: "Email" },
  lastLogin: { zh: "最后登录", en: "Last Login" },
  totalSequences: { zh: "总序列数", en: "Total Sequences" },
  recentActivity: { zh: "最近活动", en: "Recent Activity" },
  noActivity: { zh: "暂无活动", en: "No recent activity" },
  viewAll: { zh: "查看全部", en: "View All" },
  addSequence: { zh: "添加序列", en: "Add Sequence" },
  editSequence: { zh: "编辑序列", en: "Edit Sequence" },
  deleteSequence: { zh: "删除序列", en: "Delete Sequence" }
};

// 模拟活动数据
const mockActivities = [
  { id: 1, action: "查看", sequence: "T1加权", time: "2小时前" },
  { id: 2, action: "编辑", sequence: "T2加权", time: "1天前" },
  { id: 3, action: "添加", sequence: "DWI", time: "3天前" }
];

export default function Dashboard() {
  const [language, setLanguage] = useState<keyof LangText>("zh");
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/sign-in");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">{language === "zh" ? "加载中..." : "Loading..."}</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 顶部导航栏 */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">{t.title[language]}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className="px-4 py-2 bg-blue-200 rounded hover:bg-blue-300 text-blue-900 font-semibold transition"
                onClick={() => setLanguage(language === "zh" ? "en" : "zh")}
              >
                {language === "zh" ? "English" : "中文"}
              </button>
              <Link
                href="/"
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 font-semibold transition"
              >
                {t.backToHome[language]}
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 font-semibold transition"
              >
                {t.logout[language]}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 欢迎区域 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {t.welcome[language]}, {user?.username || "User"}!
          </h2>
          <p className="text-gray-600">{t.subtitle[language]}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 用户信息卡片 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.userInfo[language]}</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">{t.username[language]}</label>
                  <p className="text-gray-800">{user?.username || "User"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">{t.email[language]}</label>
                  <p className="text-gray-800">{user?.email || "user@example.com"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">{t.lastLogin[language]}</label>
                  <p className="text-gray-800">{new Date().toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">{t.totalSequences[language]}</label>
                  <p className="text-gray-800">6</p>
                </div>
              </div>
            </div>
          </div>

          {/* 最近活动 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{t.recentActivity[language]}</h3>
                <button className="text-blue-500 hover:text-blue-600 font-medium">
                  {t.viewAll[language]}
                </button>
              </div>
              {mockActivities.length > 0 ? (
                <div className="space-y-3">
                  {mockActivities.map((activity) => (
                    <div key={activity.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div>
                        <span className="font-medium">{activity.action}</span>
                        <span className="text-gray-600 ml-2">{activity.sequence}</span>
                      </div>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">{t.noActivity[language]}</p>
              )}
            </div>
          </div>
        </div>

        {/* 快速操作 */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.sequences[language]}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition">
              <div className="text-center">
                <div className="text-2xl mb-2">+</div>
                <div className="font-medium text-blue-600">{t.addSequence[language]}</div>
              </div>
            </button>
            <button className="p-4 border-2 border-dashed border-green-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition">
              <div className="text-center">
                <div className="text-2xl mb-2">✏️</div>
                <div className="font-medium text-green-600">{t.editSequence[language]}</div>
              </div>
            </button>
            <button className="p-4 border-2 border-dashed border-red-300 rounded-lg hover:border-red-400 hover:bg-red-50 transition">
              <div className="text-center">
                <div className="text-2xl mb-2">🗑️</div>
                <div className="font-medium text-red-600">{t.deleteSequence[language]}</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 