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
  Item,
  Input,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {getAllFriend} from '../redux/actions/friend';

class FriendScreen extends Component {
  state = {
    friends: [],
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
            <Input placeholder="Search" />
          </Item>
          <View style={{marginLeft: 20}}>
            <Text style={{fontSize: 30}}>Friend List</Text>
          </View>
          <List>
            {this.state.friends.map((friend, key) => {
              return (
                <View key={key}>
                  <ListItem thumbnail>
                    <Left>
                      <Thumbnail
                        square
                        source={require('../assets/images/avatar.jpg')}
                      />
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
