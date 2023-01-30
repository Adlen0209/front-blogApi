import { ArticlesType } from "src/service/articles";
import Content from "./Content"

type ContentsProps = {
  articles: ArticlesType[];
};

const Contents: React.FC<ContentsProps> = ({articles}) =>{
  return (
    <div className='divArticle'>
      {articles.map(({id, ...rest}) => (
        <Content 
        key={id}
        {...rest}
        />
      ))}
      </div>
  )
}

export default Contents