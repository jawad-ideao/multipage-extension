import React, { useState, useEffect } from "react";
import "regenerator-runtime/runtime.js";

const StoryCard = ({ id }) => {
  const [details, setDetails] = useState({});

  const getStoryData = async (id) => {
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const storyDetails = await response.json();
    console.log(storyDetails);
    setDetails(storyDetails);
  };

  useEffect(() => {
    getStoryData(id);
  }, [id]);

  return (
    <div key={details.id} style={styles.postContentGithub}>
      <a
        style={styles.postsContainer}
        href={details.url}
        target="_blank"
        rel="noreferrer"
      >
        <h2 style={styles.postInfoGithub}>{details.title}</h2>
      </a>
    </div>
  );
};

const query = `{
    storiesFeed(type:BEST)
        {
            title,
            author
            {
                name,
                username,
                blogHandle,
                publicationDomain,
            },
            coverImage,
            brief,
            slug,
            cuid, 
        }
    }
  `;

function Blogs() {
  const [hashnode, setHashnode] = useState(false);
  const [devto, setDevto] = useState(false);
  const [github, setGithub] = useState(false);
  const [hackerNews, setHackerNews] = useState(false);

  const [hashnodePosts, setHashnodePosts] = useState([]);
  const [devtoPosts, setDevtoPosts] = useState([]);
  const [githubRepo, setGithubRepo] = useState([]);
  const [hackerPosts, setHackerPosts] = useState([]);

  const [loading, setLoading] = useState(false);

  async function hashnodeFetcher() {
    setLoading(true);
    setHashnode(true);
    setDevto(false);
    setGithub(false);
    setHackerNews(false);
    try {
      const response = await fetch("https://api.hashnode.com", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const apiResponse = await response.json();
      setHashnodePosts(apiResponse.data.storiesFeed);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function devtoFetcher() {
    setLoading(true);
    setHashnode(false);
    setDevto(true);
    setGithub(false);
    setHackerNews(false);
    try {
      const response = await fetch("https://dev.to/api/articles", {
        headers: {
          "Content-type": "application/json",
        },
      });
      const apiResponse = await response.json();
      setDevtoPosts(apiResponse);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function githubFetcher() {
    setLoading(true);
    setHashnode(false);
    setDevto(false);
    setGithub(true);
    setHackerNews(false);
    try {
      const response = await fetch(
        "https://gtrend.yapie.me/repositories?since=daily"
      );
      const trendingRepos = await response.json();
      setLoading(false);
      setGithubRepo(trendingRepos);
    } catch (error) {
      console.log(error);
    }
  }

  async function hackerNewsFetcher() {
    setLoading(true);
    setHashnode(false);
    setDevto(false);
    setGithub(false);
    setHackerNews(true);

    try {
      const response = await fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty",
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const apiResponse = await response.json();
      console.log(apiResponse);
      setLoading(false);
      setHackerPosts(apiResponse);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={styles.main}>
      <h1 style={styles.headerTitle}>Top posts from your ?????? platforms!</h1>
      <div style={styles.platformDiv}>
        <div style={styles.platformInnerDiv} onClick={hashnodeFetcher}>
          <img
            style={styles.platformLogo}
            src="https://cdn.hashnode.com/res/hashnode/image/upload/v1611902473383/CDyAuTy75.png?auto=compress"
            alt="https://hashnode.com/"
          />
        </div>
        <div style={styles.platformInnerDiv} onClick={devtoFetcher}>
          <img
            style={styles.platformLogo}
            src="https://res.cloudinary.com/practicaldev/image/fetch/s--R9qwOwpC--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/78hs31fax49uwy6kbxyw.png"
            alt="https://dev.to/"
          />
        </div>
        <div style={styles.platformInnerDiv} onClick={githubFetcher}>
          <img
            style={styles.platformLogo}
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="https://github.com/"
          />
        </div>
        <div style={styles.platformInnerDiv} onClick={hackerNewsFetcher}>
          <img
            style={styles.platformLogo}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Y_Combinator_logo.svg/220px-Y_Combinator_logo.svg.png"
            alt="https://news.ycombinator.com/"
          />
        </div>
      </div>
      <div style={styles.postsContainer}>
        {loading === true ? (
          <div style={styles.prePostsContent}>
            <h2>Fetching latest Posts ?????????????????</h2>
          </div>
        ) : (
          <>
            {hashnode ? (
              <div style={styles.postOuterContainer}>
                {hashnodePosts.map((post, index) => {
                  return (
                    <a
                      key={index}
                      style={styles.postsContainer}
                      href={`https://${
                        post.author.publicationDomain === ""
                          ? post.author.blogHandle + ".hashnode.dev/"
                          : post.author.publicationDomain + "/"
                      }${post.slug}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div style={styles.postContent}>
                        <img
                          style={styles.postImage}
                          src={
                            post.coverImage === ""
                              ? "https://cdn.hashnode.com/res/hashnode/image/upload/v1611902473383/CDyAuTy75.png?auto=compress"
                              : post.coverImage
                          }
                          alt="cover-img"
                        />
                        <div style={styles.postInfo}>
                          <h3 style={styles.postTitle}>
                            {post.title.substr(0, 70)}...
                          </h3>
                          <p style={styles.postAuther}>?????? {post.author.name}</p>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            ) : (
              <>
                {devto ? (
                  <>
                    <div style={styles.postOuterContainer}>
                      {devtoPosts.map((post, index) => {
                        return (
                          <a
                            key={index}
                            style={styles.postsContainer}
                            href={post.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <div style={styles.postContent}>
                              <img
                                style={styles.postImage}
                                src={
                                  post.social_image === ""
                                    ? "https://res.cloudinary.com/practicaldev/image/fetch/s--R9qwOwpC--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/78hs31fax49uwy6kbxyw.png"
                                    : post.social_image
                                }
                                alt="cover-img"
                                className="rounded"
                              />
                              <div style={styles.postInfo}>
                                <h3 style={styles.postTitle}>
                                  {post.title.substr(0, 70)} ...
                                </h3>
                                <p style={styles.postAuther}>
                                  ?????? {post.user.name}
                                </p>
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    {github ? (
                      <>
                        <div style={styles.postOuterContainer}>
                          {githubRepo.map((repo, index) => {
                            return (
                              <div>
                                <a
                                  key={index}
                                  style={styles.postsContainer}
                                  href={repo.url}
                                  target="_blank"
                                  rel="noreffer"
                                >
                                  <div style={styles.postContentGithub}>
                                    <h3 style={styles.postTitleGithub}>
                                      {repo.name}
                                    </h3>
                                    <p style={styles.postInfoGithub}>
                                      {repo.description}
                                    </p>

                                    <p style={styles.postInfoGithub}>
                                      ??????????? {repo.language}
                                    </p>
                                  </div>
                                </a>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      <>
                        {hackerNews ? (
                          <>
                            <div style={styles.postOuterContainer}>
                              {hackerPosts.slice(0, 15).map((storyId) => {
                                return <StoryCard id={storyId} />;
                              })}
                            </div>
                          </>
                        ) : (
                          <div style={styles.prePostsContent}>
                            <h3>
                              <center>
                                Get top Posts from your Favourite ?????? Platforms!
                              </center>
                            </h3>
                            <br />
                            <p>
                              <strong>Hashnode:</strong> Top 10 blog.
                            </p>
                            <p>
                              <strong>Devto:</strong> Blog Posts.
                            </p>
                            <p>
                              <strong>Github:</strong> Top repositories.
                            </p>
                            <p>
                              <strong>Hacker News:</strong> Latest Stories.
                            </p>
                            <br />
                            <br />
                            <center>
                              Hashnode.com | Dev.to | Github.com |
                              Thehackernews.com
                            </center>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  main: {
    maxWidth: "420px",
    height: "570px",
    background: "#f9fafc",
    boxSizing: "border-box",
  },

  headerTitle: {
    fontSize: 18,
    color: "#252429",
    margin: "2% auto 0 auto",
    padding: "3%",
    textAlign: "center",
    fontFamily: "'Open Sans', sans-serif",
    transform: "skew(-12deg)",
    background: "#f0dab1",
    width: "80%",
    height: "30px",
    borderRadius: "7px",
  },

  platformDiv: {
    display: "flex",
    justifyContent: "center",
  },
  platformInnerDiv: {
    cursor: "pointer",
    margin: "3% 3% 0 3%",
    width: "45px",
    height: "45px",
    background: "#ffff",
    boxShadow: "2px 2px 1px #e0e6edcc",
    borderRadius: "9px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  platformLogo: {
    width: "25px",
    height: "25px",
  },
  postOuterContainer: {
    height: "95%",
    padding: "0% 3% 2% 3%",
  },
  postsContainer: {
    height: "72%",
    padding: "0% 3% 2% 3%",
    textDecoration: "underline 2px rgba(248,252,251,.582)",
  },
  postContent: {
    width: "90%",
    height: "auto",
    padding: "2%",
    background: "rgba(248,252,251,.582)",
    boxShadow: "2px 2px 1px #e0e6edcc",
    borderRadius: "7px",
    display: "flex",
    alignItems: "center",
    margin: "0% auto 2% auto",
  },
  postContentGithub: {
    width: "90%",
    padding: "2%",
    height: "auto",
    margin: "0% auto 2% auto",
    background: "rgba(248,252,251,.582)",
    boxShadow: "2px 2px 1px #e0e6edcc",
    borderRadius: "7px",
    testDecoration: "none",
  },
  postTitleGithub: {
    color: "#252429",
    fontWeight: 600,
    fontFamily: "'Rubik', sans-serif",
  },
  postInfoGithub: {
    color: "#252429",
    fontSize: 15,
    fontFamily: "'Rubik', sans-serif",
  },
  postImage: {
    width: "30%",
    height: "70px",
    margin: "auto 2% auto 2%",
    borderRadius: "7px",
    boxShadow: "2px 2px 5px #e0e6edcc",
  },
  postInfo: {
    width: "70%",
    marginLeft: "1%",
    height: "auto",
  },
  postTitle: {
    fontWeight: 500,
    fontSize: 15,
    color: "#252429",
    fontFamily: "'Rubik', sans-serif",
  },
  postAuther: {
    fontSize: 12,
    textAlign: "right",
    marginRight: "3%",
    color: "#252429",
    fontFamily: "'Rubik', sans-serif",
  },
  prePostsContent: {
    margin: "auto",
    width: "90%",
    fontWeight: 500,
    fontSize: 15,
    color: "#252429",
    fontFamily: "'Rubik', sans-serif",
  },
};

export default Blogs;
