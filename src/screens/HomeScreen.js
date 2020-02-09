// import React, { Component } from "react";
// import { MenuButton, Logo, Middle } from "../components/header/header";
// import {FlatList, ActivityIndicator, SafeAreaView, Text, View, TouchableOpacity, StyleSheet, Button, Image} from 'react-native';
 
// const DATA = [
//   {
//     id: '1',
//     title: 'First Item',
//     image:require('../assets/news.png')
//   },
//   {
//     id: '2',
//     title: 'Second Item',
//     image:require('../assets/advt.png')
//   },
//   {
//     id: '3',
//     title: 'Third Item',
//     image:require('../assets/health.png')
//   },
//   {
//     id: '4',
//     title: 'Fourth Item',
//     image:require('../assets/sports.png')
//   },
//   {
//     id: '5',
//     title: 'Fifth Item',
//     image:require('../assets/finance.png')
//   },
//   {
//     id: '6',
//     title: 'Sixth Item',
//     image:require('../assets/film.png')
//   },
//   {
//     id: '7',
//     title: 'Seventh Item',
//     image:require('../assets/coke.png')
//   },
//   {
//     id: '8',
//     title: 'Eight Item',
//     image:require('../assets/market.png')
//   },
//   {
//     id: '9',
//     title: 'Fifth Item',
//     image:require('../assets/drug.png')
//   },
// ];

// export default class HomeScreen extends React.Component {
//   static navigationOptions = ({ navigation }) => {
//     return {
//       headerLeft: ()=><MenuButton onPress={() => navigation.openDrawer()} />,
//       headerRight:()=> (<Logo />),
//     };
//   };

//   constructor(props){
//     super(props);
//     this.state ={ isLoading: true, item: null, dataSource:[],}
//   }


//   componentDidMount(){
//     return fetch('http://10.231.20.97:8080/posts/recentPosts')
//       .then((response) => response.json())
//       .then((responseJson) => {
//         this.setState({
//           isLoading: false,
//           dataSource: responseJson,
//         }, function(){
//         });

//       })
//       .catch((error) =>{
//         console.error(error);
//       });
//   }

//   renderItem = ({ item }) => {
//     let postView=null;
//     let pollView=null;
//     if(item.postType==="text")
//     {
//       postView=(
//         <Text>{item.postContent.text}</Text>
//       )
//     }
//     else if(item.postType=="image")
//     {
//       postView=(
//         <View>
//           <Text>{item.postContent.text}</Text>
//           <Image source={{ uri: item.postContent.image }}
//             style={{ width: 400, height: 400 }} />
//         </View>
//       )
//     }
//     if(item.pollExists)
//     {
//       var choices=[];
//       for(let i=0;i<item.poll.choices.length;i++)
//       {
//         let choice=item.poll.choices[i];
//         choices.push(
//           <View key={choice.choiceNo}>
//             <TouchableOpacity style={styles.choiceContainer}>
//               <Text style={{fontSize:18}}>{choice.choice}</Text>
//               <View style={{alignItems:"flex-end",flex:1}}>
//               <Text style={{fontSize:18,color:"blue"}}>{choice.votes}</Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//         )
//       }
//       pollView=(
//         <View>
//           <Text style={{fontWeight:"bold"}}>{item.poll.question}</Text>
//           {choices}
//         </View>
//       )
//     }
//     return (
//       <View style={styles.MainContainer}>
//         <TouchableOpacity>
//         {postView}
//         {pollView}
//         </TouchableOpacity>
//       </View>
//     )
//   }

//  render(){
//   return (
//     <SafeAreaView style={styles.container}>
      
//       <FlatList
//         horizontal={true}
//         data={DATA}
//         renderItem={({ item }) =>(<View style={{padding:10,paddingTop:30,paddingBottom:30}}><TouchableOpacity ><Image source={item.image} style={{width:50,height:50}} /></TouchableOpacity></View>)}
//         keyExtractor={item => item.id}
//       />
//       <FlatList
//          data={this.state.dataSource}
//          renderItem={this.renderItem}
//          keyExtractor={item => item.postId}
//       />
//     </SafeAreaView>
//   );  
// }
// }

// const styles = StyleSheet.create({
 
//   MainContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#bedffa',
//     width:'100%',
 
//   },
 
//   cardViewStyle:{
//     width: 400, 
//     height: 200,
//     padding: 30,
//   },
 
//   cardView_InsideText:{
//     fontSize: 20, 
//     color: '#000', 
//     textAlign: 'center', 
//     marginTop: 50    
 
//   },
 
// });



import React, { Component } from "react";
import { MenuButton, Logo, Middle } from "../components/header/header";
import {FlatList, SafeAreaView, Text, View, TouchableOpacity, StyleSheet, ScrollView, Image} from 'react-native';
import postdata from "../posts.json"
import streamsdata from "../streams.json"
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import LikeButton from '../components/LikeButton'


export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: ()=><MenuButton onPress={() => navigation.openDrawer()} />,
      headerRight:()=> (<Logo />),
    };
  };

  constructor(props){
    super(props);
    // this.state ={ isLoading: true, item: null, postdata:[],streamsdata:[],}
    this.state ={ isLoading: true, item: null,bgcolor:"#ffc1cc", 
    post:
    {
        postId: "",
        choiceNo: ""},
    }
    this.votepoll = this.votepoll.bind(this);
  }

  
  // componentDidMount(){
  //   return fetch('http://10.231.20.97:8080/posts/getRecentPosts')
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       this.setState({
  //         isLoading: false,
  //         postdata: responseJson,
  //       }, function(){
  //       });

  //     })
  //     .catch((error) =>{
  //       console.error(error);
  //     });

  //     return fetch('http://10.231.20.97:8080/streams')
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       this.setState({
  //         isLoading: false,
  //         streamsdata: responseJson,
  //       }, function(){
  //       });

  //     })
  //     .catch((error) =>{
  //       console.error(error);
  //     });
  // }

  votepoll(postId,choiceNo)
  {
    let fd = new FormData();
    let voteupdate = this.state.post;
    voteupdate.postId = postId;
    voteupdate.choiceNo= choiceNo;
    fd.append("post", JSON.stringify(voteupdate));
    console.log("fd", fd);
    fetch("http://192.168.1.17:8080/posts/addVote", {
        method: "POST",
        body: fd
    }).then((response) => response.json())
        .then((responseJSON) => { console.log(responseJSON) })
        .then(error => { console.log("err", error) })
  }

  renderItem = ({ item }) => {
    let postView=null;
    let pollView=null;
    if(item.postType==="text")
    {
      postView=(
        <View key={item.postId}>
        <Text style={styles.content}>{item.postContent.text}</Text>
        <LikeButton />
        </View>
      )
    }
    else if(item.postType=="image")
    {
      postView=(
        <View key={item.postId}>
        <Text style={styles.content}>{item.postContent.text}</Text>
        <Image source={{ uri: item.postContent.image }}
            style={styles.img}
            resizeMode="cover"
        />
        <LikeButton />
        </View>
      )
    }
    if(item.ispollExists)
    {
      var choices=[];
      for(let i=0;i<item.poll.choices.length;i++)
      {
        let choice=item.poll.choices[i];
        choices.push(
          <View key={choice.choiceNo}>
            <TouchableOpacity onPress={this.votepoll.bind(this,item.postId,choice.choiceNo)}>
              <View style={styles.pollstyle}>
              <View style={{backgroundColor:this.state.bgcolor,flex:1,padding:10,fontWeight:400,fontSize:20}}>
              <Text>{choice.choice}</Text>
              </View>
              <View style={{backgroundColor:this.state.bgcolor,flex:1,padding:10,fontWeight:400,fontSize:20,alignContent:"flex-end"}}>
              <Text style={{textAlign: 'right', alignSelf: 'stretch'}}>{choice.votes}</Text>
              </View>
              </View>
            </TouchableOpacity>
          </View>
        )
      }
      pollView=(
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
        </View>
        </Card>
        </ScrollView>
      </View>
    )
  }

  renderStreams = ({ item }) => {
    return (
      <View style={{padding:20,paddingTop:20,paddingBottom:30}}>
        <TouchableOpacity >
          <Image source={{uri:item.streamLogo}} style={{width:50,height:50}} />
          <Text>{item.streamName}</Text>
        </TouchableOpacity>
      </View>
    )
  }

 render(){
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        horizontal={true}
        data={streamsdata}
        renderItem = {this.renderStreams}
        keyExtractor={item => item.streamId}
      />
      <FlatList
         data={postdata}
         renderItem={this.renderItem}
         keyExtractor={item => item.postId}
      />
    </SafeAreaView>
  );  
}
}


const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    flex:1,
    backgroundColor:"#ccf7ff"
  },
  viewstyle:{
    width: 350,
  },
  img: {
    width: "100%",
    height: 300,
    padding: 10,
    borderWidth: 2,
    borderColor: "black",
    marginBottom:20,
    alignSelf:'center',
    marginLeft:5
  },
  content:{
    fontSize:24,
    color: "#696969",
    fontWeight: "600",
    padding: 10
  },
  question:{
    fontSize:20,
    color: "black",
    fontWeight: "400",
    padding:10
  },
  pollstyle:
  {
    flexDirection:"row",
    padding:5,
  },
});
