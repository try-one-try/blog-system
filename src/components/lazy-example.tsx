'use client'

// 这是一个示例组件，展示如何使用动态导入实现懒加载
// 在实际项目中，你可以把复杂的组件（比如富文本编辑器、图表库）这样处理

export default function LazyExample() {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-sm text-muted-foreground">
        这是一个懒加载组件的示例。在需要时才会被加载。
      </p>
    </div>
  )
}
