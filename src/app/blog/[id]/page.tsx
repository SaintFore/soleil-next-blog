import { getAllPostIds, getPostData } from '@/lib/markdown';
import Link from 'next/link';

// 生成所有可能的路径
export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}

// 文章详情页面组件
export default async function Post({ params }: { params: { id: string } }) {
  const post = await getPostData(params.id);
  
  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link href="/blog" className="text-blue-500 hover:underline mb-4 inline-block">
          ← 返回文章列表
        </Link>
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <div className="text-gray-500 mb-4">{post.date}</div>
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div 
        className="prose lg:prose-xl max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
    </article>
  );
}