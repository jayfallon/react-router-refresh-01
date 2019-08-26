import React, { Component } from "react";
import { Route } from "react-router-dom";

import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import FullPost from "../FullPost/FullPost";
import "./Posts.css";

class Posts extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get("/posts")
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: "Jay"
          };
        });
        this.setState({ posts: updatedPosts });
      })
      .catch(error => {
        // this.setState({ error: true });
        console.log(error);
      });
  }

  postSelectedHandler = id => {
    console.log("clicked");
    this.props.history.push({ pathname: "/posts/" + id });
  };

  render() {
    let posts = <p>Something went wrong</p>;
    if (!this.state.error) {
      posts = this.state.posts.map((post, i) => {
        return (
          // <Link key={post.id} to={"/" + post.id}>
          <Post
            key={post.id}
            clicked={() => this.postSelectedHandler(post.id)}
            author={post.author}
            title={post.title}
          />
          // </Link>
        );
      });
    }
    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route
          path={this.props.match.url + "/:id"}
          exact
          component={FullPost}
        />
      </div>
    );
  }
}

export default Posts;
