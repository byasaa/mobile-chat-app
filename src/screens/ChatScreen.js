import React, {Component} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {
  Container,
  Header,
  Content,
  Footer,
  Left,
  Right,
  Body,
  Title,
  Button,
  Thumbnail,
  Item,
  Input,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MessageBubble from '../components/MessageBubble';
// import {ScrollView} from 'react-native-gesture-handler';
import ScrollView from 'react-native-invertible-scroll-view';
import {connect} from 'react-redux';
import {
  getPersonalMessage,
  sendPersonalMessage,
  readMessage,
} from '../redux/actions/message';
import io from 'socket.io-client';
import {API_URL} from '@env';

class ChatScreen extends Component {
  state = {
    messages: [],
    message: '',
    isLoading: false,
  };
  getPersonalMessage = async () => {
    const token = this.props.auth.data.token;
    await this.props
      .dispatch(getPersonalMessage(token, this.props.route.params.id))
      .then((res) => {
        console.log(res);
        this.setState({
          isLoading: false,
          messages: res.action.payload.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
      });
  };
  onSendMessage = () => {
    const token = this.props.auth.data.token;
    const data = {
      message: this.state.message,
      receiver_id: this.props.route.params.id,
    };
    this.props
      .dispatch(sendPersonalMessage(token, data))
      .then((res) => {
        console.log(res);
        this.setState({
          message: '',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  readAllMessage = (receiver_id) => {
    this.props.dispatch(readMessage(this.props.auth.data.token, receiver_id));
  };
  componentDidMount = async () => {
    await this.getPersonalMessage();
    this.socket = io(`${API_URL}`);
    this.socket.on('personal-message', (data) => {
      console.log(data);
      if (
        data.receiver_id == this.props.route.params.id &&
        data.sender_id == this.props.auth.data.id
      ) {
        this.setState({messages: [...this.state.messages, data]});
      } else if (
        data.sender_id == this.props.route.params.id &&
        data.receiver_id == this.props.auth.data.id
      ) {
        this.setState({messages: [...this.state.messages, data]});
      }
    });
    // this.receiver_id = this.props.route.params.id;
    this.readAllMessage(this.props.route.params.id);
    // this.sender_id = this.props.auth.data.id;
  };
  componentWillUnmount = () => {
    this.socket.disconnect();
    this.socket.removeAllListeners();
  };
  render() {
    console.log(this.props);
    return (
      <Container>
        <Header style={{backgroundColor: '#F36162'}}>
          <Left>
            <Button transparent>
              <Icon name="arrow-left" size={18} color="white" />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.route.params.name}</Title>
            <Title style={{fontSize: 13}}>Online</Title>
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
          <ScrollView>
            {this.state.messages.map((message, key) => {
              const mine =
                message.sender_id === this.props.auth.data.id ? true : false;
              return (
                <View key={key}>
                  <MessageBubble mine={mine} text={message.message} />
                </View>
              );
            })}
          </ScrollView>
        </Content>
        <Footer style={{backgroundColor: 'white', height: 65}}>
          <Item style={{width: '100%', paddingLeft: 20}}>
            <Input
              placeholder="Type Something..."
              onChangeText={(val) => this.setState({message: val})}
              onSubmitEditing={this.onSendMessage}
              defaultValue=""
            />
            <Button
              danger
              block
              transparent
              onPress={this.onSendMessage}
              style={{
                marginRight: 10,
                marginTop: 10,
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              <Icon name="paperclip" color="black" size={24} />
            </Button>
            <Button
              danger
              block
              transparent
              style={{
                marginRight: 20,
                marginTop: 10,
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              <Icon name="paper-plane" color="black" size={24} />
            </Button>
          </Item>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ChatScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    paddingLeft: 20,
  },
});
