"use client";

import { useState } from "react";
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
  username: LangText;
  email: LangText;
  password: LangText;
  confirmPassword: LangText;
  register: LangText;
  hasAccount: LangText;
  login: LangText;
  backToHome: LangText;
  usernamePlaceholder: LangText;
  emailPlaceholder: LangText;
  passwordPlaceholder: LangText;
  confirmPasswordPlaceholder: LangText;
} = {
  title: { zh: "注册", en: "Register" },
  subtitle: { zh: "创建您的账户", en: "Create your account" },
  username: { zh: "用户名", en: "Username" },
  email: { zh: "邮箱", en: "Email" },
  password: { zh: "密码", en: "Password" },
  confirmPassword: { zh: "确认密码", en: "Confirm Password" },
  register: { zh: "注册", en: "Register" },
  hasAccount: { zh: "已有账户？", en: "Already have an account?" },
  login: { zh: "登录", en: "Login" },
  backToHome: { zh: "返回首页", en: "Back to Home" },
  usernamePlaceholder: { zh: "请输入用户名", en: "Enter your username" },
  emailPlaceholder: { zh: "请输入邮箱", en: "Enter your email" },
  passwordPlaceholder: { zh: "请输入密码", en: "Enter your password" },
  confirmPasswordPlaceholder: { zh: "请再次输入密码", en: "Confirm your password" }
};

export default function SignUp() {
  const [language, setLanguage] = useState<keyof LangText>("zh");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const { register } = useAuth();

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
    setSuccess("");

    // 验证密码匹配
    if (formData.password !== formData.confirmPassword) {
      setError(language === "zh" ? "密码不匹配" : "Passwords do not match");
      setIsLoading(false);
      return;
    }

    // 验证密码长度
    if (formData.password.length < 6) {
      setError(language === "zh" ? "密码至少需要6个字符" : "Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    // 验证邮箱格式
    if (!formData.email.includes("@")) {
      setError(language === "zh" ? "请输入有效的邮箱地址" : "Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      const success = await register(formData.username, formData.email, formData.password);
      if (success) {
        setSuccess(language === "zh" ? "注册成功！正在跳转到登录页面..." : "Registration successful! Redirecting to login...");
        setTimeout(() => {
          router.push("/sign-in");
        }, 2000);
      } else {
        setError(language === "zh" ? "注册失败，请重试" : "Registration failed, please try again");
      }
    } catch (error) {
      setError(language === "zh" ? "注册失败，请重试" : "Registration failed, please try again");
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

        {/* 注册表单 */}
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

          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.username[language]}
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t.usernamePlaceholder[language]}
                required
                disabled={isLoading}
              />
            </div>

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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.confirmPassword[language]}
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t.confirmPasswordPlaceholder[language]}
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {language === "zh" ? "注册中..." : "Registering..."}
                </div>
              ) : (
                t.register[language]
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {t.hasAccount[language]}{" "}
              <Link
                href="/sign-in"
                className="text-blue-500 hover:text-blue-600 font-semibold"
              >
                {t.login[language]}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
