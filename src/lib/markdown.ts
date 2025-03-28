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
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    
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
  } catch (error) {
    console.error("获取文章元数据时出错:", error);
    return []; // 遇到错误时返回空数组
  }
}

/**
 * 获取所有文章ID,用于生成静态路径
 */
export function getAllPostIds() {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
      // 从文件名中提取ID
      const id = fileName.replace(/\.md$/, '');
      return {
        params: {
          // 对ID进行URL编码，确保与解码操作匹配
          id: encodeURIComponent(id),
        },
      };
    });
  } catch (error) {
    console.error("获取文章ID时出错:", error);
    return []; // 出错时返回空数组
  }
}

/**
 * 根据ID获取文章完整数据(含HTML内容)
 */
export async function getPostData(id: string): Promise<Post> {
  try {
    // 解码ID，处理中文文件名
    const decodedId = decodeURIComponent(id);
    const fullPath = path.join(postsDirectory, `${decodedId}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // 使用gray-matter解析front matter
    const matterResult = matter(fileContents);

    // 使用remark将markdown转换为HTML
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // 使用解码后的ID作为返回值
    return {
      id: decodedId, 
      content: contentHtml,
      ...(matterResult.data as Omit<PostMetadata, 'id'>),
    };
  } catch (error) {
    console.error(`获取文章 ${id} 数据时出错:`, error);
    throw new Error(`无法加载文章: ${error instanceof Error ? error.message : String(error)}`);
  }
}