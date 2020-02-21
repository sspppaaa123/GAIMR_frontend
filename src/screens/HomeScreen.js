import React, { Component } from "react";
import { MenuButton, Logo, Middle } from "../components/header/header";
import { FlatList, SafeAreaView, Text, View, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

import { Card, ListItem, Button, Icon } from 'react-native-elements';
import LikeButton from '../components/LikeButton'
import ImageLoader from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import AddStream from "../components/AddStreamComponent";
import * as constants from '../constants'
export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: () => <MenuButton onPress={() => navigation.openDrawer()} />,
      headerRight: () => (<Logo />),
    };
  };

  constructor(props) {
    super(props);
    // this.state ={ isLoading: true, item: null, postdata:[],streamsdata:[],}
    this.state = {
      isLoading: true, item: null, bgcolor: "#ffc1cc",
      posts: [],
      streams: [],
      post:
      {
        postId: "",
        choiceNo: ""
      },
      ip: constants.APIURL,
      selectedStream: "",
      progress: 0,
      location: {
        lat: null,
        long: null
      }
    },
      this.votepoll = this.votepoll.bind(this);
  }
  translateStreams(orgLanguage, targetLanguage) {
    console.log("translating.. " + orgLanguage + " to " + targetLanguage)
    let fetchURL = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200215T111214Z.310a57dabff6c4ee.08e5c5602bd858262ab6007ce3bb387e06c0160d"
    let streams = this.state.streams;
    let translatedStreams = []
    for (let i = 0; i < streams.length; i++) {
      translatedStreams.push(streams[i])
    }
    for (let i = 0; i < streams.length; i++) {
      let streamName = streams[i].streamName;
      fetchURL += "&text=" + streamName
      fetchURL += "&lang=" + orgLanguage + "-" + targetLanguage;
      const translate = async () => {
        const resp = await fetch(fetchURL)
          .catch((err) => { console.log(err) })
        let respJSON = await resp.json()
        let texts = respJSON.text;
        streamName = texts[i]
        streams[i].streamName = streamName
        translatedStreams[i] = streams[i]
        this.setState({
          streams: translatedStreams
        })
      }
      translate()
    }
    console.log("translatedStream", translatedStreams)
  }
  translatePosts(orgLanguage, targetLanguage) {
    let fetchURL = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200215T111214Z.310a57dabff6c4ee.08e5c5602bd858262ab6007ce3bb387e06c0160d"
    let posts = this.state.posts;
    let translatedPosts = []
    for (let i = 0; i < posts.length; i++) {
      translatedPosts.push(posts[i])
    }
    let requests = 0;
    for (let i = 0; i < posts.length; i++) {
      requests++;
      let post = posts[i];
      let postText = post.postContent.text;
      postText = postText.replace(/#/g, 'ht')
      console.log("postText", postText)
      fetchURL += "&text=" + postText
      fetchURL += "&lang=" + orgLanguage + "-" + targetLanguage;
      const translate = async () => {
        const resp = await fetch(fetchURL)
          .catch((err) => { console.log(err) })
        console.log("translatedPosts", resp)
        let respJSON = await resp.json()
        console.log(respJSON)
        let texts = respJSON.text;
        postText = texts[i]
        postText = postText.replace(/ht/g, '#')
        posts[i].postContent.text = postText;
        translatedPosts[i] = posts[i]
        this.setState({
          posts: translatedPosts
        }, function () {
          --requests;
          if (requests == 0) {
            updatePollQuestion()
          }
        })
      }
      translate()
    }
    function updatePollQuestion() {
      for (let i = 0; i < posts.length; i++) {
        let post = posts[i];
        let question = ''
        //postid KEY qn KEY 1 KEY ch1 KEY 2 KEY ch2
        if (post.pollExists) {
          let poll = post.poll;
          question = post.postId + " xyz* " + poll.question
          for (let i = 0; i < poll.choices.length; i++) {
            let choice = poll.choices[i]
            question += " xyz* "+ choice.choice
          }
          question=question.replace(/#/g,"ht")
          console.log("questionPoll",question)
        }
        fetchURL += "&text=" + question
        fetchURL += "&lang=" + orgLanguage + "-" + targetLanguage;
        const translate = async () => {
          const resp = await fetch(fetchURL)
            .catch((err) => { console.log(err) })
          let respJSON = await resp.json()
          console.log("translatedPoll", respJSON)
          let texts = respJSON.text;
          if (post.pollExists) {
            let translation = texts[posts.length + i]
            translation=translation.replace(/ht/g,"#")
            let translatedPoll = translation.split(' xyz* ')
            let qn = translatedPoll[1]
            console.log("translationPoll", translatedPoll)
            for(let i=0;i<post.poll.choices.length;i++)
            {
              let choice=post.poll.choices[i];
              choice.choice=translatedPoll[i+2]
              post.poll.choices[i]=choice
            }
            post.poll.question = qn;
            translatedPosts[i] = post
            this.setState({
              posts: translatedPosts
            })
          }
        }
        translate()
      }
    }
    console.log("translatedPosts", translatedPosts)

  }
  init() {
    fetch(this.state.ip + '/posts/recentPosts/' + this.state.selectedStream,
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

      }).then(() => this.translatePosts("en", "hi"))
      .catch((error) => {
        console.error(error);
      });

    fetch(this.state.ip + '/streams')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({
          isLoading: false,
          streams: responseJson,
        });
      }).then(() => this.translateStreams("en", "fr"))
      .catch((error) => {
        console.error(error);
      });
  }
  componentDidMount() {
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
    fetch(this.state.ip + '/posts/addVote',
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
  updateLike(updatedPost) {
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
  onLikeHandler = (postId) => {
    console.log("liking post", postId);
    let like = {
      postId: postId
    }
    fetch(this.state.ip + '/posts/addLike',
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
        this.updateLike(responseJSON)
      }).then(err => { console.log(err) })
  }
  selectedStreamHandler = streamName => {
    if (streamName === "All")
      streamName = ""
    this.setState({
      selectedStream: streamName,
      isLoading: true
    }, function () {
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
          <LikeButton onLike={() => { this.onLikeHandler(item.postId) }} />
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
                height: "100%",
                width: "100%",
                resizeMode: "stretch"
              }}
              onLoad={() => { setTimeout(() => { console.log("timeout") }, 3000) }}
            />
          </View>
          <LikeButton onLike={() => { this.onLikeHandler(item.postId) }} />
        </View>
      )
    }
    if (item.pollExists) {
      var choices = [];
      var sum = 0;
      for (let i = 0; i < item.poll.choices.length; i++) {
        let c = item.poll.choices[i];
        sum += c.votes;
      }
      for (let i = 0; i < item.poll.choices.length; i++) {
        let choice = item.poll.choices[i];
        let votePercent = ((choice.votes / sum) * 100).toFixed(2);
        if (!isNaN(votePercent)) {
          votePercent += "%"
        }
        else {
          votePercent = "0%"
        }
        const voteStyle = {
          backgroundColor: "#69a2ff",
          padding: 10,
          width: votePercent,
          height: "100%"
        }
        choices.push(
          <View key={choice.choiceNo}>
            <TouchableOpacity onPress={this.votepoll.bind(this, item.postId, choice.choiceNo)}>
              <View style={{ flexDirection: "row", wdith: "100%", height: 50, backgroundColor: "#bbb", margin: 5 }}>
                <View style={voteStyle}>
                </View>
                <View style={{ position: "absolute", justifyContent: 'flex-start' }}>
                  <Text style={{ marginLeft: 5, fontSize: 18, marginTop: 5 }}>{choice.choice}</Text>
                </View>
                <View style={{ position: "absolute", justifyContent: "flex-end", end: 0 }}>
                  <Text style={{ fontSize: 18, marginTop: 5 }}>{votePercent}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )
      }
      pollView = (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text style={styles.question}>{item.poll.question}</Text>
            <View style={{ alignItems: "flex-end", flex: 1, justifyContent: "center" }}>
              <Text>{sum} votes</Text>
            </View>
          </View>
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
      <View style={{ padding: 20, paddingTop: 20, paddingBottom: 30 }}>
        <TouchableOpacity style={{ alignItems: "center" }}
          onPress={() => { this.selectedStreamHandler(item.streamName) }}>
          <Image source={{ uri: item.streamLogo }} style={{ width: 50, height: 50 }} />
          <Text style={{ fontSize: 20 }}>{item.streamName}</Text>
        </TouchableOpacity>
      </View>
    )
  }
  onRefresh = () => {
    this.setState({ isLoading: true }, function () { this.init() })
  }
  goToNewStreamsPage = () => {
    this.props.navigation.navigate('AddStream')
  }
  render() {
    const listFooter = (<AddStream newStream={() => { this.goToNewStreamsPage() }} />)
    console.log("rendering..", this.state.streams);
    return (
      <SafeAreaView style={styles.container}>
        {/* <Progress.Circle
            style={styles.progress}
            progress={this.state.progress}
            indeterminate={this.state.isLoading}
          /> */}
        <View style={styles.streamContainer}>
          <FlatList
            horizontal={true}
            data={this.state.streams}
            renderItem={this.renderStreams}
            keyExtractor={item => item.streamId}
            ListFooterComponent={listFooter}
            ListFooterComponentStyle={{
              justifyContent: "center", marginBottom: 15
              , padding: 10
            }}
            style={{ flex: 1 }}
          />
        </View>
        <FlatList
          data={this.state.posts}
          renderItem={this.renderItem}
          keyExtractor={item => item.postId}
          onRefresh={() => this.onRefresh()}
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
    width: "100%"
  },
  progress: {
    margin: 10,
  },
  totalLikesText: {
    marginTop: 10,
    fontWeight: "bold",
    color: "blue",
    fontSize: 15
  },
  streamContainer:
  {
    flexDirection: "row",
    height: "20%"
  }
});
