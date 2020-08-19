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
  Title,
  Body,
  Toast,
  Button,
  Form,
  Item,
  Input,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {addProfile} from '../redux/actions/profile';

class AddProfileScreen extends Component {
  state = {
    image: null,
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
  handleAddProfile = () => {
    let formData = new FormData();
    const token = this.props.auth.data.token;
    formData.append('name', this.state.name);
    formData.append('image', {
      name: this.state.image.fileName,
      uri: this.state.image.uri,
      type: this.state.image.type,
    });
    this.props
      .dispatch(addProfile(formData, token))
      .then(async (res) => {
        console.log(res);
        await Alert.alert('Add Profile', 'Success', [{text: 'Ok'}], {
          cancelable: false,
        });
        this.props.navigation.replace('Home');
      })
      .catch((err) => {
        console.warn(JSON.stringify(err));
        Alert.alert(
          'Add Profile',
          'Something Wrong! I Can Feel It',
          [{text: 'Ok'}],
          {
            cancelable: false,
          },
        );
      });
  };
  render() {
    return (
      <Container>
        <Header transparent>
          <Left>
            <Button transparent>
              <Icon name="arrow-left" size={18} color="black" />
            </Button>
          </Left>
          <Body>
            <Text>Add Profile</Text>
          </Body>
          <Body />
        </Header>
        <Content>
          <ScrollView>
            <Form style={{paddingLeft: 20, paddingRight: 20, marginTop: 30}}>
              <TouchableOpacity
                onPress={() => this.handleBrowseImage()}
                style={{alignSelf: 'center'}}>
                <View style={styles.bookImage}>
                  {this.state.image ? (
                    <Image
                      source={{
                        uri: this.state.image.uri,
                      }}
                      style={styles.image}
                    />
                  ) : (
                    <View style={styles.browseImage}>
                      <Text style={{color: 'blue', alignSelf: 'center'}}>
                        Browse Image
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
              <Item regular style={{marginTop: 20}}>
                <Input
                  placeholder="Input Full Name"
                  onChangeText={(val) => this.setState({name: val})}
                />
              </Item>
              <Item regular style={{marginTop: 20, marginBottom: 40}}>
                <Button
                  onPress={() => this.handleAddProfile()}
                  rounded
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
});
export default connect(mapStateToProps)(AddProfileScreen);

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
