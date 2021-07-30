import ArticleItem from "./ArticleItem";
import articleStyles from "../styles/Article.module.css";

const ArticleList = ({ articles }) => {
	return (
		<div className={articleStyles.grid}>
			{articles.map((article, key) => (
				<ArticleItem article={article} key={key}/>
			))}
		</div>
	);
};

export default ArticleList;
