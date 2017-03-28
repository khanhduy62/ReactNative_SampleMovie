
import React, { Component } from 'react';
import styles from './styles'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TextInput,
  TouchableOpacity,
  Image,
  ListView
} from 'react-native';

var REQUEST_URL = 'https://api.themoviedb.org/3/search/movie?api_key=60196eeb595831d16103335512295501&query=';

class MediaListView extends Component{
  constructor(){
    super();
    this.state={
      isClickSearch: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      filmName : "Harry"
    };
  }

  componentDidMount() {
    this.fetchData(this.state.filmName);
  }

  fetchData(film) {
    var newRequestURL = REQUEST_URL+""+film;
    fetch(newRequestURL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.results),
        });
      })
      .done();
  }

  render(){
    return(
      <View style={styles.global.mainContainer}>
        {this.renderSearch()}

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderMovie.bind(this)}
          style={styles.listView}
        />
      </View>

    );
  }

  renderSearch(){
    let isSearch = this.state.isClickSearch;
    if(!isSearch){
      return(
          <View style={styles.navbar.appearance}>
            <Text style={[styles.navbar.title, componentStyles.titleItalic]}>iTunesBrowser</Text>
            <TouchableOpacity  onPress={()=>this.setState({isClickSearch : true})}>
              <Text style={styles.navbar.button}>Search</Text>
            </TouchableOpacity>

          </View>
      )}else{
        return(
            <View style={styles.navbar.appearance}>
              <TextInput autoFocus={true} placeholder="Tim kiem" placeholderTextColor="white"
                 style={styles.navbar.searchFilm} onSubmitEditing={this.onSubmitSearchFilm.bind(this)}/>
            </View>
        )
      }
    }

  onSubmitSearchFilm(data){
      this.setState({isClickSearch : false});
      this.fetchData(data.nativeEvent.text);

  }

  renderMovie(movie) {
    return (
        <TouchableOpacity style={styles.container} onPress={()=>this.props.navigator.push({filmName: movie.original_title})} >
          <Image
            source={{uri: "https://image.tmdb.org/t/p/w500/"+movie.backdrop_path}}
            style={styles.thumbnail}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{movie.original_title}</Text>
            <Text style={styles.year}>{movie.release_date}</Text>
          </View>
        </TouchableOpacity>
    );
  }

};

class DetailMovie extends Component{
  render(){
    const filmName = this.props.filmName;
    console.log(filmName)
    return(
      <View>
        <Text> {filmName}</Text>
      </View>
    )
  }
}
class iTunesBrowser extends Component{
  doiManHinh(route, navigator){
    let filmName = route.filmName;
    switch (filmName) {
      case 'iTunesBrowser':
        return(
          <MediaListView navigator={navigator}/>
        );
      default:
        return(
          <DetailMovie navigator={navigator} filmName={filmName}/>
        )
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{filmName : 'iTunesBrowser',  index : 0}}
        // renderScene={(route, navigator) =>
        //   <MediaListView/>
        // }
        renderScene={this.doiManHinh}
      />
    );
  }
};

var componentStyles = StyleSheet.create({
  titleItalic: {
    fontStyle: 'italic'
  }
});
AppRegistry.registerComponent('AwesomeProject', () => iTunesBrowser);
