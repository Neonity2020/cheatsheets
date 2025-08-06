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
  email: LangText;
  password: LangText;
  login: LangText;
  noAccount: LangText;
  register: LangText;
  backToHome: LangText;
  emailPlaceholder: LangText;
  passwordPlaceholder: LangText;
} = {
  title: { zh: "登录", en: "Login" },
  subtitle: { zh: "登录您的账户", en: "Sign in to your account" },
  email: { zh: "邮箱", en: "Email" },
  password: { zh: "密码", en: "Password" },
  login: { zh: "登录", en: "Login" },
  noAccount: { zh: "还没有账户？", en: "Don't have an account?" },
  register: { zh: "注册", en: "Register" },
  backToHome: { zh: "返回首页", en: "Back to Home" },
  emailPlaceholder: { zh: "请输入邮箱", en: "Enter your email" },
  passwordPlaceholder: { zh: "请输入密码", en: "Enter your password" }
};

export default function SignIn() {
  const [language, setLanguage] = useState<keyof LangText>("zh");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [redirectTo, setRedirectTo] = useState("/dashboard");
  const router = useRouter();
  const { login } = useAuth();

  // 获取重定向URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const redirect = urlParams.get('redirect');
      if (redirect) {
        setRedirectTo(redirect);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        // 跳转到原始请求的页面或仪表板
        router.push(redirectTo);
      } else {
        setError(language === "zh" ? "邮箱或密码不正确" : "Invalid email or password");
      }
    } catch (error) {
      setError(language === "zh" ? "登录失败，请重试" : "Login failed, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* 顶部按钮区域 */}
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/"
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 font-semibold transition"
          >
            {t.backToHome[language]}
          </Link>
          <button
            className="px-4 py-2 bg-blue-200 rounded hover:bg-blue-300 text-blue-900 font-semibold transition"
            onClick={() => setLanguage(language === "zh" ? "en" : "zh")}
          >
            {language === "zh" ? "English" : "中文"}
          </button>
        </div>

        {/* 登录表单 */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.title[language]}</h1>
            <p className="text-gray-600">{t.subtitle[language]}</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.email[language]}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t.emailPlaceholder[language]}
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.password[language]}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t.passwordPlaceholder[language]}
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {language === "zh" ? "登录中..." : "Logging in..."}
                </div>
              ) : (
                t.login[language]
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {t.noAccount[language]}{" "}
              <Link
                href="/sign-up"
                className="text-blue-500 hover:text-blue-600 font-semibold"
              >
                {t.register[language]}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
