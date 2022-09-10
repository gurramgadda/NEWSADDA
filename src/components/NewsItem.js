import React from "react";

const NewsItem =(props)=> {
    let { title, description, imageUrl, newsUrl, author, date ,source} = props;
    return (
      <div>
        <div className="card">
          <div className="m-1" style={{display:'flex',position:'absolute',right:'0'}}>
          <span className="badge rounded-pill bg-danger">
              {source}</span>
          </div>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}....</h5>
            <p className="card-text">{description}....</p>
            <a href={newsUrl} target="blank" className="btn btn-sm btn-primary">
              Read More
            </a>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "Unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
