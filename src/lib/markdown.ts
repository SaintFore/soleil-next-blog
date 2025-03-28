import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// 文章目录路径
const postsDirectory = path.join(process.cwd(), 'src/content/posts');

// 文章元数据类型定义
export interface PostMetadata {
  id: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
}

// 完整文章类型(含内容)
export interface Post extends PostMetadata {
  content: string;
}

/**
 * 获取所有文章的元数据
 */
export function getAllPostsMetadata(): PostMetadata[] {
  // 读取posts目录下所有文件
  const fileNames = fs.readdirSync(postsDirectory);
  
  // 处理每个文件,提取元数据
  const allPostsData = fileNames.map((fileName) => {
    // 从文件名中移除".md"获取ID
    const id = fileName.replace(/\.md$/, '');

    // 读取markdown文件内容
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // 使用gray-matter解析front matter
    const matterResult = matter(fileContents);

    // 合并数据并返回
    return {
      id,
      ...(matterResult.data as Omit<PostMetadata, 'id'>),
    };
  });

  // 按日期排序,最新文章在前
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * 获取所有文章ID,用于生成静态路径
 */
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

/**
 * 根据ID获取文章完整数据(含HTML内容)
 */
export async function getPostData(id: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // 使用gray-matter解析front matter
  const matterResult = matter(fileContents);

  // 使用remark将markdown转换为HTML
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // 合并数据并返回
  return {
    id,
    content: contentHtml,
    ...(matterResult.data as Omit<PostMetadata, 'id'>),
  };
}