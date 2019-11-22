import React from "react"
import { Text, TextInput, View, Button, StyleSheet } from "react-native"
import { connect } from "react-redux"
import ViroSample from "../../viroSample"

export default class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      username: "",
      password: "",
      isAuthenticated: false,
      error: false
    }
    this.submitLogin = this.submitLogin.bind(this)
  }

  submitLogin(e) {
    // this.isAuthenticated = login(this.state.username, this.state.password)
    this.setState({
      isAuthenticated: true
    })
  }

  render() {
    const ar = <ViroSample />

    const login = (
      <View style={styles.container}>
        <Text style={{ fontSize: 27 }}>LOGIN</Text>
        <TextInput
          placeholder="Username"
          onChangeText={text => this.setState({ username: text })}
          value={this.state.username}
        />
        <TextInput
          placeholder="Password"
          onChangeText={text => this.setState({ password: text })}
          secureTextEntry={true}
          value={this.state.password}
        />
        <View style={{ margin: 7 }} />
        <Text>{this.state.error ? "Incorrent username or password" : ""}</Text>
        <Button title=" Sumbit " onPress={this.submitLogin} />
      </View>
    )
    return this.state.isAuthenticated ? ar : login
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  errorMessageText: {
    textDecorationColor: "red"
  }
})

// const mapDispatch = dispatch => {
//   return {
//     login(username, password) {
//       dispatch(loginThunk(username, password))
//     }
//   }
// }
