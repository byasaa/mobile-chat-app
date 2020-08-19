import React, {Component} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
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
  Item,
  Input,
  Spinner,
  Badge,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {getLastMessage} from '../redux/actions/message';
import {API_URL} from '@env';
import io from 'socket.io-client';

class HomeScreen extends Component {
  state = {
    searchStore: '',
    list: [],
    isLoading: false,
  };
  getLastMessageByFriend = async () => {
    this.setState({
      isLoading: true,
    });
    const token = this.props.auth.data.token;
    await this.props
      .dispatch(getLastMessage(token))
      .then((res) => {
        console.log(res);
        this.setState({
          isLoading: false,
          list: res.action.payload.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
      });
  };
  componentDidMount = () => {
    this.getLastMessageByFriend();
    this.socket = io(`${API_URL}`);
    this.socket.on('personal-message', (data) => {
      console.log(data);
      if (data.sender_id == this.props.auth.data.id) {
        this.getLastMessageByFriend();
      } else if (data.receiver_id == this.props.auth.data.id) {
        this.getLastMessageByFriend();
      }
    });
    this.socket.on('read-message', (data) => {
      console.log(data);
      if (data.sender_id == this.props.auth.data.id) {
        this.getLastMessageByFriend();
      } else if (data.receiver_id == this.props.auth.data.id) {
        this.getLastMessageByFriend();
      }
    });
  };
  componentWillUnmount = () => {
    this.socket.disconnect();
    this.socket.removeAllListeners();
  };
  render() {
    console.log(this.state);
    return (
      <Container>
        {/* <Header style={{backgroundColor: '#F36162'}}>
          <Body>
            <Title>ChatApp</Title>
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
              placeholder="Search ..."
              onChangeText={(val) => this.setState({searchStore: val})}
              defaultValue=""
            />
          </Item>
          <View style={{marginLeft: 20, marginBottom: 20}}>
            <Text style={{fontSize: 30}}>Messages</Text>
          </View>
          <List>
            {this.state.list.map((message) => {
              let d = new Date(message.created_at);
              let n = d.toLocaleTimeString();
              let friendId =
                message.receiver_id === this.props.auth.data.id
                  ? message.sender_id
                  : message.receiver_id;
              return (
                <View key={message.id}>
                  <ListItem
                    avatar
                    onPress={() =>
                      this.props.navigation.push('Chat', {
                        id: friendId,
                        name: message.name,
                      })
                    }>
                    <Left>
                      {message.image == 'null' ? (
                        <Thumbnail
                          source={require('../assets/images/avatar.jpg')}
                        />
                      ) : (
                        <Thumbnail
                          source={{uri: API_URL + 'img/' + message.image}}
                        />
                      )}
                    </Left>
                    <Body>
                      <Text>{message.name}</Text>
                      <Text note>{message.message}</Text>
                    </Body>
                    <Right>
                      <Text note>{n.replace(/:\d+ /, ' ')}</Text>
                      {message.status == 0 &&
                      message.sender_id != this.props.auth.data.id ? (
                        <Badge
                          style={{
                            marginRight: 10,
                            paddingRight: 10,
                            paddingLeft: 10,
                          }}>
                          <Text style={{color: '#ffffff'}}> </Text>
                        </Badge>
                      ) : null}
                      {message.status == 0 &&
                      message.sender_id == this.props.auth.data.id ? (
                        <Icon name="check" size={17} />
                      ) : message.status == 1 &&
                        message.sender_id == this.props.auth.data.id ? (
                        <Icon name="check-double" size={17} />
                      ) : null}
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

export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    paddingLeft: 20,
  },
});
