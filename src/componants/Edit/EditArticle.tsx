import { useParams } from 'react-router-dom';
import { findArticleBySlug } from '../../utils/dataTools';
import { ArticlesType } from '../../service/articles';

type ArticlePageProps = {
  articles: ArticlesType[];
};

const EditArticle: React.FC<ArticlePageProps> = ({ articles }) => {
  const { slug } = useParams<{ slug: string }>();
  const article = findArticleBySlug(articles, slug);
  console.log('article', article);
  console.log('slug', slug);
  console.log('articless', articles);

  return <div>{article?.slug}</div>;
};

export default EditArticle;
