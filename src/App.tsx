import { useQuery } from 'react-query';
import './index.scss';
import Header from './componants/Header';
import Contents from './componants/content/Contents';
import { fetchCategories } from './service/categories';
import { Route, Routes } from 'react-router-dom';
import { ArticlesType, fetchArticles } from './service/articles';
import { getArticlesByCategory } from './utils/dataTools';
import ArticlePage from './componants/articlePage';
import Spinner from './componants/spinner/spinner';
import Signup from './componants/signup/signup';
import Login from './componants/login/login';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/userContext';
import { isAuthenticated, saveAuthorization } from './service/auth';
import CreateArticle from './componants/createArticle/CreateArticle';

const App: React.FC = () => {
  const {  setUserId } = useContext(UserContext);
  const { loggedIn, toggleLoggedIn } = useContext(UserContext);
  const categoryQuery = useQuery('categories', fetchCategories);
  const articlesQuery = useQuery('articles', fetchArticles);
  console.log(categoryQuery.data);

  useEffect(() => {
    const test = isAuthenticated();
    if (test) {
      toggleLoggedIn(true);
      setUserId(test.userId);
      saveAuthorization(test.token)
      
      
    } else {
      toggleLoggedIn(false);
    }
  }, []);

  if (categoryQuery.isError || articlesQuery.isError) {
    return <h1> Erreur querys</h1>;
  }
  if (categoryQuery.isLoading || articlesQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <Header categories={categoryQuery.data ?? []} />
      <Routes>
        {categoryQuery.data?.map(({ route, label }) => (
          <Route
            key={route}
            path={route}
            element={
              <Contents
                articles={getArticlesByCategory(articlesQuery.data as ArticlesType[], label)}
              />
            }
          />
        ))}
        <Route
          path='/articles/:slug'
          element={<ArticlePage articles={articlesQuery.data as ArticlesType[]} />}
        />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/create' element={<CreateArticle categories={categoryQuery.data ?? []} />} />

        <Route path='*' element={'404'} />
      </Routes>
    </div>
  );
};
export default App;
