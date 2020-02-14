// import { View, Text, StyleSheet, Image,TouchableOpacity } from "react-native";
// import React, { Component } from "react";
// import { MenuButton, Logo } from "../components/header/header";
// import { ScrollView } from "react-native-gesture-handler";
// import { Card, ListItem, Button, Icon } from 'react-native-elements';
// import LikeButton from '../components/LikeButton'

// const users = [
//   {
//      id: '1',
//      title: 'Coco Cola Cool Advt',
//      info: 'Hey! Grab a Cola and get 50% cashback',
//      avatar: require('../assets/cococola.jpg'),

//   },
//   {
//     id: '2',
//     title: 'Maggi Advt',
//     info: 'Buy 1 get 1 Freeeee',
//     avatar: require('../assets/maggi.jpg'),

//  },
//  {
//   id: '3',
//   title: 'GoodDay Advt',
//   info: 'Have a good day!',
//   avatar: require('../assets/goodday.png'),

// },
// {
//   id: '4',
//   title: 'Ind vs NZ',
//   info: 'Who is winning today??',
//   avatar: require('../assets/match.jpg'),

// },
// {
//   id: '5',
//   title: 'CoronaVirus',
//   info: 'Pls be careful! Take more of Vitamin C.',
//   avatar: require('../assets/corona.jpg'),

// },

//  ];

// export default class TrendingPostsScreen extends React.Component {
//   static navigationOptions = ({ navigation }) => {
//     return {
//       headerLeft: ()=><MenuButton onPress={() => navigation.openDrawer()} />,
//       headerRight:()=> (<Logo />),
//     };
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//             <ScrollView style={styles.scrollstyle}>
//                   {users.map((u,index) => {
//                       return (
//                       <Card key={index}>
//                         <View key={index} style={styles.user}>
//                                 <Image
//                                   style={styles.avatar_card}
//                                   resizeMode="cover"
//                                   source={ u.avatar }
//                                 />
//                                 <Text style={styles.name}>{u.title}</Text>
//                                 <Text style={styles.infostyle}>{u.info}</Text>
//                                 <LikeButton />
//                               </View>
//                       </Card>);
//                   })}
//             </ScrollView>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container:{
//     alignItems:'center'
//   },
//   header:{
//     // marginTop: 10,
//     backgroundColor: "#00BFFF",
//     height:100,
//     width:'100%',
//     borderColor: "black",
//     borderWidth: 2,
//     borderBottomLeftRadius: 15,
//     borderBottomRightRadius: 15,
//     marginLeft:5,
//     marginRight: 5,
//   },
//   avatar: {
//     width: 80,
//     height: 80,
//     borderRadius: 63,
//     borderWidth: 3,
//     borderColor: "white",
//     marginBottom:10,
//     alignSelf:'flex-start',
//     position: 'absolute',
//     marginTop:10,
//     marginLeft:5
//   },
//   avatar_card: {
//     width: 350,
//     height: 300,
//     // borderRadius: 63,
//     padding: 10,
//     borderWidth: 2,
//     borderColor: "black",
//     marginBottom:20,
//     alignSelf:'center',
//     // position: 'absolute',
//     marginLeft:5
//   },
//   bodyContent: {
//     flex: 1,
//     alignItems: 'flex-end',
//     padding:5,
//     marginRight:10,
//     marginBottom: 10
//   },
//   name:{
//     fontSize:28,
//     color: "#696969",
//     fontWeight: "600"
//   },
//   info:{
//     fontSize:16,
//     color: "#FFFFFF",
//   },
//   buttonContainer: {
//       height:30,
//       flexDirection: 'row',
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginBottom:10,
//       width:100,
//       borderRadius:15,
//       backgroundColor: "white",
//       paddingRight:5,
//       paddingLeft: 5
//   },
//   followContainer: {
//     flexDirection: 'row',
// },

// });

import React, { Component } from "react";
import { MenuButton, Logo, Middle } from "../components/header/header";
import { FlatList, SafeAreaView, Text, View, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import LikeButton from '../components/LikeButton'
import * as Progress from 'react-native-progress';

export default class TrendingPostsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: () => <MenuButton onPress={() => navigation.openDrawer()} />,
      headerRight: () => (<Logo />),
    };
  };

  constructor(props) {
    super(props);
    // this.state ={ isLoading: true, item: null, postdata:[],trendingdata:[],}
    this.state = { 
      isLoading: true, item: null, bgcolor: "#ffc1cc", 
      posts:[],
      streams:[],
      selectedStream:"",
      ip:"http://gaimr-boot.herokuapp.com",
      progress:0,
    }
    this.votepoll = this.votepoll.bind(this);
  }


  init() {
    fetch(this.state.ip+'/posts/getTrendingPosts/'+this.state.selectedStream,
      {
        method: 'GET',
        headers:
        {
          'Content-Type': 'application/json',
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({
          isLoading: false,
          posts: responseJson
        });

      })
      .catch((error) => {
        console.error(error);
      });

    fetch(this.state.ip+'/streams')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({
          isLoading: false,
          streams: responseJson,
        }, function () {
        });

      })
      .catch((error) => {
        console.error(error);
      });
  }
  componentDidMount()
  {
    this.init()
  }
  updateVote(updatedPost) {
    let postsArr = this.state.posts;
    let newPosts = []
    for (let i = 0; i < postsArr.length; i++) {
      let post = postsArr[i];
      if (post.postId === updatedPost.postId) {
        post = updatedPost
      }
      newPosts.push(post)
    }
    this.setState({
      posts: newPosts
    })
  }
  votepoll(postId, choiceNo) {
    console.log("voting", postId, "+", choiceNo)
    let vote = {
      postId: postId,
      choiceNo: choiceNo
    }
    fetch(this.state.ip+'/posts/addVote',
      {
        method: "PUT",
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vote)
      }).then((resp) => resp.json())
      .then((responseJSON) => {
        console.log("voted", responseJSON)
        this.updateVote(responseJSON)
      }).then(err => { console.log(err) })
  }
  onLikeHandler = (postId) => {
    console.log("liking post", postId);
    let like = {
      postId: postId
    }
    fetch(this.state.ip+'/posts/addLike',
      {
        method: "PUT",
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(like)
      }).then((resp) => resp.json())
      .then((responseJSON) => {
        console.log("liked", responseJSON)
      }).then(err => { console.log(err) })
  }
  onRefresh=()=>
  {
    this.setState({isLoading:true},function(){this.init()})
  }
  selectedStreamHandler=streamName=>
  {
    if(streamName==="All")
    streamName=""
    this.setState({
      selectedStream:streamName,
      isLoading:true
    },function(){
      this.init();
    })
  }
  renderItem = ({ item }) => {
    let postView = null;
    let pollView = null;
    if (item.postType === "text") {
      postView = (
        <View key={item.postId}>
          <Text style={styles.content}>{item.postContent.text}</Text>
          <LikeButton  onLike={() => { this.onLikeHandler(item.postId) }} />
        </View>
      )
    }
    else if (item.postType == "image") {
      postView = (
        <View key={item.postId}>
          <Text style={styles.content}>{item.postContent.text}</Text>
          <View style={styles.img}>
          <Image source={{ uri: item.postContent.image }}
            style={{
             height:"100%",
             width:"100%",
             resizeMode:"stretch"
              }}
          />
          </View>
          <LikeButton  onLike={() => { this.onLikeHandler(item.postId) }}/>
        </View>
      )
    }
    if (item.pollExists) {
      var choices = [];
      for (let i = 0; i < item.poll.choices.length; i++) {
        let choice = item.poll.choices[i];
        choices.push(
          <View key={choice.choiceNo}>
            <TouchableOpacity onPress={this.votepoll.bind(this, item.postId, choice.choiceNo)}>
              <View style={styles.pollstyle}>
                <View style={{ backgroundColor: this.state.bgcolor, flex: 1, padding: 10, fontWeight: 400, fontSize: 20 }}>
                  <Text>{choice.choice}</Text>
                </View>
                <View style={{ backgroundColor: this.state.bgcolor, flex: 1, padding: 10, fontWeight: 400, fontSize: 20, alignContent: "flex-end" }}>
                  <Text style={{ textAlign: 'right', alignSelf: 'stretch' }}>{choice.votes}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )
      }
      pollView = (
        <View>
          <Text style={styles.question}>{item.poll.question}</Text>
          {choices}
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollstyle}>
          <Card key={item.postId}>
            <View style={styles.viewstyle}>
              {postView}
              {pollView}
              <Text style={styles.totalLikesText}>{item.postActivity.auditorLikes.length} likes</Text>
            </View>
          </Card>
        </ScrollView>
      </View>
    )
  }

  renderStreams = ({ item }) => {
    return (
      <View style={{ padding: 20, paddingTop: 20, paddingBottom: 30}}>
        <TouchableOpacity style={{alignItems:"center"}} onPress={()=>{this.selectedStreamHandler(item.streamName)}}>
          <Image source={{ uri: item.streamLogo }} style={{ width: 50, height: 50 }} />
          <Text>{item.streamName}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          horizontal={true}
          data={this.state.streams}
          renderItem={this.renderStreams}
          keyExtractor={item => item.streamId}
        />
        {/* <Progress.Circle
            style={styles.progress}
            progress={1}
            indeterminate={this.state.isLoading}
          /> */}
        <FlatList
          data={this.state.posts}
          renderItem={this.renderItem}
          keyExtractor={item => item.postId}
          onRefresh={()=>this.onRefresh()}
          refreshing={this.state.isLoading}
        />
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: "#ccf7ff"
  },
  viewstyle: {
    width: 350,
  },
  img: {
    width: "100%",
    height: 300,
    padding: 10,
    borderWidth: 2,
    borderColor: "black",
    marginBottom: 20,
    alignSelf: 'center',
    marginLeft: 5
  },
  content: {
    fontSize: 24,
    color: "#696969",
    fontWeight: "600",
    padding: 10
  },
  question: {
    fontSize: 20,
    color: "black",
    fontWeight: "400",
    padding: 10
  },
  pollstyle:
  {
    flexDirection: "row",
    padding: 5,
  },
  progress:
  {
    margin:10,
  },
  totalLikesText:{
    marginTop:10,
    fontWeight:"bold",
    color:"blue",
    fontSize:15
  }
});
