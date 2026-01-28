// ============================================
// 文件说明：这是整个网站的根布局文件
// 作用：所有页面都会包裹在这个布局里，就像给房子搭了一个框架
// ============================================

// 导入 Next.js 的类型定义（TypeScript 需要）
import type { Metadata } from 'next'
// 导入 Google 字体（Geist 是 Vercel 官方推荐的现代字体）
import { Geist, Geist_Mono } from 'next/font/google'
// 导入 Next.js 的 Link 组件（用于页面跳转，比 <a> 标签更快）
import Link from 'next/link'
// 导入全局样式文件
import './globals.css'

// ============================================
// 第一步：配置字体
// ============================================
// 配置无衬线字体（用于正文）
const geistSans = Geist({
  variable: '--font-geist-sans', // 把这个字体存到 CSS 变量里，后面可以用
  subsets: ['latin'], // 只加载拉丁字符集（包含英文和数字），减少字体文件大小
})

// 配置等宽字体（用于代码显示）
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// ============================================
// 第二步：配置网站元信息（SEO 相关）
// ============================================
export const metadata: Metadata = {
  title: '我的技术博客', // 浏览器标签页显示的标题
  description: '个人技术博客，分享前端开发经验', // 搜索引擎显示的描述
}

// ============================================
// 第三步：根布局组件（这是最重要的部分）
// ============================================
// 这个函数接收一个只读对象作为参数，对象里有一个叫 children 的属性，children 可以是任何 React 能渲染的内容（文字、组件、JSX 等），通常指子组件
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // <html> 标签：告诉浏览器这是 HTML 文档
    <html lang="zh-CN">
      {/* 
        <body> 标签：页面的主体部分
        className 是 Tailwind CSS 的写法，用来添加样式类
        - ${geistSans.variable}：应用字体变量
        - antialiased：让字体边缘更平滑（抗锯齿）
      */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ============================================
            导航栏（Navbar）
            作用：固定在页面顶部，方便用户随时跳转
            设计：玻璃态效果（Glassmorphism）+ 渐变边框
        ============================================ */}
        <nav
          className={`
            // 定位和层级
            sticky              // 粘性定位（滚动时固定在顶部）
            top-0               // 距离顶部 0
            z-50                // 层级 50（确保在最上层）
            w-full              // 宽度 100%
            
            // 边框和背景（玻璃态效果）
            border-b            // 底部边框
            border-border/20    // 边框颜色（20% 透明度，更柔和）
            bg-background/70    // 背景色（70% 透明度）
            backdrop-blur-xl    // 背景模糊（大模糊，玻璃态核心）
            supports-[backdrop-filter]:bg-background/50  // 如果浏览器支持 backdrop-filter，背景更透明
            
            // 阴影
            shadow-lg           // 大阴影（增加层次感）
            shadow-black/5     // 阴影颜色（黑色 5% 透明度）
          `}
        >
          {/* 
            导航栏内容容器
            container：Tailwind 的容器类（自动居中，有最大宽度限制）
            mx-auto：水平居中（margin-x: auto）
            flex：使用 Flexbox 布局
            h-16：高度 16（4rem，约 64px）
            items-center：垂直居中对齐
            px-4：左右内边距（移动端适配）
            sm:px-6：小屏幕以上（640px+）左右内边距更大
          */}
          <div className="container mx-auto flex h-16 items-center px-4 sm:px-6">
            {/* 左侧：Logo 和导航链接 */}
            <div className="mr-4 flex flex-1 items-center gap-6 sm:gap-8">
              {/* 
                Logo 链接（点击返回首页）
                group：启用 group 功能（用于内部元素悬停效果）
              */}
              <Link
                href="/"
                className="group flex items-center space-x-2 transition-all duration-300 hover:scale-105"
              >
                {/* 
                  Logo 文字
                  bg-gradient-to-r：从左到右的渐变
                  from-primary via-primary/80 to-primary/60：渐变颜色
                  bg-clip-text：只让文字部分显示背景
                  text-transparent：文字本身透明（这样才能看到背景渐变）
                  font-bold：粗体
                  text-lg：大号字体
                */}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent font-bold text-lg">
                  我的博客
                </span>
              </Link>

              {/* 
                导航菜单
                hidden：默认隐藏（移动端）
                md:flex：中等屏幕以上（768px+）显示
                items-center：垂直居中
                space-x-6：子元素之间的水平间距
                text-sm：小号字体
                font-medium：中等粗细
              */}
              <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                {/* 首页链接 */}
                <Link
                  href="/"
                  className={`
                    // 基础样式
                    relative              // 相对定位（为下划线定位）
                    text-foreground/70    // 文字颜色（70% 透明度）
                    
                    // 交互效果
                    transition-all        // 所有属性过渡
                    duration-300         // 过渡时长
                    hover:text-foreground // 悬停时文字完全不透明
                    hover:scale-105     // 悬停时轻微放大
                    
                    // 下划线效果（悬停时显示）
                    after:content-['']   // 伪元素内容为空
                    after:absolute       // 绝对定位
                    after:bottom-[-8px]  // 距离底部 -8px（在文字下方）
                    after:left-0         // 从左侧开始
                    after:w-0            // 默认宽度为 0（看不见）
                    after:h-0.5         // 高度 0.5（2px）
                    after:bg-primary     // 主色
                    after:transition-all // 过渡动画
                    after:duration-300  // 过渡时长
                    hover:after:w-full  // 悬停时宽度 100%（从左到右展开）
                  `}
                >
                  首页
                </Link>
                {/* 博客列表链接（样式同上） */}
                <Link
                  href="/blog"
                  className={`
                    relative
                    text-foreground/70
                    transition-all
                    duration-300
                    hover:text-foreground
                    hover:scale-105
                    after:content-['']
                    after:absolute
                    after:bottom-[-8px]
                    after:left-0
                    after:w-0
                    after:h-0.5
                    after:bg-primary
                    after:transition-all
                    after:duration-300
                    hover:after:w-full
                  `}
                >
                  博客
                </Link>
              </nav>
            </div>

            {/* 右侧：登录按钮（暂时留空，第四阶段会实现） */}
            <div className="flex items-center gap-4">
              {/* 这里后续会添加登录按钮 */}
            </div>
          </div>
        </nav>

        {/* ============================================
            主要内容区域
            {children} 会被替换成具体页面的内容
            比如访问 /blog 时，children 就是博客列表页的内容
        ============================================ */}
        <main className="min-h-screen">{children}</main>

        {/* ============================================
            页脚（Footer）
            可选：可以在这里添加版权信息、社交链接等
        ============================================ */}
        <footer className="border-t border-border/20 bg-muted/20 backdrop-blur-sm py-12 mt-20">
          <div className="container mx-auto px-4 text-center">
            {/* 版权信息 */}
            <p className="text-sm text-muted-foreground mb-2">
              © 2024 我的技术博客. 使用 Next.js 构建
            </p>
            {/* 技术栈标签（可选） */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {['Next.js', 'TypeScript', 'Prisma', 'MySQL'].map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 rounded bg-muted/50 text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
