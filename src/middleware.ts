import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 定义需要保护的路由
const protectedRoutes = ['/dashboard', '/profile', '/settings']
// 定义认证相关路由（已登录用户不应该访问）
const authRoutes = ['/sign-in', '/sign-up']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // 获取认证token
  const token = request.cookies.get('authToken')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '')
  
  // 检查是否是受保护的路由
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  
  // 检查是否是认证路由
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))
  
  // 如果访问受保护的路由但没有token，重定向到登录页
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/sign-in', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }
  
  // 如果已登录用户访问认证路由，重定向到仪表板
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // 为受保护的路由添加认证头信息
  if (isProtectedRoute && token) {
    const response = NextResponse.next()
    response.headers.set('authorization', `Bearer ${token}`)
    return response
  }
  
  return NextResponse.next()
}

// 配置middleware匹配的路由
export const config = {
  matcher: [
    /*
     * 匹配所有请求路径，除了以下开头的路径：
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt (robots file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)',
  ],
} 