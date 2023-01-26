import { useQuery } from "react-query";
import './index.scss';
import Header from "./componants/Header";
import Contents from './componants/content/Contents';
import { fetchCategories } from "./service/categories";

const App: React.FC = () => {
   const categoryQuery = useQuery('categories', fetchCategories)

  console.log(categoryQuery.data)
    return <div><Header categories={categoryQuery.data ?? []} /><Contents />
    </div>;
  };
  export default App;