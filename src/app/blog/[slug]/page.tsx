import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'

// 文章内容骨架屏
function PostSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-10 w-3/4 animate-pulse rounded bg-muted" />
      <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
      <div className="mt-8 space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-4 w-full animate-pulse rounded bg-muted" />
        ))}
      </div>
    </div>
  )
}

// 文章内容组件（Server Component）
async function PostContent({ slug }: { slug: string }) {
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  })

  if (!post || !post.published) {
    notFound()
  }

  // 增加浏览量（异步，不阻塞页面渲染）
  prisma.post
    .update({
      where: { id: post.id },
      data: { viewCount: { increment: 1 } },
    })
    .catch(console.error)

  return (
    <article className="prose prose-zinc mx-auto dark:prose-invert">
      <header className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{post.author.name || '匿名'}</span>
          <span>·</span>
          <time dateTime={post.createdAt.toISOString()}>
            {new Date(post.createdAt).toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span>·</span>
          <span>{post.viewCount} 次浏览</span>
        </div>
      </header>
      <div
        className="whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  )
}

// 文章详情页
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <Suspense fallback={<PostSkeleton />}>
          <PostContent slug={slug} />
        </Suspense>
      </div>
    </div>
  )
}
