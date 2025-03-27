export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Soleil的个人博客</h1>
      <p className="text-xl mb-4">
        欢迎来到我的技术分享空间
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">最新文章</h2>
          <p>这里将显示最新发布的文章</p>
        </div>
        <div className="rounded-lg border p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">热门标签</h2>
          <p>这里将显示博客的热门标签</p>
        </div>
        <div className="rounded-lg border p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">关于我</h2>
          <p>一个热爱技术的开发者</p>
        </div>
      </div>
    </main>
  );
}