import { Link } from 'react-router-dom';
import './content.scss';

type ArticlesProps = {
    slug: string, 
    title: string, 
    category: string, 
    content: string
}
const Content: React.FC<ArticlesProps> = ({ slug, title, category, content }) => {

  return (
  
    <article className="article">
        <Link to={`/articles/${slug}`}> 
        <h1>{title}</h1>
        <div className="article-category"> {category}</div>
        <p>{content}
         </p>
         </Link>
    </article>
   

   )
}

export default Content