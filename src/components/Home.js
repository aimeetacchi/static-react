import React, { Component } from 'react'
import { createClient } from 'contentful';

export default class Home extends Component {
  state = {
    posts: []
  };

  componentWillMount(){
    const client = createClient({
      space: process.env.REACT_APP_SPACE_ID,
      accessToken: process.env.REACT_APP_ACCESS_TOKEN
    });

    client
      .getEntries({})
      .then(res => {
        this.setState({
          posts: res.items
        });
      })
      .catch(console.error);
  }


  render() {
    if(!this.state.posts.length) return <p>No posts found.</p>;
    return this.state.posts.map(post => {
        console.log(post);
        return <p>Post</p>;
    });
  }
}
