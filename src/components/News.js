import React, { useCallback, useEffect ,useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {  

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalArticles, setTotalArticles] = useState(0)

  const CapitalizeString = (word = '') =>{
    return word?.charAt(0).toUpperCase() + word?.slice(1);
  }

  const fetchMoreData = async () => {
    setPage(page+1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${
      page
    }&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData?.articles));
    setTotalArticles(parseData?.totalResults);
  };

  const updateNews = async()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${
      page
    }&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(50);
    let parseData = await data.json();
    console.log(parseData);
    props.setProgress(70);
    setArticles(parseData?.articles)
    setLoading(false)
    setTotalArticles(parseData?.totalArticles)
    props.setProgress(100);
  }

  useEffect(() => {
    updateNews();
  }, [])
  
    return (
      <>
        <h1 style={{ textAlign: "center", margin: "90px 10px" }}>
        {`News ADDA - Top ${CapitalizeString(props.category)} Headlines`}
        </h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles?.length}
          next={fetchMoreData}
          hasMore={articles?.length !== totalArticles}
          loader={<Spinner/>}
        >
        <div className="container">
          <div className="row">
            {articles.map((element, index) => {
              const {title = '', description = '', urlToImage = '', url = '', author = '', publishedAt = '', source = {}} = element;

              return (
                <div className="col-md-4 my-3" key={`${index}_${url}`}>
                  <NewsItem
                    title={title ? title.slice(0, 40) : ""}
                    description={description ? description.slice(0, 80) : ""}
                    imageUrl={urlToImage ? urlToImage : "https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.22.0/images/bbc-sport-logo.png"}
                    newsUrl={url}
                    author = {author}
                    date = {publishedAt}
                    source ={source?.name}
                  />
                </div>
              );
            })}
          </div>
        </div>

        </InfiniteScroll>
      </>
    );
}

News.defaultProps = {
  country : 'in',
  category : 'general',
  pageSize : 6,
  apiKey : '3b1de7c397b346b89e125e61c85ed8e3'
}

export default News;
