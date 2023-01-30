import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { ArticlesType } from 'src/service/articles';
import { findArticleBySlug } from '../utils/dataTools';

type ArticlePageProps = {
    articles: ArticlesType[],

}

const ArticlePage: React.FC<ArticlePageProps> = ({ articles }) => {
    const {slug} = useParams<{ slug: string }>();

    // TODO: spinner

    const article = findArticleBySlug(articles, slug);
    if(!article) {
        return <Navigate to="/404" />
    }

  return (
    
    <article className='article'>
        <h1>{article.title}</h1>
        <p>{article.content}</p>
    </article>
  )
}

export default ArticlePage;