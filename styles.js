import global from './styles/global';
import navbar from './styles/navbar';
export default{
   global , navbar,
   container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderBottomColor: 'aqua',
    padding: 10,
    borderBottomWidth: 1
  },
    rightContainer: {
      flex: 1,
    },
    title: {
      fontSize: 20,
      marginBottom: 8,
      textAlign: 'center'
    },
    year: {
      textAlign: 'center',
    },
    thumbnail: {
      width: 53,
      height: 81
    },
    listView: {
      paddingTop: 20,
      backgroundColor: '#F5FCFF',
    },
}
