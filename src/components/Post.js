import React, { Component, createElement } from 'react'
import { createClient } from 'contentful';
import Helmet from 'react-helmet';
import marksy from 'marksy';

const SPACE_ID = 'd2po5dvsb8lj'
const ACCESS_TOKEN = '08fd33f2eae21ecb8e76fa2c5d323a250fbd909f10de0a008dcd5ea93c2af476'

 // Markdown helper function
 const getMarkup = field => {
  if(!field) return null;
  const compile = marksy({
    createElement,
    elements: {}
  });
  return compile(field).tree;
};

class Post extends Component {
  constructor(props){
    super(props);

    this.state = {
      data: null
    };
  }

  componentWillMount(){
    const client = createClient({
      space: SPACE_ID,
      accessToken: ACCESS_TOKEN
    });

    client
     // use getEntries because it does link resolution
      .getEntries({
        'sys.id[in]': this.props.match.params.id
      })
      .then(res => {
         // extract the data from the response array
         return res.items[0].fields;
      })
      .then(
        fields => {
          this.setState({
            data: fields
          });
        })
      .catch(console.error);
  }

 
  render() {
    console.log(this.state.data);
    if(!this.state.data) return null;
    
    let content = getMarkup(this.state.data.content);

    return (
      <React.Fragment>
        <Helmet title={this.state.data.title} />
        <div className="container">
          <h1>{this.state.data.title}</h1>
        {content};
       </div>
      </React.Fragment>
    )
  }
}

export default Post;