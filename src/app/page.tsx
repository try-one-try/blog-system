import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-background p-4">
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
        Hello Blog System
      </h1>
      <p className="text-muted-foreground">
        第一阶段基建完成，Shadcn 按钮测试：
      </p>
      <div className="flex gap-4">
        <Button>默认按钮</Button>
        <Button variant="secondary">次要按钮</Button>
        <Button variant="destructive">危险按钮</Button>
        <Button variant="outline">边框按钮</Button>
      </div>
    </div>
  )
}