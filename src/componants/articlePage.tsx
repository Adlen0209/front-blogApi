import React, { useContext } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { ArticlesType, deleteArticle } from '../service/articles';
import { findArticleBySlug } from '../utils/dataTools';
import Spinner from './spinner/spinner';

type ArticlePageProps = {
  articles: ArticlesType[];
};

const ArticlePage: React.FC<ArticlePageProps> = ({ articles }) => {
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);
  const { slug } = useParams<{ slug: string }>();

  if (articles.length === 0) {
    return <Spinner />;
  }

  const article = findArticleBySlug(articles, slug);
  if (!article) {
    return <Navigate to='/404' />;
  }

  const handleDelete = async () => {
    console.log('delete post', article.id);
    const response = await deleteArticle(+article.id);
    console.log(response);
    if (response.status === 200) {
      navigate('/');
    }
    return;
  };

  const handleEdit = async () => {
    console.log('edit post');
    navigate(`/edit/${article.slug}`);
  };

  return (
    <>
      <article className='article'>
        <h1>{article.title}</h1>
        <p>{article.content}</p>
      </article>
      {
        userId === article.user_id && (
          <>
            <button className='delete-button' onClick={handleDelete}>
              Supprimer
            </button>
            <button className='delete-button' onClick={handleEdit}>
              Modifier
            </button>
          </>
        )
        //     <button className='edit-button' onClick={handleEdit}>
        //     Modifier
        // </button>
      }
    </>
  );
};

export default ArticlePage;
