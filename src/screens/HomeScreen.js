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
  Title,
  Button,
  Spinner,
  Badge,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {getLastMessage} from '../redux/actions/message';
import {API_URL} from '@env';

class HomeScreen extends Component {
  state = {
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
  };
  render() {
    console.log(this.state);
    return (
      <Container>
        <Header style={{backgroundColor: '#F36162'}}>
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
        </Header>
        <Content>
          <List>
            {this.state.list.map((message, key) => {
              let d = new Date(message.created_at);
              let n = d.toLocaleTimeString();
              let friendId =
                message.receiver_id === this.props.auth.data.id
                  ? message.sender_id
                  : message.receiver_id;
              let image =
                message.image == 'null'
                  ? require('../assets/images/avatar.jpg')
                  : {uri: `${API_URL}+img/${message.image}`};
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
                      <Thumbnail source={image} />
                    </Left>
                    <Body>
                      <Text>{message.name}</Text>
                      <Text note>{message.message}</Text>
                    </Body>
                    <Right>
                      <Text note>{n.replace(/:\d+ /, ' ')}</Text>
                      {/* <Badge
                  style={{
                    marginRight: 10,
                    paddingRight: 10,
                    paddingLeft: 10,
                  }}>
                  <Text style={{color: '#ffffff'}}>2</Text>
                </Badge> */}
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
