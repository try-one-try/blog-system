// ============================================
// 文件说明：博客列表页面
// 作用：显示所有已发布的博客文章列表
// ============================================

// ============================================
// 第一步：导入依赖
// ============================================
// React 的 Suspense 组件：用于异步加载时的占位显示
import { Suspense } from 'react'
// Next.js 的动态导入：实现路由懒加载（性能优化）
import dynamic from 'next/dynamic'
// Next.js 的 Link 组件：用于页面跳转
import Link from 'next/link'
// Prisma 客户端：用于操作数据库
import { prisma } from '@/lib/prisma'

// ============================================
// 第二步：懒加载组件（性能优化示例）
// ============================================
// 
// dynamic 函数：Next.js 提供的动态导入工具
// 作用：这个组件不会在首屏加载，只有访问到这个页面时才会加载
// 好处：减少首屏 JavaScript 体积，提升加载速度
// 
// ⚠️ 注意：在 Server Component 中不能使用 ssr: false
// 如果需要禁用 SSR，需要将组件移到 Client Component 中
// 
const LazyExample = dynamic(
  // () => import(...)：动态导入组件（懒加载）
  () => import('@/components/lazy-example'),
  {
    // loading：加载中显示的占位组件
    loading: () => <div className="h-20 animate-pulse rounded bg-muted" />,
    // 注意：在 Server Component 中不能使用 ssr: false
    // 如果需要禁用 SSR，需要创建一个 Client Component 来包裹它
  }
)

// ============================================
// 第三步：骨架屏组件（加载占位符）
// ============================================
// 
// 作用：在数据加载完成前，显示一个"假的"文章卡片
// 好处：用户不会看到空白页面，体验更好
// 这是面试亮点：Suspense + 骨架屏 = 流式渲染
// 
function BlogListSkeleton() {
  return (
    // space-y-4：子元素之间的垂直间距
    <div className="space-y-4">
      {/* 
        [1, 2, 3]：创建一个包含 3 个数字的数组
        map：遍历数组，为每个数字创建一个骨架卡片
      */}
      {[1, 2, 3].map((i) => (
        // key={i}：React 要求列表元素必须有唯一的 key
        <div key={i} className="rounded-lg border p-6 bg-card">
          {/* 标题骨架（模拟文章标题） */}
          <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
          {/* 摘要骨架（模拟文章摘要） */}
          <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-muted" />
          {/* 内容骨架（模拟文章内容预览） */}
          <div className="mt-4 h-4 w-full animate-pulse rounded bg-muted" />
          <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-muted" />
        </div>
      ))}
    </div>
  )
}

// ============================================
// 第四步：博客列表组件（Server Component）
// ============================================
// 
// async function：这是一个异步函数组件
// Server Component：在服务器端运行，可以直接访问数据库
// 好处：不占用客户端 JavaScript 体积，SEO 友好
// 
async function BlogList() {
  // ============================================
  // 从数据库获取文章数据
  // ============================================
  // 
  // prisma.post.findMany：Prisma 的查询方法
  // 作用：从 Post 表中查找多条记录
  // 
  const posts = await prisma.post.findMany({
    // where：查询条件（只获取已发布的文章）
    where: { published: true },
    // orderBy：排序方式（按创建时间倒序，最新的在前）
    orderBy: { createdAt: 'desc' },
    // select：只选择需要的字段（减少数据传输量）
    select: {
      id: true, // 文章 ID
      title: true, // 标题
      slug: true, // URL 友好标识（如：my-first-post）
      summary: true, // 摘要
      createdAt: true, // 创建时间
      viewCount: true, // 浏览量
    },
    // take：只取前 10 篇（分页，避免一次加载太多）
    take: 10,
  })

  // ============================================
  // 如果没有文章，显示空状态
  // ============================================
  if (posts.length === 0) {
    return (
      <div className="rounded-lg border p-12 text-center bg-card">
        <p className="text-muted-foreground">暂无文章，敬请期待...</p>
      </div>
    )
  }

  // ============================================
  // 渲染文章列表
  // ============================================
  return (
    // space-y-6：文章卡片之间的垂直间距（更大，更舒适）
    <div className="space-y-6">
      {/* 
        posts.map：遍历文章数组，为每篇文章创建一个卡片
        post：当前文章对象
      */}
      {posts.map((post) => (
        // 
        // Link 组件：可点击的链接（跳转到文章详情页）
        // key={post.id}：React 要求列表元素必须有唯一的 key
        // href：跳转地址（使用文章的 slug）
        // 
        <Link
          key={post.id}
          href={`/blog/${post.slug}`}
          className={`
            // 基础样式
            block                    // 块级元素（占满整行）
            rounded-xl               // 大圆角
            border                   // 边框
            border-border/50         // 半透明边框
            bg-card                  // 卡片背景色
            backdrop-blur-sm         // 背景模糊（玻璃态）
            p-6                      // 内边距
            shadow-md                // 中等阴影
            
            // 交互效果
            transition-all           // 所有属性过渡
            duration-300             // 过渡时长
            hover:scale-[1.02]       // 悬停时轻微放大（1.02 倍）
            hover:shadow-xl         // 悬停时阴影更大
            hover:border-primary/50  // 悬停时边框变主色
            hover:bg-card/80         // 悬停时背景稍微透明
            
            // 布局
            group                    // 启用 group 功能（用于内部元素悬停效果）
          `}
        >
          {/* 文章标题 */}
          <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
            {post.title}
          </h2>

          {/* 文章摘要（如果有的话） */}
          {post.summary && (
            <p className="mt-2 text-muted-foreground leading-relaxed line-clamp-2">
              {post.summary}
            </p>
          )}

          {/* 文章元信息（日期、浏览量） */}
          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            {/* 
              new Date(post.createdAt)：把数据库的时间字符串转换成 Date 对象
              toLocaleDateString('zh-CN')：格式化成中文日期（如：2024/1/19）
            */}
            <span>{new Date(post.createdAt).toLocaleDateString('zh-CN')}</span>
            <span>·</span>
            {/* 浏览量 */}
            <span>{post.viewCount} 次浏览</span>
          </div>
        </Link>
      ))}
    </div>
  )
}

// ============================================
// 第五步：博客列表页面（主组件）
// ============================================
// 
// export default：导出为默认组件（Next.js 会自动识别）
// 这是页面的入口组件
// 
export default function BlogPage() {
  return (
    // ============================================
    // 页面外层容器
    // ============================================
    // 
    // relative：相对定位（为背景装饰元素定位）
    // min-h-screen：最小高度为整个屏幕
    // bg-gradient-to-b：从上到下的渐变背景
    // from-background via-muted/20 to-background：渐变颜色
    // 
    <div className="relative min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      {/* 装饰性背景光晕 */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

      {/* 内容区域 */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* 
          max-w-5xl：最大宽度限制（让内容不会太宽，阅读更舒适）
          mx-auto：水平居中
        */}
        <div className="mx-auto max-w-5xl">
          {/* 页面标题 */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              博客文章
            </h1>
            <p className="text-muted-foreground">探索技术，分享思考</p>
          </div>

          {/* ============================================
              Suspense 包裹异步组件
              ============================================
              Suspense：React 的异步组件包装器
              作用：当 BlogList 组件在加载数据时，显示 fallback（骨架屏）
              这是面试亮点：流式渲染（Streaming SSR）
              好处：页面不会白屏，用户体验更好
          */}
          <Suspense fallback={<BlogListSkeleton />}>
            <BlogList />
          </Suspense>

          {/* 懒加载组件示例（仅在需要时加载） */}
          <div className="mt-12">
            <LazyExample />
          </div>
        </div>
      </div>
    </div>
  )
}
