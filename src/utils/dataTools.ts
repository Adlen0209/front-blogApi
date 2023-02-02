import { ArticlesType } from 'src/service/articles';

export function getArticlesByCategory(articles: ArticlesType[], category: string) {
  if (category === 'Accueil') {
    return articles;
  }
  return articles.filter((article) => article.category === category);
}

export function findArticleBySlug(articles: ArticlesType[], slug: string | undefined) {
  return articles.find((article) => article.slug === slug);
}

export function extractCategoryIdAndLabel(data: any) {

  const categoryId = data[0]

  const categoryName = data.slice(1, data.length);

  return { categoryId, categoryName };

}

export function slugify(string: string) {
  return string
  .toLowerCase()
  .trim()
  .replace(/ /g, '-')
  .replace(/[^\w-]+/g, '')
}