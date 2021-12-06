import "./App.css";
import React from "react";
import { PostCard } from "./components/PostCard";

class App extends React.Component {
  state =  {
    posts: [],
    searchValue: ""
  };

  componentDidMount () {
    this.loadPosts();
  }

  loadPosts = async () => {
    const responsePosts = fetch("https://jsonplaceholder.typicode.com/posts");
    const responsePhotos = fetch("https://jsonplaceholder.typicode.com/photos");

    const [posts, photos] = await Promise.all([responsePosts, responsePhotos]);
    const postsJson = await posts.json();
    const photosJson = await photos.json();

    const postsAndPhotos = postsJson.map((post, index) => {
      return { ...post, cover: photosJson[index].url }; 
    })

    this.setState({posts: postsAndPhotos});

  }

  loadMorePosts = (e) => {
    const { value } = e.target;
    this.setState({searchValue: value});
  }

  render () {
    const { posts, searchValue } = this.state;
    var filteredPost = !!searchValue ? 
    posts.filter((itens) => {
      return itens.title.includes(searchValue);
    })
    : posts;

    return (
      <section className="container">
        <div className="container-infos">
          <h1>Search for: {searchValue}</h1>
          <input
            placeholder="search for posts" 
            type="search" 
            onChange={this.loadMorePosts} 
            value={searchValue}
            />
          
          {filteredPost.length <= 0 && (
            <p>No result founds for: {searchValue}</p>
          )}
        </div>
        <div className="posts">
          {filteredPost.map(post => (
            <PostCard 
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
              cover={post.cover}
            />
          ))}
        </div>
      </section>
    );
  }
}

export default App;