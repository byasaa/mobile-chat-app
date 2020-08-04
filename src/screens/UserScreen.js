import React, {Component} from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import {
  Container,
  Header,
  Content,
  Left,
  Title,
  Body,
  Right,
  Button,
  Separator,
  Item,
  ListItem,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {getUserProfile} from '../redux/actions/profile';
import {logout} from '../redux/actions/auth';
import {destroy} from '../redux/actions/profile';
import {API_URL} from '@env';

class UserScreen extends Component {
  state = {
    profile: [],
  };
  handleLogout = () => {
    this.props.dispatch(logout());
    this.props.dispatch(destroy());
    this.props.navigation.replace('Login');
  };
  getProfile = async () => {
    const {token, id} = this.props.auth.data;
    await this.props.dispatch(getUserProfile(token, id));
    this.setState({profile: this.props.profile.data});
  };
  componentDidMount = async () => {
    this.getProfile();
  };
  render() {
    const {about, id, name, image} = this.state.profile;
    console.log(this.state);
    return (
      <Container>
        <Header style={{backgroundColor: '#F36162'}}>
          <Body>
            <Title>User Profile</Title>
          </Body>
        </Header>
        <Content>
          <ScrollView>
            <View style={{marginTop: 30}}>
              <View style={{alignSelf: 'center', marginBottom: 30}}>
                <View style={styles.bookImage}>
                  {image === 'null' ? (
                    <>
                      <Image
                        source={require('../assets/images/avatar.jpg')}
                        style={styles.image}
                      />
                    </>
                  ) : (
                    <>
                      <Image
                        source={{uri: `${API_URL}/img/${image}`}}
                        style={styles.image}
                      />
                    </>
                  )}
                </View>
              </View>
              <Separator bordered>
                <Text>Profile</Text>
              </Separator>
              <ListItem>
                <Text>{name}</Text>
              </ListItem>
              <ListItem last>
                <Text>{about}</Text>
              </ListItem>
              <Separator bordered>
                <Text>Other</Text>
              </Separator>
              <ListItem
                onPress={() =>
                  this.props.navigation.push('EditProfile', {id: id})
                }>
                <Left>
                  <Text>Edit Profile</Text>
                </Left>
                <Right>
                  <Icon name="angle-right" />
                </Right>
              </ListItem>
              <ListItem last onPress={this.handleLogout}>
                <Left>
                  <Text>Logout</Text>
                </Left>
                <Right>
                  <Icon name="angle-right" />
                </Right>
              </ListItem>
            </View>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps)(UserScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    paddingLeft: 20,
  },
  bookImage: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderRadius: 100,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  browseImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    justifyContent: 'center',
    borderWidth: 1,
  },
});
