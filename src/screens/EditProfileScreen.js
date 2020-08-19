import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Left,
  Right,
  Body,
  Toast,
  Button,
  Form,
  Item,
  Input,
  Textarea,
} from 'native-base';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ScrollView} from 'react-native-gesture-handler';
import {API_URL} from '@env';
import ImagePicker from 'react-native-image-picker';
import {getUserProfile, editProfile} from '../redux/actions/profile';

class EditProfileScreen extends Component {
  state = {
    image: null,
    oldImage: null,
    about: '',
    name: '',
  };
  handleBrowseImage = () => {
    const options = {
      noData: true,
      title: 'Select Image',
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.uri) {
        this.setState({image: response});
      }
    });
  };
  handleEditProfile = () => {
    const id = this.props.route.params.id;
    let formData = new FormData();
    const token = this.props.auth.data.token;
    formData.append('name', this.state.name);
    formData.append('image', {
      name: this.state.image.fileName,
      uri: this.state.image.uri,
      type: this.state.image.type,
    });
    console.log(token);
    this.props
      .dispatch(editProfile(formData, token, id))
      .then(async (res) => {
        console.log(res);
        await Alert.alert('Edit Profile', 'Success', [{text: 'Ok'}], {
          cancelable: false,
        });
        this.props.navigation.replace('Home', {
          screen: 'User',
        });
      })
      .catch((err) => {
        console.warn(JSON.stringify(err));
        Alert.alert('Edit Profile', 'Fail', [{text: 'Ok'}], {
          cancelable: false,
        });
      });
  };
  getProfile = async () => {
    const {token} = this.props.auth.data;
    const {id} = this.props.route.params;
    await this.props.dispatch(getUserProfile(token, id));
    const {about, image, name} = this.props.profile.data;
    this.setState({name: name, oldImage: image, about: about});
  };
  componentDidMount() {
    this.getProfile();
  }
  render() {
    return (
      <Container>
        <Header transparent>
          <Left>
            <Button transparent>
              <Icon name="arrow-left" size={18} color="black" />
            </Button>
          </Left>
          <Body />
        </Header>
        <Content>
          <ScrollView>
            <Form style={{paddingLeft: 20, paddingRight: 20, marginTop: 30}}>
              <TouchableOpacity
                style={{alignSelf: 'center'}}
                onPress={() => this.handleBrowseImage()}>
                <View style={styles.bookImage}>
                  {this.state.image === 'null' ? (
                    <>
                      <View style={styles.browseImage}>
                        <Text style={{color: 'blue', alignSelf: 'center'}}>
                          Browse Image
                        </Text>
                      </View>
                    </>
                  ) : this.state.image ? (
                    <Image
                      source={{
                        uri: this.state.image.uri,
                      }}
                      style={styles.image}
                    />
                  ) : (
                    <View style={styles.browseImage}>
                      <Image
                        source={{
                          uri: `${API_URL}img/${this.state.oldImage}`,
                        }}
                        style={styles.image}
                      />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
              <Item regular style={{marginTop: 20}}>
                <Input
                  placeholder="Input Full Name"
                  defaultValue={this.state.name}
                  onChangeText={(val) => this.setState({name: val})}
                />
              </Item>
              <Item regular style={{marginTop: 20}}>
                <Textarea
                  placeholder="About"
                  defaultValue={this.state.about}
                  onChangeText={(val) => this.setState({about: val})}
                />
              </Item>
              <Item regular style={{marginTop: 20, marginBottom: 40}}>
                <Button
                  rounded
                  onPress={() => this.handleEditProfile()}
                  block
                  style={{backgroundColor: '#F36162', width: '100%'}}>
                  <Text style={{color: '#fff', fontSize: 20}}>Continue</Text>
                </Button>
              </Item>
            </Form>
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
export default connect(mapStateToProps)(EditProfileScreen);

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
