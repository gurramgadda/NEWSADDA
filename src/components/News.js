import React, { useEffect ,useState } from "react";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types';
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {  

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalArticles, setTotalArticles] = useState(0)

  // document.title = `News ADDA - ${CapitlizeString(props.category)}`;

  const CapitlizeString = (word) =>{
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const fetchMoreData = async () => {
    // setState({page : page +1})
    setPage(page+1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${
      page
    }&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedata = await data.json();
    // console.log(parsedata);
    setArticles(articles.concat(parsedata.articles))
    setTotalArticles(parsedata.totalResults)
  };

  const updateNews = async()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${
      page
    }&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(50);
    let parsedata = await data.json();
    console.log(parsedata);
    props.setProgress(70);
    setArticles(parsedata.articles)
    setLoading(false)
    setTotalArticles(parsedata.totalArticles)
    // setPage(page+1)
    props.setProgress(100);
  }

  useEffect(() => {
    updateNews();
  }, [])
  

  // const handleNext = async () => {
  //   setPage(page+1)
  //   updateNews()
  // }
  // const handlePrev = async () => {
  //   setPage(page-1)
  //   updateNews()
  // };
  
    return (
      <>
        <h1 style={{ textAlign: "center", margin: "90px 10px" }}>
        {`News ADDA - Top ${CapitlizeString(props.category)} Headlines`}
        </h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalArticles}
          loader={<Spinner/>}
        >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4 my-3" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 40) : ""}
                    description={element.description ? element.description.slice(0, 80) : ""}
                    imageUrl={element.urlToImage ? element.urlToImage : "https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.22.0/images/bbc-sport-logo.png"}
                    newsUrl={element.url}
                    author = {element.author}
                    date = {element.publishedAt}
                    source ={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-primary"
            disabled={page <= 1}
            onClick={handlePrev}
          >
            &larr; Preverious
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleNext}
            disabled = {(Math.ceil(totalArticles / pageSize) < page + 1)}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
}

News.defaultProps = {
  country : 'in',
  category : 'general',
  pageSize : 6,
  apiKey : '3b1de7c397b346b89e125e61c85ed8e3'
}

News.propTypes ={
  country : PropTypes.string,
  category : PropTypes.string,
  pageSize : PropTypes.number,
  apiKey : PropTypes.string
}

export default News;
