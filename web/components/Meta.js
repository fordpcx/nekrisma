import Head from "next/head";

const Meta = ({ title, keywords, description }) => {
	return (
		<Head>
			<meta name='viewport' content='width=device-width, initial-scale=1' />
			<meta name='keywords' content={keywords} />
			<meta name='description' content={description} />
			<meta charSet='utf-8' />
			<link rel='icon' href='/favicon.ico' />
			{ /* eslint-disable-next-line max-len */ }
			<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css' />
			<title>{title}</title>
		</Head>
	);
};

Meta.defaultProps = {
	title: process.env.appName,
	keywords: "Web Development",
	description: "Technology",
};

export default Meta;
