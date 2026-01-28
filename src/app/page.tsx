// ============================================
// 文件说明：首页（自我介绍页面）
// 作用：这是用户访问网站时看到的第一个页面
// ============================================

// 导入 Next.js 的 Link 组件（用于页面跳转）
import Link from 'next/link'

// ============================================
// 主组件：HomePage
// ============================================
export default function HomePage() {
  return (
    // ============================================
    // 第一步：外层容器
    // ============================================
    // relative：相对定位，为内部绝对定位元素提供定位基准
    // min-h-screen：最小高度为整个屏幕高度
    // overflow-hidden：隐藏超出容器的内容（防止背景溢出）
    <div className="relative min-h-screen overflow-hidden">
      {/* ============================================
          第二步：炫酷的背景渐变
          ============================================ */}
      {/* 
        absolute：绝对定位，脱离文档流
        inset-0：上下左右都是 0，铺满整个父容器
        bg-gradient-to-br：渐变方向（从左上到右下）
        from-xxx to-xxx：渐变的起始和结束颜色
        opacity-20：透明度 20%（让背景不那么抢眼）
        blur-3xl：模糊效果（3xl 是很大的模糊）
      */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 blur-3xl" />

      {/* ============================================
          第三步：装饰性的圆形光晕（增加视觉层次）
          ============================================ */}
      {/* 
        absolute：绝对定位
        top-1/4 left-1/4：距离顶部和左侧各 25%
        w-96 h-96：宽度和高度都是 96（24rem，约 384px）
        rounded-full：完全圆形
        bg-primary/30：主色调，30% 透明度
        blur-3xl：大模糊
        animate-pulse：脉冲动画（呼吸效果）
      */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/30 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/30 blur-3xl animate-pulse delay-1000" />

      {/* ============================================
          第四步：主要内容区域
          ============================================ */}
      {/* 
        relative：相对定位（让 z-index 生效）
        z-10：层级 10（确保内容在背景之上）
        container：Tailwind 容器类（自动居中，有最大宽度限制）
        mx-auto：水平居中
        px-4：左右内边距（移动端适配）
        py-16：上下内边距（垂直间距）
      */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* 
          max-w-4xl：最大宽度限制（让内容不会太宽）
          mx-auto：水平居中
          space-y-12：子元素之间的垂直间距（12 = 3rem）
        */}
        <div className="mx-auto max-w-4xl space-y-12">
          {/* ============================================
              第五步：头像和基本信息区域
              ============================================ */}
          <div className="flex flex-col items-center gap-8 text-center">
            {/* 
              头像容器
              relative：相对定位（为内部装饰元素定位）
              group：启用 Tailwind 的 group 功能（用于悬停效果）
            */}
            <div className="relative group">
              {/* 
                头像外圈光晕（装饰效果）
                absolute：绝对定位
                inset-0：铺满父容器
                rounded-full：圆形
                bg-gradient-to-r：从左到右的渐变
                opacity-0 group-hover:opacity-100：默认透明，悬停时显示
                transition-opacity：透明度过渡动画
                duration-500：动画时长 500ms
                blur-xl：模糊效果
              */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

              {/* 
                头像主体
                relative：相对定位（确保在光晕之上）
                z-10：层级 10
                h-32 w-32：高度和宽度都是 32（8rem，约 128px）
                rounded-full：完全圆形
                bg-gradient-to-br：从左上到右下的渐变
                from-primary to-primary/50：从主色到半透明主色
                ring-4：外圈（4px 宽）
                ring-primary/20：外圈颜色（主色 20% 透明度）
                transition-all：所有属性都有过渡动画
                duration-300：动画时长
                group-hover:scale-110：悬停时放大 110%
                shadow-2xl：大阴影
              */}
              <div className="relative z-10 h-32 w-32 rounded-full bg-gradient-to-br from-primary to-primary/50 ring-4 ring-primary/20 transition-all duration-300 group-hover:scale-110 shadow-2xl" />
            </div>

            {/* 文字信息区域 */}
            <div className="space-y-4">
              {/* 
                主标题
                text-5xl：超大字体（移动端会自动缩小）
                sm:text-6xl：小屏幕以上（640px+）使用更大字体
                font-bold：粗体
                tracking-tighter：字母间距更紧（更现代）
                bg-gradient-to-r：文字渐变（从左到右）
                from-foreground via-foreground/90 to-foreground/80：渐变颜色
                bg-clip-text：只让文字部分显示背景
                text-transparent：文字本身透明（这样才能看到背景渐变）
              */}
              <h1 className="text-5xl sm:text-6xl font-bold tracking-tighter bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent">
                你好，我是 [你的名字]
              </h1>

              {/* 
                副标题
                text-xl：大号字体
                sm:text-2xl：小屏幕以上更大
                text-muted-foreground：使用主题的次要文字颜色
                font-medium：中等粗细
              */}
              <p className="text-xl sm:text-2xl text-muted-foreground font-medium">
                全栈开发工程师 | Next.js 爱好者
              </p>
            </div>
          </div>

          {/* ============================================
              第六步：技能栈卡片（玻璃态效果）
              ============================================ */}
          <section className="space-y-6">
            {/* 标题 */}
            <h2 className="text-3xl font-bold text-center">技术栈</h2>

            {/* 
              技能标签容器
              flex：弹性布局
              flex-wrap：允许换行
              gap-3：标签之间的间距
              justify-center：水平居中
            */}
            <div className="flex flex-wrap gap-3 justify-center">
              {/* 
                技能列表数组
                map 函数：遍历数组，为每个技能创建一个标签
              */}
              {/* 
                map 函数遍历技能数组，为每个技能创建一个标签
                样式说明：
                - rounded-lg：圆角
                - border border-border/50：半透明边框
                - bg-background/80 backdrop-blur-sm：玻璃态效果（半透明背景 + 模糊）
                - px-4 py-2：内边距
                - text-sm font-medium：小号字体，中等粗细
                - transition-all duration-300：所有属性过渡动画
                - hover:scale-110：悬停时放大
                - hover:border-primary：悬停时边框变主色
                - hover:bg-primary/10：悬停时背景变主色（10% 透明度）
                - hover:shadow-lg：悬停时显示阴影
                - cursor-pointer：鼠标指针变手型
              */}
              {['Next.js', 'TypeScript', 'React', 'Prisma', 'MySQL', 'Tailwind CSS', 'Zustand', 'Shadcn UI'].map(
                (tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-border/50 bg-background/80 backdrop-blur-sm px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-110 hover:border-primary hover:bg-primary/10 hover:shadow-lg cursor-pointer"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </section>

          {/* ============================================
              第七步：关于博客的卡片（大卡片设计）
              ============================================ */}
          <section className="space-y-6">
            {/* 
              大卡片容器
              rounded-2xl：大圆角（更现代）
              border：边框
              border-border/50：半透明边框
              bg-background/60：半透明背景（玻璃态）
              backdrop-blur-md：中等模糊
              p-8：大内边距
              shadow-xl：大阴影
              hover:shadow-2xl：悬停时阴影更大
              transition-all：所有属性过渡
            */}
            <div className="rounded-2xl border border-border/50 bg-background/60 backdrop-blur-md p-8 shadow-xl hover:shadow-2xl transition-all">
              <h2 className="text-3xl font-bold mb-4">关于这个博客</h2>
              <p className="text-muted-foreground leading-7 text-lg">
                这是一个使用 <span className="font-semibold text-foreground">Next.js 15 App Router</span> 构建的全栈博客系统。
                项目采用了 <span className="font-semibold text-primary">Server Components</span>、
                <span className="font-semibold text-primary"> Server Actions</span>、
                <span className="font-semibold text-primary"> RAG (检索增强生成)</span> 等前沿技术，
                实现了高性能的内容管理和智能问答功能。
              </p>
            </div>
          </section>

          {/* ============================================
              第八步：行动按钮（CTA - Call To Action）
              ============================================ */}
          <div className="flex justify-center gap-4 pt-8">
            {/* 
              主要按钮
              relative：相对定位（为内部装饰元素定位）
              group：启用 group 功能
              overflow-hidden：隐藏超出部分（用于动画效果）
            */}
            {/* 
              主要按钮
              relative：相对定位（为内部装饰元素定位）
              overflow-hidden：隐藏超出部分（用于动画效果）
              group：启用 group 功能（用于内部元素悬停效果）
              
              样式说明：
              - relative overflow-hidden：相对定位 + 隐藏溢出
              - inline-flex h-12 items-center justify-center：行内弹性布局，高度 48px，内容居中
              - rounded-lg bg-primary：圆角 + 主色背景
              - px-8 text-sm font-semibold：左右内边距 + 小号字体 + 半粗体
              - text-primary-foreground：主色文字（自动适配的对比色）
              - shadow-lg：大阴影
              - transition-all duration-300：所有属性过渡动画
              - hover:scale-105 hover:shadow-xl：悬停时放大 + 阴影更大
              - active:scale-95：点击时缩小（反馈感）
            */}
            <Link
              href="/blog"
              className="relative overflow-hidden group inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
            >
              {/* 
                按钮内部的渐变光效（悬停时从左滑到右）
                absolute：绝对定位
                inset-0：铺满按钮
                bg-gradient-to-r：从左到右渐变
                translate-x-[-100%]：默认在左侧外面（看不见）
                group-hover:translate-x-[100%]：悬停时滑到右侧外面
                transition-transform：变换过渡
                duration-500：动画时长
                opacity-20：20% 透明度
              */}
              <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 opacity-20" />

              {/* 按钮文字（相对定位，确保在光效之上） */}
              <span className="relative z-10">查看博客 →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
