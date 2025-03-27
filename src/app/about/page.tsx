export default function About() {
    return (
      <div className="flex min-h-screen flex-col items-center p-24">
        <h1 className="text-4xl font-bold mb-8">关于我</h1>
        <div className="prose lg:prose-xl">
          <p>
            欢迎访问我的博客！这是我记录学习和成长的地方。
          </p>
          <h2>我的技能</h2>
          <ul>
            <li>前端开发 (React, Next.js)</li>
            <li>用户界面设计</li>
            <li>技术文章写作</li>
          </ul>
          <h2>博客目标</h2>
          <p>
            通过这个博客，我希望能够：
          </p>
          <ul>
            <li>分享我的技术学习心得</li>
            <li>记录解决问题的方法</li>
            <li>与志同道合的朋友交流</li>
          </ul>
        </div>
      </div>
    );
  }