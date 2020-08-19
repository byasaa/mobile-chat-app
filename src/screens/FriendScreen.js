import React, {Component} from 'react';
import {Alert, View, Text, StyleSheet} from 'react-native';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Left,
  Right,
  Body,
  Title,
  Button,
  Item,
  Input,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {getAllFriend, searchUser, addFriend} from '../redux/actions/friend';
import {API_URL} from '@env';

class FriendScreen extends Component {
  state = {
    friends: [],
    users: [],
    search: '',
    searchStore: '',
    isLoading: true,
  };
  getAllFriendData = async () => {
    const token = this.props.auth.data.token;
    await this.props
      .dispatch(getAllFriend(token))
      .then((res) => {
        console.log(res);
        this.setState({
          isLoading: false,
          friends: res.action.payload.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
      });
  };
  onSearch = async () => {
    await this.setState({
      isLoading: true,
      search: this.state.searchStore,
    });
    const token = this.props.auth.data.token;
    const {search} = this.state;
    this.props
      .dispatch(searchUser(token, search))
      .then((res) => {
        console.log(res);
        this.setState({
          users: res.action.payload.data.data,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isLoading: false,
          users: [],
        });
      });
  };
  addFriend = async (friendId) => {
    await this.setState({
      isLoading: true,
    });
    const token = this.props.auth.data.token;
    this.props
      .dispatch(addFriend(token, friendId))
      .then(() => {
        this.getAllFriendData()
        Alert.alert('Add Friend', 'Success', [{text: 'Ok'}], {
          cancelable: false,
        });
      })
      .catch((err) => console.log(err));
  };
  componentDidMount = () => {
    this.getAllFriendData();
  };
  render() {
    return (
      <Container>
        {/* <Header style={{backgroundColor: '#F36162'}}>
          <Left>
            <Button transparent>
              <Icon name="arrow-left" size={18} color="white" />
            </Button>
          </Left>
          <Body>
            <Title>Friend List</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="search" size={18} color="white" />
            </Button>
            <Button transparent>
              <Icon name="ellipsis-v" size={18} color="white" />
            </Button>
          </Right>
        </Header> */}
        <Content>
          <Item
            rounded
            style={{
              paddingLeft: 20,
              paddingRight: 20,
              marginLeft: 10,
              marginRight: 10,
              marginTop: 30,
              marginBottom: 20,
            }}>
            <Icon name="search" size={18} />
            <Input
              placeholder="Search User"
              onChangeText={(val) => this.setState({searchStore: val})}
              onSubmitEditing={() => this.onSearch()}
              defaultValue=""
            />
          </Item>
          {this.state.search !== '' ? (
            <>
              <View style={{marginLeft: 20}}>
                <Text style={{fontSize: 30}}>
                  Result of '{this.state.search}'
                </Text>
              </View>
            </>
          ) : null}
          <List>
            {this.state.users.map((user) => {
              return (
                <View key={user.id}>
                  <ListItem thumbnail>
                    <Left>
                      {user.image == 'null' ? (
                        <Thumbnail
                          square
                          source={require('../assets/images/avatar.jpg')}
                        />
                      ) : (
                        <Thumbnail
                          square
                          source={{uri: API_URL + 'img/' + user.image}}
                        />
                      )}
                    </Left>
                    <Body>
                      <Text>{user.name}</Text>
                      <Text note numberOfLines={1}>
                        {user.about}
                      </Text>
                    </Body>
                    <Right>
                      <Button
                        transparent
                        onPress={() => this.addFriend(user.id)}>
                        <Icon name="user-plus" size={16} />
                      </Button>
                    </Right>
                  </ListItem>
                </View>
              );
            })}
          </List>
          <View style={{marginLeft: 20, marginBottom: 20}}>
            <Text style={{fontSize: 30}}>Friend List</Text>
          </View>
          <List>
            {this.state.friends.map((friend, key) => {
              return (
                <View key={key}>
                  <ListItem thumbnail>
                    <Left>
                      {friend.image == 'null' ? (
                        <Thumbnail
                          square
                          source={require('../assets/images/avatar.jpg')}
                        />
                      ) : (
                        <Thumbnail
                          square
                          source={{uri: API_URL + 'img/' + friend.image}}
                        />
                      )}
                    </Left>
                    <Body>
                      <Text>{friend.name}</Text>
                      <Text note numberOfLines={1}>
                        {friend.about}
                      </Text>
                    </Body>
                    <Right>
                      <Button
                        transparent
                        onPress={() =>
                          this.props.navigation.push('Chat', {
                            id: friend.user_id,
                            name: friend.name,
                          })
                        }>
                        <Text>Chat</Text>
                      </Button>
                    </Right>
                    <Right>
                      <Button
                        transparent
                        onPress={() =>
                          this.props.navigation.push('FriendProfile', {
                            id: friend.user_id,
                          })
                        }>
                        <Text>View</Text>
                      </Button>
                    </Right>
                  </ListItem>
                </View>
              );
            })}
          </List>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(FriendScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    paddingLeft: 20,
  },
});
