import { ArticlesType } from "src/service/articles";

export function getArticlesByCategory(articles: ArticlesType[], category: string) {
    if (category === 'Accueil') {
      return articles
    }
    return articles.filter((article) => article.category === category)
}